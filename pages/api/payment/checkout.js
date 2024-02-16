import gateway from "@/utils/gateway";
import { useEffect } from "react";

export default async function checkout(req, res) {

  // Use the payment method nonce here
  const nonceFromTheClient = req.body.paymentMethodNonce;
  const price =req.body.price;
  // Create a new transaction for $10
  const newTransaction = gateway.transaction.sale(
    {
      amount: price,
      paymentMethodNonce: nonceFromTheClient,
      options: {
        // This option requests the funds from the transaction
        // once it has been authorized successfully
        submitForSettlement: true,
      },
    },
    (error, result) => {
      if (result) {
        res.status(201).json({ result: "success" });
        // console.log("succeesss");
      } else {
        res.status(500).send(error);
        // console.log("error");
      }
    }
  );
}

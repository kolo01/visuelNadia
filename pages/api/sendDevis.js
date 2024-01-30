import nodemailer from "nodemailer";

export default function handler(req, res) {
  const email = process.env.EMAIL;
  const pass = process.env.EMAIL_PASS;

  const message = {
    from: email,
    to: req.body.email,
    subject: ` ${req.body.subject}`,
    text: `Recapitulatif de devis`,
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>test</title>
    
    </head>
    <body>
        <div >
            <div >
                <img  style="margin-left: 40%;" width="200px" height="100px"  src="https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/logo1.png?alt=media&token=67f99355-60b3-4b10-a38a-6a52dd89b107&_gl=1*11jre4b*_ga*MTE4ODU5MTEwLjE2ODc1MTg1NjQ.*_ga_CW55HF8NVT*MTY5NTg5NzM0OS4xODMuMS4xNjk1ODk3NDIzLjYwLjAuMA.."/>
            </div>
        </div >
        <div style="margin-left: 5%;font-size: 20px;">
        <p style="font-size: 25px;margin-bottom:20px">Merci ${req.body.nom} nous avons bien reçu votre demande de devis.</p>
        <p style="font-size: 25px;margin-bottom:20px">le récapitulatif de votre commande est le suivant : </p>
        <u style="margin-left: 30px;font-size: 25px;">${req.body.quantity} Colis</u>
    <p  style="margin-left: 60px;">les differents types de produit</p>
    <div>
        <p style="margin-left: 30px; font-weight:600">Details : </p>
    <div style="display: flex; justify-content:space-between;width:500px; margin-left:90px">
        <p>Dépôt/Retrait : ${req.body.depot}</p>
     
    </div>
    <p>Expéditeur : ${req.body.nom} résident à ${req.body.rue} ${req.body.postal} ${req.body.ville}</p>
    
    <p>Durée de livraison : ${req.body.jour}</p>
    </div>
    <p style="font-size: 18px;">Nous allons fait suite a votre demande assez rapidement, quand nous nous recevrons les offres de nos patenaires.</p>
    
    
    <p style="font-size: 18px;">Merci pour votre confiance,</p>
    <p style="font-size: 18px;">Des questions ? N'hesitez pas à nous contacter srschain@gmail.com</p>
    <p style="font-size: 18px;">L'équipe CHAP</p>
    
    
    
    
    
    
    </div>
          
    </body>
    </html>`,
  };
  const message2 = {
    from: email,
    to: `"lauria.guenaman@rschain.net"`,
    subject: ` ${req.body.subject}`,
    text: `Recapitulatif de devis`,
    html:  `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>test</title>
    
    </head>
    <body>
        <div >
            <div >
                <img  style="margin-left: 40%;" width="200px" height="100px"  src="https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/logo1.png?alt=media&token=67f99355-60b3-4b10-a38a-6a52dd89b107&_gl=1*11jre4b*_ga*MTE4ODU5MTEwLjE2ODc1MTg1NjQ.*_ga_CW55HF8NVT*MTY5NTg5NzM0OS4xODMuMS4xNjk1ODk3NDIzLjYwLjAuMA.."/>
            </div>
        </div >
        <div style="margin-left: 5%;font-size: 20px;">
        
        <p style="font-size: 25px;margin-bottom:20px">le récapitulatif de la commande de ${req.body.nom} avec l'id ${req.body.id} est le suivant : </p>
        <u style="margin-left: 30px;font-size: 25px;">${req.body.quantity} Colis</u>
    <p  style="margin-left: 60px;">les differents types de produit</p>
    <div>
        <p style="margin-left: 30px; font-weight:600">Details : </p>
    <div style="display: flex; justify-content:space-between;width:500px; margin-left:90px">
        <p>Dépôt/Retrait : ${req.body.depot}</p>
     
    </div>
    <p>Expéditeur : ${req.body.nom} résident à ${req.body.rue} ${req.body.postal} ${req.body.ville}</p>
 
    <p>Durée de livraison : ${req.body.jour}</p>
    </div>
    <p style="font-size: 18px;">Nous allons fait suite a votre demande assez rapidement, quand nous nous recevrons les offres de nos patenaires.</p>
    
    
    <p style="font-size: 18px;">Merci pour votre confiance,</p>
    <p style="font-size: 18px;">Des questions ? N'hesitez pas à nous contacter srschain@gmail.com</p>
    <p style="font-size: 18px;">L'équipe CHAP</p>
    
    
    
    
    
    
    </div>
          
    </body>
    </html>`,
  };

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: email,
      pass,
    },
  });

  if (req.method === "POST") {
    transporter.sendMail(message, (err, info) => {
      if (err) {
        res.status(404).json({
          error: `Connection refused at ${err}`,
        });
      } else {
        res.status(250).json({
          success: `Message delivered to ${info.accepted}`,
        });
      }
    });
    transporter.sendMail(message2, (err, info) => {
      if (err) {
        res.status(404).json({
          error: `Connection refused at ${err}`,
        });
      } else {
        res.status(250).json({
          success: `Message delivered to ${info.accepted}`,
        });
      }
    });
  }
}

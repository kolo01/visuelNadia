import nodemailer from "nodemailer";

export default function handler(req, res) {
  const email = process.env.EMAIL;
  const pass = process.env.EMAIL_PASS;
  const product = req.body.product;
 
 

 
  
  
  const client = req.body.client;
  const comande = req.body.comande;   
  


  const message = {   
    from: email, 
    to: req.body.email,
    subject: `Recapitulatif de commande`,
    text: `Recapitulatif de commande`,
    html: `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mail</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
<script>
const listeProduit = document.querySelector('.ProductContainer');
listeProduit.innerHTML = "<div >
<p  class="block  text-lg leading-tight   font-medium text-black ">Article :
tested</p>
<p  class="block  text-lg leading-tight  text-black ">Quantité: tested</p>
<p  class="block  text-lg leading-tight  text-black ">Prix: tested</p>
</div>"
</script>
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div class="md:flex">
          <!-- <div class="md:shrink-0">
            <img class="h-48 w-full object-cover md:h-full md:w-48" src="../public/airplane.jpg" alt="Modern building architecture">
          </div> -->
          <div class="p-8">
            <div class="uppercase tracking-wide text-sm p-10 text-center font-semibold">CHAP</div>
      
            <p  class="block mt-1 text-lg leading-tight p-10  font-medium text-black ">Bonjour Mr/M ${client}</p>
            <p class="mt-2 text-slate-500 p-10 ">Merci d'avoir choisi CHAP, votre commande n°${comande} a été bien enregistrée et sera pris en compte dans de brefs delai.</p>
            <p class="mt-2 text-slate-500 pb-5 pl-10 ">Le récapitulatif de votre demande est le suivant: </p>
           
            <div class="block  pl-10  ProductContainer">
               
            </div>
            <div class="block  pl-10 ">
                <p  class="block  text-lg leading-tight   font-medium text-black ">Frais de livraison : <span class="Livre"></span> </p>
                <p  class="block  text-lg leading-tight  text-black ">Total TTC : <span class="ttc"></span></p>
            </div>
            <p class="mt-2 text-slate-500 pb-5 pl-10 text-blue-600">Adresse de livraison : <span class="Addr text-black"></span> </p>
            <p class="mt-2 text-slate-500 pb-5 pl-10 text-blue-600">Mode de paiement: <span class="Paiement text-black"></span></p>
            <div class="flex pl-10">
                <p> Des questions ? Retrouver nous dans la section <a  class="text-blue-600 visited:text-purple-600" href="https://www.appchap.fr/Contactus">nous contacter</a></p>
            </div>
            <div class="flex pl-10">
                <p> Des questions ? Retrouver nous dans la section <a class="text-blue-600 visited:text-purple-600" href="https://www.facebook.com/profile.php?id=61553531447602">facebook</a></p>
            </div>
          </div>
        </div>
      </div>      
</body>
</html>
   `,
  };
  const message2 = {
    from: email,
    to: "lauria.guenaman@rschain.net",
    subject: ` ${req.body.subject}`,
    text: `${req.body.message}`,
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mail</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body>
        <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <div class="md:flex">
              <!-- <div class="md:shrink-0">
                <img class="h-48 w-full object-cover md:h-full md:w-48" src="../public/airplane.jpg" alt="Modern building architecture">
              </div> -->
              <div class="p-8">
                <div class="uppercase tracking-wide text-sm p-10 text-center font-semibold">CHAP</div>
          
                <p  class="block mt-1 text-lg leading-tight p-10  font-medium text-black ">Bonjour Mr/M ${client}</p>
                <p class="mt-2 text-slate-500 p-10 ">Merci d'avoir choisi CHAP, votre commande n°${comande} a été bien enregistrée et sera pris en compte dans de brefs delai.</p>
                <p class="mt-2 text-slate-500 pb-5 pl-10 ">Le récapitulatif de votre demande est le suivant: </p>
               
                <div class="block  pl-10  ProductContainer">
                   
                </div>
                <div class="block  pl-10 ">
                    <p  class="block  text-lg leading-tight   font-medium text-black ">Frais de livraison : <span class="Livre"></span> </p>
                    <p  class="block  text-lg leading-tight  text-black ">Total TTC : <span class="ttc"></span></p>
                </div>
                <p class="mt-2 text-slate-500 pb-5 pl-10 text-blue-600">Adresse de livraison : <span class="Addr text-black"></span> </p>
                <p class="mt-2 text-slate-500 pb-5 pl-10 text-blue-600">Mode de paiement: <span class="Paiement text-black"></span></p>
                <div class="flex pl-10">
                    <p> Des questions ? Retrouver nous dans la section <a  class="text-blue-600 visited:text-purple-600" href="https://www.appchap.fr/Contactus">nous contacter</a></p>
                </div>
                <div class="flex pl-10">
                    <p> Des questions ? Retrouver nous dans la section <a class="text-blue-600 visited:text-purple-600" href="https://www.facebook.com/profile.php?id=61553531447602">facebook</a></p>
                </div>
              </div>
            </div>
          </div>      
    </body>
    </html>
   `,
  };
  // console.log(req.body.subject, req.body.message);

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
          success2: `Message delivered to ${info.accepted}`,
        });
      }
    });
  }
}

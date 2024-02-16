import nodemailer from "nodemailer";

export default function handler(req, res) {
  const email = process.env.EMAIL;
  const pass = process.env.EMAIL_PASS;

  const message2 = {
    from: email,
    to:`${req.body.email}`,
    subject: "Bienvenue sur CHAP",
    text: `${req.body.message}`,
    html: `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bienvenue sur CHAP</title>
    
    </head>
    <body>
        <div >
            <div >
                <img  style="margin-left: 40%;" width="200px" height="100px"  src="https://firebasestorage.googleapis.com/v0/b/appchapfinal.appspot.com/o/logo1.png?alt=media&token=67f99355-60b3-4b10-a38a-6a52dd89b107&_gl=1*11jre4b*_ga*MTE4ODU5MTEwLjE2ODc1MTg1NjQ.*_ga_CW55HF8NVT*MTY5NTg5NzM0OS4xODMuMS4xNjk1ODk3NDIzLjYwLjAuMA.."/>
            </div>
        </div >
        <div style="margin-left: 5%;font-size: 20px;">
        <p style="font-size: 25px;margin-bottom:20px">Bienvenue sur CHAP!</p>
        <p style="margin-bottom:20px">Bonjour ${req.body.email}</p>
        <p>Nous vous remercions de nous rejoindre. CHAP vous permet de retrouver facilement les commerces africains le plus proches de vous et commercer avec l'Afrique. 
    
    
            Nous centralisons les services proposés par nos différents partenaires :</p>
    <p  style="margin-left: 30px;">-- Envoie de colis depuis et vers l'Afrique</p>
    <p style="margin-left: 30px;">-- Vente et Achat d'articles et de produits d'origine Africaine</p>
    <p style="margin-left: 30px;">--Service de livraison de plats et de courses depuis votre commerce préféré</p>
    <p style="margin-left: 30px;margin-bottom:20px">-- Réservation auprès de votre commerce préféré</p>
    
    
    
    
    
    
    
    
    
    
    
    <p style="font-size: 18px;">Merci pour votre confiance,</p>
    
    <p style="font-size: 18px;">L'équipe CHAP</p>
    
    
    
    
    
    <p style="text-align: center;
    font-size: 15px;
    font-weight: lighter;">Ceci est un envoie automatique, nous vous prions de ne pas répondre a ce mail. </p>
    
    <p style="text-align: center;
    font-size: 15px;
    font-weight: lighter;">Le contenu de ce message est établi à l'intention exclusive de son destinataire. Si vous recevez ce message par erreur, merci de le détruire</p>
    
    
    
    
    
    <p style="text-align: center;">CHAP - votre commerce africain en 1 clic</p>
    
    
    <p style="text-align: center;">14 avenue de bourgogne, 91300, Massy</p>
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

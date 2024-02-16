import nodemailer from "nodemailer";

export default function handler(req, res) {
  const email = process.env.EMAIL;
  const pass = process.env.EMAIL_PASS;
  const client = req.body.client;
  const partenaire = req.body.partner;
  const note = req.body.note;
  const date = req.body.date;
  const Restaurant = req.body.Restaurant
  const couverts = req.body.couverts
  const horaire = req.body.horaire
  const message2 = {
    from: email,
    to: `${req.body.email}`,
    subject: "Reservation sur chap",
    text: "Reservation sur chap",
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
    <div class="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div class="md:flex">
          <!-- <div class="md:shrink-0">
            <img class="h-48 w-full object-cover md:h-full md:w-48" src="../public/airplane.jpg" alt="Modern building architecture">
          </div> -->
          <div class="p-8">
            <div class="uppercase tracking-wide text-sm p-10 text-center font-semibold">CHAP</div>
            <p  class="block mt-1 text-lg leading-tight p-10  font-medium text-black ">Bienvenue sur CHAP</p>
            <p  class="block mt-1 text-lg leading-tight p-10  font-medium text-black ">Bonjour <b class="uppercase">${client}</b></p>
            <p class="mt-2 text-slate-500 p-10 ">Nous confirmons par ce mail votre demande de réservation auprès de notre partenaire <b>${partenaire}</b>.</p>
            <p class="mt-2 text-slate-500 pb-5 pl-10 ">Le récapitulatif de votre demande est le suivant: </p>
            <div class="flex  pl-10 ">
                <p  class="block  text-lg leading-tight   font-medium text-black ">Date : ${date}</p>
                
            </div>
            <div class="flex pl-10 ">
                <p  class="block  text-lg leading-tight   font-medium text-black ">Restaurant : ${Restaurant}</p>
              
            </div>
            <div class="flex  pl-10   ">
                <p  class="block  text-lg leading-tight   font-medium text-black ">Nombre de couverts : ${couverts}</p>
             
            </div>
            <div class="flex  pl-10  ">
                <p  class="block  text-lg leading-tight pl-10  font-medium text-black ">Créneau horaire : ${horaire}</p>
               
            </div>
            <div class="flex  pl-10 ">
                <p  class="block  text-lg leading-tight   font-medium text-black ">Note : ${note}</p>
                
            </div>
            <p class="mt-2 text-slate-500 pb-5 pl-10 ">Un mail de validation vous sera renvoyé dès la validation de votre réservation par notre partenaire </p>
            <p class="mt-2 text-slate-500 pb-5 pl-10 ">Vous pouvez consulté l'état de votre réservation depuis votre <b>compte</b> dans la section "<b> Mes Reservations</b>"</p>
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

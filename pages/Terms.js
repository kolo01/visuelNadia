import InputBar from "@/components/InputBar";
import Navbar from "@/components/Navbar";
import { Box, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import Head from "next/head";
export default function Terms() {
  const a = "« Conditions Générales »";
  const b = "« Services »";
  const c = "« Applications »";
  const d = "« Commande »";
  const e = "« Articles »";
  const f = "« Partenaires »";
  const g = '("Services de livraison")';
  const h = '("Programme de Dons")';
  const i = "« Plateforme et Fonctionnalités »";
  const j = "« Contributions »";
  const k = "« Conditions de la Plateforme »";

  const a1 = "d'un";
  const a2 = "l'identité d’un tiers ou d’une";
  const a3 =
    "l'impression que nous sommes auteur des Contributions, si tel n'est";
  const a4 = "S’il s’avère";
  const a5 = "n’a";
  const a6 =
    "n'excluons ,ni ne limitons pas notre responsabilité envers vous en cas de perte ou de dommage lorsqu'il";
  const a7 = "« en l'état »";
  const a8 = "d'utiliser";
  const a9 = "qu'avant";
  const a10 = " n'affecteront";
  const a11 = "s'y";
  const a12 = "l'accès à certaines parties ou à l'ensemble";
  const a13 = "« App Chap. »";
  const a14 = "l'intermédiaire d'une";
  const a15 = "s'appliquera à votre utilisation de l’Application";
  const a16 = "l'App";
  const a17 = " n'êtes";
  const a18 = "l'accès";
  const a19 = "l'autorisation du payeur de la facture pour l'utilisation";
  const a20 = "d'autres";
  const a21 = "l’objectif de l’application.";
  const a22 = "d’accepter";
  const a23 = '"Notre responsabilité envers vous"';
  const a24 = "puisqu’elle";
  const a25 = "n'acceptez";
  const b1 = "s'appliqueront";
  const b2 = "d'au";
  const b3 = "l'un";
  const b4 = "d'utilisation";
  const b5 = "n'êtes pas d'accord";
  const b6 = "l'accès";
  const b7 = "d'achat";
  const b8 = "jusqu'au";
  const b9 = "l'intermédiaire";
  const b10 = "n'est";
  const b11 = "d'ouverture";
  const b12 = "d'ouverture";
  const b13 = "d'un Partenaire qui n'est";
  const b14 = "d'ouverture";
  const b15 = "d'autres";
  const b16 = "d'autres";
  const b17 = "l'intermédiaire";
  const b18 =
    "qu'ils ne contiennent pas d'allergènes. Il est de votre responsabilité d'avertir";
  const b19 = "d'âge";
  const b20 = "l'alcool";
  const b21 = "qu'à";
  const b22 = "n'êtes";
  const b23 = "d'un";
  const b24 = "l'offre";
  const b25 = "n'indiquent";

  const c1 = "d'accepter";
  const c2 = "s'il";
  const c3 = "l'adresse de livraison dès lors qu'un";
  const c4 = "s'assurer";
  const c5 = "s'il";
  const c6 = "d'annulation";
  const c7 = "l'exclusion";
  const c8 = "n'affecte";
  const c9 = "d'annulation";
  const c10 = "qu'une";
  const c11 = "n'affecteront";
  const c12 = "d'utilisation s'appliqueront";
  const c13 = "d'argent ou d'Articles";
  const c14 = "s'appliquer";
  const c15 = "d'une";
  const c16 = "n'avons";
  const c17 = " d'auteur";
  const c18 = "l'ingénierie";
  const c19 = "d'élaborer";
  const d1 = "l'aide";
  const d2 = "l'intégralité de l'accord";
  const d3 = "l'autre";
  const d4 = "l'objet d'un";
  const d5 = "l'objet d'une";
  const d6 = "d'examen";
  const d7 = "n'entre";
  const d8 = "d'avoir";
  const d9 = "d'un"
  const d10 = "qu'un"
  const d11 = "l'adresse"
  const d13 = '("Marque Chap.")'
  const [isLagerThan768] = useMediaQuery("(min-width: 768px)");
  return (
    <>
    <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-RFSVQTGJ87"
        ></script>
        <script strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments)}
           gtag('js', new Date()); 
           gtag('config', 'G-RFSVQTGJ87');
           `}
          
        </script>
        </Head>
     <InputBar />
        {isLagerThan768 ? <Navbar></Navbar> : <></>}
        <Box mx={10}  textAlign={'justify'} textIndent={20}>
      <Heading fontWeight={"bold"} textAlign={'center'}>TERMES CONDITIONS GENERALES CHAP</Heading>
      <Text as={"h2"} fontWeight={"bold"}>
        1- A Propos :
      </Text>
      Expliquer en quelques lignes, {a21}  Les présentes pages et les documents
      auxquels elles font référence (ensemble, ci-après les 
      <Text as={"h2"} fontWeight={"bold"}>
        {a}
      </Text>
      ) sont destinées à vous informer sur nous, nos services (les{" "}
      <Text as={"h2"} fontWeight={"bold"}>
        {b}
      </Text>
      ) comprenant nos services de livraison et à emporter, ainsi que sur nos et
      vos responsabilités lorsque vous accédez et utilisez notre site ou nos
      applications mobiles (ci-après les{" "}
      <Text as={"h2"} fontWeight={"bold"}>
        {c}
      </Text>
      ), ou lorsque vous effectuez une commande (ci-après la{" "}
      <Text as={"h2"} fontWeight={"bold"}>
        {d}
      </Text>
      ) de tout article disponible via nos Applications (ci-après{" "}
      <Text as={"h2"} fontWeight={"bold"}>
        {e}
      </Text>
      ).   Si vous utilisez nos Applications, y compris pour passer des
      Commandes, il vous sera demandé {a22} les présentes Conditions Générales,
      alors assurez-vous de les lire attentivement. Vous devez accorder une
      attention particulière à la section intitulée {a23}, {a24} exclut ou
      limite notre responsabilité juridique par rapport à votre utilisation de
      nos Applications. Si vous {a25} pas ces Conditions Générales, vous ne
      devriez pas utiliser nos Applications.      Si vous ne trouvez pas la
      réponse que vous cherchez dans ces Conditions Générales, ou si vous avez
      des questions à leur sujet, veuillez utiliser la messagerie instantanée de
      nos applications mobiles, et nous ferons de notre mieux pour vous aider. 
      Nous mettons à jour ces Conditions Générales au fil du temps. Nous vous
      tiendrons informé de toute modification. Les Conditions Générales les plus
      récentes {b1} à chaque nouvelle Commande. Après acceptation des Conditions
      Générales, les nouvelles Conditions Générales en vigueur vous seront
      adressées par courriel ou seront mises à disposition au téléchargement sur
      un support durable.   Nous savons que ces Conditions Générales sont assez
      longues à lire, mais il est de notre responsabilité de les porter à votre
      connaissance, et de votre responsabilité de les lire et de les accepter
      !      
      <Text as={"h2"} fontWeight={"bold"}>
        2. Votre compte 
      </Text>
      <Text as={"h2"} fontWeight={"bold"}>
        a. Création {d9} compte 
      </Text>
      Vous allez devoir créer un compte chez nous avant de pouvoir passer une
      Commande. Afin de créer un compte, vous devez remplir les conditions
      minimales suivantes :   • Être âgé(e) {b2} moins 18 ans ;  • Avoir une
      carte de crédit en cours de validité que vous êtes autorisé(e) à utiliser
      et que nous acceptons, ou un compte permettant l’utilisation de {b3} des
      services de paiement à un tiers que nous utilisons (voir la section 6b
      ci-dessous pour plus de détails) ; et  • Ne pas avoir déjà eu un compte{" "}
      <Text as={"h2"} fontWeight={"bold"}>
        CHAP{" "}
      </Text>
      désactivé pour une quelconque violation de la loi ou de nos conditions{" "}
      {b4} ou de nos politiques.   Lors de la création du compte, il vous sera
      demandé de créer un mot de passe ou une autre méthode de connexion
      sécurisée. Vous serez responsable de la régularisation de vos Commandes et
      toute autre activité sur votre compte. Par conséquent, assurez-vous de
      garder votre mot de passe ou autre méthode de connexion sécurisée secret
      et ne laissez pas un tiers utiliser votre compte. Si vous avez des
      incertitudes sur vos données de connexion ou en cas de perte, vol ou
      usurpation, vous avez obligation de nous en informer immédiatement .     
      <Text as={"h2"} fontWeight={"bold"}>
        b. Suspension du compte / fermeture de votre compte 
      </Text>
      Vous pouvez résilier votre compte à tout moment. Il vous suffit de suivre
      les instructions pour désactiver votre compte dans l’onglet « Votre
      compte » de notre site.   Nous pouvons suspendre ou fermer définitivement
      votre compte à tout moment avec un préavis approprié aux circonstances de
      chaque cas :  • En cas d’agression verbale ou physique contre notre
      personnel ou les livreurs   • En cas d’usage abusif de nos services ou en
      cas de non-respect de nos conditions générales .Si vous {b5} avec notre
      décision de fermer ou de suspendre {b6} à votre compte, vous pouvez nous
      contacter et nous pourrons alors décider de revoir la décision. 
      <Text as={"h2"} fontWeight={"bold"}>
        3. Commander sur CHAP 
      </Text>
      <Text as={"h2"} fontWeight={"bold"}>
        a. Commander 
      </Text>
      Nous agissons en tant que mandataire pour les restaurants, supermarchés et
      autres entreprises avec lesquelles nous sommes en partenariat (ci-après
      <Text as={"h2"} fontWeight={"bold"}>
        {" "}
        {f}
      </Text>
      ). En termes simples, cela signifie que nos Partenaires sont vos
      co-contractants et ils sont seuls responsables de l’exécution de votre
      Commande ; nous fournissons simplement la plate-forme qui permet à votre
      Commande de parvenir à notre Partenaire et c’est en leur nom et pour leur
      compte que nous acceptons votre paiement. Parfois, il est possible que
      notre Partenaire fasse partie du groupe de sociétés Chap.  Les Commandes
      sont passées via notre Application en cliquant sur le bouton de commande à
      la fin du processus de paiement. Chaque Commande que vous passez constitue
      une offre {b7} des produits qui y sont indiqués. Les présentes Conditions
      Générales, ainsi que toutes les conditions concernant une offre
      promotionnelle ou spéciale s’appliquent à la Commande. Vous aurez la
      possibilité de vérifier et de corriger toute erreur de saisie dans votre
      Commande sur notre Application {b8} moment où vous cliquez sur le bouton
      de commande à la fin du processus de paiement et transmettez ainsi votre
      Commande à notre Partenaire. Il vous incombe de vous assurer que votre
      Commande est complète et exacte avant de la passer. Une fois que vous
      aurez cliqué pour commander, vous devrez payer les Articles commandés si
      la Commande est acceptée.   Lorsque vous passez Commande par {b9} de nos
      Applications, cela ne signifie pas que votre Commande a été acceptée. Nous
      vous prévenons si votre Commande a été ou non acceptée par le Partenaire.
      Vous avez la possibilité d’annuler votre Commande à tout moment par le
      biais de notre Application avant acceptation de cette dernière par le
      Partenaire. En cas d’acceptation de la Commande par le Partenaire, vous et
      le Partenaire êtes engagés contractuellement par votre Commande. Votre
      Commande peut ne pas être acceptée si un Article {b10} pas disponible.  
      Un montant de commande minimum qui vous sera indiqué avant que vous
      passiez votre Commande peut être appliqué et peut varier selon les
      Partenaires. Chaque Partenaire pourrait avoir un secteur géographique
      spécifique dans lequel il accepte des Commandes et il choisit également
      ses propres heures {b11}. Cela signifie que les Partenaires que vous
      pouvez voir à un instant donné dépendent de votre localisation et de leurs
      heures {b12}. Les options vous seront présentées sur la page du Partenaire
      concerné, et nous vous informerons si vous essayez de commander auprès{" "}
      {b13} pas disponible pour vous.   Les informations précises sur les
      allergènes, les régimes alimentaires et sur la sécurité générale des
      produits nous sont fournis par nos Partenaires. Chaque Partenaire est
      responsable des menus, de toutes les informations nutritionnelles,
      informations relatives aux allergènes à la qualité ou à la nature des
      aliments, aux prix et aux heures {b14}, ainsi que des photographies. Nous
      prenons toutes les précautions raisonnables afin de nous assurer que tous
      les détails, descriptions et prix des produits fournis par nos Partenaires
      sont corrects.  
      <Text as={"h2"} fontWeight={"bold"}>
        b. Allergies 
      </Text>
      Les Partenaires peuvent utiliser des noix ou {b15} allergènes dans la
      préparation de certains menus. De nombreux Partenaires affichent désormais
      les plats en fonction des informations sur les allergènes, mais s’il vous
      manque des informations qui ne sont pas disponibles par {b17} de notre
      Applications, ou si vous avez {b16} questions, vous devez contacter
      directement le Partenaire. Nous ne sommes pas responsables de la
      préparation des produits proposés par nos Partenaires et nous ne pouvons
      pas garantir {b18} nos Partenaires de toute allergie ou intolérance
      alimentaire que vous pourriez avoir.  
      <Text as={"h2"} fontWeight={"bold"}>
        c. Produits soumis à des limitations {b19} et alcool  
      </Text>
      Vous connaissez la loi : les produits dont la vente et la livraison sont
      interdits au moins de 18 ans (y compris {b20}) ne peuvent être vendus et
      livrés {b21} des personnes âgées de 18 ans ou plus, et vous {b22} autorisé
      à commander ces produits, par notre Application, que si vous avez plus de
      18 ans. En passant Commande {b23} produit dont la vente est interdite aux
      mineurs, vous confirmez que vous avez au moins 18 ans.        
      <Text as={"h2"} fontWeight={"bold"}>
        d. Offres spéciales 
      </Text>
      Les Partenaires proposent à certains moments des offres et des promotions
      spéciales par {b17} de nos Applications. Celles-ci sont visibles lorsque
      vous consultez la page internet {a1}Partenaire sur notre Application. Ces
      offres et promotions sont à la discrétion du Partenaire. À moins que les
      conditions de {b24} ou de la promotion {b25} une période fixe ou minimale
      au cours de laquelle l’offre ou la promotion sera disponible, elle peut
      être retirée par le Partenaire à tout moment, avant que vous n’effectuiez
      une Commande basée sur{b24} {b24} ou la promotion et que nous vous ayons
      notifié l’acceptation de votre Commande par le Partenaire. 
      <Text as={"h2"} fontWeight={"bold"}>
        4. Livraison et collecte 
      </Text>
      <Text as={"h2"} fontWeight={"bold"}>
        a. Livraison  
      </Text>
      Si vous avez demandé la livraison de votre Commande, nous ou notre
      Partenaire (selon le Partenaire que vous avez choisi) organiserons la
      livraison par des coursiers partenaires indépendants{" "}
      <Text as={"h2"} fontWeight={"bold"}>
        {g}
      </Text>
      . Les Services de livraison peuvent être fournis par des coursiers
      partenaires indépendants de{" "}
      <Text as={"h2"} fontWeight={"bold"}>
        CHAP
      </Text>{" "}
      ou des coursiers mis à disposition par le Partenaire et vous en serez
      informé. Une estimation du délai de livraison de vos Articles vous sera
      communiquée avant que vous ne passiez la Commande. Il s’agit d’une
      estimation faite en temps réel en fonction des délais de livraison
      constatés au moment où la Commande est placée. Les Partenaires qui
      fournissent eux-mêmes les Services de livraison sont responsables de
      fournir une estimation du délai de livraison. Nous nous efforçons de
      livrer le plus rapidement possible de sorte que vous devez donc vous
      assurer que vous êtes bien en mesure {c1} la livraison à partir du moment
      où vous passez la Commande afin de ne pas manquer l’arrivée du livreur.
      Veuillez rester attentif à l’appel téléphonique du livreur ou à la
      sonnerie à la porte de votre lieu de livraison car vous serez quand-même
      facturé {c2} ne peut pas livrer vos Articles. Si l’arrivée du livreur ne
      peut être prouvée autrement, l’heure de son premier appel ou message sera
      considérée comme son arrivée. Si vous n’êtes pas d’accord avec notre
      décision, vous pouvez nous contacter et nous pouvons décider de revenir
      sur notre position.   Veuillez prendre soin de saisir correctement vos
      coordonnées car nous ne pourrons pas modifier la Commande ou {c3}{" "}
      Partenaire aura commencé à préparer votre Commande. Vous recevez des
      notifications via l’Application vous informant des différentes étapes de
      la livraison.    Nous et nos Partenaires faisons tout ce qui est
      raisonnablement possible pour que votre Commande vous soit livrée
      conformément à l’heure de livraison estimée.  
      <Text as={"h2"} fontWeight={"bold"}>
        b. Vous allez chercher votre Commande 
      </Text>
      Si vous choisissez une option de collecte, telle que le service à
      emporter, notre Partenaire est responsable de {c4} que vous recevez les
      Articles que vous avez commandés. La confirmation de Commande que nous
      vous enverrons indiquera l’heure à laquelle vos Articles devraient être
      prêts selon les informations que nous communiquent nos Partenaires et le
      délai pendant lequel les Articles sont mis à votre disposition pour
      retrait auprès des Partenaires.   • Commandes à emporter : Si vous ne
      retirez pas vos Articles dans les délais impartis, les Partenaires peuvent
      disposer de vos Articles et vous serez tout de même facturé pour ces
      Articles et tous les autres frais indiqués au moment de votre Commande.  
      Dans la mesure où vous serez sur-place, si votre Commande est retardée, ou{" "}
      {c5} y a un problème avec les Articles qui vous ont été remis, vous
      pourrez faire part de vos réclamations directement au Partenaire. 
      <Text as={"h2"} fontWeight={"bold"}>
        5. Annulation de Commande  
      </Text>
      <Text as={"h2"} fontWeight={"bold"}>
        a. Absence de droit de rétractation 
      </Text>
      Dans la mesure où certains articles sont susceptibles de se détériorer ou
      de se périmer rapidement, ils ne peuvent bénéficier du droit de
      rétractation, conformément aux dispositions de l’article L.121-21-8 4° du
      Code de la consommation.   Si vous achetez un Article non périssable
      auprès d’un de nos Partenaires, celui-ci vous fournira toutes les
      informations vous permettant d’exercer votre droit de rétractation de la
      Commande dans le délai de quatorze (14) jours suivant la date de votre
      Commande.  
      <Text as={"h2"} fontWeight={"bold"}>
        b. Possibilité {c6} de votre Commande par vos soins  
      </Text>
      Vous pouvez annuler une Commande à tout moment, avant {d10} Partenaire ait
      commencé à la préparer (tel que cela vous est indiqué dans l’application),
      via  notre Application. Dans ce cas, nous vous rembourserons votre
      paiement (à {c7} de toute réduction ou Bon d’achat qui a été appliqué à la
      Commande - voir nos Conditions Générales des Bons et Crédits sur Compte
      pour plus de détails).      Cela {c8} pas vos droits dans l’hypothèse où
      un Article serait défectueux.    
      <Text as={"h2"} fontWeight={"bold"}>
        c. Possibilité {c9} d’une Commande par nos soins 
      </Text>
      Nous faisons de notre mieux pour que toutes les Commandes soient
      disponibles pour la vente à emporter ou livrées, mais il peut arriver que
      nous ou nos Partenaires devions annuler votre Commande. Nous et nos
      Partenaires pouvons vous informer {c10} Commande a été annulée à tout
      moment. Aucune Commande annulée par nos soins ou par un Partenaire ne vous
      sera facturée et nous vous rembourserons tout paiement déjà effectué en
      utilisant le même moyen de paiement que celui que vous avez utilisé pour
      régler votre Commande. Nous ou nos Partenaires annulons les Commandes dès
      que nous avons connaissance du fait qu’elle ne pourra pas être exécutée
      afin de réduire au maximum le dommage que pourrait vous causer cette
      annulation. Vous conservez le droit de contester cette annulation. 
      <Text as={"h2"} fontWeight={"bold"}>
        6. Prix et paiement 
      </Text>
      <Text as={"h2"} fontWeight={"bold"}>
        a. Prix 
      </Text>
      Nous utilisons parfois la tarification dynamique, ce qui signifie que les
      prix des Articles et de la livraison peuvent évoluer au cours de votre
      navigation sur notre application. Les prix peuvent également changer à
      tout moment à la discrétion de nos Partenaires. Les changements de prix{" "}
      {c11} pas les Articles dans votre panier (veuillez toutefois noter que
      votre panier se videra automatiquement si vous ne finalisez pas la
      Commande dans le délai que nous vous accordons).    
      <Text as={"h2"} fontWeight={"bold"}>
        b. Conditions de paiement  
      </Text>
         Les prix indiqués sur nos Applications incluent la TVA.      Outre le
      coût de vos Articles et les frais de service facturés par les Partenaires,
      nous facturons des frais de service pour l’utilisation de nos services sur
      notre application et nous pouvons facturer des frais de livraison. Le
      montant de ces frais peut varier dans le temps, mais vous serez toujours
      informé du montant de ces frais sur les pages des Applications relatives
      au paiement avant que vous ne passiez Commande.      Le paiement de toutes
      les Commandes peut être effectué par {b17} de nos Applications par carte
      de crédit ou de débit, ou par tout autre moyen de paiement que nous
      mettons à disposition, y compris des cartes Titres-restaurant, des bons ou
      des crédits sur votre compte (veuillez-vous référer aux Conditions
      Générales des Bons et Crédits sur Compte). Si vous choisissez de payer par
      carte bancaire, dès lors que votre Commande sera confirmée votre compte
      lié à la carte bancaire concernée sera débité du montant de la Commande.
      Nous utilisons également des prestataires de paiement, notamment (PayPal
      ). Ces services sont fournis par des tiers, et si vous choisissez de payer
      par {b3} de ces moyens, votre paiement sera traité par le prestataire de
      services concerné et leurs conditions {c12}. Nous mettrons à votre
      disposition les conditions des prestataires de services de paiement au
      moment où vous passerez votre Commande.     Le paiement est effectué
      directement à{" "}
      <Text as={"h2"} fontWeight={"bold"}>
        Chap
      </Text>
      . Agissant uniquement en tant que mandataire pour le compte du Partenaire.
      Nous sommes autorisés par nos Partenaires à accepter le paiement en leur
      nom. Le paiement du prix de tout Article et des frais de livraison sur nos
      Applications remplira votre obligation de payer le prix de la Commande au
      Partenaire.     
      <Text as={"h2"} fontWeight={"bold"}>
        c. Pourboire 
      </Text>
      Vous aurez la possibilité de donner un pourboire au livreur et/ou au
      Partenaire à certaines occasions, par exemple, lors de la Commande et lors
      de la livraison. Nous pouvons être amenés à partager votre prénom avec le
      livreur ou le Partenaire (selon le cas) lorsque nous leur communiquons le
      pourboire. Le livreur ou le Partenaire reçoit 100 % du pourboire que vous
      choisissez de donner et nous intervenons uniquement comme leur mandataire
      pour encaisser le pourboire que nous leur reversons ensuite intégralement.
      Il en résulte que, nous considérons que le pourboire émane directement de
      vous. Compte tenu du fait que le pourboire est versé après que vous ayez
      reçu votre Commande, il {b10} pas remboursable et ne fait pas partie de
      votre Commande. Il peut apparaître sur votre relevé bancaire/carte de
      crédit comme un paiement séparé.  
      <Text as={"h2"} fontWeight={"bold"}>
        d. Dons  
      </Text>
      Nous pouvons mettre en place des programmes vous permettant de faire des
      dons {c13} à une personne ou une organisation spécifique, ou pour une
      cause particulière
      <Text as={"h2"} fontWeight={"bold"}>
        {" "}
        {h}
      </Text>
      . Si des Programmes de Dons sont disponibles, ils vous seront présentés au
      moment où vous utiliserez notre applications, visiterez notre site ou
      passerez Commande. Des conditions générales spécifiques peuvent {c14} à
      certains Programmes de Dons. Ces conditions générales vous seront
      présentées au moment où vous choisirez de faire un don.   
      <Text as={"h2"} fontWeight={"bold"}>
        Utilisation de la marque Chap. 
      </Text>
      Vous ne pouvez utiliser aucun(e) signe distinctif, marque, logo,
      dénomination, ou nom commercial de Chap. {d13} sans notre
      accord écrit préalable. Nous pouvons retirer ce consentement à tout moment
      en vous en informant.  Politique de confidentialité  La politique de
      confidentialité et protection des données de Chap, disponible à l’adresse
      (infos@chap.com), détaille les traitements de données personnelles que
      nous mettons en œuvre. 
      <Text as={"h2"} fontWeight={"bold"}>
        7. Vos responsabilités et contributions 
      </Text>
      Nous traitons les utilisateurs de nos Applications avec respect et
      demandons à nos salariés, aux livreurs et aux Partenaires d’en faire de
      même. Lorsque vous utilisez notre application, nous attendons de votre
      part que vous agissiez honnêtement et que vous traitiez également notre
      personnel, les livreurs, les Partenaires et leur personnel avec respect. 
      <Text as={"h2"} fontWeight={"bold"}>
        a. Ce que vous ne pouvez pas faire 
      </Text>
      Vous ne pouvez pas utiliser nos Services {c15} manière illégale,
      frauduleuse ou abusive, ou qui violerait les présentes Conditions
      Générales.   Vous ne pouvez pas utiliser nos Services {c15} manière
      sortant de l’utilisation normale des Applications, que nous {c16} pas
      acceptée dans le cadre de ces Conditions Générales. En particulier, vous
      ne pouvez pas exploiter ou commercialiser nos Services, les distribuer ou
      les proposer à la vente ou à la revente, ni les utiliser dans le cadre{" "}
      {c15} activité concurrente à la nôtre.   Le site internet et tous les
      matériaux, contenus, caractéristiques et fonctionnalités de nos
      Applications (ci-après{" "}
      <Text as={"h2"} fontWeight={"bold"}>
        {i} 
      </Text>
      ) appartiennent à Chap, à nos Partenaires et aux tiers nous ayant concédé
      des licences. Tous les droits sont réservés. Notre plateforme et
      fonctionnalités sont protégées par des droits{c17}, droits des marques et
      autres droits de propriété intellectuelle. Vous pouvez stocker, imprimer
      et afficher le contenu de notre application pour votre usage personnel
      dans le cadre de leur utilisation, mais vous ne pouvez pas utiliser notre
      Plateforme et Fonctionnalités à des fins commerciales sans notre accord
      écrit préalable. Sauf autorisation expresse, notre Plateforme et
      Fonctionnalités ne peuvent être copiées, distribuées, republiées,
      téléchargées, affichées ou transmises d’une quelconque manière que ce
      soit, sans notre consentement écrit préalable. Vous ne pouvez pas procéder
      à de {c18} inversée, désassembler ou essayer de toute autre manière {c19}{" "}
      ou de reconstruire le code source ou les idées, algorithmes ou techniques
      sous-jacents à notre Plateforme et Fonctionnalités.   Vous ne pouvez
      procéder à aucune forme de récupération de données sur notre Plateforme et
      Fonctionnalités en extrayant des données ou du contenu à {d1} de systèmes
      automatisés ou de logiciels.  Vous acceptez également de ne pas accéder à
      notre application sans autorisation, de ne pas interférer avec elles, de
      ne pas endommager ou perturber une partie de celle-ci ou tout réseau ou
      équipement utilisé pour leur fourniture. Cela inclut de ne pas introduire
      de virus, chevaux de Troie, vers, bombes programmées ou tout autre
      matériel malveillant ou technologiquement nuisible à notre application.  
      <Text as={"h2"} fontWeight={"bold"}>
        b. Vos contributions  
      </Text>
      Tout commentaire ou matériel (y compris les critiques) que vous
      téléchargez sur nos Applications ou les données que nous recueillons
      auprès de vous (y compris par tout service interactif que nous mettons à
      disposition) (ci-après les{" "}
      <Text as={"h2"} fontWeight={"bold"}>
        {j}
      </Text>
      ) seront considérés comme des éléments non confidentiels et non
      patrimoniaux, et vous reconnaissez et acceptez que notre droit de les
      utiliser, copier, distribuer, vendre et divulguer à des tiers, pour toute
      fin liée à notre activité. Dans le cas où les Contributions seraient
      protégées par un droit d’auteur, en acceptant les présentes Conditions
      Générales vous octroyer, gratuitement, à Chap pour le monde entier et pour
      une durée de 8 ans, une licence d’exploitation portant sur les
      Contributions, au fur et à mesure de la création des Contributions. La
      présente licence est consentie pour toute finalité, notamment toute
      finalité commerciale, promotionnelle, marketing, et inclut notamment : 
      (a) le droit de reproduction et, en particulier, le droit de reproduire ou
      faire reproduire tout ou partie des Contributions ;  (b) le droit de
      représentation et, en particulier, le droit de communiquer ou de faire
      communiquer au public tout ou partie des Contributions ;  (c) le droit de
      modifier et d’adapter tout ou partie des Contributions ;  (d) le droit
      d’utiliser et d’exploiter tout ou partie des Contributions ou toute
      adaptation des Contributions aux fins des activités de la Société ou au
      profit des tiers de son choix, à quelque titre que ce soit ;  (e) le droit
      de céder ou concéder sous licence tout ou partie des droits cédés aux
      termes des présentes, à toute personne, société ou entité de notre choix,
      à titre gratuit ou onéreux ;  Chaque droit précité étant cédé
      respectivement pour tout support, sous tout format, dans toute langue
      (langage informatique ou autre), par tout procédé connu ou inconnu à ce
      jour, et à toutes fins.      Nous voulons que notre application soit un
      espace sûr pour tous nos utilisateurs. Toute Contribution que vous
      fournissez doit être exacte et honnête, et doit être conforme aux
      présentes Conditions Générales. Vous ne devez pas introduire une
      Contribution contenant :   • Violant toute loi ou réglementation ;   •
      Contenant tout élément diffamatoire, obscène, offensant, haineux,
      discriminatoire ou provocateur, ou qui met en avant des éléments à
      caractère sexuel explicite ou de la violence ;  • Enfreignant les droits
      de propriété intellectuelle ou autres droits de toute personne   • Violant
      une obligation de confidentialité qui vous incomberait à l’égard de tiers,
      ou les termes {a1} contrat que vous auriez conclu avec un tiers ;  •
      Constitutive de menace, abus ou atteinte à la vie privée de quiconque ;  
      • Résultant de l’usurpation de {a2} présentation erronée de votre identité
      ou de vos rapports avec un tiers ;  • Donnant {a3} pas le cas.   Vous vous
      engagez à disposer du consentement de tout tiers ayant un droit quelconque
      sur une partie des Contributions pour partager lesdites Contributions de
      la manière dont vous le faites. {a4} que vous faites des Contributions qui
      ne sont pas conformes à ces exigences, nous pouvons immédiatement les
      retirer (de manière temporaire ou permanente). 
      <Text as={"h2"} fontWeight={"bold"}>
        8. Notre responsabilité envers vous 
      </Text>
      <Text as={"h2"} fontWeight={"bold"}>
        a. Protection des données 
      </Text>
      Nous traitons vos données personnelles conformément à notre politique de
      confidentialité que vous pouvez consulter ici.    
      <Text as={"h2"} fontWeight={"bold"}>
        b. Vos droits 
      </Text>
      En tant que consommateur, vous avez certains droits en vertu de la loi et
      aucune stipulation des présentes Conditions Générales ne peut, ou {a5}{" "}
      pour but, de limiter ou supprimer ces droits. Nous {a6} serait illégal
      d’agir de la sorte, y compris pour des biens défectueux ou mal décrits. 
         Nous avons apporté le plus grand soin à la fourniture de nos services.
      Toutefois, dans la mesure où la loi le permet, nous fournissons nos
      services, ainsi que notre Plateforme et Fonctionnalités, {a7} et « en
      fonction de la disponibilité », sans aucune promesse, condition, garantie
      ou autre condition de quelque nature que ce soit. Cette clause ne limite
      en rien toute garantie légale ou droit dont vous êtes le bénéficiaire aux
      termes du droit applicable.   Nous ne sommes pas responsables des échecs
      ou retards résultant d’une cause hors de notre contrôle raisonnable, y
      compris mais sans {a11} limiter, les décisions administratives, les actes
      de terrorisme, les pandémies, les épidémies, les tremblements de terre,
      les incendies, les inondations ou autres catastrophes naturelles, les
      mouvements sociaux, les pannes de courant et les défaillances du réseau
      Internet. 
      <Text as={"h2"} fontWeight={"bold"}>
        13. Termes juridiques  
      </Text>
      <Text as={"h2"} fontWeight={"bold"}>
        a. Accès et modifications des Services et des Conditions Générales 
      </Text>
      Nous pouvons ajouter, supprimer, retirer, modifier, désactiver, suspendre
      ou restreindre tout ou partie de nos Services ou des présentes Conditions
      Générales, à tout moment, après vous en avoir notifié, et vous prenez acte
      que, dans une telle hypothèse, vous pourriez ne plus être en mesure {a8}{" "}
      les Services dans les mêmes conditions {a9} ces événements, voir plus du
      tout. Les modifications apportées à nos Services ou aux Conditions
      Générales{a10} pas les Commandes que vous aurez effectuées avant que nous
      vous ayons informé des modifications.      Le cas échéant, nous pouvons
      restreindre à nos clients {a12} de notre application. Nous nous
      efforcerons de mettre à jour notre application régulièrement et pouvons en
      modifier le contenu à tout moment. En cas de besoin, nous pouvons
      suspendre {a18} à notre application ou les fermer indéfiniment, après vous
      en avoir informé.     
      <Text as={"h2"} fontWeight={"bold"}>
        b. Utilisation des applications mobiles 
      </Text>
      Si vous accédez ou utilisez nos Services par {a14} de nos applications
      mobiles (ci-après {a13}), le contrat vous liant à votre fournisseur de
      réseau mobile {a15} Chap, et vous pourrez être facturé par votre
      fournisseur de réseau mobile pour les services de données pendant que vous
      utilisez certaines fonctions de {a16} Chap (ainsi que les frais de tiers).
      Vous êtes seul responsable de ces frais. Si vous{a17} pas le payeur de la
      facture de votre appareil mobile utilisé pour accéder à {a16} Chap, vous
      serez considéré comme ayant reçu {a18} de {a16} Chap.  Votre utilisation
      de {a16} Chap sera également soumise aux conditions générales et aux
      politiques de confidentialité de la plateforme à partir de laquelle vous
      aurez téléchargé {a16} Chap (telle que Google Play Store ou Apple App
      Store) (ci-après{" "}
      <Text as={"h2"} fontWeight={"bold"}>
        {k}
      </Text>
      ). Vous devrez vous assurer que vous avez lu les conditions de la
      plateforme. En cas de conflit entre les présentes conditions générales et
      les conditions de la plateforme, les présentes conditions générales
      prévaudront. 
      <Text as={"h2"} fontWeight={"bold"}>
        c. Liens contenus dans nos Applications 
      </Text>
      Lorsque notre Application contient des liens vers {a20} sites et
      ressources fournis par des tiers, ces liens sont fournis pour votre
      information uniquement. Nous {c16} aucun contrôle sur le contenu de ces
      sites ou ressources.      
      <Text as={"h2"} fontWeight={"bold"}>
        d. Classement 
      </Text>
      Nous sommes susceptibles de classer nos Partenaires en fonction de leurs
      évaluations par les consommateurs, de leur popularité (nombre de
      Commandes) ou de nos accords commerciaux conclus avec ces Partenaires. Ces
      classements seront affichés pour les Partenaires de votre région lorsque
      vous accéderez à notre Application.  
      <Text as={"h2"} fontWeight={"bold"}>
        e. Communications électroniques 
      </Text>
         Vous acceptez de recevoir par voie électronique toutes les
      communications et avis que nous fournissons en relation avec notre
      application. Nous pouvons être amenés à vous fournir des communications
      sous forme écrite, que vous acceptez de recevoir par voie électronique
      plutôt que sous forme papier, notamment en les envoyant à {d11}
      électronique enregistrée dans votre compte, ou en publiant un avis ou en
      communiquant avec vous via notre site. Les communications comprennent les
      présentes Conditions Générales et tous les autres accords ou politiques
      que vous devrez accepter afin d’utiliser les Services, y compris les mises
      à jour de ces accords et politiques, les autorisations de paiement et les
      reçus ou confirmations de transaction et les questions relatives au
      service clientèle.     
      <Text as={"h2"} fontWeight={"bold"}>
        f. Conditions Générales 
      </Text>
      Ces Conditions Générales contiennent {d2} entre nous et vous en ce qui
      concerne leur objet. Une personne qui {b10} pas partie à ces Conditions
      Générales {a5} aucun droit en vertu de celles-ci.    Si vous ou nous avons
      le droit de faire appliquer ces Conditions Générales à {d3} partie, ce
      droit ne sera pas perdu, même si la personne qui a ce droit tarde à le
      faire ou renonce à son droit d’y procéder en toute circonstance. Si une
      partie des présentes Conditions Générales est jugée illégale, abusive ou
      inefficace, le reste des conditions ne sera pas affecté et restera en
      vigueur.  
      <Text as={"h2"} fontWeight={"bold"}>
        g. Droit applicable et juridiction 
      </Text>
      Les présentes Conditions Générales, et tout litige en découlant ou en
      relation avec elles (y compris les litiges non contractuels), sont régies
      par le droit français et vous pouvez engager des poursuites judiciaires
      concernant nos Services ou les présentes Conditions Générales devant les
      tribunaux français.  En outre, tout différend ou litige dit de
      consommation peut faire {d4} règlement amiable par médiation auprès du
      médiateur à la consommation FEVAD. Conformément aux dispositions du Code
      de la consommation concernant le règlement amiable des litiges, Chap,
      adhère au Service du Médiateur du e-commerce de la FEVAD (Fédération du
      e-commerce et de la vente à distance) dont les coordonnées sont les
      suivantes : Médiateur de la Consommation FEVAD BP 20015 - 75362 PARIS
      CEDEX 8 – http://www.mediateurfevad.fr. Après démarche préalable écrite
      des consommateurs vis-à-vis de Chap., le Service du Médiateur peut être
      saisi pour tout litige de consommation dont le règlement n’aurait pas
      abouti. Pour connaître les modalités de saisine du Médiateur, cliquez ici.
      Ce service sera gratuit pour vous.   Vous avez également la possibilité de
      saisir la plateforme de Résolution des Litiges en Ligne (RLL) mise à
      disposition par la Commission européenne, accessible à l’adresse
      suivante : https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=FR.
      Ne peuvent faire {d5} revue par le médiateur les litiges pour lesquels la
      demande est manifestement abusive ou a été précédemment examinée ou est en
      cours {d6} par un autre médiateur ou par un tribunal, ou si vous avez
      introduit votre demande auprès du médiateur dans un délai supérieur à un
      an à compter de votre réclamation écrite auprès de nous ou si le litige{" "}
      {d7} pas dans le champ de compétence du médiateur, ou enfin si vous ne
      justifiez pas avoir tenté, au préalable, de résoudre votre litige
      directement auprès de nous par une réclamation écrite. 
      <Text as={"h2"} fontWeight={"bold"}>
        14. Réclamations et communications 
      </Text>
      Nous espérons que vous êtes satisfaits de nos Services, mais nous
      comprenons que vous aurez parfois besoin de nous parler. Nous sommes
      toujours heureux {d8} de vos nouvelles.  Si vous souhaitez nous contacter
      pour une raison quelconque, vous pouvez nous joindre par le moyen suivant
      :  Assistance à la clientèle : via email, à l’adresse :
      support@rschain.net    
    </Box>
    </>
    
  );
}

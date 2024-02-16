import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <title>AppChap</title>
        <meta
          property="description"
          content="SITE DE VENTE EN LIGNE DE PRODUIT AFRICAIN"
        />
        <meta property="og:image" content=""></meta>
        <meta property="og:title" content="AppChap"></meta>
        <meta
          property="og:description"
          content="SITE DE VENTE EN LIGNE DE PRODUIT AFRICAIN"
        />
        <meta property="og:url" content=""></meta>
      </Head>

      <body>
       
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

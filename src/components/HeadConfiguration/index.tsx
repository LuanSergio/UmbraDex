const HeadConfiguration = (): JSX.Element => {
  return (
    <>
      <title>UmbraDex</title>

      <meta name="name" content="UmbraDex" />

      <meta
        name="description"
        content="Find everything about the creatures you love!"
      />
      <meta name="keywords" content="Pokedex, UmbraDex, Pokemon" />

      <meta itemProp="image" content="/meta-image.png" />

      {/* Facebook Meta Tags */}
      <meta property="og:url" content="https://umbradex.vercel.app" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="UmbraDex" />
      <meta
        property="og:description"
        content="Find everything about the creatures you love!"
      />
      <meta property="og:image" content="/meta-image.png" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="UmbraDex" />
      <meta
        name="twitter:description"
        content="Find everything about the creatures you love!"
      />
      <meta name="twitter:image" content="/meta-image.png" />

      <meta name="robots" content="index, follow" />
      <meta charSet="UTF-8" />
      <meta name="author" content="Luan Sergio Damando" />
      <meta name="theme-color" content="#21285a" />
      <meta name="msapplication-TileColor" content="#21285a" />
      <meta name="theme-color" content="#21285a" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="favicons/site.webmanifest" />
      <link
        rel="mask-icon"
        href="favicons/safari-pinned-tab.svg"
        color="#21285a"
      />
    </>
  );
};

export default HeadConfiguration;

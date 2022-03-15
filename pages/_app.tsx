import Cookies from "js-cookie";
import "antd/dist/antd.css";
import "../styles/globals.scss";

import { useEffect } from "react";
import Head from "next/head";

function MyApp({ Component, pageProps }: any) {
  useEffect(() => {
    getAndSet();
  }, []);

  const getAndSet = async () => {
    const token = await Cookies.get("token");
    if (!token && window.location.pathname !== "/login") {
      if (window.location.pathname == "/register") return;
      window.location.href = "/login";
    }

    if (token && window.location.pathname == "/login")
      window.location.href = "/";
  };

  return (
    <>
      <Head>
        <title>MKnets Student</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

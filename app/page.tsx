"use client";

import Head from "next/head";
import Main from "../components/Main";
import Menu from "../components/Menu";
import { useState, useEffect } from "react";

export default function Home() {
  const [fadeOut, setFadeOut] = useState(false);

  const handleFadeOut = () => {
    setTimeout(() => {
      setFadeOut(true);
    }, 2000);
  };

  useEffect(() => {
    handleFadeOut();
  }, []);

  return (
    <>
      <Head>
        <title>Moge Tee</title>
      </Head>
      <main>{fadeOut ? <Menu /> : <Main fadeOut={!fadeOut} />}</main>
    </>
  );
}

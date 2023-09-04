import "@/styles/common.css";
import "@/styles/style.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Socket from "@/components/Socket";
import React from "react";
import { store } from "@/store/redux/store";
import { Provider } from "react-redux";
import Head from "next/head";

/*
 * 가장 먼저 실행되는 컴포넌트로 페이지에 적용할 공통 레이아웃 역할을 함.
 * 모든 컴포넌트에 공통으로 적용할 속성 정의
 * */
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>demo</title>
      </Head>
      <div className="wrap">
        <Provider store={store}>
          <Header />
          <Socket />
          <Component {...pageProps} />
          <Footer />
        </Provider>
      </div>
    </>
  );
}

import { Html, Head, Main, NextScript } from "next/document";
/*
 * _app 다음에 실행되는 페이지이며 공통으로 사용하는 <head>, <body> 태그안에 들어갈 내용들을 커스텀하는 페이지
 * */
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body style={{ background: "#fff", margin: "0px" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

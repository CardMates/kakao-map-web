import { useEffect } from "react";

export default function KakaoCallback() {
  useEffect(() => {
    // URL에서 code 추출
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (code) {
      // React Native WebView로 code 전송
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(code);
      }

      console.log("Code sent to app:", code);
    }
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>✅ 로그인 성공!</h1>
      <p>앱으로 돌아가세요</p>
      <button onClick={() => window.close()}>닫기</button>
    </div>
  );
}

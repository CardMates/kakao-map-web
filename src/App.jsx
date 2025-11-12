import React from "react";
import KakaoMap from "./components/KakaoMap";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import KakaoCallback from "./components/KakaoCallback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<KakaoMap />} />
        <Route path="/oauth/kakao/callback" element={<KakaoCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

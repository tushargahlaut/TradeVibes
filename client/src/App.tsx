import { useState } from "react";
import "./App.css";
import { TopBar } from "./components/common/top-bar";
import { LandingPage } from "./components/landing-page/aurora-background";

function App() {
  return (
    <div className="w-full">
      {/* <TopBar /> */}
      <LandingPage />
    </div>
  );
}

export default App;

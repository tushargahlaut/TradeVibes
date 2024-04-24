import "./App.css";
import { TopBar } from "./components/common/top-bar";
import { LandingPage } from "./components/landing-page/aurora-background";
import { Routes, Route } from "react-router-dom";
import { useUserStore } from "./store/user.store";
import { PostsComponent } from "./components/posts/index";


function App() {
  const { user_id } = useUserStore();
  return (
    <div className="w-full">
      {sessionStorage.getItem("accessToken") || user_id !== "" ? (
        <TopBar />
      ) : (
        ""
      )}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/posts" element={<PostsComponent />} />
      </Routes>
    </div>
  );
}

export default App;

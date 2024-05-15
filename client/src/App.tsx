import "./App.css";
import { TopBar } from "./components/common/top-bar";
import { LandingPage } from "./components/landing-page/aurora-background";
import { Routes, Route } from "react-router-dom";
import { useUserStore } from "./store/user.store";
import { PostsPage } from "./components/posts/index";
import { Nifty } from "./components/nifty";
import { SinglePost } from "./components/posts/single-post";


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
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:slug" element={<SinglePost/>} />
        <Route path="/nifty" element={<Nifty/>} />
      </Routes>
    </div>
  );
}

export default App;

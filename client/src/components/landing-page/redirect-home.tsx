import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

export function RedirectToHome() {
  const navigate = useNavigate();
  const handleRedirectToHome = () => {
    navigate("/posts");
  };
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate("/posts");
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);
  return (
    <Button
      className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2"
      variant="ghost"
      onClick={handleRedirectToHome}
    >
      Check Out Trending Posts!
    </Button>
  );
}

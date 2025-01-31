import { useEffect } from "react";

const useKeepAlive = () => {
  useEffect(() => {
    const keepAlive = () => {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/ping`)
        .then((res) => res.text())
        .catch((err) => console.error("No connection with server:", err));
    };

    const interval = setInterval(keepAlive, 300000); // Every 5 minutes
    keepAlive(); 
    return () => clearInterval(interval);
  }, []);
};

export default useKeepAlive;

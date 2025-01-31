import { useEffect } from "react";

const useKeepAlive = () => {
  useEffect(() => {
    const keepAlive = () => {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/ping`)
        .then((res) => res.text())
        .then((data) => console.log("Ping response:", data))
        .catch((err) => console.error("Ping failed:", err));
    };

    const interval = setInterval(keepAlive, 300000); // Cada 5 minutos
    keepAlive(); // Llamar una vez al inicio

    return () => clearInterval(interval);
  }, []);
};

export default useKeepAlive;

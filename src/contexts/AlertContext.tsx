import { createContext, useContext, useState, ReactNode, useMemo } from "react";

export type AlertType = "success" | "error" | "warning" | "info";

export type Alert = {
  id: string;
  message: string;
  type: AlertType;
};

type AlertContextType = {
  alerts: Alert[];
  showAlert: (message: string, type: AlertType) => void;
  removeAlert: (id: string) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  const showAlert = (message: string, type: AlertType) => {
    const newAlert: Alert = { id: crypto.randomUUID(), message, type };
    setAlerts((prev) => [...prev, newAlert]);

    setTimeout(() => removeAlert(newAlert.id), 3000); // Auto-dismiss
  };

  const removeAlert = (id: string) => {
    setAlerts((prev) => prev.filter((alert) => alert.id !== id));
  };

  const contextValue = useMemo(() => ({ alerts, showAlert, removeAlert }), [alerts]);

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlerts must be used within an AlertProvider");
  return context;
};

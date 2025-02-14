import { useAlerts } from "../../contexts/AlertContext";
import { Alert } from "./Alert";
import "../../styles/shared/alert-style.css"; 

export const AlertsList = () => {
  const { alerts } = useAlerts();

  return (
    <div className="alerts-container">
      {alerts.map((alert) => (
        <Alert key={alert.id} alert={alert} />
      ))}
    </div>
  );
};
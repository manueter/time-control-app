import { Alert as AlertType, useAlerts } from "../../contexts/AlertContext";
import { FaTimes  } from "react-icons/fa";
import "../../styles/shared/alert-style.css";
type AlertProps = {
  alert: AlertType;
};

export const Alert = ({ alert }: AlertProps) => {
  const { removeAlert } = useAlerts();

  return (
    <div className={`alert ${alert.type}`}>
      <span>{alert.message}</span>
      <button className="close-btn" onClick={() => removeAlert(alert.id)}>
        <FaTimes  />
      </button>
    </div>
  );
};

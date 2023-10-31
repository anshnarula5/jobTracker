"use client"


import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Alert = () => {
  const { alerts } = useSelector((state: any) => state.notifications);

  return (
    <div className="flex flex-col-reverse items-end fixed bottom-4 right-4 ">
      {alerts.map((alert: any, index: number) => (
        <AlertItem key={index} alert={alert} index={index} totalAlerts={alerts.length} />
      ))}
    </div>
  );
};

const AlertItem = ({ alert, index, totalAlerts }: { alert: any; index: number; totalAlerts: number }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (show) {
      const timeout = setTimeout(() => {
        setShow(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [show]);

  const onClose = () => {
    setShow(false);
  };

  const color = alert.type === "success" ? "bg-green-400" : "bg-red-400";

  return show ? (
    <div className={`${color} p-4 rounded-md flex items-center justify-between shadow-md my-2 z-50`}>
      <div className="flex items-center">
        <span className="">{alert.message }</span>
      </div>
    </div>
  ) : null;
};

export default Alert;

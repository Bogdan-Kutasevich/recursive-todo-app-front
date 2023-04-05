import React, { useEffect } from "react";
import "./ErrorNotification.scss";

type Props = {
  removeError: () => void;
};

export const ErrorNotification: React.FC<Props> = ({ removeError }) => {
  useEffect(() => {
    setTimeout(removeError, 3000);
  });

  return (
    <div className="notification is-danger is-light has-text-weight-normal">
      <p>Somthing went wrong</p>
    </div>
  );
};

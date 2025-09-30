"use client";

import { LogOut } from "../../../../../actions/log-out";

const LogOutButton = () => {
  const handleClick = () => {
    LogOut();
  };

  return (
    <button className="button-secondary" onClick={handleClick}>
      LogOut
    </button>
  );
};

export default LogOutButton;

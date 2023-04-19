import React from "react";
import { Notification } from "rsuite";
import { BsFillCloudCheckFill } from "react-icons/bs";
import "./cloudNotification.scss";

interface NotificationProps {
  text: string;
}

export const NotificationContent = (props: NotificationProps) => {
  return (
    <>
      <BsFillCloudCheckFill className="cloudIcon" /> {props.text}
    </>
  );
};

export const defaultToastValues = { placement: "bottomEnd"};

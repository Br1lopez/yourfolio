import React from "react";
import { Notification } from "rsuite";
import {BsFillCloudCheckFill} from "react-icons/bs";
import './cloudNotification.scss';

interface CloudNotificationProps {
  text: string;
}

export const CloudNotification = (props: CloudNotificationProps) => {
  return (
    <Notification>
      <BsFillCloudCheckFill className="cloudIcon" /> {props.text}
    </Notification>
  );
};

export const defaultToastValues = {placement: "bottomEnd", duration: 50};

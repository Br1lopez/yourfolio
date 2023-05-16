import React from "react";
import { Notification } from "rsuite";
import { BsFillCloudCheckFill } from "react-icons/bs";
import "./cloudNotification.scss";
import { ModalType } from "../../types/portfolioContextTypes";

export function pushCloudNotification(
  toaster: any,
  name: string,
  type: ModalType
) {
  let text = "";
  switch (type) {
    case ModalType.CreateElement:
      text = `Pestaña "${name}" creada con éxito`;
      break;
    case ModalType.EditElement:
      text = `Pestaña "${name}" modificada con éxito`;
      break;
    case ModalType.DeleteElement:
      text = `Pestaña "${name}" eliminada con éxito`;
      break;
    case ModalType.SetSyle:
      text = `Estilos modificados con éxito`;
      break;
  }

  toaster.push(
    <Notification>
      <BsFillCloudCheckFill className="cloudIcon" /> {text}
    </Notification>,
    defaultToastValues
  );
}

export const defaultToastValues = { placement: "bottomEnd" };

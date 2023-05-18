import React from "react";
import { Notification } from "rsuite";
import { BsFillCloudCheckFill } from "react-icons/bs";
import "./cloudNotification.scss";
import { ModalType } from "../../types/portfolioContextTypes";
import { ElementTypeDTO } from "src/types/dtoTypes";


export function pushCloudNotification(
  toaster: any,
  name: string,
  type: ModalType,
  elementType?: ElementTypeDTO
) {
  let text;
  switch (type) {
    case ModalType.CreateElement:
      text = <div className="cloud-notification__text">
        <span className="cloud-notification__text__element">{elementType?.name || ""} <b>{name}</b>:</span>
        <span className="cloud-notification__text__action">{elementType?.male ? "creado" : "creada"} con éxito</span>
      </div>
      break;
    case ModalType.EditElement:
      text = <div className="cloud-notification__text">
        <span className="cloud-notification__text__element">{elementType?.name || ""} <b>{name}</b>:</span>
        <span className="cloud-notification__text__action">{elementType?.male ? "modificado" : "modificada"} con éxito</span>
      </div>;
      break;
    case ModalType.DeleteElement:
      text = <div className="cloud-notification__text">
        <span className="cloud-notification__text__element">{elementType?.name || ""} <b>{name}</b>:</span>
        <span className="cloud-notification__text__action">{elementType?.male ? "eliminado" : "eliminada"} con éxito</span>
      </div>;
      break;
    case ModalType.SetSyle:
      text = <div className="cloud-notification__text">Estilos modificados con éxito</div>;
      break;
  }


  toaster.push(
    <Notification className="cloud-notification">
      <BsFillCloudCheckFill className="cloud-notification__icon" />{text}
    </Notification>,
    defaultToastValues
  );
}

export const defaultToastValues = { placement: "bottomEnd" };

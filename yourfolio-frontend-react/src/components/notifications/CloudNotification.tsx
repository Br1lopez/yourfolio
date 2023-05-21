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

  const getActionNotification = (action: string) => {
    return <Notification className="cloud-notification">
      <div className="cloud-notification__action">
        <BsFillCloudCheckFill className="cloud-notification__action__icon" />
        <span className="cloud-notification__action__text">{action} con éxito</span>
      </div>
      <span className="cloud-notification__element-name">{name}</span>
      <span className="cloud-notification__element-type">{elementType?.name || ""}</span>
    </Notification>
  }

  let notification;


  switch (type) {
    case ModalType.CreateElement:
      notification = getActionNotification("creado");
      break;
    case ModalType.EditElement:
      notification = getActionNotification("editado");
      break;
    case ModalType.DeleteElement:
      notification = getActionNotification("eliminado");
      break;
    case ModalType.SetSyle:
      notification =
        <Notification className="cloud-notification">
          <div className="cloud-notification__action">
            <BsFillCloudCheckFill className="cloud-notification__action__icon" />
            <span className="cloud-notification__action__text">Estilos modificados con éxito</span>
          </div>
        </Notification>
      break;
  }


  toaster.push(notification, { placement: "bottomEnd" }
  );
}

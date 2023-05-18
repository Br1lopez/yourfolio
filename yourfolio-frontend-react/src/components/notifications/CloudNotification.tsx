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
  let text = "";
  switch (type) {
    case ModalType.CreateElement:
      text = `${elementType?.name || ""} "${name}" ${elementType?.male ? "creado" : "creada"} con éxito`;
      break;
    case ModalType.EditElement:
      text = `${elementType?.name || ""} "${name}" ${elementType?.male ? "modificado" : "modificada"} con éxito`;
      break;
    case ModalType.DeleteElement:
      text = `${elementType?.name || ""} "${name}" ${elementType?.male ? "eliminado" : "eliminada"} con éxito`;
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

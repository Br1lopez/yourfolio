//eslint-disable-next-line
import React, { useEffect } from "react";
//eslint-disable-next-line
import { Button, Notification } from "rsuite";
import { AiFillBulb } from "react-icons/ai";
import "./cloudNotification.scss";
import { FaPlusCircle } from "react-icons/fa";
import { MdOutlineHelp } from "react-icons/md";


export function pushWelcomeNotification(
  toaster: any
) {
  // const [closed, setClosed] = React.useState(false);

  let notification =
    <Notification className="cloud-notification" closable>
      <div className="cloud-notification__action">
        <MdOutlineHelp className="cloud-notification__action__icon blue" />
        <span className="cloud-notification__action__text">Bienvenido al creador de portfolios</span>
      </div>
      <p className="cloud-notification__description">{'\u2022'} Haz clic en el botón <FaPlusCircle /> para crear un nuevo elemento.</p>
      <p className="cloud-notification__description">{'\u2022'} Haz clic derecho sobre un elemento ya existente para editarlo o borrarlo.</p>
      {/* <Button onClick={() => setClosed(true)}>Entendido</Button> */}
    </Notification>


  // const toasterKey = 
  toaster.push(notification, { placement: "bottomEnd", duration: 0 });

  //TODO: boton de Entendido
  // useEffect(() => {
  //   if (closed) {
  //     toaster.remove(toasterKey);
  //   }
  // }, [closed]);
}


export function pushInfoNotification(
  toaster: any,
  text: string
) {

  let notification =
    <Notification className="cloud-notification" closable>
      <div className="cloud-notification__action">
        <AiFillBulb className="cloud-notification__action__icon blue" />
        <span className="cloud-notification__action__text">{text}</span>
      </div>
    </Notification>


  toaster.push(notification, { placement: "bottomEnd", duration: 0 }
  );
}

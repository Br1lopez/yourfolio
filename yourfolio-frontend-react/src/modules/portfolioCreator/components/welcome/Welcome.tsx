import React from "react";
import { API_BASE_URL } from "src/globals";
import { ElementDTO } from "src/types/dtoTypes";
import "./welcome.scss";

export interface WelcomeProps {
  element: ElementDTO;
}
export const Welcome = (props: WelcomeProps) => {
  const element = props.element;
  return (
    <div className="welcome">
      {element.files.length > 0 && (
        <img src={`${API_BASE_URL}/${element.files[0].url}`} alt="" />
      )}
      <p className="welcome__title">{element.name}</p>
      <p className="welcome__description">{element.description}</p>
    </div>
  );
};

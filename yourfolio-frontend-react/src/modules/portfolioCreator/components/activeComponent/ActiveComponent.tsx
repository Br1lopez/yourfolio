import React from "react";
import { ArtworkGallery } from "../artworkGallery/ArtworkGallery";
import { ElementDTO } from "src/types/dtoTypes";
import "./activeComponent.scss";

interface ActiveComponentProps {
  element: ElementDTO | null;
}

export const ActiveComponent = (props: ActiveComponentProps) => {
  const { element } = props;
  return (
    <div className="active-component">
      {getElement(element)}
    </div>
  );
};

function getElement(element: ElementDTO | null) {
  if (element == null) return <div>404 element not found</div>;

  switch (element.type.id) {
    case "vertical-carousel-gallery":
      return <ArtworkGallery galleryData={element} />;
    default:
      return <div>Temporally unavailable</div>;
  }
}

import React, { useContext } from "react";
import { PortfolioContext } from "src/modules/portfolioCreator/context/PortfolioContext";
import { getElementByIdRecursive } from "src/utils/functions";
import { ArtworkGallery } from "../artworkGallery/ArtworkGallery";
import { ElementDTO } from "src/api/dtoTypes";
import { createNonNullChain } from "typescript";

interface ActiveComponentProps {
  element: ElementDTO | null;
  height?: string;
}

const ActiveComponent = (props: ActiveComponentProps) => {
  const { element, height } = props;
  return (
    <div className="active-component" style={{ height }}>
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

export default ActiveComponent;

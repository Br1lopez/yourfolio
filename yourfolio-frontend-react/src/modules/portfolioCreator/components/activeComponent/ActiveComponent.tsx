import React, { useContext } from "react";
import { PortfolioContext } from "src/modules/portfolioCreator/context/PortfolioContext";
import { getElementByIdRecursive } from "src/utils/functions";
import { ArtworkGallery } from "../artworkGallery/ArtworkGallery";

interface ActiveComponentProps {
  height?: string;
}

const ActiveComponent = (props: ActiveComponentProps) => {
  const { activeElementId, portfolioId, portfolioData } =
    useContext(PortfolioContext);
  const element = getElementByIdRecursive(
    activeElementId.value,
    portfolioData.value
  );
  return (
    <div className="active-component" style={{ height: props.height }}>
      {activeElementId && element?.type == "artwork-gallery" ? (
        <ArtworkGallery galleryData={element} />
      ) : (
        "b"
      )}
      {/* {activeElementId}aaa{portfolioId.portfolioId} */}
    </div>
  );
};

export default ActiveComponent;

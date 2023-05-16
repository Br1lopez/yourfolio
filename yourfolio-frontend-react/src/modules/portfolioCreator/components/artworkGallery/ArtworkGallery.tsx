import React, { useContext } from "react";
import { ArtworkContainer } from "./artworkContainer/ArtworkContainer";
import "./artworkGallery.scss";
import Carousel from "./carousel/Carousel";
import { ElementDTO } from "src/types/dtoTypes";
import { FaPlus } from "react-icons/fa";
import { PortfolioContext } from "../../../../hooks/PortfolioContext";
import { ModalType } from "../../../../types/portfolioContextTypes";

interface ArtworkGalleryProps {
  galleryData: ElementDTO;
}

export const ArtworkGallery = (props: ArtworkGalleryProps) => {
  const data = props.galleryData;
  const { modalWindowData: activeModalData, activeElementId } = useContext(PortfolioContext);

  if (!data) {
    return <div>Loading...</div>;
  } else {
    return (
      <section className="artwork-gallery">
        <Carousel elements={data.elements}></Carousel>
        <div
          className="artworks-parent"
          id="artworks-parent"
          style={{ width: "100%" }}
        >
          {data.elements
            .sort((a: ElementDTO, b: ElementDTO) => a.position - b.position)
            .map((element, i) => (
              <ArtworkContainer
                artworkData={element}
                key={`artworkContainer_${i}`}
              />
            ))}
          <div
            className="artwork-gallery__add-container"
            onClick={() => {
              activeModalData.set({
                parentId: activeElementId.value,
                elementId: 0,
                modalType: ModalType.CreateElement,
              });
            }}
          >
            <FaPlus className="artwork-gallery__add-container__icon" />
          </div>
        </div>
      </section>
    );
  }
};

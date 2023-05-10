import React, { useContext } from "react";
import { ArtworkContainer } from "./artworkContainer/ArtworkContainer";
import "./artworkGallery.scss";
import Carousel from "./carousel/Carousel";
import { ElementDTO } from "src/api/elementTypes";
import { FaPlus } from "react-icons/fa";
import {
  EMPTY_MODAL_CONTENT,
  ModalType,
  PortfolioContext,
} from "../../context/PortfolioContext";

interface ArtworkGalleryProps {
  galleryData: ElementDTO;
}

export const ArtworkGallery = (props: ArtworkGalleryProps) => {
  const data = props.galleryData;
  const { activeModalData: activeModalProps } = useContext(PortfolioContext);

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
              activeModalProps.set({
                parentId: data.id,
                elementId: 0,
                modalType: ModalType.CreateElement,
                modalContent: EMPTY_MODAL_CONTENT,
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

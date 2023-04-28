import React from "react";
import { ArtworkContainer } from "./artworkContainer/ArtworkContainer";
import "./artworkGallery.scss";
import Carousel from "./carousel/Carousel";
import { ElementDTO } from "src/api/elementTypes";
import { FaPlus } from "react-icons/fa";

interface ArtworkGalleryProps {
  galleryData: ElementDTO;
}

export const ArtworkGallery = (props: ArtworkGalleryProps) => {
  const data = props.galleryData;

  if (!data) {
    return <div>Loading...</div>;
  } else {
    return (
      <section className="artwork-gallery">
        <Carousel elements={data.elements}></Carousel>
        <div className="artworks-parent" style={{ width: "100%" }}>
          {data.elements
            .sort((a: ElementDTO, b: ElementDTO) => a.position - b.position)
            .map((element) => (
              <ArtworkContainer artworkData={element} />
            ))}
          <div className="artwork-gallery__add-container">
            <FaPlus className="artwork-gallery__add-container__icon" />
          </div>
        </div>
      </section>
    );
  }
};

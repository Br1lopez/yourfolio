import React, { useState, useEffect, useRef } from "react";
import { ArtworkContainer } from "./artworkContainer/ArtworkContainer";
import "./artworkGallery.scss";
import Carousel from "./carousel/Carousel";
import { ElementDTO } from "src/api/elementTypes";

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
        <Carousel
          images={data.elements.map((element) => element.files[0].url)}
        ></Carousel>
        {/* <div className="artworks-parent">
          {data.elements.map((element) => (
            <ArtworkContainer artworkData={element} i={element.position} />
          ))}
        </div> */}
      </section>
    );
  }
};

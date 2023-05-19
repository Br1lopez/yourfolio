import React, { useEffect, useState, useRef } from "react";
import "./carousel.scss";
import { Link } from "react-scroll";
import { IoMdArrowDropupCircle, IoMdArrowDropdownCircle } from "react-icons/io";
import { ElementDTO } from "src/types/dtoTypes";
import { API_BASE_URL } from "src/globals";

interface CarouselProps {
  elements: ElementDTO[];
}

const Carousel = (props: CarouselProps) => {
  const { elements } = props;
  const CAROUSEL_MOVEMENT = (): number => {
    return imagesRef.current != null
      ? imagesRef.current.offsetHeight * 0.01
      : 200;
  };

  const [bottom, setBottom] = useState(0);
  const [endReached, setEndReached] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);
  const [arrowsVisible, setArrowsVisible] = useState<boolean | null>(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const checkArrowsVisibility = () => {
    if (
      (imagesRef.current?.offsetHeight || 0) <=
      (containerRef.current?.offsetHeight || 0)
    ) {
      setArrowsVisible(false);
      setBottom(0);
    } else {
      setArrowsVisible(true);
    }
  };

  const initialActions = () => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);
  };

  const onTopArrowPress = () => {
    if (
      (imagesRef.current?.offsetHeight || 0) >
      (containerRef.current?.offsetHeight || 0)
    ) {
      if (bottom >= CAROUSEL_MOVEMENT()) {
        setBottom(bottom - CAROUSEL_MOVEMENT());
      } else {
        setBottom(0);
      }
    }
    setEndReached(false);
  };

  const onBottomArrowPress = () => {
    if (
      (imagesRef.current?.offsetHeight || 0) >
      (containerRef.current?.offsetHeight || 0)
    ) {
      if (
        bottom <
        (imagesRef.current?.offsetHeight || 0) -
          (containerRef.current?.offsetHeight || 0) -
          CAROUSEL_MOVEMENT()
      ) {
        setBottom(bottom + CAROUSEL_MOVEMENT());
      } else {
        setBottom(
          (imagesRef.current?.offsetHeight || 0) -
            (containerRef.current?.offsetHeight || 0)
        );
        setEndReached(true);
      }
    }
  };

  useEffect(initialActions, []);
  useEffect(checkArrowsVisibility, [windowHeight]);

  return (
    <div className="carousel">
      <div
        className="carousel__icon"
        style={{
          visibility: arrowsVisible ? "visible" : "hidden",
          opacity: bottom === 0 ? 0.2 : 1,
        }}
      >
        <IoMdArrowDropupCircle size={"100%"} onClick={onTopArrowPress} />
      </div>
      <div className="carousel__container" ref={containerRef}>
        <div
          className="carousel__images"
          ref={imagesRef}
          style={{ bottom: bottom }}
        >
          {elements.map((element) => (
            <Link
              duration={500}
              delay={0}
              smooth={true}
              spy={true}
              to={`img_${element.position}`}
              containerId="artworks-parent"
              activeClass="active"
              key={`link_${element.position}`}
            >
              {element.files && element.files[0] ? (
                <img
                  src={`${API_BASE_URL}/${element.files[0].url}`}
                  alt={element.description}
                  key={`${element.position}`}
                  onLoad={checkArrowsVisibility}
                />
              ) : null}
            </Link>
          ))}
        </div>
      </div>
      <div
        className="carousel__icon"
        onClick={onBottomArrowPress}
        style={{
          visibility: arrowsVisible ? "visible" : "hidden",
          opacity: endReached ? 0.2 : 1,
        }}
      >
        <IoMdArrowDropdownCircle size={"100%"} />
      </div>
    </div>
  );
};

export default Carousel;

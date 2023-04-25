import React, { useEffect, useState, useRef } from "react";
import "./carousel.scss";
import { Link } from "react-scroll";
import { IoMdArrowDropupCircle, IoMdArrowDropdownCircle } from "react-icons/io";

const Carousel = ({ images }) => {
  const CAROUSEL_MOVEMENT = () => {
    return imagesRef.current.offsetHeight * 0.01;
  };

  const [bottom, setBottom] = useState(0);
  const [endReached, setEndReached] = useState(false);
  const containerRef = useRef(null);
  const imagesRef = useRef(null);
  const [arrowsVisible, setArrowsVisible] = useState(null);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const checkArrowsVisibility = () => {
    if (imagesRef.current.offsetHeight <= containerRef.current.offsetHeight) {
      setArrowsVisible("hidden");
      setBottom(0);
    } else {
      setArrowsVisible("visible");
    }
  };

  const initialActions = () => {
    function handleResize() {
      setWindowHeight(window.innerHeight);
    }

    window.addEventListener("resize", handleResize);
  };

  const onTopArrowPress = () => {
    if (imagesRef.current.offsetHeight > containerRef.current.offsetHeight) {
      if (bottom >= CAROUSEL_MOVEMENT) {
        setBottom(bottom - CAROUSEL_MOVEMENT);
      } else {
        setBottom(0);
      }
    }
    setEndReached(false);
    console.log(imagesRef.current.offsetHeight);
  };

  const onBottomArrowPress = () => {
    if (imagesRef.current.offsetHeight > containerRef.current.offsetHeight) {
      if (
        bottom <
        imagesRef.current.offsetHeight -
          containerRef.current.offsetHeight -
          CAROUSEL_MOVEMENT
      ) {
        setBottom(bottom + CAROUSEL_MOVEMENT);
      } else {
        setBottom(
          imagesRef.current.offsetHeight - containerRef.current.offsetHeight
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
        style={{ visibility: arrowsVisible, opacity: bottom == 0 ? 0.2 : 1 }}
      >
        <IoMdArrowDropupCircle size={"100%"} onClick={onTopArrowPress} />
      </div>
      <div className="carousel__container" ref={containerRef}>
        <div
          className="carousel__images"
          ref={imagesRef}
          style={{ bottom: bottom }}
        >
          {images.map((image, i) => (
            <Link
              duration={500}
              delay={0}
              smooth={true}
              spy={true}
              offset={-100}
              to={`artwork_${i}`}
              activeClass="active"
            >
              <img src={image} key={i} onLoad={checkArrowsVisibility} />
            </Link>
          ))}
        </div>
      </div>
      <div
        className="carousel__icon"
        onClick={onBottomArrowPress}
        style={{
          visibility: arrowsVisible,
          opacity: endReached ? 0.2 : 1,
        }}
      >
        <IoMdArrowDropdownCircle size={"100%"} />
      </div>
    </div>
  );
};

export default Carousel;

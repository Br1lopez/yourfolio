import { ElementDTO } from "src/api/elementTypes";
import "./artworkContainer.scss";
import { Element } from "react-scroll";

interface ArtworkContainerProps {
  artworkData: ElementDTO;
  i: number;
}
export const ArtworkContainer = (props: ArtworkContainerProps) => {
  const { artworkData, i } = props;
  return (
    <article className="artwork" id={`artwork_${i}`}>
      <div className="artwork__img-parent">
        {artworkData.files[0] && (
          <img
            id={`img_${i}`}
            src={artworkData.files[0].url}
            alt={artworkData.name}
            className="artwork__img-parent__img"
          />
        )}
      </div>
      <div className="artwork__text-parent">
        <h2 className="artwork__text-parent__title">{artworkData.name}</h2>
        <div className="artwork__text-parent__text">
          {artworkData.description.split("<br>").map((paragraph, i) => {
            return (
              <p
                className="artwork__text-parent__text__paragraph"
                dangerouslySetInnerHTML={{ __html: paragraph }}
              />
            );
          })}
        </div>
        <div className="artwork__text-parent__bg"></div>
      </div>
    </article>
  );
};

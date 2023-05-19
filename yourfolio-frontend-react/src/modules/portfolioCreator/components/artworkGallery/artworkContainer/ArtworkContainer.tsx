import { ElementDTO } from "src/types/dtoTypes";
import "./artworkContainer.scss";
import { API_BASE_URL } from "src/globals";

interface ArtworkContainerProps {
  artworkData: ElementDTO;
}
export const ArtworkContainer = (props: ArtworkContainerProps) => {
  const { artworkData } = props;
  return (
    <article className="artwork" id={`img_${artworkData.position}`}>
      <div className="artwork__img-parent">
        {artworkData.files && artworkData.files[0] ? (
          <img
            id={`i_${artworkData.position}`}
            src={`${API_BASE_URL}/${artworkData.files[0].url}`}
            alt={artworkData.name}
            className="artwork__img-parent__img"
          />
        ) : null}
      </div>
      <div className="artwork__text-parent">
        <h2 className="artwork__text-parent__title">{artworkData.name}</h2>
        <div className="artwork__text-parent__text">
          {artworkData.description?.split("<br>").map((paragraph, i) => {
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

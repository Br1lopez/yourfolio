import { ElementDTO, mapElementDtoToElementSaveDto } from "src/types/dtoTypes";
import "./artworkContainer.scss";
import { API_BASE_URL } from "src/globals";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useContext } from "react";
import { PortfolioContext } from "src/hooks/PortfolioContext";
import { ModalType } from "src/types/portfolioContextTypes";
import { useDeleteElementMutation } from "src/hooks/ElementMutations";

interface ArtworkContainerProps {
  artworkData: ElementDTO;
}
export const ArtworkContainer = (props: ArtworkContainerProps) => {
  const { artworkData } = props;
  const { modalWindowData, editMode } = useContext(PortfolioContext);
  const deleteElement = useDeleteElementMutation(artworkData.id);
  return (
    <div className="artwork-parent" >
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
                  key={i}
                />
              );
            })}
          </div>
          <div className="artwork__text-parent__bg"></div>
        </div>
      </article>

      {editMode.value && <div className="edit-footer">

        <div className="action-button">
          <FaEdit onClick={() => {
            modalWindowData.set({
              values: mapElementDtoToElementSaveDto(artworkData),
              elementId: artworkData.id,
              modalType: ModalType.EditElement,
            })
          }} />
        </div>
        <div className="action-button">
          <FaTrashAlt onClick={() => { deleteElement.mutate(); }} />
        </div>

      </div>}
    </div>
  );
};

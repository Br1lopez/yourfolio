import React, { useContext } from "react";
import { Popover, Whisper } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import "./tab.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { PortfolioContext } from "src/hooks/PortfolioContext";
import { useDeleteElementMutation } from "src/hooks/ElementMutations";
import { ModalType } from "src/types/portfolioContextTypes";
import { ElementDTO, mapElementDtoToElementSaveDto } from "src/types/dtoTypes";

export interface TabProps {
  open: boolean;
  element: ElementDTO;
  parentId: number;
}

const Tab = (props: TabProps) => {
  const { activeElementId, modalWindowData } = useContext(PortfolioContext);
  const { open, element, parentId } = props;

  const deleteElement = useDeleteElementMutation(element.id);

  const handleClick = (event: any) => {
    event.preventDefault();
    activeElementId.set(element.id);
  };

  const handleEditClick = (event: any) => {
    modalWindowData.set({
      parentId: parentId,
      values: mapElementDtoToElementSaveDto(element),
      elementId: element.id,
      modalType: ModalType.EditElement,
    });
  };

  const handleDeleteClick = (event: any) => {
    deleteElement.mutate();
  };

  return (
    <Whisper
      trigger="contextMenu"
      placement="bottom"
      open={open}
      speaker={
        <Popover>
          <div>
            <span className="action-button">
              <FaEdit onClick={handleEditClick} />
            </span>
            <span className="action-button">
              <FaTrashAlt onClick={handleDeleteClick} />
            </span>
          </div>
        </Popover>
      }
    >
      <div
        className={activeElementId.value === element.id ? "navbar__content__tabLink active" : "navbar__content__tabLink"}
        id={`navbar__tabLink_${element.id}`}
        onClick={handleClick}
      >
        {element.name}
      </div>
    </Whisper >
  );
};

export default Tab;

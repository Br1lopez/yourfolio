import React, { useContext } from "react";
import { Popover, Whisper } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { Nav } from "react-bootstrap";
import "./tab.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { PortfolioContext } from "src/hooks/PortfolioContext";
import { useDeleteElementMutation } from "src/hooks/ElementMutations";
import { ModalType } from "src/types/portfolioContextTypes";
import { ElementDTO } from "src/types/dtoTypes";

export interface TabProps {
  open: boolean;
  element: ElementDTO;
}

const Tab = (props: TabProps) => {
  const { activeElementId, activeModalData } = useContext(PortfolioContext);
  const { open, element } = props;

  const deleteElement = useDeleteElementMutation(element.id);

  const handleClick = (event: any) => {
    event.preventDefault();
    activeElementId.set(element.id);
  };

  const handleEditClick = (event: any) => {
    activeModalData.set({
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
          <div className="action-buttons-container">
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
      <Nav.Link
        className="navbar__tabLink"
        href="#"
        id={`navbar__tabLink_${element.id}`}
        onClick={handleClick}
      >
        {element.name}
      </Nav.Link>
    </Whisper>
  );
};

export default Tab;

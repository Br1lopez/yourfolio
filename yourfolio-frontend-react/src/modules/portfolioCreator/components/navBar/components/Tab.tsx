import React, { useContext } from "react";
import { Popover, Whisper } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import { Nav } from "react-bootstrap";
import "./tab.scss";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {
  ModalType,
  PortfolioContext,
} from "src/modules/portfolioCreator/context/PortfolioContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteElement } from "src/api/element";
import { Notification } from "rsuite";
import {
  NotificationContent,
  defaultToastValues,
} from "../../notifications/CloudNotification";
export interface TabProps {
  name: string;
  open: boolean;
  index: any;
  tabId: number;
}

const Tab = (props: TabProps) => {
  const queryClient = useQueryClient();

  const { portfolioId, activeElementId, activeModalData, toaster } =
    useContext(PortfolioContext);

  const handleClick = (event: any) => {
    event.preventDefault();
    activeElementId.set(props.tabId);
  };

  const handleEditClick = (event: any) => {
    event.preventDefault();
    activeModalData.set({
      parentId: null,
      elementId: props.tabId,
      modalType: ModalType.EditElement,
      modalContent: {
        name: props.name,
        elementType: "",
      },
    });
  };

  const deleteElementMutation = useMutation({
    mutationFn: () => deleteElement(props.tabId),
    onSuccess: () => {
      queryClient.invalidateQueries(["getElement", portfolioId.value]);
      toaster.push(
        <Notification>
          <NotificationContent
            text={`Pestaña "${props.name}" eliminada con éxito`}
          ></NotificationContent>
        </Notification>,
        defaultToastValues
      );
    },
  });

  return (
    <Whisper
      trigger="contextMenu"
      placement="bottom"
      open={props.open}
      speaker={
        <Popover>
          <div className="action-buttons-container">
            <span className="action-button">
              <FaEdit onClick={handleEditClick} />
            </span>
            <span className="action-button">
              <FaTrashAlt
                onClick={() => {
                  deleteElementMutation.mutate();
                }}
              />
            </span>
          </div>
        </Popover>
      }
    >
      <Nav.Link
        className="navbar__tabLink"
        href="#"
        id={`navbar__tabLink_${props.index}`}
        onClick={handleClick}
      >
        {props.name}
      </Nav.Link>
    </Whisper>
  );
};

export default Tab;

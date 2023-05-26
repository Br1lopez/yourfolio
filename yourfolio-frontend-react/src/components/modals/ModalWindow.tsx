import React, { useContext, useEffect, useRef, useState } from "react";
import { Modal } from "rsuite";
import { PortfolioContext } from "src/hooks/PortfolioContext";

import { Form, ButtonToolbar, Button } from "rsuite";
import "./modal.scss";
import {
  CustomElementInputs,
  ElementTitleInput,
  ElementTypeInput,
} from "src/components/modals/inputs/ElementInputs";
import {
  useCreateElementMutation,
  useEditElementMutation,
  useEditElementStyleMutation,
} from "src/hooks/ElementMutations";
import {
  ModalType,
  ModalWindowData,
  NULL_MODAL_WINDOW_DATA,
  State,
} from "src/types/portfolioContextTypes";
import { EMPTY_ELEMENT_SAVE_DTO } from "src/types/dtoTypes";
import { ColorInputs, FontPickerComponent } from "./inputs/StyleInputs";
import { useQueryClient } from "@tanstack/react-query";

export interface ModalWindowProps {
  modalProperties: State<ModalWindowData>;
}

export const ModalWindow = (props: ModalWindowProps) => {
  const { modalWindowData, styleData } = useContext(PortfolioContext);
  const { modalProperties } = props;
  const [open, setOpen] = useState<boolean>(false);

  const formRef = useRef<any>(null);

  const queryClient = useQueryClient();

  const createElement = useCreateElementMutation(
    modalProperties?.value?.values || EMPTY_ELEMENT_SAVE_DTO,
    modalProperties?.value?.parentId
  );

  const editElement = useEditElementMutation(
    modalProperties.value.elementId || -1,
    modalProperties.value.values
  );

  const editStyle = useEditElementStyleMutation(
    modalProperties.value.elementId || -1,
    styleData.value
  );

  const handleSubmit = (event: any) => {
    console.log("form", modalProperties.value.values);
    if (formRef.current.check()) {
      switch (modalProperties.value.modalType) {
        case ModalType.CreateElement:
          createElement.mutate();
          break;
        case ModalType.EditElement:
          editElement.mutate();
          break;
        case ModalType.SetSyle:
          editStyle.mutate();
          break;
      }
    } else {
      console.log(formRef.current.check());
    }
  };

  const handleCancel = () => {
    setOpen(false);
    switch (modalProperties.value.modalType) {
      case ModalType.SetSyle:
        queryClient.invalidateQueries(["getPortfolio"]);
        break;
    }
  };

  const title = () => {
    switch (modalProperties?.value?.modalType) {
      case ModalType.CreateElement:
        return "Nuevo elemento";
      case ModalType.EditElement:
        return "Editar elemento";
      case ModalType.SetSyle:
        return "Editar estilo";
    }
  };

  const modalBody = () => {
    switch (modalProperties?.value?.modalType) {
      case ModalType.CreateElement:
        return (
          <Modal.Body>
            <ElementTitleInput modalState={modalProperties} />
            {modalProperties?.value.parentId && (
              <ElementTypeInput modalState={modalProperties} />
            )}
            <CustomElementInputs modalState={modalProperties} />
          </Modal.Body>
        );
      case ModalType.EditElement:
        return (
          <Modal.Body>
            <ElementTitleInput modalState={modalProperties} />
            {modalProperties?.value.parentId && (
              <ElementTypeInput disabled={true} modalState={modalProperties} />
            )}
            <CustomElementInputs modalState={modalProperties} />
          </Modal.Body>
        );

      case ModalType.SetSyle:
        if (styleData.value) {
          return (
            <Modal.Body
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
              }}
            >
              <ColorInputs
                state={{ value: styleData.value, set: styleData.set }}
              />
              {/* <BgColorInput state={{ value: styleData.value, set: styleData.set }} />
            <FontColorInput state={{ value: styleData.value, set: styleData.set }} /> */}
              <FontPickerComponent
                state={{ value: styleData.value, set: styleData.set }}
              />
            </Modal.Body>
          );
        }
    }
  };

  useEffect(() => {
    if (modalProperties.value.modalType !== ModalType.Hide) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [modalProperties.value.modalType]);

  return (
    <Modal
      id="newTab"
      open={open}
      onClose={() => setOpen(false)}
      onExited={() =>
        modalWindowData.set({
          ...NULL_MODAL_WINDOW_DATA,
          modalType: ModalType.Hide,
        })
      }
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title>{title()}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit} ref={formRef} className="modal-window-form">
        {modalProperties.value && modalBody()}
        <Modal.Footer>
          <ButtonToolbar>
            <Button appearance="default" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button appearance="primary" type="submit">
              {title()}
            </Button>
          </ButtonToolbar>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

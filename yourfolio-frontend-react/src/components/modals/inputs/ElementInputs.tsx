import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Form, Input, SelectPicker, Toggle, Uploader } from "rsuite";
import { getElement } from "src/api/elementRequests";
import { ElementTypeDTO, FileDTO } from "src/types/dtoTypes";
import { ModalWindowData, State } from "src/types/portfolioContextTypes";
import { requiredInput } from "../validations/InputValidations";
import React from "react";
import { API_BASE_URL } from "src/globals";
import { FileType } from "rsuite/esm/Uploader";
import { useLocation, useParams } from "react-router-dom";
import { upperCase } from "lodash";
const Textarea = React.forwardRef((props, ref: any) => (
  <Input {...props} as="textarea" ref={ref} />
));

export const ElementTitleInput = (props: {
  modalState: State<ModalWindowData>;
}) => {
  const [changed, setChanged] = useState<boolean>(false);
  return (
    <Form.Group controlId="newElementTitle">
      <Form.ControlLabel>Nombre: </Form.ControlLabel>
      <Form.Control
        name="name"
        value={props.modalState.value.values?.name}
        onChange={(v: any, e: any) => {
          props.modalState.set({
            ...props.modalState.value,
            values: { ...props.modalState.value.values, name: v },
          });
          setChanged(true);
        }
        }
        rule={changed ? requiredInput : undefined}
      />
    </Form.Group>
  );
};

export const ElementTypeInput = (props: {
  modalState: State<ModalWindowData>;
  disabled?: boolean;
}) => {
  const [possibleChildren, setPossibleChildren] = useState<ElementTypeDTO[]>();

  useQuery({
    queryKey: ["getType", props.modalState.value.values.typeId],
    queryFn: () => getElement(props.modalState.value.parentId || -1),
    onSuccess: (data) => {
      setPossibleChildren(
        (props.modalState.value.parentId && data.data.type.possibleChildren) || []
      );
    },
  });

  return (
    <Form.Group controlId="newElementType">
      <Form.ControlLabel>Tipo de elemento:</Form.ControlLabel>
      <Form.Control
        disabled={props.disabled}
        name="type"
        accepter={SelectPicker}
        searchable={false}
        aria-label="Select"
        value={props.modalState.value.values.typeId}
        onChange={(v: any, e: any) =>
          props.modalState.set({
            ...props.modalState.value,
            values: { ...props.modalState.value.values, typeId: v },
          })
        }
        data={
          (possibleChildren &&
            possibleChildren.map((possibleChild) => ({
              label: possibleChild.name,
              value: possibleChild.id,
            }))) ||
          []
        }
        rule={props.disabled ? undefined : requiredInput}
      />
    </Form.Group>
  );
};

export const ElementDescriptionInput = (props: {
  modalState: State<ModalWindowData>;
}) => {
  return (
    <Form.Group controlId="newElementTitle">
      <Form.ControlLabel>Descripción: </Form.ControlLabel>
      <Form.Control
        name="description"
        value={props.modalState.value.values?.description}
        accepter={Textarea}
        onChange={(v: any, e: any) =>
          props.modalState.set({
            ...props.modalState.value,
            values: { ...props.modalState.value.values, description: v },
          })
        }
      />
    </Form.Group>
  );
};

export const ElementImageInput = (props: {
  modalState: State<ModalWindowData>;
}) => {
  return (
    <Form.Group controlId="newElementType" className="mb-4">
      <Form.ControlLabel>Imagen:</Form.ControlLabel>
      <Form.Control
        name="image"
        accepter={Uploader}
        action={`${API_BASE_URL}/files/upload`}
        withCredentials={true}
        onSuccess={(response: FileDTO, file: FileType) => {
          props.modalState.set({
            ...props.modalState.value,
            values: { ...props.modalState.value.values, files: [response] },
          });
        }}
      />
      <div style={{ textTransform: "uppercase", fontSize: "10px", color: "grey" }}>(máximo 5MB)</div>
    </Form.Group>
  );
};

export const HideElementInput = (props: {
  modalState: State<ModalWindowData>;
}) => {
  return (<Form.Group controlId="hideElement" className="mb-4">
    <Form.ControlLabel>Ocultar</Form.ControlLabel>
    <Toggle
      checked={props.modalState.value.values.hidden}
      onChange={(checked, event) => {
        props.modalState.set({
          ...props.modalState.value,
          values: { ...props.modalState.value.values, hidden: checked },
        })
      }} />    </Form.Group>
  );
};

export const HomeElementInput = (props: {
  modalState: State<ModalWindowData>;
}) => {
  return (<Form.Group controlId="homeElement" className="mb-4">
    <Form.ControlLabel>Página de inicio</Form.ControlLabel>
    <Toggle
      checked={props.modalState.value.values.home}
      onChange={(checked, event) => {
        props.modalState.set({
          ...props.modalState.value,
          values: { ...props.modalState.value.values, home: checked },
        })
      }} /></Form.Group >
  );
};

export const CustomElementInputs = (props: {
  modalState: State<ModalWindowData>;
}) => {
  const location = useLocation();
  const pathnameParts = location.pathname.split('/');
  const portfolioId = pathnameParts[2];
  const modalState = props.modalState;

  let result = [];

  console.log(modalState?.value.parentId, portfolioId);
  if (modalState?.value.parentId === parseInt(portfolioId || "-1")) {
    result.push(<HomeElementInput modalState={modalState} />);
    result.push(<HideElementInput modalState={modalState} />);
  }
  switch (modalState?.value.values?.typeId) {
    case "artwork":
      result.push(<ElementDescriptionInput modalState={modalState} />);
      result.push(<ElementImageInput modalState={modalState} />);
      break;
    case "welcome":
      result.push(<ElementDescriptionInput modalState={modalState} />);
      result.push(<ElementImageInput modalState={modalState} />);
    default:
      break;
  }

  return <>{result}</>;
};

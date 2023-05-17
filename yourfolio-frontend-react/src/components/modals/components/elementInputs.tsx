import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Form, SelectPicker, Uploader } from "rsuite"
import { getElementType } from "src/api/elementTypeRequests";
import { EMPTY_ELEMENT_SAVE_DTO, ElementSaveDTO, ElementTypeDTO } from "src/types/dtoTypes";
import { ModalWindowData, State } from "src/types/portfolioContextTypes";

export const ElementTitleInput = (props: { modalState: State<ModalWindowData> }) => {
  return <Form.Group controlId="newElementTitle">
    <Form.ControlLabel>Nombre: </Form.ControlLabel>
    <Form.Control
      name="name"
      value={props.modalState.value.values?.name}
      onChange={(v: any, e: any) =>
        props.modalState.set(
          {
            ...props.modalState.value,
            values:
              props.modalState.value.values ?
                { ...props.modalState.value.values, name: v }
                : EMPTY_ELEMENT_SAVE_DTO
          })}
    />
  </Form.Group>;
}

export const ElementTypeInput = (props: { modalState: State<ModalWindowData> }) => {
  const [possibleChildren, setPossibleChildren] = useState<ElementTypeDTO[]>([]);

  const query = useQuery({
    queryKey: ["getType", props.modalState.value.values?.typeId || "portfolio"],
    queryFn: () => getElementType(props.modalState.value.values?.typeId || "portfolio"),
    onSuccess: (data) => {
      setPossibleChildren(data.possibleChildren || [])
    },
  });

  return <Form.Group controlId="newElementType">
    <Form.ControlLabel>Tipo de elemento:</Form.ControlLabel>
    <Form.Control
      name="type"
      accepter={SelectPicker}
      searchable={false}
      aria-label="Select"
      value={props.modalState.value.values?.typeId || ""}
      onChange={(v: any, e: any) =>
        props.modalState.set(
          {
            ...props.modalState.value,
            values:
              props.modalState.value.values ?
                { ...props.modalState.value.values, typeId: v }
                : EMPTY_ELEMENT_SAVE_DTO
          })}
      data={
        possibleChildren.map(
          (possibleChild) => ({
            label: possibleChild.name,
            value: possibleChild.id,
          })
        ) || []
      }
    ></Form.Control>
  </Form.Group>
}

export const ElementImageInput = (props: { modalState?: State<ModalWindowData> }) => {
  return <Form.Group controlId="newElementType" className="mb-4">
    <Form.ControlLabel>Imagen:</Form.ControlLabel>
    <Form.Control
      name="image"
      accepter={Uploader}
      action="#"
    />
  </Form.Group>
}


export const CustomElementInputs = (props: { modalState: State<ModalWindowData> }) => {
  const [type, setType] = useState<ElementTypeDTO | undefined>(undefined);
  const query = useQuery({
    queryKey: ["getType", props.modalState.value.values?.typeId || ""],
    queryFn: () => getElementType(props.modalState.value.values?.typeId || ""),
    onSuccess: (data) => {
      setType(data)
    },
  });

  switch (type?.name) {
    case "vertical-carousel-gallery":
      return <ElementImageInput />;
    default:
      return <></>;
  }
}

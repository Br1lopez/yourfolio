import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Form, SelectPicker, Uploader } from "rsuite"
import { getElementType } from "src/api/elementTypeRequests";
import { ElementSaveDTO, ElementTypeDTO } from "src/types/dtoTypes";
import { State } from "src/types/portfolioContextTypes";

export const ElementTitleInput = (props: { state: State<ElementSaveDTO> }) => {
  return <Form.Group controlId="newElementTitle">
    <Form.ControlLabel>Nombre: </Form.ControlLabel>
    <Form.Control
      name="name"
      value={props.state.value.name}
      onChange={(v: string, e: any) => props.state.set({ ...props.state.value, name: v })} />
  </Form.Group>;
}

export const ElementTypeInput = (props: { state: State<ElementSaveDTO> }) => {
  const [possibleChildren, setPossibleChildren] = useState<ElementTypeDTO[]>([]);

  const query = useQuery({
    queryKey: ["getType", props.state.value.typeId],
    queryFn: () => getElementType(props.state.value.typeId),
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
      value={props.state.value.typeId}
      onChange={(v: any, e: any) => props.state.set({ ...props.state.value, typeId: v })}
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

export const ElementImageInput = (props: { state?: State<ElementSaveDTO> }) => {
  return <Form.Group controlId="newElementType" className="mb-4">
    <Form.ControlLabel>Imagen:</Form.ControlLabel>
    <Form.Control
      name="image"
      accepter={Uploader}
      action="#"
    />
  </Form.Group>
}


export const CustomElementInputs = (props: { state: State<ElementSaveDTO> }) => {
  const [type, setType] = useState<ElementTypeDTO | undefined>(undefined);
  const query = useQuery({
    queryKey: ["getType", props.state.value.typeId],
    queryFn: () => getElementType(props.state.value.typeId),
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

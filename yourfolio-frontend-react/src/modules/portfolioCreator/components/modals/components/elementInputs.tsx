import { Form, SelectPicker, Uploader } from "rsuite"
import { ElementDTO } from "src/types/dtoTypes";
import { State } from "src/types/portfolioContextTypes";

export const ElementTitleInput = (props: { state: State<ElementDTO> }) => {
  return <Form.Group controlId="newElementTitle">
    <Form.ControlLabel>Nombre: </Form.ControlLabel>
    <Form.Control
      name="name"
      value={props.state.value}
      onChange={(v: string, e: any) => props.state.set({ ...props.state.value, name: v })} />
  </Form.Group>;
}

export const ElementTypeInput = (props: { state: State<ElementDTO>, parent?: ElementDTO }) => {
  return <Form.Group controlId="newElementType">
    <Form.ControlLabel>Tipo de elemento:</Form.ControlLabel>
    <Form.Control
      name="type"
      accepter={SelectPicker}
      searchable={false}
      aria-label="Select"
      value={props.state.value}
      onChange={(v: any, e: any) => props.state.set({ ...props.state.value, type: { ...props.state.value.type, id: v } })}
      data={
        props.parent?.type.possibleChildren?.map(
          (possibleChild) => ({
            label: possibleChild.name,
            value: possibleChild.id,
          })
        ) || []
      }
    ></Form.Control>
  </Form.Group>
}

export const ElementImageInput = (props: { state?: State<ElementDTO> }) => {
  return <Form.Group controlId="newElementType" className="mb-4">
    <Form.ControlLabel>Imagen:</Form.ControlLabel>
    <Form.Control
      name="image"
      accepter={Uploader}
      action="#"
    />
  </Form.Group>
}


export const CustomElementInputs = (props: { state: State<ElementDTO>, parent?: ElementDTO }) => {
  const elementType = props.state.value.type.name;

  switch (elementType) {
    case "vertical-carousel-gallery":
      return <ElementImageInput />;
    default:
      return <></>;
  }
}

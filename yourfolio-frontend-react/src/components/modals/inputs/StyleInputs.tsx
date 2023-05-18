import FontPicker from "font-picker-react";
import { throttle } from "lodash";
import { Form } from "rsuite"
import { Font } from "src/modules/fontManager";
import { StyleDTO } from "src/types/dtoTypes";
import { State } from "src/types/portfolioContextTypes";

const THROTTLE_MS = 100;

export const ColorInputs = (props: { state: State<StyleDTO> }) => {

    const debouncedBgColor = throttle((bgColor) => {
        props.state.set({ ...props.state.value, bgColor });
    }, THROTTLE_MS);

    const debouncedFontColor = throttle((fontColor) => {
        props.state.set({ ...props.state.value, fontColor });
    }, THROTTLE_MS);


    return <Form.Group controlId="colors" >
        <Form.ControlLabel>Color de fondo:</Form.ControlLabel>
        <Form.Control
            name="bgColor"
            type="color"
            onChange={(v: any, e: any) => debouncedBgColor(v)}
            value={props.state.value.bgColor}
            required
        />
        <Form.ControlLabel>Color de texto:</Form.ControlLabel>
        <Form.Control
            name="fontColor"
            type="color"
            onChange={(v: any, e: any) => debouncedFontColor(v)}
            value={props.state.value.fontColor}
            required
        />
    </Form.Group>
}

export const FontPickerComponent = (props: { state: State<StyleDTO> }) => {
    const styleData = props.state;


    return (<Form.Group controlId="fontPicker" style={{ minHeight: "250px" }}>
        <Form.ControlLabel>Color de texto:</Form.ControlLabel>
        <FontPicker
            apiKey="AIzaSyA7-F6PODGUMyfHXyRvfBfZFRlSJcfmiVE"
            activeFontFamily={styleData.value?.fontFamily}
            onChange={(font: Font) => styleData.set({ ...styleData.value, fontFamily: font.family })}
        />
    </Form.Group >

    );
};

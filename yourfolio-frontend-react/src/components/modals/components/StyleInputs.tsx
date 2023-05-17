import { throttle } from "lodash";
import { Form } from "rsuite"
import { StyleDTO } from "src/types/dtoTypes";
import { State } from "src/types/portfolioContextTypes";

const THROTTLE_MS = 100;

export const BgColorInput = (props: { state: State<StyleDTO> }) => {

    const debouncedBgColor = throttle((bgColor) => {
        props.state.set({ ...props.state.value, bgColor });
    }, THROTTLE_MS);

    return <Form.Group controlId="newTabTitle">
        <Form.ControlLabel>Color de fondo:</Form.ControlLabel>
        <Form.Control
            name="bgColor"
            type="color"
            onChange={(v: any, e: any) => debouncedBgColor(v)}
            value={props.state.value.bgColor}
            required
        />
    </Form.Group>
}

export const FontColorInput = (props: { state: State<StyleDTO> }) => {

    const debouncedFontColor = throttle((fontColor) => {
        props.state.set({ ...props.state.value, fontColor });
    }, THROTTLE_MS);

    return <Form.Group controlId="fontColor">
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
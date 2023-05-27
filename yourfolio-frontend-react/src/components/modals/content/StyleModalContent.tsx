import React, { useContext, useRef } from 'react'
import { ModalContentProps } from '../ModalWindow';
import { Button, ButtonToolbar, Form, Modal } from 'rsuite';
import { ModalType } from 'src/types/portfolioContextTypes';
import { CustomElementInputs, ElementTitleInput, ElementTypeInput } from '../inputs/ElementInputs';
import { useEditElementStyleMutation } from 'src/hooks/ElementMutations';
import { PortfolioContext } from 'src/hooks/PortfolioContext';
import { useQueryClient } from '@tanstack/react-query';
import { ColorInputs, FontPickerComponent } from '../inputs/StyleInputs';

export const StyleModalContent = (props: ModalContentProps) => {
    const { modalProperties } = props;
    const { styleData } = useContext(PortfolioContext);
    const formRef = useRef<any>(null);
    const queryClient = useQueryClient();
    const title = "Editar estilo";

    const editStyle = useEditElementStyleMutation(
        modalProperties.value.elementId || -1,
        styleData.value
    );

    const handleSubmit = (event: any) => {
        console.log("form", modalProperties.value.values);
        if (formRef.current.check()) {
            editStyle.mutate();
        } else {
            console.log(formRef.current.check());
        }
    };


    return <>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} ref={formRef} className="modal-window-form">
            <Modal.Body
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                }}
            >
                <ColorInputs
                    state={{ value: styleData.value || {}, set: styleData.set }}
                />
                <FontPickerComponent
                    state={{ value: styleData.value || {}, set: styleData.set }}
                />
            </Modal.Body>
            <Modal.Footer>
                <ButtonToolbar>
                    <Button appearance="default" onClick={() => { props.open.set(false); queryClient.invalidateQueries(["getPortfolio"]); }}>
                        Cancelar
                    </Button>
                    <Button appearance="primary" type="submit">
                        {title}
                    </Button>
                </ButtonToolbar>
            </Modal.Footer>
        </Form>
    </>

}
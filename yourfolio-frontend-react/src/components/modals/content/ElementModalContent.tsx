import React, { useRef, useState } from 'react'
import { ModalContentProps, ModalWindowProps } from '../ModalWindow';
import { Button, ButtonToolbar, Form, Modal } from 'rsuite';
import { ModalType } from 'src/types/portfolioContextTypes';
import { CustomElementInputs, ElementTitleInput, ElementTypeInput } from '../inputs/ElementInputs';
import { useCreateElementMutation, useEditElementMutation } from 'src/hooks/ElementMutations';
import { EMPTY_ELEMENT_SAVE_DTO } from 'src/types/dtoTypes';

export const ElementModalContent = (props: ModalContentProps) => {
    const { modalProperties } = props;
    const formRef = useRef<any>(null);

    const createElement = useCreateElementMutation(
        modalProperties?.value?.values || EMPTY_ELEMENT_SAVE_DTO,
        modalProperties?.value?.parentId
    );

    const editElement = useEditElementMutation(
        modalProperties.value.elementId || -1,
        modalProperties.value.values
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
            }
        } else {
            console.log(formRef.current.check());
        }
    };

    const title = () => {
        switch (modalProperties?.value?.modalType) {
            case ModalType.CreateElement:
                return "Nuevo elemento";
            case ModalType.EditElement:
                return "Editar elemento";
        };
    };

    return <>
        <Modal.Header closeButton>
            <Modal.Title>{title()}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit} ref={formRef} className="modal-window-form">
            <Modal.Body>
                <ElementTitleInput modalState={modalProperties} />
                {modalProperties?.value.parentId && (
                    <ElementTypeInput disabled={modalProperties?.value?.modalType == ModalType.EditElement} modalState={modalProperties} />
                )}
                <CustomElementInputs modalState={modalProperties} />
            </Modal.Body>
            <Modal.Footer>
                <ButtonToolbar>
                    <Button appearance="default" onClick={() => { props.open.set(false); }}>
                        Cancelar
                    </Button>
                    <Button appearance="primary" type="submit">
                        {title()}
                    </Button>
                </ButtonToolbar>
            </Modal.Footer>
        </Form>
    </>

}
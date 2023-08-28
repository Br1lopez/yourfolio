import React from 'react'
import { Button, ButtonToolbar, Form, Modal } from 'rsuite';
import { ModalContentProps } from '../ModalWindow';
import { FaEdit, FaPaintBrush, FaPlusCircle, FaTrashAlt } from 'react-icons/fa';
import { AiFillHome } from 'react-icons/ai';
import { MdOutlineHelp } from 'react-icons/md';

export const IntroModalContent = (props: ModalContentProps) => {

    return <>
        <Modal.Header closeButton>
            <Modal.Title>BIENVENIDO AL CREADOR DE PORTFOLIOS</Modal.Title>
        </Modal.Header>
        <Form className="modal-window-form">
            <Modal.Body className="info">
                <p style={{ marginTop: "24px" }}>Así es como puedes comenzar a crear tu portfolio:</p>
                <h4>1. Barra de navegación superior:</h4>
                <p >{'\u2022'} Haz clic en el botón <FaPlusCircle /> para crear una nueva página de tu portfolio.</p>
                <p >{'\u2022'} Haz <b style={{ color: "black" }}>clic derecho sobre su nombre</b> para editarla o borrarla.</p>

                <h4>2. Elementos:</h4>
                <p >{'\u2022'} Haz clic en <FaPlusCircle /> para añadir un elemento.</p>
                <p >{'\u2022'} Haz clic en <FaEdit /> o <FaTrashAlt /> para editarlo o borrarlo.</p>

                <h4>3. Menú lateral:</h4>
                <p >{'\u2022'} <AiFillHome />: accede a tu página principal. Ahí podrás ver todos tus portfolios.</p>
                <p >{'\u2022'} <FaPaintBrush />: edita el estilo de este portfolio.</p>
                <p >{'\u2022'} <MdOutlineHelp />: vuelve a consultar estas instrucciones.</p>

            </Modal.Body>
            <Modal.Footer>
                <ButtonToolbar>
                    <Button appearance="primary" onClick={() => { props.open.set(false); localStorage.setItem("instructionsShown", "true") }}>
                        Entendido
                    </Button>
                </ButtonToolbar>
            </Modal.Footer>
        </Form>
    </>
}

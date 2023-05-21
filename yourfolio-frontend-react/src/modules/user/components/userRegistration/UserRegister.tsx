import { useRef, useState } from 'react';
import { Form, Button } from 'rsuite';
import './userRegister.scss';
import { emailValidation, equalPasswords, passwordValidation, requiredInput } from 'src/components/modals/validations/InputValidations';

export const UserRegister = () => {
    const [formData, setFormData] = useState({
        name: '',
        surnames: '',
        email: '',
        password: '',
        repeatPassword: '',
    });

    const formRef = useRef<any>(null);

    const handleChange = (value: any, event: any) => {
        setFormData({ ...formData, [event.target.name]: value });
    };

    const handleSubmit = () => {
        console.log('Form data:', formData);
        if (formRef.current.check()) {
            alert("yes")
        }
    };

    return (
        <div className="register-page">
            <div className="register-page__container">
                <h1>Regístrate</h1>
                <Form fluid onSubmit={handleSubmit} formValue={formData} ref={formRef} noValidate>
                    <Form.Group>
                        <Form.ControlLabel>Nombre:</Form.ControlLabel>
                        <Form.Control name="name" value={formData.name} onChange={handleChange} rule={requiredInput} />
                    </Form.Group>
                    <Form.Group>
                        <Form.ControlLabel>Apellidos:</Form.ControlLabel>
                        <Form.Control name="surnames" onChange={handleChange} rule={requiredInput} />
                    </Form.Group>
                    <Form.Group>
                        <Form.ControlLabel>Email:</Form.ControlLabel>
                        <Form.Control name="email" type="email" onChange={handleChange} rule={emailValidation} />
                    </Form.Group>
                    <Form.Group>
                        <Form.ControlLabel>Contraseña:</Form.ControlLabel>
                        <Form.Control
                            name="password"
                            type="password"
                            rule={passwordValidation}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.ControlLabel>Repetir contraseña:</Form.ControlLabel>
                        <Form.Control
                            name="repeatPassword"
                            type="password"
                            rule={equalPasswords(formData.password, formData.repeatPassword)}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <div className="page__container__form__footer">
                        <Button appearance="primary" type="submit">
                            Registrarse
                        </Button>
                    </div>
                </Form>
            </div>
            <div className="register-page__slogan">
                <p>RÁPIDO.</p>
                <p>SENCILLO.</p>
                <p>PROFESIONAL.</p>
                <p></p>
            </div>
        </div>
    );
};
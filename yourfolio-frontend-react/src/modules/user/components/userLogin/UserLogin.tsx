import { useRef, useState } from "react";
import { Form, Button } from "rsuite";
import "./userLogin.scss";
import {
  requiredInput,
} from "src/components/modals/validations/InputValidations";
import { Link } from "react-router-dom";

export const UserLogin = () => {
  const [formData, setFormData] = useState({
    name: "",
    // surnames: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const formRef = useRef<any>(null);

  const handleChange = (value: any, event: any) => {
    setFormData({ ...formData, [event.target.name]: value });
  };

  const handleSubmit = () => {
    console.log("Form data:", formData);
    if (formRef.current.check()) {
    }
  };

  return (
    <div className="login-page">
      <div className="login-page__container">
        <h1>Inicio de sesión</h1>
        <Form
          className="login-page__container__form"
          fluid
          onSubmit={handleSubmit}
          formValue={formData}
          ref={formRef}
          noValidate
        >
          <Form.Group>
            <Form.ControlLabel>Email:</Form.ControlLabel>
            <Form.Control
              name="email"
              type="email"
              onChange={handleChange}
              rule={requiredInput}
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Contraseña:</Form.ControlLabel>
            <Form.Control
              name="password"
              type="password"
              rule={requiredInput}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="login-page__container__form__footer">
            <Button appearance="primary" type="submit">
              Iniciar sesión
            </Button>
          </div>
          <div className="login-page__container__form__bottom-text">
            <Link to="/register">¿No tienes cuenta? Regístrate aquí.</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

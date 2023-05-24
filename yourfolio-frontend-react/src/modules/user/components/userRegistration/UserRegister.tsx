import { useRef, useState } from "react";
import { Form, Button } from "rsuite";
import "./userRegister.scss";
import {
  emailValidation,
  equalPasswords,
  passwordValidation,
  requiredInput,
} from "src/components/modals/validations/InputValidations";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "src/api/userRequests";

export const UserRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const formRef = useRef<any>(null);
  const navigate = useNavigate();

  const handleChange = (value: any, event: any) => {
    setFormData({ ...formData, [event.target.name]: value });
  };

  const handleSubmit = () => {
    console.log("Form data:", formData);
    if (formRef.current.check()) {
      registerUser(formData).then((result) => {
        if (result) {
          navigate("/login");
        } else {
          alert("Error al iniciar sesión");
        }
      });
    }
  };

  return (
    <div className="register-page">
      <div className="register-page__container">
        <h1>Regístrate</h1>
        <Form
          className="register-page__container__form"
          fluid
          onSubmit={handleSubmit}
          formValue={formData}
          ref={formRef}
          noValidate
        >
          <Form.Group>
            <Form.ControlLabel>Nombre:</Form.ControlLabel>
            <Form.Control
              name="name"
              value={formData.name}
              onChange={handleChange}
              rule={requiredInput}
            />
          </Form.Group>
          <Form.Group>
            <Form.ControlLabel>Email:</Form.ControlLabel>
            <Form.Control
              name="email"
              type="email"
              onChange={handleChange}
              rule={emailValidation}
            />
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
          <div className="register-page__container__form__footer">
            <Button appearance="primary" type="submit">
              Registrarse
            </Button>
          </div>
          <div className="login-page__container__form__bottom-text">
            <Link to="/login">¿Ya tienes cuenta? Entra aquí.</Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

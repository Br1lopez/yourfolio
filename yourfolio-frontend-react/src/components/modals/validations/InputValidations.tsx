import { Schema } from "rsuite";

export const requiredInput = Schema.Types.StringType().isRequired('Campo obligatorio')
export const emailValidation = Schema.Types.StringType().isRequired('Necesitamos un email para crear tu cuenta').isEmail('Introduce un email válido');
export const passwordValidation = Schema.Types.StringType().isRequired('Necesitamos un contraseña para crear tu cuenta').pattern(/^(?=.*[a-zA-Z])(?=.*[0-9]).{6,24}$/, 'La contraseña debe tener entre 6 y 24 caracteres y contener al menos una letra y un número.');
export const equalPasswords = (password: string, repeatPassword: string) => {
    return Schema.Types.StringType()
        .isRequired('Por favor, repite tu contraseña para verificar que todo está correcto.')
        .addRule(() => password === repeatPassword, 'Las contraseñas no coinciden.');
};
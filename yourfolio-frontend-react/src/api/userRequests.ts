import axios from "axios";
import { API_BASE_URL } from "src/globals";
import { LoginData, UserDTO, UserSaveDTO } from "src/types/dtoTypes";

export const registerUser = async (
    body: UserSaveDTO
): Promise<UserDTO> => {
    try {
        const response = await axios.post<UserDTO>(
            `${API_BASE_URL}/users/register`,
            body
        );
        return response.data;
    } catch (error) {
        throw new Error("error");
    }
};

export const loginUser = async (loginData: LoginData): Promise<boolean> => {
    try {
        const response = await axios.post<boolean>(
            `${API_BASE_URL}/login`,
            loginData,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to authenticate user');
    }
};
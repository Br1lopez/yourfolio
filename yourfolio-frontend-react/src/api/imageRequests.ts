import axios from "axios";
import { API_BASE_URL } from "src/globals";
import { ImageDTO } from "src/types/dtoTypes";

export const createImage = async (
    body: ImageDTO
): Promise<ImageDTO> => {
    try {
        const response = await axios.post<ImageDTO>(
            `${API_BASE_URL}/images/`,
            body
        );
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw new Error("error");
    }
};
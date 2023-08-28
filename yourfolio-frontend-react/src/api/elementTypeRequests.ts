import axios from "axios";
import { API_BASE_URL } from "../globals";
import { ElementTypeDTO } from "../types/dtoTypes";

export const getElementType = async (elementTypeId: string): Promise<ElementTypeDTO> => {
    try {
        const response = await axios.get<ElementTypeDTO>(
            `${API_BASE_URL}/elementTypes/${elementTypeId}`
        );
        return response.data;
    } catch (err) {
        throw new Error("error");
    }
};
import axios from "axios";
import { API_BASE_URL } from "src/globals";
import { FileDTO } from "src/types/dtoTypes";

export const createImage = async (body: FileDTO): Promise<FileDTO> => {
  try {
    const response = await axios.post<FileDTO>(`${API_BASE_URL}/images/`, body);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("error");
  }
};

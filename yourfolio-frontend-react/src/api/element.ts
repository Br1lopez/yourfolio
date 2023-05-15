import axios from "axios";
import { API_BASE_URL } from "../globals";
import { ElementDTO, ElementSaveDTO } from "./dtoTypes";

export const getElement = async (elementId: number): Promise<ElementDTO> => {
  try {
    const response = await axios.get<ElementDTO>(
      `${API_BASE_URL}/elements/${elementId}`
    );
    return response.data;
  } catch (err) {
    throw new Error("error");
  }
};

export const createElement = async (
  body: ElementSaveDTO,
  parentId?: number
): Promise<ElementDTO> => {
  try {
    const response = await axios.post<ElementDTO>(
      `${API_BASE_URL}/elements/${parentId || ""}`,
      body
    );
    return response.data;
  } catch (err) {
    throw new Error("error");
  }
};

export const updateElement = async (
  elementId: number,
  body: ElementSaveDTO
): Promise<ElementDTO> => {
  try {
    console.log(body);
    const response = await axios.put<ElementDTO>(
      `${API_BASE_URL}/elements/${elementId}`,
      body
    );
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw new Error("error");
  }
};

export const deleteElement = async (elementId: number) => {
  const response = await axios
    .delete(`${API_BASE_URL}/elements/${elementId}`)
    .catch((error) => {
      console.log(error);
    });

  return response;
};

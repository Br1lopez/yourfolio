import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../globals";
import { ElementDTO, ElementSaveDTO } from "./elementTypes";

export const getElementRequest = async (
  elementId: number
): Promise<ElementDTO> => {
  try {
    const response = await axios.get<ElementDTO>(
      `${API_BASE_URL}/elements/${elementId}`
    );
    return response.data;
  } catch (err) {
    throw new Error("error");
  }
};

export const createElementRequest = async (
  body: ElementSaveDTO,
  parentId?: number
): Promise<ElementDTO> => {
  try {
    const url = parentId
      ? `${API_BASE_URL}/elements/${parentId}`
      : `${API_BASE_URL}/elements`;
    const response = await axios.post<ElementDTO>(url, body);
    return response.data;
  } catch (err) {
    throw new Error("error");
  }
};

export const updateElementRequest = async (
  elementId: number,
  body: ElementSaveDTO
): Promise<ElementDTO> => {
  try {
    const response = await axios.put<ElementDTO>(
      `${API_BASE_URL}/elements/${elementId}`,
      body
    );
    return response.data;
  } catch (err) {
    throw new Error("error");
  }
};

export const deleteElementRequest = async (elementId: number) => {
  const response = await axios
    .delete(`${API_BASE_URL}/elements/${elementId}`)
    .catch((error) => {
      console.log(error);
    });

  return response;
};

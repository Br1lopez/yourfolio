import axios, { AxiosResponse } from "axios";
import { API_BASE_URL } from "../globals";
import { ElementDTO, ElementSaveDTO } from "./elementTypes";

export const getElement = async (
  elementId: number
): Promise<AxiosResponse<ElementDTO>> => {
  try {
    const response = await axios.get<ElementDTO>(
      `${API_BASE_URL}/elements/${elementId}`
    );
    return response;
  } catch (err) {
    throw new Error("error");
  }
};

export const createElement = async (
  parentId: number,
  body: ElementSaveDTO
): Promise<AxiosResponse<ElementDTO>> => {
  try {
    const response = await axios.post<ElementDTO>(
      `${API_BASE_URL}/elements/${parentId}`,
      body
    );
    return response;
  } catch (err) {
    throw new Error("error");
  }
};

export const updateElement = async (
  elementId: number,
  body: ElementSaveDTO
): Promise<AxiosResponse<ElementDTO>> => {
  try {
    const response = await axios.put<ElementDTO>(
      `${API_BASE_URL}/elements/${elementId}`,
      body
    );
    return response;
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

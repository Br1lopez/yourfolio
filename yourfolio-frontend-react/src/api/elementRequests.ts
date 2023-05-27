import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "../globals";
import { ElementDTO, ElementSaveDTO, StyleDTO } from "../types/dtoTypes";
import { ApiResponse } from "src/types/apiTypes";

export const getElement = async (elementId: number): Promise<ApiResponse<ElementDTO>> => {
  try {
    const response = await axios.get<ElementDTO>(
      `${API_BASE_URL}/elements/${elementId}`
    );
    return { data: response.data, status: response.status };
  } catch (err) {
    throw new Error("error");
  }
};

export const createElement = async (
  body: ElementSaveDTO,
  parentId?: number
): Promise<ApiResponse<ElementDTO>> => {
  try {
    const response = await axios.post<ElementDTO>(
      `${API_BASE_URL}/elements/${parentId || ""}`,
      body
    );
    console.log(response.data);
    return { data: response.data, status: response.status };
  } catch (error) {
    throw error as AxiosError;
  }
};

export const updateElement = async (
  elementId: number,
  body: ElementSaveDTO
): Promise<ApiResponse<ElementDTO>> => {
  try {
    console.log(elementId, body);
    const response = await axios.put<ElementDTO>(
      `${API_BASE_URL}/elements/${elementId}`,
      body
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    throw new Error("error", error as AxiosError);
  }
};

export const updateElementStyle = async (
  elementId: number,
  style: StyleDTO | null
): Promise<ApiResponse<ElementDTO>> => {
  try {
    const response = await axios.put<ElementDTO>(
      `${API_BASE_URL}/elements/${elementId}/style`,
      style,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return { data: response.data, status: response.status };
  } catch (error) {
    throw new Error("error");
  }
};

export const deleteElement = async (
  elementId: number
): Promise<ApiResponse<ElementDTO> | null> => {
  try {
    const response = await axios
      .delete<ElementDTO>(`${API_BASE_URL}/elements/${elementId}`)
      .catch((error) => {
        console.log(error);
      });

    return response instanceof Object ? { data: response.data, status: response.status } : null;
  } catch (error) {
    throw new Error("error");
  }
};

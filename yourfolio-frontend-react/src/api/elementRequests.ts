import axios from "axios";
import { API_BASE_URL } from "../globals";
import { ElementDTO, ElementSaveDTO, StyleDTO } from "../types/dtoTypes";
import { defaultHeaders } from "src/modules/user/components/userLogin/UserLogin";

export const getElement = async (elementId: number): Promise<ElementDTO> => {
  try {
    const response = await axios.get<ElementDTO>(
      `${API_BASE_URL}/elements/${elementId}`,
      defaultHeaders()
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
      body,
      { withCredentials: true }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("error");
  }
};

export const updateElement = async (
  elementId: number,
  body: ElementSaveDTO
): Promise<ElementDTO> => {
  try {
    console.log(elementId, body);
    const response = await axios.put<ElementDTO>(
      `${API_BASE_URL}/elements/${elementId}`,
      body,
      defaultHeaders()
    );
    return response.data;
  } catch (error) {
    throw new Error("error");
  }
};

export const updateElementStyle = async (
  elementId: number,
  style: StyleDTO | null
): Promise<ElementDTO> => {
  try {
    const response = await axios.put<ElementDTO>(
      `${API_BASE_URL}/elements/${elementId}/style`,
      style,
      defaultHeaders()
    );
    return response.data;
  } catch (error) {
    throw new Error("error");
  }
};

export const deleteElement = async (
  elementId: number
): Promise<ElementDTO | null> => {
  try {
    const response = await axios
      .delete<ElementDTO>(
        `${API_BASE_URL}/elements/${elementId}`,
        defaultHeaders()
      )
      .catch((error) => {
        console.log(error);
      });

    return response instanceof Object ? response.data : null;
  } catch (error) {
    throw new Error("error");
  }
};

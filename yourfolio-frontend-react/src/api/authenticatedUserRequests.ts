import axios, { AxiosError } from "axios";
import { API_BASE_URL } from "src/globals";
import { ApiResponse } from "src/types/apiTypes";
import { ElementDTO, LoginResponseDTO } from "src/types/dtoTypes";
import { LoginRequestData, UserDTO, UserSaveDTO } from "src/types/dtoTypes";

export const registerUser = async (body: UserSaveDTO): Promise<ApiResponse<UserDTO>> => {
  try {
    const response = await axios.post<UserDTO>(
      `${API_BASE_URL}/user/register`,
      body
    );
    return { data: response.data, status: response.status };

  } catch (error) {
    throw error as AxiosError;
  }
};

export const getPortfolios = async (): Promise<ApiResponse<ElementDTO[]>> => {
  try {
    const response = await axios.get<ElementDTO[]>(
      `${API_BASE_URL}/user/portfolios`
    );
    return { data: response.data, status: response.status };

  } catch (error) {
    throw error as AxiosError;
  }
};

export const getUserInfo = async (): Promise<ApiResponse<UserDTO>> => {
  try {
    const response = await axios.get<UserDTO>(`${API_BASE_URL}/user/info`);
    return { data: response.data, status: response.status };

  } catch (error) {
    throw error as AxiosError;
  }
};

export const loginUser = async (
  loginData: LoginRequestData
): Promise<ApiResponse<LoginResponseDTO>> => {
  try {
    const response = await axios.post<LoginResponseDTO>(
      `${API_BASE_URL}/login`,
      loginData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    return { data: response.data, status: response.status };

  } catch (error) {
    throw error as AxiosError;
  }
};

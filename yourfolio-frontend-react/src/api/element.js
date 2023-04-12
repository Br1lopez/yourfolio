import axios from 'axios';
import { API_BASE_URL } from '../globals';


export const getElement = async () => {
    const elementId = 1;
    const response = await axios
    .get(`${API_BASE_URL}/elements/${elementId}`)
    // .then((response) => {
    //     setData(response.data);
    //     const style = document.documentElement?.style;
    //     style.setProperty("--bg-color", response.data.style.bgColor);
    //     style.setProperty("--text-color", response.data.style.fontColor);
    //   })
    // .then((response) => {
    //     console.log(response.data);
    // })
    .catch((error) => {
        console.log(error);
      });

    return response.data;
}


export const createElement = async (parentId, body) => {
    const response = await axios
    .post(`${API_BASE_URL}/elements/${parentId}`, body)
    .catch((error) => {
      console.log(error);
    });

    return response.data;
}

export const deleteElement = async (elementId) => {
    const response = await axios
    .delete(`${API_BASE_URL}/elements/${elementId}`)
    .catch((error) => {
        console.log(error);
      });

    return response.data;
}
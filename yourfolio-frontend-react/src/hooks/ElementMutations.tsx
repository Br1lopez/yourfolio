import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PortfolioContext } from "src/hooks/PortfolioContext";
import { useContext } from "react";
import {
  createElement,
  updateElement,
  deleteElement,
  updateElementStyle,
} from "../api/elementRequests";

import { pushCloudNotification } from "src/components/notifications/CloudNotification";
import { ElementSaveDTO, StyleDTO } from "../types/dtoTypes";
import {
  ModalType,
  NULL_MODAL_WINDOW_DATA,
} from "src/types/portfolioContextTypes";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

export const useCreateElementMutation = (
  elementSaveDto: ElementSaveDTO,
  parentId?: number
) => {
  const { modalWindowData: activeModalData, toaster } =
    useContext(PortfolioContext);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => createElement(elementSaveDto, parentId),
    onSuccess: (response) => {
      console.log("response", response.status);
      pushCloudNotification(
        toaster,
        elementSaveDto.name,
        ModalType.CreateElement,
        response.data.type
      );
      queryClient.invalidateQueries(["getPortfolio"]);
      queryClient.invalidateQueries(["getPortfolios"]);
      activeModalData.set(NULL_MODAL_WINDOW_DATA);
    },

    onSettled: (data, error, variables, context) => {
      switch ((error as AxiosError).response?.status) {
        case 401:
          navigate("/login");
          break;
      }
    }
  });
};

export const useEditElementMutation = (
  elementId: number,
  elementSaveDto: ElementSaveDTO
) => {
  const { modalWindowData: activeModalData, toaster } =
    useContext(PortfolioContext);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateElement(elementId, elementSaveDto),
    onSuccess: (response) => {
      pushCloudNotification(
        toaster,
        elementSaveDto.name,
        ModalType.EditElement,
        response.data.type
      );
      queryClient.invalidateQueries(["getPortfolio"]);
      activeModalData.set(NULL_MODAL_WINDOW_DATA);
    },
  });
};

export const useEditElementStyleMutation = (
  elementId: number,
  styleDto: StyleDTO | null
) => {
  const { modalWindowData: activeModalData, toaster } =
    useContext(PortfolioContext);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateElementStyle(elementId, styleDto),
    onSuccess: (response) => {
      pushCloudNotification(toaster, "", ModalType.SetSyle);
      queryClient.invalidateQueries(["getPortfolio"]);
      activeModalData.set(NULL_MODAL_WINDOW_DATA);
    },
  });
};

export const useDeleteElementMutation = (elementId: number) => {
  const { toaster } =
    useContext(PortfolioContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteElement(elementId),
    onSuccess: (response) => {
      queryClient.invalidateQueries(["getPortfolio"]);
      pushCloudNotification(
        toaster,
        response?.data?.name || "",
        ModalType.DeleteElement,
        response?.data?.type
      );
    },
  });
};

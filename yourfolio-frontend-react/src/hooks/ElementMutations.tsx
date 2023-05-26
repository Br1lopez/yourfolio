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

export const useCreateElementMutation = (
  elementSaveDto: ElementSaveDTO,
  parentId?: number
) => {
  const { modalWindowData: activeModalData, toaster } =
    useContext(PortfolioContext);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createElement(elementSaveDto, parentId),
    onSuccess: (data) => {
      pushCloudNotification(
        toaster,
        elementSaveDto.name,
        ModalType.CreateElement,
        data.type
      );
      queryClient.invalidateQueries(["getPortfolio", "getPortfolios"]);
      activeModalData.set(NULL_MODAL_WINDOW_DATA);
    },
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
    onSuccess: (data) => {
      pushCloudNotification(
        toaster,
        elementSaveDto.name,
        ModalType.EditElement,
        data.type
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
    onSuccess: (data) => {
      pushCloudNotification(toaster, "", ModalType.SetSyle);
      queryClient.invalidateQueries(["getPortfolio"]);
      activeModalData.set(NULL_MODAL_WINDOW_DATA);
    },
  });
};

export const useDeleteElementMutation = (elementId: number) => {
  const { modalWindowData: activeModalData, toaster } =
    useContext(PortfolioContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteElement(elementId),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["getPortfolio"]);
      pushCloudNotification(
        toaster,
        data?.name || "",
        ModalType.DeleteElement,
        data?.type
      );
    },
  });
};

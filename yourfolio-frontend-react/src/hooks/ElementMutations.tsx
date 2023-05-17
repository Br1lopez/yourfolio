import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PortfolioContext } from "src/hooks/PortfolioContext";
import { useContext } from "react";
import { createElement, updateElement, deleteElement, updateElementStyle } from "../api/elementRequests";

import { pushCloudNotification } from "src/components/notifications/CloudNotification";
import { ElementSaveDTO, StyleDTO } from "../types/dtoTypes";
import { ModalType } from "src/types/portfolioContextTypes";

export const useCreateElementMutation = (
  elementSaveDto: ElementSaveDTO,
  parentId?: number
) => {
  const { modalWindowData: activeModalData, toaster } =
    useContext(PortfolioContext);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createElement(elementSaveDto, parentId),
    onSuccess: () => {
      pushCloudNotification(
        toaster,
        elementSaveDto.name,
        ModalType.CreateElement
      );
      queryClient.invalidateQueries(["getPortfolio"]);
      activeModalData.set(null);
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
    onSuccess: () => {
      pushCloudNotification(
        toaster,
        elementSaveDto.name,
        ModalType.EditElement
      );
      queryClient.invalidateQueries(["getPortfolio"]);
      activeModalData.set(null);
    },
  });
};

export const useEditElementStyleMutation = (
  elementId: number,
  styleDto: StyleDTO
) => {
  const { modalWindowData: activeModalData, toaster } =
    useContext(PortfolioContext);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateElementStyle(elementId, styleDto),
    onSuccess: () => {
      pushCloudNotification(
        toaster,
        "",
        ModalType.EditElement
      );
      queryClient.invalidateQueries(["getPortfolio"]);
      activeModalData.set(null);
    },
  });
};


export const useDeleteElementMutation = (elementId: number, name?: string) => {
  const { modalWindowData: activeModalData, toaster } =
    useContext(PortfolioContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteElement(elementId),
    onSuccess: () => {
      queryClient.invalidateQueries(["getPortfolio"]);
      pushCloudNotification(
        toaster,
        name || "",
        ModalType.DeleteElement
      );
    },
  });
};

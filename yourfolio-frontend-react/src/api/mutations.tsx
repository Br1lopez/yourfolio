import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PortfolioContext } from "src/modules/portfolioCreator/context/PortfolioContext";
import { useContext } from "react";
import { createElement, updateElement, deleteElement } from "./element";

import { pushCloudNotification } from "src/modules/portfolioCreator/components/notifications/CloudNotification";
import { ElementSaveDTO } from "./dtoTypes";
import { ModalType } from "src/modules/portfolioCreator/context/PortfolioContextTypes";

export const useCreateElementMutation = (
  elementSaveDto: ElementSaveDTO,
  parentId?: number
) => {
  const { activeModalData, portfolioId, toaster } =
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
      queryClient.invalidateQueries(["getElement", portfolioId.value]);
      activeModalData.set(null);
    },
  });
};

export const useEditElementMutation = (
  elementId: number,
  elementProperties: ElementSaveDTO
) => {
  const { activeModalData, portfolioId, toaster } =
    useContext(PortfolioContext);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => updateElement(elementId, elementProperties),
    onSuccess: () => {
      pushCloudNotification(
        toaster,
        activeModalData.value?.element?.name || "",
        ModalType.EditElement
      );
      queryClient.invalidateQueries(["getElement", portfolioId.value]);
      activeModalData.set(null);
    },
  });
};

export const useDeleteElementMutation = (elementId: number) => {
  const { activeModalData, portfolioId, toaster } =
    useContext(PortfolioContext);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteElement(elementId),
    onSuccess: () => {
      queryClient.invalidateQueries(["getElement", portfolioId.value]);
      pushCloudNotification(
        toaster,
        activeModalData.value?.element?.name || "",
        ModalType.DeleteElement
      );
    },
  });
};

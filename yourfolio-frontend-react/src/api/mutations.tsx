import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PortfolioContext } from "src/modules/portfolioCreator/context/PortfolioContext";
import React, { useContext } from "react";
import { createElement } from "./element";
import { Notification } from "rsuite";
import {
  NotificationContent,
  defaultToastValues,
} from "src/modules/portfolioCreator/components/notifications/CloudNotification";
import { ElementSaveDTO } from "./elementTypes";

export const useCreateElementMutation = (elementProperties: ElementSaveDTO) => {
  const { activeModalData, portfolioId, toaster } =
    useContext(PortfolioContext);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      createElement(
        activeModalData.value.parentId || portfolioId.value,
        elementProperties
      ),
    onSuccess: () => {
      queryClient.invalidateQueries(["getElement", portfolioId.value]);
      toaster.push(
        <Notification>
          <NotificationContent
            text={`Pestaña "${activeModalData.value.modalContent?.name}" creada con éxito`}
          />
        </Notification>,
        defaultToastValues
      );
    },
  });
};

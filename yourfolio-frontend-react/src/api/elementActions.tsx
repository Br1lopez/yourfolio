import { createElementRequest } from "src/api/elementRequests";
import { useMutation } from "@tanstack/react-query";
import React, { useState, useContext } from "react";
import { PortfolioCtxData } from "src/modules/portfolioCreator/context/PortfolioContext";
import {
  NotificationContent,
  defaultToastValues,
} from "../modules/portfolioCreator/components/notifications/CloudNotification";
import { Notification } from "rsuite";
import { ElementSaveDTO } from "./elementTypes";

export const createElement = (
  ctx: PortfolioCtxData,
  body: ElementSaveDTO,
  parentId?: number,
  text?: string,
  onSuccess?: () => any
) => {
  console.log("eyy")
  return () => {
    console.log("eyy2")
    useMutation({
    mutationFn: () => createElementRequest(body, parentId),
    onSuccess: () => {
      ctx.queryClient.invalidateQueries(["getElement", ctx.portfolioId.value]);
      text &&
        ctx.toaster.push(
          <Notification>
            <NotificationContent text={text} />
          </Notification>,
          defaultToastValues
        );
      onSuccess?.();
    },
  });
}};

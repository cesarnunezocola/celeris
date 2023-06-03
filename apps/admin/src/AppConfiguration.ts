import { HttpRequestEngine } from "@celeris/request";
import { field, logger } from "@celeris/utils";
import { Modal, message as _message, notification } from "ant-design-vue";
import { useUserStoreWithOut } from "~/store/modules/user";

function initializeHttpRequest() {
  HttpRequestEngine.initRequest(() => ({
    getToken: () => {
      const userStore = useUserStoreWithOut();
      return userStore.getToken;
    },
  }));
  HttpRequestEngine.setTimeoutHandler(() => {
    const userStore = useUserStoreWithOut();
    userStore.setToken(undefined);
    userStore.logout(true).then(() => {});
  });
  HttpRequestEngine.setUnauthorizedHandler(() => {
    const userStore = useUserStoreWithOut();
    userStore.setToken(undefined);
    userStore.logout(true).then(() => {});
  });
  HttpRequestEngine.setMessageHandler((message, mode) => {
    if (mode === "message") {
      void _message.info(message);
    } else if (mode === "modal") {
      Modal.info({ title: "Information", content: message });
    } else if (mode === "notification") {
      notification.info({ message });
    } else if (mode === undefined || mode === "none") {
      logger.info(`HttpRequestEngine MessageHandler: ${message}`);
    }
  });
  HttpRequestEngine.setSuccessMessageHandler((message, mode) => {
    if (mode === "message") {
      void _message.success(message);
    } else if (mode === "modal") {
      Modal.success({ title: "Error", content: message });
    } else if (mode === "notification") {
      notification.success({ message });
    } else if (mode === undefined || mode === "none") {
      logger.info(`HttpRequestEngine SuccessHandler: ${message}`);
    }
  });
  HttpRequestEngine.setErrorMessageHandler((message, mode) => {
    if (mode === "message") {
      void _message.error(message);
    } else if (mode === "modal") {
      Modal.error({ title: "Error", content: message });
    } else if (mode === "notification") {
      notification.error({ message });
    } else if (mode === undefined || mode === "none") {
      logger.error("HttpRequestEngine ErrorHandler", field("content:", message));
    }
  });
}

export function initializeConfiguration() {
  initializeHttpRequest();
}

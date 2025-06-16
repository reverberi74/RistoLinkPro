import { useDispatch } from "react-redux";
import { updateToastState } from "../store/slices/settingsSlice";

export const useToast = (options = { closeDelay: 2000 }) => {
  const dispatch = useDispatch();

  const toast = {
    info: (message) => {
      dispatch(updateToastState({ message, type: "info", show: true }));
      setTimeout(() => {
        dispatch(updateToastState({ show: false }));
      }, options.closeDelay);
    },
    success: (message) => {
      console.log({ message, type: "success", show: true });
      dispatch(updateToastState({ message, type: "success", show: true }));
      setTimeout(() => {
        dispatch(updateToastState({ show: false }));
      }, options.closeDelay);
    },
    error: (message) => {
      dispatch(updateToastState({ message, type: "error", show: true }));
      setTimeout(() => {
        dispatch(updateToastState({ show: false }));
      }, options.closeDelay);
    },
    warning: (message) => {
      dispatch(updateToastState({ message, type: "warning", show: true }));
      setTimeout(() => {
        dispatch(updateToastState({ show: false }));
      }, options.closeDelay);
    },
  };

  return { toast };
};

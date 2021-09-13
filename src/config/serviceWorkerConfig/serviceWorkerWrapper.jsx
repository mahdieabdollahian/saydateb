import React, { useEffect } from "react";
import * as serviceWorker from "./register-serviceWorker";
import Modal from "../../components/shared/modal/modal";

const ServiceWorkerWrapper = () => {
  const [showReload, setShowReload] = React.useState(false);
  const [waitingWorker, setWaitingWorker] = React.useState(null);

  const onSWUpdate = registration => {
    setShowReload(true);
    setWaitingWorker(registration.waiting);
  };
  const handleClose = () => {
    setShowReload(false);
  };
  useEffect(() => {
    serviceWorker.register({ onUpdate: onSWUpdate });
  }, []);

  const reloadPage = () => {
    waitingWorker?.postMessage({ type: "SKIP_WAITING" });
    setShowReload(false);
    window.location.reload();
  };

  return (
    <Modal
      open={showReload}
      title="به روز رسانی اپلیکیشن"
      actionLabel="تایید"
      handleClose={handleClose}
      handleAction={reloadPage}
    >
      نسخه جدید اپلیکیشن پیشرو در دسترس است و در صورت تایید بروزرسانی می شود.
    </Modal>
  );
};

export default ServiceWorkerWrapper;

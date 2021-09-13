import React from "react";
import { useTranslation } from "react-i18next";
import DynamicForm from "../../../../shared/dynamicForm/dynamicForm";
import Modal from "../../../../shared/modal/modal";
import logo from "../../../../../assets/images/logo.png";

const ChargeAccountModal = ({
  openSearch,
  handleClose,
  handleSubmit,
  loading,
}) => {
  const { t } = useTranslation();

  const fields = [
    {
      id: "chargeAmount",
      label: t("chargeAmount"),
      type: "number",
    },
  ];

  return (
    <Modal
      open={openSearch}
      actionLabel={t("electronicPayment")}
      handleClose={handleClose}
      logo={logo}
      title={t("nevisaChargeAccount")}
    >
      <DynamicForm
        fields={fields}
        buttonType="submit"
        buttonText={t("electronicPayment")}
        submit={handleSubmit}
        loading={loading}
      />
    </Modal>
  );
};

export default ChargeAccountModal;

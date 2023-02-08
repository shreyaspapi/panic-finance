import React from "react";
import { useState } from "react";
import { Button, Modal } from "antd";

type Props = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  showModal: () => void;
};

function PositionsModal({
  isModalOpen,
  handleOk,
  handleCancel,
  showModal,
}: Props) {
  return (
    <Modal
      title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
}

export default PositionsModal;

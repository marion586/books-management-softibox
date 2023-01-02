import React, { useState } from "react";
import { Button, Modal } from "antd";

interface modalProps {
  children: React.ReactNode;
  isShowModal: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const App: React.FC<modalProps> = ({
  children,
  isShowModal,
  handleOk,
  handleCancel,
}) => {
  return (
    <>
      <Modal
        title="Basic Modal"
        open={isShowModal}
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
      >
        {children}
      </Modal>
    </>
  );
};

export default App;

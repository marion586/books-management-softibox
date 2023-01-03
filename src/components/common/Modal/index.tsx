import React, { useState } from "react";
import { Button, Modal } from "antd";

import "./style.scss";

interface modalProps {
  children: React.ReactNode;
  isShowModal: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  title?: string;
}

const App: React.FC<modalProps> = ({
  children,
  isShowModal,
  handleOk,
  handleCancel,
  title = "Add Data",
}) => {
  return (
    <>
      <Modal
        title={title}
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

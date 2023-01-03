import React from "react";
import { message, Popconfirm } from "antd";

const cancel = (e: React.MouseEvent<HTMLElement> | undefined) => {};

interface propType {
  children: React.ReactNode;
  deleteItem: () => void;
}

const App: React.FC<propType> = ({ children, deleteItem }) => {
  const confirm = (e: React.MouseEvent<HTMLElement> | undefined) => {
    deleteItem();
  };

  return (
    <Popconfirm
      title="Delete the task"
      description="Are you sure to delete this task?"
      onConfirm={confirm}
      onCancel={cancel}
      okText="Yes"
      cancelText="No"
    >
      <a href="#"> {children} </a>
    </Popconfirm>
  );
};

export default App;

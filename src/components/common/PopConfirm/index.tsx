import React from "react";
import { Button, Popconfirm } from "antd";

interface propData {
  title: string;
  desctiption: string;
  deleteItem: () => void;
  children: React.ReactNode;
}
const App: React.FC<propData> = ({
  title,
  desctiption,
  deleteItem,
  children,
}) => {
  const confirm = () =>
    new Promise((resolve) => {
      deleteItem();
      setTimeout(() => resolve(null), 3000);
    });

  return (
    <Popconfirm
      title={title}
      description={desctiption}
      onConfirm={confirm}
      onOpenChange={() => console.log("open change")}
    >
      {children}
    </Popconfirm>
  );
};

export default App;

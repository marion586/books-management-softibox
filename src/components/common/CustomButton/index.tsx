import React, { FC } from "react";
import { Button } from "antd";
import "./style.scss";
import { SizeType } from "antd/lib/config-provider/SizeContext";

interface ButtonProps {
  content: string;
  type: React.CSSProperties | undefined;
  size?: SizeType;
  href?: string;
  icon?: JSX.Element; // optionnel ?
  handleClick: () => void;
  classType?: string;
}

const ButtonCustom: FC<ButtonProps> = ({
  content,
  type,
  icon,
  href,
  size,
  handleClick,
  classType,
}) => {
  let fontSize = 10;
  switch (size) {
    case "small":
      fontSize = 10;
      break;
    case "middle":
      fontSize = 14;
      break;
    case "large":
      fontSize = 16;
      break;
    default:
      fontSize = 14;
      break;
  }
  return (
    <>
      <Button
        href={href}
        icon={icon}
        style={{ ...type, fontSize: fontSize }}
        size={size}
        onClick={() => handleClick()}
        className={classType}
      >
        {content}
      </Button>
    </>
  );
};

export default ButtonCustom;

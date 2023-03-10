import React, { FC, useState } from "react";
import "./style.scss";
import { AiOutlineUser, AiOutlineTag } from "react-icons/ai";

interface propType {
  bookLeng: number;
  changeFilter: (value: string) => void;
}
interface listType {
  label: string;
  value: string;
}

let filterList: listType[] = [
  {
    label: "Author",
    value: "author",
  },
  {
    label: "Title",
    value: "gender",
  },
];
const FilterCompenent: FC<propType> = ({ bookLeng, changeFilter }) => {
  const [active, setActive] = useState("author");
  return (
    <div className="list  flex flex-wrap justify-between ">
      <span className="font-bold text-[11px] text-center">
        {bookLeng} Books
      </span>

      <div className="flex justify-around ">
        <span className="text-[10px] w-[80px]">Sort By:</span>
        <ul className="list__group">
          {filterList.map((item: listType) => (
            <li
              key={item.value}
              onClick={() => {
                changeFilter(item.value);

                setActive(item.value);
              }}
              className={`list__group-item flex items-center gap-[5px] text-[grey] ${
                active == item.value && "list__group-active text-white"
              }`}
            >
              {item.value === "author" ? <AiOutlineUser /> : <AiOutlineTag />}{" "}
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterCompenent;

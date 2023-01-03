import React, { FC, useState } from "react";
import "./style.scss";

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
    label: "Gender",
    value: "gender",
  },
];
const FilterCompenent: FC<propType> = ({ bookLeng, changeFilter }) => {
  const [active, setActive] = useState("author");
  return (
    <div className="list flex justify-between">
      <span className="font-bold">{bookLeng} Books</span>

      <div className="flex gap-[50px]">
        <span>Sort By:</span>
        <ul className="list__group">
          {filterList.map((item: listType) => (
            <li
              key={item.value}
              onClick={() => {
                changeFilter(item.value);

                setActive(item.value);
              }}
              className={`list__group-item text-[grey] ${
                active == item.value && "list__group-active text-white"
              }`}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterCompenent;

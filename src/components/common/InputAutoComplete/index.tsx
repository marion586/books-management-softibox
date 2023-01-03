import React, { useState, useEffect } from "react";
import { AutoComplete, Input } from "antd";
import { bookModel } from "../../../models/bookModel";

interface optionType {
  value: string;
}
interface propType {
  data: bookModel[];
  filterType: string;
  onSearch: (data: string) => void;
}

const removeOptionsDuplicata = (optionsData: optionType[]) => {
  let d = new Set([...optionsData.map((item: optionType) => item.value)]);
  return [...d].map((d) => ({ value: d }));
};

const filterdata = (data: bookModel[], filter: string) => {
  let optionsData;
  if (filter == "author") {
    optionsData = [...data.map((item: bookModel) => ({ value: item.author }))];
  } else {
    optionsData = [...data.map((item: bookModel) => ({ value: item.title }))];
  }

  return removeOptionsDuplicata(optionsData);
};

const App: React.FC<propType> = ({ data, filterType, onSearch }) => {
  const [options, setOptions] = useState<optionType[]>([]);

  useEffect(() => {
    setOptions(filterdata(data, filterType));
  }, [data, filterType]);

  return (
    <AutoComplete
      style={{ width: 300 }}
      options={options}
      onSearch={onSearch}
      onSelect={(value, option) => onSearch(value)}
      filterOption={(inputValue, option) =>
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    >
      <Input.Search size="middle" placeholder="Search box" enterButton />
    </AutoComplete>
  );
};

export default App;

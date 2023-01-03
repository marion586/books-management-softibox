import React, { useState, useEffect } from "react";
import { AutoComplete, Input } from "antd";
import { bookModel } from "../../../models/bookModel";

interface optionType {
  value: string;
}
interface propType {
  data: bookModel[];
  filterType: string;
}

const onSearch = (data: any) => {
  console.log(data);
};

const filterdata = (data: bookModel[], filter: string) => {
  console.log(data, "data");
  let optionsData;
  if (filter == "author") {
    optionsData = [...data.map((item: bookModel) => ({ value: item.author }))];
    console.log(optionsData);
    return optionsData;
  } else {
    optionsData = [...data.map((item: bookModel) => ({ value: item.title }))];
    return optionsData;
  }
};

const App: React.FC<propType> = ({ data, filterType }) => {
  const [options, setOptions] = useState<optionType[]>([]);

  useEffect(() => {
    setOptions(filterdata(data, filterType));
    console.log(options);
  }, []);

  return (
    <AutoComplete
      style={{ width: 300 }}
      options={options}
      onSearch={onSearch}
      filterOption={(inputValue, option) =>
        option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    >
      <Input.Search size="middle" placeholder="Search box" enterButton />
    </AutoComplete>
  );
};

export default App;

import { useState, useEffect } from "react";
import { getData } from "./utils/getData";
import BookItem from "./components/container/BokkItem/BookItem";
import { bookModel } from "./models/bookModel";
import FilterCompenent from "./components/container/FilterCompenent";
import { Pagination, Divider } from "antd";

const PAGE_SIZE = 5;

const App = () => {
  const [data, setData] = useState([]);
  const [dataPagination, setDataPagination] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(5);
  const [filtertype, setTFiltertype] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setPagination(1);
  }, [data]);

  useEffect(() => {
    setTFiltertype((value) => value);
  }, [filtertype]);

  const fetchData = async () => {
    try {
      const response = await getData("books.json", "json");
      await setData(response);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    return data;
  };

  const setPagination = (page: number) => {
    page > 1 && setCurrent(PAGE_SIZE * page - PAGE_SIZE);
    setTotal((prev) => PAGE_SIZE * page);
    let tmp = data.filter((item, index) => index >= current && index < total);
    setDataPagination(tmp);
  };

  const onChangeFilter = (value: string) => {
    console.log(value);
    setTFiltertype(value);
    console.log(filtertype);
  };

  return (
    <div className="book-content">
      <FilterCompenent
        bookLeng={data.length}
        changeFilter={(value: string) => onChangeFilter(value)}
      />

      <Divider />

      {loading ? (
        <p>...Loading</p>
      ) : (
        <div className="grid grid-cols-2 gap-[20px]">
          {data.length ? (
            dataPagination.map((dataItem: bookModel) => (
              <a href={dataItem.link} target="_blank">
                <BookItem data={dataItem} />
              </a>
            ))
          ) : (
            <p>Data vide</p>
          )}
        </div>
      )}

      {data.length && (
        <Pagination
          className="pagination-content"
          total={data.length}
          showTotal={(total) => `Total ${total} items`}
          pageSize={5}
          defaultCurrent={current}
          onChange={(page) => {
            setPagination(page);
          }}
        />
      )}
    </div>
  );
};

export default App;

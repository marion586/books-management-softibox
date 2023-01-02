import { useState, useEffect } from "react";
import { getData } from "./utils/getData";
import BookItem from "./components/container/BokkItem/BookItem";
import { bookModel } from "./models/bookModel";
import FilterCompenent from "./components/container/FilterCompenent/index";
import { Pagination, Divider } from "antd";
import CustomButton from "./components/common/CustomButton";
import { Theme } from "./Themes/books.theme";
import { Input } from "antd";
import Modal from "./components/common/Modal/index";

const { Search } = Input;

const PAGE_SIZE = 5;

const App = () => {
  const [data, setData] = useState([]);
  const [dataPagination, setDataPagination] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(5);
  const [filtertype, setTFiltertype] = useState("author");
  const [showModal, setTShowModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setPagination(1);
  }, [data]);

  useEffect(() => {
    setTFiltertype((value) => value);
  }, [filtertype, data]);

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
    setTFiltertype(value);
  };

  const onSearch = (value: string) => {
    console.log(filtertype, value);
    if (value != "") {
      if (filtertype == "author") {
        console.log("value");
        let author = data.filter((item: bookModel) =>
          item.author.includes(value)
        );
        setDataPagination(author);
      } else {
        let gender = data.filter((item: bookModel) =>
          item.author.includes(value)
        );
        setDataPagination(gender);
      }
    } else {
      setPagination(1);
    }
  };

  const handleModalOk = () => {
    setTShowModal(false);
  };

  const handleModalCancel = () => {
    setTShowModal(false);
  };

  return (
    <div className="book-content">
      <div className="flex justify-center gap-[20px] mb-[20px]">
        <Search
          placeholder="Search Box"
          size="middle"
          onSearch={onSearch}
          onChange={(event) => onSearch(event.target.value)}
          enterButton
          className="w-[300px]"
        />
        <Modal
          isShowModal={showModal}
          handleOk={() => handleModalOk()}
          handleCancel={() => handleModalCancel()}
        >
          <p>marion</p>
        </Modal>
        <CustomButton
          handleClick={() => {
            setTShowModal(true);
            console.log(showModal);
          }}
          type={Theme.button.primary}
          content="Add Book"
          classType="w-[100px]"
        ></CustomButton>
      </div>

      <FilterCompenent
        bookLeng={data.length}
        changeFilter={(value: string) => onChangeFilter(value)}
      />

      <Divider />

      {loading ? (
        <p>...Loading</p>
      ) : (
        <div className="grid grid-cols-2 gap-[20px]">
          {dataPagination.length ? (
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

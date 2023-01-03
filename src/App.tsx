import { useState, useEffect } from "react";
import { getData } from "./utils/getData";
import BookItem from "./components/container/BokkItem/BookItem";
import { bookModel } from "./models/bookModel";
import FilterCompenent from "./components/container/FilterCompenent/index";
import { Pagination, Divider } from "antd";
import CustomButton from "./components/common/CustomButton";
import { Theme } from "./Themes/books.theme";
import { Input, message } from "antd";
import Modal from "./components/common/Modal/index";
import AddForm from "./components/container/AddForm";

const { Search } = Input;

const PAGE_SIZE = 5;

const App = () => {
  const [data, setData] = useState<any>([]);
  const [dataPagination, setDataPagination] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(1);
  const [total, setTotal] = useState(5);
  const [filtertype, setTFiltertype] = useState("author");
  const [showModal, setTShowModal] = useState(false);
  const [addData, setAddData] = useState({
    title: "",
    author: "",
    year: "",
    imageLink: "",
    pages: "",
    link: "",
    langage: "English",
    country: "default",
  });

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
    // page > 1 && setCurrent(PAGE_SIZE * page - PAGE_SIZE);
    // setTotal((prev) => PAGE_SIZE * page);
    if (page > 1) {
      setCurrent(PAGE_SIZE * page - PAGE_SIZE);
      setTotal((prev) => PAGE_SIZE * page);
    } else {
      setCurrent(page);
      setTotal(PAGE_SIZE);
    }
    let tmp = data.filter(
      (item: bookModel, index: number) => index >= current && index < total
    );
    setDataPagination(tmp);
  };

  const onChangeFilter = (value: string) => {
    setTFiltertype(value);
  };

  const onSearch = (value: string) => {
    if (value != "") {
      if (filtertype == "author") {
        console.log(value);
        let author = data.filter((item: bookModel) =>
          item.author.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        );
        setDataPagination(author);
      } else {
        console.log(value);
        let gender = data.filter((item: bookModel) =>
          item.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        );
        console.log(gender);
        setDataPagination(gender);
      }
    } else {
      setPagination(1);
    }
  };

  const handleModalOk = () => {
    setTShowModal(false);
    let newData = [addData, ...data];
    setData(newData);
    message.success(`book Added successfully`);
    setAddData({
      title: "",
      author: "",
      year: "",
      imageLink: "",
      pages: "",
      link: "",
      langage: "English",
      country: "default",
    });
  };

  const handleModalCancel = () => {
    setTShowModal(false);
  };

  const changeData = (data: any) => {
    setAddData((prev) => ({ ...prev, [data.target.name]: data.target.value }));
  };

  const changeDate = (d: any) => {
    setAddData((prev) => ({ ...prev, year: d.dateString }));
  };

  const changeFile = (file: string) => {
    console.log(file);
    setAddData((prev) => ({ ...prev, imageLink: `images/${file}` }));
  };

  const deleteItem = (id: number) => {
    let newData = data.filter((item: bookModel, index: number) => index != id);
    message.success(`book deleted`);
    setData(newData);
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
          <AddForm
            changeValue={(data) => changeData(data)}
            addData={addData}
            changeDate={changeDate}
            changeFile={changeFile}
          />
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
            dataPagination.map((dataItem: bookModel, id) => (
              <BookItem data={dataItem}>
                <CustomButton
                  handleClick={() => {
                    setTShowModal(true);
                    console.log(showModal);
                  }}
                  type={Theme.button.primary}
                  content="Edit Book"
                  classType="w-[100px]"
                ></CustomButton>
                <CustomButton
                  handleClick={() => deleteItem(id)}
                  type={Theme.button.danger}
                  content="Delete Book"
                  classType="w-[100px]"
                ></CustomButton>
              </BookItem>
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

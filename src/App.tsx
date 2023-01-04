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
import PopConfirm from "./components/common/PopConfirm";
import SearchAuto from "./components/common/InputAutoComplete";
import Spinner from "./components/common/Spinner";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import Empty from "./components/common/Empty";
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
  const [editTitle, setEditTitle] = useState("");
  const [addData, setAddData] = useState({
    title: "",
    author: "",
    year: null,
    imageLink: "",
    pages: "",
    link: "",
    langage: "English",
    country: "default",
  });

  const [edit, setEdit] = useState<bookModel | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setPagination(1);
  }, [data]);

  useEffect(() => {
    setTFiltertype((value) => value);
  }, [filtertype, data]);

  useEffect(() => {
    setCurrent((current) => current);
    setTotal((total) => total);
  }, [current, total]);
  const fetchData = async () => {
    try {
      const response = await getData("books.json", "json");
      setData(response);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
    return data;
  };

  const setPagination = (page: number) => {
    console.log(page);
    let curr = 0;
    let t = 0;
    if (page > 1) {
      curr = PAGE_SIZE * page - PAGE_SIZE;

      t = PAGE_SIZE * page;
      setCurrent(curr);
      setTotal(t);
    } else {
      curr = page - 1;
      t = PAGE_SIZE;
      setCurrent(curr);
      setTotal(t);
    }
    console.log(curr, t);
    let tmp = data.filter(
      (item: bookModel, index: number) => index >= curr && index < t
    );
    console.log(tmp);
    setDataPagination(tmp);
  };

  const onChangeFilter = (value: string) => {
    setTFiltertype(value);
  };

  const onSearch = (value: string) => {
    if (value != "") {
      if (filtertype == "author") {
        let author = data.filter((item: bookModel) =>
          item.author.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        );
        setDataPagination(author);
      } else {
        let gender = data.filter((item: bookModel) =>
          item.title.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        );

        setDataPagination(gender);
      }
    } else {
      setPagination(1);
    }
  };

  const handleModalOk = async () => {
    if (edit == null) {
      let newData = [addData, ...data];
      setData(newData);
      message.success(`book Added successfully`);
      setAddData({
        title: "",
        author: "",
        year: null,
        imageLink: "",
        pages: "",
        link: "",
        langage: "English",
        country: "default",
      });
    } else {
      let editedData = await data.map((item: bookModel) =>
        item.title == editTitle ? edit : item
      );
      message.success(`book edited successfully`);
      setData(editedData);
      setEdit(null);
      setEditTitle("");
    }

    setTShowModal(false);
  };

  const handleModalCancel = () => {
    setTShowModal(false);
    setEdit(null);
  };

  const changeData = (data: any) => {
    if (edit == null) {
      setAddData((prev) => ({
        ...prev,
        [data.target.name]: data.target.value,
      }));
    } else {
      setEdit({ ...edit, [data.target.name]: data.target.value });
    }
  };

  const changeDate = (d: any) => {
    if (edit == null) {
      setAddData((prev) => ({ ...prev, year: d.dateString }));
    } else {
      setEdit({ ...edit, year: d.dateString });
    }
  };

  const changeFile = (file: string) => {
    if (edit == null) {
      setAddData((prev) => ({ ...prev, imageLink: `images/${file}` }));
    } else {
      setEdit({ ...edit, imageLink: `images/${file}` });
    }
  };

  const deleteItem = (title: string) => {
    let newData = data.filter(
      (item: bookModel, index: number) => item.title != title
    );
    message.success(`book deleted`);
    setData(newData);
  };
  const editModal = (edit: bookModel) => {
    setEdit(edit);
    setEditTitle(edit.title);
    setTShowModal(true);
  };
  return (
    <div className="book-content">
      <div className="flex justify-center gap-[20px] mb-[20px]">
        <SearchAuto
          data={data}
          filterType={filtertype}
          onSearch={(value) => onSearch(value)}
        />
        <Modal
          isShowModal={showModal}
          handleOk={() => handleModalOk()}
          handleCancel={() => handleModalCancel()}
          title={edit ? "Edit Data" : "Add data"}
        >
          <AddForm
            changeValue={(data) => changeData(data)}
            addData={edit ? edit : addData}
            changeDate={changeDate}
            changeFile={changeFile}
          />
        </Modal>
        <CustomButton
          handleClick={() => {
            setTShowModal(true);
          }}
          type={Theme.button.primary}
          content="Add Book"
          icon={<AiOutlinePlus />}
          classType="w-[100px]"
        />
      </div>

      <FilterCompenent
        bookLeng={data.length}
        changeFilter={(value: string) => onChangeFilter(value)}
      />

      <Divider />

      {loading ? (
        <div className="flex   justify-center ">
          <Spinner />
        </div>
      ) : (
        <div className="grid  grid-cols-2 gap-[20px]">
          {dataPagination.length ? (
            dataPagination.map((dataItem: bookModel, id) => (
              <BookItem data={dataItem} key={dataItem.title}>
                <CustomButton
                  handleClick={() => editModal(dataItem)}
                  type={Theme.button.primary}
                  content="Edit Book"
                  icon={<AiOutlineEdit />}
                  classType="w-[100px]"
                ></CustomButton>
                <PopConfirm deleteItem={() => deleteItem(dataItem.title)}>
                  <CustomButton
                    handleClick={() => console.log(id)}
                    type={Theme.button.danger}
                    content="Delete Book"
                    icon={<AiOutlineDelete fontSize={20} width={20} />}
                    classType="w-[100px]"
                  ></CustomButton>
                </PopConfirm>
              </BookItem>
            ))
          ) : (
            <div className="flex  col-span-3 justify-center ">
              <Empty />
            </div>
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

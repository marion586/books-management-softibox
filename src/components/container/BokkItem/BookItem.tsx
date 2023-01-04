import React, { FC } from "react";
import { bookModel } from "../../../models/bookModel";
import { Row, Col } from "antd";
import Heading from "../../common/Heading";

import "./style.scss";
import ButtonCustom from "../../common/CustomButton";
interface bookProps {
  data: bookModel;
  children: React.ReactNode;
}

const BookItem: FC<bookProps> = ({ data, children }) => {
  return (
    <Row className="book-item__wrapper" gutter={2}>
      <Col className="w-full lg:w-auto">
        <a href={data.link} target="_blank">
          <figure className="book-item__image">
            <img src={`/src/assets/${data.imageLink}`} alt="image" />
          </figure>
        </a>
      </Col>

      <Col className="flex flex-col items-center lg:items-start w-full lg:w-auto">
        <Heading title={data.title} level={5} />
        <span className="book-item__content">{data.author}</span>

        <Row>
          <Col>
            <span className="book-item__content">Page: </span>{" "}
            <span className="book-item__value">{data.pages}</span> <br />
            <span className="book-item__content">Year: </span>{" "}
            <span className="book-item__value">{data.year}</span> <br />
          </Col>
        </Row>

        <div className="flex flex-wrap gap-[10px] justify-center book-item__btn-group">
          {children}
        </div>
      </Col>
    </Row>
  );
};

export default BookItem;

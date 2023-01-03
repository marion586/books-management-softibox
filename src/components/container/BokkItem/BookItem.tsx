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
      <Col>
        <a href={data.link} target="_blank">
          <figure className="book-item__image">
            <img src={`/src/assets/${data.imageLink}`} alt="image" />
          </figure>
        </a>
      </Col>

      <Col>
        <Heading title={data.title} level={5} />
        <span>{data.author}</span>

        <Row>
          <Col>
            <span className="">Page</span> <span>{data.pages}</span> <br />
            <span className="">Year</span> <span>{data.year}</span> <br />
          </Col>
        </Row>

        <div className="flex justify-between book-item__btn-group">
          {children}
        </div>
      </Col>
    </Row>
  );
};

export default BookItem;

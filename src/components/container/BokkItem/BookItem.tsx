import React, { FC } from "react";
import { bookModel } from "../../../models/bookModel";
import { Row, Col } from "antd";
import Heading from "../../common/Heading";

import "./style.scss";
interface bookProps {
  data: bookModel;
}

const BookItem: FC<bookProps> = ({ data }) => {
  return (
    <Row className="book-item__wrapper" gutter={2}>
      <Col>
        <figure className="book-item__image">
          <img src={`/src/assets/${data.imageLink}`} alt="image" />
        </figure>
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

        <Row
          justify="space-between"
          gutter={2}
          className="book-item__btn-group"
        >
          <Col>
            <span>Edit Book</span>
          </Col>

          <Col>
            <span>Delete Book</span>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default BookItem;

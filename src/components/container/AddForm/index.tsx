import React, { useState } from "react";
import { Form, Input } from "antd";
import type { DatePickerProps } from "antd";
import { DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";

type RequiredMark = boolean | "optional";

interface addData {
  addData: {
    title: string;
    author: string;
    year: any;
    imageLink: string;
    pages: string;
    link: string;
  };
  changeValue: (value: any) => void;
  changeDate: (value: object) => void;
  changeFile: (file: string) => void;
}

const App: React.FC<addData> = ({
  changeValue,
  addData,
  changeDate,
  changeFile,
}) => {
  const [form] = Form.useForm();

  const [requiredMark, setRequiredMarkType] =
    useState<RequiredMark>("optional");

  const onRequiredTypeChange = ({
    requiredMarkValue,
  }: {
    requiredMarkValue: RequiredMark;
  }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    let d = {
      date,
      dateString,
    };
    changeDate(d);
  };

  const props: UploadProps = {
    name: "imageLink",
    action: "",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file.name, info.fileList);
        changeFile(info.file.name);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        // message.error(`${info.file.name} file upload failed.`);
      }
    },
  };
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{ requiredMarkValue: requiredMark }}
      onValuesChange={onRequiredTypeChange}
      requiredMark={requiredMark}
    >
      <Form.Item label="Title" required tooltip="This is a required field">
        <Input
          value={addData.title}
          onChange={(value) => changeValue(value)}
          name="title"
          placeholder="input placeholder"
        />
      </Form.Item>

      <Form.Item label="Author" required tooltip="This is a required field">
        <Input
          value={addData.author}
          name="author"
          onChange={(value) => changeValue(value)}
          placeholder="input placeholder"
        />
      </Form.Item>

      <Form.Item label="Pages" required tooltip="This is a required field">
        <Input
          value={addData.pages}
          name="pages"
          onChange={(value) => changeValue(value)}
          placeholder="Enter Pages"
        />
      </Form.Item>

      <Form.Item label="link" required tooltip="This is a required field">
        <Input
          value={addData.link}
          name="link"
          onChange={(value) => changeValue(value)}
          placeholder="Enter link"
        />
      </Form.Item>

      <Form.Item label="Year" required tooltip="This is a required field">
        <DatePicker
          name="year"
          onChange={onChange}
          className="w-full"
          picker="year"
        />
      </Form.Item>

      <Form.Item label="Image" required tooltip="This is a required field">
        <Upload {...props} className="w-full">
          <Button icon={<UploadOutlined />} className="w-full">
            Click to Upload
          </Button>
        </Upload>
      </Form.Item>
    </Form>
  );
};

export default App;

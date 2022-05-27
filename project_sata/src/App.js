import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import clientUtils from "./utils/client-utils";
import { Button, Table, Modal, Form, Input, Spin, message } from "antd";
import "antd/dist/antd.css";
import { SvgCreateNew } from "./svg";
const App = () => {
  const [data, setData] = useState([]);
  const [state, _setState] = useState({
    loading: true,
    modalVisible: false,
  });
  const [form] = Form.useForm();
  const setState = (data = {}) => {
    _setState((prev) => {
      return {
        ...prev,
        ...data,
      };
    });
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    clientUtils
      .getData()
      .then((res) => {
        let dataRespon = res?.data || [];
        setData(dataRespon);
        setState({ loading: false });
      })
      .catch((err) => {
        console.log(err);
        setState({ loading: false });
      });
  };

  const columns = [
    {
      title: "userId",
      key: "userId",
      dataIndex: "userId",
    },
    {
      title: "id",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "body",
      key: "body",
      dataIndex: "body",
    },
  ];

  const renderInput = ({ name = "", label = "" }) => {
    return (
      <Form.Item
        name={name}
        label={label}
        rules={[
          {
            required: true,
            message: `${label} không được bỏ trống `,
          },
        ]}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input placeholder={`Nhập ${label.toLowerCase()}`} autoComplete="off" />
      </Form.Item>
    );
  };
  const onClose = () => {
    setState({ modalVisible: false });
  };

  const submit = (dataForm) => {
    setState({ loading: true });
    clientUtils
      .postData(dataForm)
      .then((res) => {
        let dataRespon = res?.data || {};
        let newData = [dataRespon, ...data];
        setData(newData);
        onClose();
        setState({ loading: false });
        form.resetFields();
        message.success("Thêm mới dữ liệu thành công");
      })
      .catch((err) => {
        console.log(err);
        setState({ loading: false });
        message.error("Thêm mới dữ liệu thất bại")
      });
  };
  return (
    <div className="App">
      <div className="header">
        <h1 className="title">Bảng dữ liệu</h1>
        <Button onClick={() => setState({ modalVisible: true })}>
          <SvgCreateNew />
          Thêm mới
        </Button>
      </div>
      <Spin spinning={state.loading}>
        <Table
          dataSource={data}
          columns={columns}
          pagination={false}
          scroll={{ y: 550 }}
        />
        <Modal visible={state.modalVisible} footer={null} onCancel={onClose}>
          <div className="title-modal">Thêm dữ liệu</div>
          <Form onFinish={submit} form={form}>
            {renderInput({ name: "userId", label: "userId" })}
            {renderInput({ name: "title", label: "title" })}
            {renderInput({ name: "body", label: "body" })}

            <div className="wrap-btn">
              <Button htmlType="button" onClick={onClose}>
                Thoát
              </Button>
              <Button htmlType="submit">Lưu</Button>
            </div>
          </Form>
        </Modal>
      </Spin>
    </div>
  );
};

export default App;

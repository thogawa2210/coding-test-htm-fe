import { MailOutlined, MessageOutlined } from "@ant-design/icons";
import { Button, Modal, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import "./App.css";
import FormComponent from "./components/Form";

const axiosInstance = axios.create({
  baseURL: "http://localhost:1337/api", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Define a fetcher function for SWR
const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

const { Column } = Table;

interface DataType {
  id: number;
  name: string;
  lastName: string;
  country: string;
  city: string;
  email: string;
  phone: string;
}

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { data, isLoading, mutate } = useSWR("/contacts", fetcher);

  useEffect(() => {
    if (data.data) setContacts(data.data);
  }, [data]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end w-full justify-end">
        <Button onClick={showModal}>Add</Button>
      </div>
      <Table<DataType>
        dataSource={contacts}
        loading={isLoading}
        pagination={false}
      >
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Last Name" dataIndex="lastName" key="lastName" />

        <Column title="Country" dataIndex="country" key="country" />
        <Column title="City" dataIndex="city" key="city" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Phone" dataIndex="phone" key="phone" />

        <Column
          title="Action"
          key="action"
          render={() => (
            <div className="flex gap-2">
              <Button icon={<MailOutlined />}></Button>
              <Button icon={<MessageOutlined />}></Button>
            </div>
          )}
        />
      </Table>

      <Modal
        title="Create"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={<></>}
      >
        <FormComponent
          mutate={mutate}
          axios={axiosInstance}
          closeModal={handleCancel}
        />
      </Modal>
    </div>
  );
}

export default App;

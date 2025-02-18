import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Modal} from 'antd';
import DetailedForm from "./DetailedForm";
import "./Header.css";
const Header = () =>{
    // const [search,setSearch]=useState('');
    const [isModalOpen,setisModalOpen]=useState(false);
    const [formData, setFormData] = useState(null);

    
    const handleFormData = (data) => {
      setFormData(data);
      console.log("Form Data from Child:", data);
      setisModalOpen(false);
      sendDataToBackend();
    };

    const sendDataToBackend=()=>{
        if (formData) {
          fetch("http://localhost:8080/api/addtask", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then((response) => {
              if (response.ok) {
                console.log("Task successfully added");
              } else {
                console.error("Failed to add task");
              }
            })
            .catch((error) => {
              console.error("Error sending data to backend:", error);
          });
        }
    }

    const formRender=()=>{
        setisModalOpen(true);
    }
    const handleOk=()=>{
        setisModalOpen(false);
    }
    const handleCancel=()=>{
        setisModalOpen(false);
    }
    return (
        <div className="header">
            <Flex gap="large">
                <Input className="inputStyle" placeholder="Search" prefix={<SearchOutlined/>} />
                <Button type="primary" size='middle' onClick={formRender}>ADD</Button>
                <Modal title="Add New Task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                    <DetailedForm onFormSubmit={handleFormData}/>
                </Modal>
            </Flex>
        </div>
    )
}

export default Header;
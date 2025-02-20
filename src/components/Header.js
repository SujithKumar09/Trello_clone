import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Modal} from 'antd';
import DetailedForm from "./DetailedForm";
import DisplayTable from "./DisplayTable";
import "./Header.css";


const Header = () =>{
    // const [search,setSearch]=useState('');
    const [isModalOpen,setisModalOpen]=useState(false);
    const [formData, setFormData] = useState({
      taskName: "",
      taskDescription: "",
      status: "Not Started",
      dateCreated: null,
      bp: "",
      devHours: 0,
      qaHours: 0,
      approvedBy: "",
      isBillable: true,
      dueDate: null,
      assignedTo: "",
      releaseDate: null,
    });
    const [iseditCalled,setisEditCalled]=useState(false);
    
    const handleFormData = (data) => {
      setFormData(data);
      setisModalOpen(false);
      console.log(data);
      if(iseditCalled){
        sendEditedTaskToBackend(data);
        setisEditCalled(false);
      }
      else{
        sendAddedTaskToBackend(data);
      }
    };

    const handleEditedData=(data)=>{
      setFormData(data);
      setisEditCalled(true);
      setisModalOpen(true);
    }

    const sendEditedTaskToBackend=(data)=>{
      console.log(data);
        if (data) {
          fetch("http://localhost:8080/api/editTask", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => {
              if (response.ok) {
                console.log("Task successfully edited");
              } else {
                console.error("Failed to add task");
              }
            })
            .catch((error) => {
              console.error("Error sending data to backend:", error);
          });
        }
    }

    const sendAddedTaskToBackend=(data)=>{
      console.log(data);
        if (data) {
          fetch("http://localhost:8080/api/addtask", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
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
        setFormData({});
        setisModalOpen(true);
    }
    const handleOk=()=>{
        setisModalOpen(false);
    }
    const handleCancel=()=>{
        setisModalOpen(false);
    }
    return (
      <div>
        <header className="header">
          <Flex gap="large">
              <Input className="inputStyle" placeholder="Search" prefix={<SearchOutlined/>} />
              <Button type="primary" size='middle' onClick={formRender}>ADD</Button>
              <Modal title="Add New Task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null}>
                  <DetailedForm data={formData} onFormSubmit={handleFormData}/>
              </Modal>
          </Flex>
        </header>
        <DisplayTable onFormSubmit={handleEditedData}/>
      </div>
    )
}

export default Header;
import React from "react";
import { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Row ,Col, Input, Modal } from "antd";
import DetailedForm from "./DetailedForm";
import axios from "axios";
import TaskList from "./TaskList"; 
import "./Header.css";
import DetailsCard from './DetailsCard';

export interface FormData{
  id: number,
  taskName : string,
  taskDescription : string,
  dateCreated : string,
  dueDate : string,
  releaseDate : string,
  status : string,
  bp : string,
  clientName : string,
  isBillable : boolean,
  devHours : number,
  qaHours : number,
  approvedBy : string,
  assignedTo : string
}

const Header: React.FC  = () => {
  const [isModalOpen, setisModalOpen] = useState<boolean>(false);
  const [tasks, setTasks] = useState<FormData[]>([]); 
  const [editingTask, setEditingTask] = useState<FormData | null>(null); 
  const [filteredTasks, setFilteredTasks] = useState<FormData[]>([]); 
  const [searchText, setSearchText] = useState<string>("");
  const [showMoreDetails, setShowMoreDetails] = useState<FormData>({id:0,
    taskName: "",
    taskDescription: "",
    status: "Not Started",
    dateCreated: "",
    bp: "",
    clientName : "",
    devHours: 0,
    qaHours: 0,
    approvedBy: "",
    isBillable: false ,
    dueDate: "",
    assignedTo: "",
    releaseDate: "",
  });

  
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tasks");
      setTasks(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error fetching tasks:", error.response?.data || error.message);
      }
    }
  };


  useEffect(() => {
    fetchTasks();
  }, []);

  const handleFormData = async (data : FormData) => {
    
    try {
      if (editingTask) {
        
        await axios.put(`http://localhost:8080/api/tasks/${editingTask.id}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        console.log("Task updated successfully!");
        
      } else {
        
        await axios.post("http://localhost:8080/api/tasks", data, {
          headers: { "Content-Type": "application/json" },
        });
        console.log("Task saved successfully!");
        
      }
      fetchTasks(); 
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.error("Error saving/updating task:", error.response?.data || error.message);
        alert("Failed to save/update task!");
      }
    }

    setisModalOpen(false);
    setEditingTask(null);
  };

  const formRender = () => {
    setEditingTask(null); 
    setisModalOpen(true);
  };

  const handleCancel = () => {
    setisModalOpen(false);
    setEditingTask(null);
    setShowMoreDetails({id:0,
      taskName: "",
      taskDescription: "",
      status: "Not Started",
      dateCreated: "",
      bp: "",
      clientName : "",
      devHours: 0,
      qaHours: 0,
      approvedBy: "",
      isBillable: false ,
      dueDate: "",
      assignedTo: "",
      releaseDate: "",
    });
  };

  const handleEdit = (task : FormData) => {
    setEditingTask(task);
    setisModalOpen(true);
  };

  const handleShowDetails = (task : FormData) => {
    setShowMoreDetails(task);
  } 

  useEffect(() => {
    const filtered = tasks.filter((task) =>
      [
        task.taskName,
        task.taskDescription,
        task.bp,
        task.approvedBy,
        task.assignedTo
      ]
        .some((field) =>
          field?.toLowerCase().includes(searchText.toLowerCase())
        )
    );

    setFilteredTasks(filtered);
  }, [searchText, tasks]);

  const handleSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };




  return (
    <div>
      <Row className="rowStyle">
        <Col span={18}>
          <Input className="inputStyle" placeholder="Search" prefix={<SearchOutlined />} value={searchText} onChange={handleSearch} />
        </Col>
        <Col span={6}>
        <Button type="primary" size="middle" onClick={formRender}>
            ADD
         </Button>
        </Col>
      </Row>
      <Modal
        title={editingTask!==null ? "Edit Task" : "Add New Task"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={"60%"}
        centered
      >
          <DetailedForm onFormSubmit={handleFormData} editingTask={editingTask} />
      </Modal>

      <Modal
        title="Task Details"
        open={showMoreDetails.taskName!==""?true:false}
        onCancel={handleCancel}
        footer={null}
        width={"40%"}
        centered
      >
          <DetailsCard details={showMoreDetails}/>
      </Modal>
      <TaskList tasks={filteredTasks} onEdit={handleEdit} fetchTasks={fetchTasks} onShowMore={handleShowDetails}/>
    </div>
  );
};

export default Header;

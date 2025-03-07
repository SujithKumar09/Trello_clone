import { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Row,Col, Input, Modal } from "antd";
import DetailedForm from "./DetailedForm";
import axios from "axios";
import TaskList from "./TaskList"; 
import "./Header.css";
import DetailsCard from "./DetailsCard";

const Header = () => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]); 
  const [editingTask, setEditingTask] = useState(null); 
  const [filteredTasks, setFilteredTasks] = useState([]); 
  const [searchText, setSearchText] = useState("");
  const [showMoreDetails, setShowMoreDetails] = useState(null);

  
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data || error.message);
    }
  };


  useEffect(() => {
    fetchTasks();
  }, []);

  const handleFormData = async (data) => {
    
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
      console.error("Error saving/updating task:", error.response?.data || error.message);
      alert("Failed to save/update task!");
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
    setShowMoreDetails(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setisModalOpen(true);
  };

  const handleShowDetails = (task) => {
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

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };




  return (
    <div>
      <Row style={{alignItems:"center", margin:"1em 1em"}}>
        <Col span={18}>
          <Input className="inputStyle" placeholder="Search" prefix={<SearchOutlined />} value={searchText} onChange={handleSearch} />
        </Col>
        <Col span={6}>
        <Button type="primary" size="middle" style={{ marginLeft: "5px" }} onClick={formRender}>
            ADD
         </Button>
        </Col>
      </Row>
      <Modal
        title={editingTask ? "Edit Task" : "Add New Task"}
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
        open={showMoreDetails!==null?true:false}
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

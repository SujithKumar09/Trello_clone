import { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Modal } from "antd";
import DetailedForm from "./DetailedForm";
import axios from "axios";
import TaskList from "./TaskList"; // Import TaskList
import './Header.css'

const Header = () => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]); // State for tasks

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tasks");
      setTasks(response.data); // Set the tasks fetched from the backend
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data || error.message);
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks(); // This will fetch the tasks when the component first mounts
  }, []);

  const handleFormData = async (data) => {
    console.log("Form Data from Child:", data);

    try {
      const response = await axios.post("http://localhost:8080/api/tasks", data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log("Task saved:", response.data);
      alert("Task saved successfully!");
      fetchTasks(); // Refresh the task list after saving the task
    } catch (error) {
      console.error("Error saving task:", error.response?.data || error.message);
      alert("Failed to save task!");
    }
    setisModalOpen(false);
  };

  const formRender = () => {
    setisModalOpen(true);
  };
  const handleOk = () => {
    setisModalOpen(false);
  };
  const handleCancel = () => {
    setisModalOpen(false);
  };

  return (
    <div>
      <Flex gap="large">
          <div style={{margin:"auto", marginTop:"5px"}}>
            <Input className="inputStyle" placeholder="Search" prefix={<SearchOutlined />} style={{width:"400px"}}/>
            <Button type="primary" size="middle"  style={{marginLeft:"5px"}} onClick={formRender}>
              ADD
            </Button>
          </div>
           
          <Modal
            title="Add New Task"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            bodyStyle={{ padding: "10px" }} // Optional: Adjust padding if needed
          >
            <div className="modal-form-container">
              <DetailedForm onFormSubmit={handleFormData} />
            </div>
        </Modal>
      </Flex>
    
      <TaskList tasks={tasks} /> {/* Pass tasks to TaskList */}
    </div>
  );
};

export default Header;

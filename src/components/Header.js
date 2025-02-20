import { useState, useEffect } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Modal } from "antd";
import DetailedForm from "./DetailedForm";
import axios from "axios";
import TaskList from "./TaskList"; // Import TaskList
import "./Header.css";

const Header = () => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]); // State for tasks
  const [editingTask, setEditingTask] = useState(null); // Track task being edited

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
    fetchTasks(); // Fetch the tasks when the component first mounts
  }, []);

  const handleFormData = async (data) => {
    console.log("Form Data from Child:", data);

    try {
      if (editingTask) {
        // Update existing task
        await axios.put(`http://localhost:8080/api/tasks/${editingTask.id}`, data, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Task updated successfully!");
      } else {
        // Create new task
        await axios.post("http://localhost:8080/api/tasks", data, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Task saved successfully!");
      }
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error saving/updating task:", error.response?.data || error.message);
      alert("Failed to save/update task!");
    }

    setisModalOpen(false);
    setEditingTask(null);
  };

  const formRender = () => {
    setEditingTask(null); // Reset edit state
    setisModalOpen(true);
  };

  const handleCancel = () => {
    setisModalOpen(false);
    setEditingTask(null);
  };

  const handleEdit = (task) => {
    setEditingTask(task); // Set the selected task for editing
    setisModalOpen(true);
  };

  return (
    <div>
      <Flex gap="large">
        <div style={{ margin: "auto", marginTop: "5px" }}>
          <Input className="inputStyle" placeholder="Search" prefix={<SearchOutlined />} style={{ width: "400px" }} />
          <Button type="primary" size="middle" style={{ marginLeft: "5px" }} onClick={formRender}>
            ADD
          </Button>
        </div>

        <Modal
          title={editingTask ? "Edit Task" : "Add New Task"}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          bodyStyle={{ padding: "10px", maxHeight: "70vh", overflowY: "auto" }} // Clean scrollbar
        >
          <div className="modal-form-container">
            <DetailedForm onFormSubmit={handleFormData} editingTask={editingTask} />
          </div>
        </Modal>
      </Flex>

      <TaskList tasks={tasks} onEdit={handleEdit} fetchTasks={fetchTasks} />
    </div>
  );
};

export default Header;

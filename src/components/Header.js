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
  const [editingTask, setEditingTask] = useState(null); 
  const [filteredTasks, setFilteredTasks] = useState([]); // State for filtered tasks
  const [searchText, setSearchText] = useState("");

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data || error.message);
    }
  };

//to retrieve all tasks
  useEffect(() => {
    fetchTasks();
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

  //search 

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
          field?.toLowerCase().includes(searchText.toLowerCase()) // Case-insensitive search
        )
    );

    setFilteredTasks(filtered);
  }, [searchText, tasks]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };




  return (
    <div>
      <Flex gap="large">
        <div style={{ margin: "auto", marginTop: "5px" }}>
          <Input className="inputStyle" placeholder="Search" prefix={<SearchOutlined />} style={{ width: "400px" }}  value={searchText}
            onChange={handleSearch} />
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

      <TaskList tasks={filteredTasks} onEdit={handleEdit} fetchTasks={fetchTasks} />
    </div>
  );
};

export default Header;

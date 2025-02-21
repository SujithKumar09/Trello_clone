import { Table, Tag, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import "./taskList.css"
function TaskList({ tasks, onEdit, fetchTasks }) {
  
  const handleDelete = async (taskId) => {
    if (!taskId) {
      console.error("Task ID is undefined, cannot delete.");
      alert("Error: Task ID is missing!");
      return;
    }
  
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${taskId}`);
      alert("Task deleted successfully!");
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message);
      alert("Failed to delete task!");
    }
  };
  

  // Columns for Ant Design Table
  const columns = [
    { title: "Task Name", dataIndex: "taskName", key: "taskName" },
    { title: "Task Description", dataIndex: "taskDescription", key: "taskDescription" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "Completed":
            color = "green";
            break;
          case "On Going":
            color = "blue";
            break;
          case "Not Started":
            color = "orange";
            break;
          case "On Hold":
            color = "red";
            break;
          default:
            color = "gray";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    { title: "Created Date", dataIndex: "dateCreated", key: "dateCreated" },
    { title: "BP", dataIndex: "bp", key: "bp" },
    { title: "Dev Hours", dataIndex: "devHours", key: "devHours" },
    { title: "QA Hours", dataIndex: "qaHours", key: "qaHours" },
    { title: "Approved By", dataIndex: "approvedBy", key: "approvedBy" },
    { 
      title: "Billable", 
      dataIndex: "isBillable", 
      key: "isBillable", 
      render: (value) => {
        if (value === true) return "Yes";
        if (value === false) return "No";
        return "No"; // If null or undefined, display "N/A"
      }
    },
    
    { title: "Due Date", dataIndex: "dueDate", key: "dueDate" },
    { title: "Assigned To", dataIndex: "assignedTo", key: "assignedTo" },
    { title: "Release Date", dataIndex: "releaseDate", key: "releaseDate" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" icon={<EditOutlined />} onClick={() => onEdit(record)} />
          <Popconfirm title="Delete this task?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
            <Button type="link" icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Task List</h2>
      <Table dataSource={tasks} columns={columns} rowKey="id" pagination={{ pageSize: 6 }} />
    </div>
  );
}

export default TaskList;

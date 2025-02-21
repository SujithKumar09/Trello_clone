import { Table, Tag, Button, Popconfirm, Tooltip, Input } from "antd";
import { EditOutlined, DeleteOutlined, SearchOutlined,FunnelPlotOutlined } from "@ant-design/icons";
import axios from "axios";
import "./TaskList.css";

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

  const columns = [
    {
      title: "Task Name",
      dataIndex: "taskName",
      key: "taskName",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <Input
          placeholder="Search Task Name"
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
      ),
      filterIcon: <SearchOutlined style={{ color: "white" }} />,
      onFilter: (value, record) => record.taskName.toLowerCase().includes(value.toLowerCase()),
      ellipsis: true,
    },
    {
      title: "Task Description",
      dataIndex: "taskDescription",
      key: "taskDescription",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <Input
          placeholder="Search Task Description"
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
      ),
      filterIcon: <SearchOutlined style={{ color: "white" }} />,
      onFilter: (value, record) => record.taskDescription.toLowerCase().includes(value.toLowerCase()),
      render: (text) => (
        <Tooltip title={text}>
         <div
        style={{
          maxWidth: "150px", // Set a fixed width to prevent column expansion
          whiteSpace: "nowrap", // Prevents text from wrapping
          overflow: "hidden", // Hides overflowing text
          textOverflow: "ellipsis", // Adds "..." for overflowed text
        }}
      >
        {text}
      </div>
        </Tooltip>
      ),
      ellipsis: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Not Started", value: "Not Started" },
        { text: "On Going", value: "On Going" },
        { text: "On Hold", value: "On Hold" },
        { text: "Completed", value: "Completed" },
      ],
      onFilter: (value, record) => record.status === value,
      filterIcon: (filtered) => (
        <FunnelPlotOutlined style={{color:"white"}} />
      ),
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
    { title: "Business Partner", dataIndex: "bp", key: "bp",

      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <Input
          placeholder="Search Business Partner"
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
      ),
      filterIcon: <SearchOutlined style={{ color: "white" }} />,
      onFilter: (value, record) => record.bp.toLowerCase().includes(value.toLowerCase()),
    },
    { title: "Dev Hours", dataIndex: "devHours", key: "devHours" },
    { title: "QA Hours", dataIndex: "qaHours", key: "qaHours" },
    { title: "Approved By", dataIndex: "approvedBy", key: "approvedBy",

      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <Input
          placeholder="Search Approved By"
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
      ),
      filterIcon: <SearchOutlined style={{ color: "white" }} />,
      onFilter: (value, record) => record.approvedBy.toLowerCase().includes(value.toLowerCase()),
      
    },
    { title: "Due Date", dataIndex: "dueDate", key: "dueDate" },
    { title: "Assigned To", dataIndex: "assignedTo", key: "assignedTo",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
        <Input
          placeholder="Search Assigned To"
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => confirm()}
          style={{ marginBottom: 8, display: "block" }}
        />
      ),
      filterIcon: <SearchOutlined style={{ color: "white" }} />,
      onFilter: (value, record) => record.assignedTo.toLowerCase().includes(value.toLowerCase()),
     },
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
      <Table
        dataSource={tasks}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 6 }}
        scroll={{ x: "max-content" }}
        style={{ wordBreak: "break-word" }}
        className="container"
      />
    </div>
  );
}

export default TaskList;

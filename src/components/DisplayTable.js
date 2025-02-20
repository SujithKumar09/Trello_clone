import { useState, useEffect } from "react";
import { Table, Tag, Button, Popconfirm, Flex} from "antd";
import { DeleteOutlined ,EditOutlined} from "@ant-design/icons";

const DisplayTable=(props)=>{
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/alltasks')
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error('Error fetching data:', error));
    },[]);

    const handleEdit=(record)=>{
      props.onFormSubmit(record);
    }

    const handleDelete=(id)=>{
      fetch('http://localhost:8080/api/deleteTask/'+id,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json"
        }

      })
      .then((response)=>{
        if(response.status===204)console.log("Task deleted successfully");
        else console.log("Failed to delete the task");
      })
      .catch((error)=>console.error("error deleting data",error));
    }

    const columns = [
        {
          title: 'Task Name',
          dataIndex: 'taskName',
          key: 'taskName',
        },
        {
          title: 'Task Description',
          dataIndex: 'taskDescription',
          key: 'taskDescription',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = 'green'; 
                if (status === 'On Going') {
                color = 'orange';
                } else if (status === 'On Hold') {
                color = 'geekblue';
                } else if (status === 'Not Started') {
                color = 'red';
                }
                return (
                <Tag color={color} key="status">
                    {status}
                </Tag>
                );
            },
        },
        {
          title: 'Date Created',
          dataIndex: 'dateCreated',
          key: 'dateCreated',
          render: (text) => new Date(text).toLocaleDateString(),
        },
        {
          title: 'Business Partner',
          dataIndex: 'bp',
          key: 'bp',
        },
        {
          title: 'Dev Hours',
          dataIndex: 'devHours',
          key: 'devHours',
        },
        {
          title: 'QA Hours',
          dataIndex: 'qaHours',
          key: 'qaHours',
        },
        {
          title: 'Approved By',
          dataIndex: 'approvedBy',
          key: 'approvedBy',
        },
        {
          title: 'Billable or Not',
          dataIndex: 'isBillable',
          key: 'isBillable',
          render: (isBillable) => (isBillable ? 'Yes' : 'No'),
        },
        {
          title: 'Due Date',
          dataIndex: 'dueDate',
          key: 'dueDate',
          render: (text) => new Date(text).toLocaleDateString(),
        },
        {
          title: 'Assigned To',
          dataIndex: 'assignedTo',
          key: 'assignedTo',
        },
        {
          title: 'Release Date',
          dataIndex: 'releaseDate',
          key: 'releaseDate',
          render: (text) => new Date(text).toLocaleDateString(),
        },
        {
          title: 'Action',
          key: 'Action',
          render: (_, record) => (
            <Flex gap="small">
              <Button
                icon={<EditOutlined />}
                onClick={() => handleEdit(record)}
              />
              <Popconfirm
                title="Are you sure delete this task?"
                onConfirm={() => handleDelete(record.id)}
                okText="Yes"
                cancelText="No"
              >
                <Button icon={<DeleteOutlined />} danger />
              </Popconfirm>
            </Flex>
          ),
        },
      ];

    return(
        <Table columns={columns} dataSource={tasks} rowKey="id"/>
    );    
}

export default DisplayTable;
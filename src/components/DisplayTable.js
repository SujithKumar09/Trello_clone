import { useState, useEffect } from "react";
import { Table, Tag } from "antd";

const DisplayTable=()=>{
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/alltasks')
            .then((response) => response.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    console.log(tasks);

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
                if (status === 'on going') {
                color = 'orange';
                } else if (status === 'on hold') {
                color = 'geekblue';
                } else if (status === 'not started') {
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
      ];

    return(
        <Table columns={columns} dataSource={tasks}/>
    );    
}

export default DisplayTable;
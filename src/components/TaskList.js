import { Table, Tag } from "antd";

function TaskList({ tasks }) {
  // Columns for Ant Design Table
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
        let color;
        switch (status) {
          case 'Completed':
            color = 'green';
            break;
          case 'On Going':
            color = 'blue';
            break;
          case 'Not Started':
            color = 'orange';
            break;
          case 'on Hold':
            color = 'red';
            break;
          default:
            color = 'gray';
        }
        return <Tag color={color}>{status}</Tag>;
      }
    },
    {
      title: 'Created Date',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
    },
    {
      title: 'BP',
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
      title: 'Billable',
      dataIndex: 'billableOrNotBillable',
      key: 'billableOrNotBillable',
      render: (value) => value ? 'Yes' : 'No',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
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
    },
  ];

  return (
    <div>
      <h2>Task List</h2>
      <Table dataSource={tasks} columns={columns} rowKey="id" pagination={{ pageSize: 6 }} // Limit the rows per page
         />
    </div>
  );
}

export default TaskList;

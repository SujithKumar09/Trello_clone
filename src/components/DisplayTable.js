import { useEffect } from 'react';
import { Table, Tag, Button, Popconfirm, Flex } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setEditMode, setFormData, setModalOpen, fetchTasks, deleteTask } from './taskSlice';

const DisplayTable = () => {
  const dispatch = useDispatch();
  const { list: tasks, status, error } = useSelector((state) => state.tasks.task);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks()); 
    }
  }, [status, dispatch]);

  const handleEdit = (record) => {
    dispatch(setEditMode(true)); 
    dispatch(setFormData(record)); 
    dispatch(setModalOpen(true)); 
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id)); 
  };

  const columns = [
    { title: 'Task Name', dataIndex: 'taskName', key: 'taskName' },
    { title: 'Task Description', dataIndex: 'taskDescription', key: 'taskDescription' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'green';
        if (status === 'On Going') color = 'orange';
        else if (status === 'On Hold') color = 'geekblue';
        else if (status === 'Not Started') color = 'red';
        return <Tag color={color} key="status">{status}</Tag>;
      },
    },
    { title: 'Date Created', dataIndex: 'dateCreated', key: 'dateCreated', render: (text) => new Date(text).toLocaleDateString() },
    { title: 'Business Partner', dataIndex: 'bp', key: 'bp' },
    { title: 'Dev Hours', dataIndex: 'devHours', key: 'devHours' },
    { title: 'QA Hours', dataIndex: 'qaHours', key: 'qaHours' },
    { title: 'Approved By', dataIndex: 'approvedBy', key: 'approvedBy' },
    { title: 'Billable or Not', dataIndex: 'isBillable', key: 'isBillable', render: (isBillable) => (isBillable ? 'Yes' : 'No') },
    { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate', render: (text) => (text ? new Date(text).toLocaleDateString() : '-') },
    { title: 'Assigned To', dataIndex: 'assignedTo', key: 'assignedTo' },
    { title: 'Release Date', dataIndex: 'releaseDate', key: 'releaseDate', render: (text) => (text ? new Date(text).toLocaleDateString() : '-') },
    {
      title: 'Action',
      key: 'Action',
      render: (_, record) => (
        <Flex gap="small">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
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

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return <Table columns={columns} dataSource={tasks} rowKey="id" pagination={{ pageSize: 8 }} />;
};

export default DisplayTable;
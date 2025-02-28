import { useEffect } from 'react';
import { Tag, Button, Popconfirm, Flex } from 'antd';
import { DeleteOutlined, EditOutlined ,EyeOutlined} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { setEditMode, setFormData, setModalOpen, fetchTasks, deleteTask  , setCardData} from './taskSlice';
import { AgGridReact } from 'ag-grid-react';

import {
  ClientSideRowModelModule,
  ModuleRegistry,
  PinnedRowModule,
  TextFilterModule,
  DateFilterModule,
  PaginationModule,
  TooltipModule,
} from "ag-grid-community";


// import {
//   ColumnMenuModule,
//   ColumnsToolPanelModule,
//   ContextMenuModule,
//   RowGroupingModule,
// } from "ag-grid-enterprise";

ModuleRegistry.registerModules([
  TextFilterModule,
  PinnedRowModule,
  ClientSideRowModelModule,
  // ColumnsToolPanelModule,
  // ColumnMenuModule,
  // ContextMenuModule,
  // RowGroupingModule,
  DateFilterModule ,
  PaginationModule,
  TooltipModule,
]);

const DisplayTable = () => {
  const dispatch = useDispatch();
  const { list: tasks, status, error } = useSelector((state) => state.tasks.task);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks()); 
    }
  }, [status, dispatch]);

  const handleShowMore = (record) => {
    dispatch(setCardData(record));
  };

  const handleEdit = (record) => {
    dispatch(setEditMode(true)); 
    dispatch(setFormData(record)); 
    dispatch(setModalOpen(true)); 
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id)); 
  };

  // const columns = [
  //   { title: 'Task Name', dataIndex: 'taskName', key: 'taskName' },
  //   { title: 'Task Description', dataIndex: 'taskDescription', key: 'taskDescription' },
  //   {
  //     title: 'Status',
  //     dataIndex: 'status',
  //     key: 'status',
  //     render: (status) => {
  //       let color = 'green';
  //       if (status === 'On Going') color = 'orange';
  //       else if (status === 'On Hold') color = 'geekblue';
  //       else if (status === 'Not Started') color = 'red';
  //       return <Tag color={color} key="status">{status}</Tag>;
  //     },
  //   },
  //   { title: 'Date Created', dataIndex: 'dateCreated', key: 'dateCreated', render: (text) => new Date(text).toLocaleDateString() },
  //   { title: 'Business Partner', dataIndex: 'bp', key: 'bp' },
  //   { title: 'Dev Hours', dataIndex: 'devHours', key: 'devHours' },
  //   { title: 'QA Hours', dataIndex: 'qaHours', key: 'qaHours' },
  //   { title: 'Approved By', dataIndex: 'approvedBy', key: 'approvedBy' },
  //   { title: 'Billable or Not', dataIndex: 'isBillable', key: 'isBillable', render: (isBillable) => (isBillable ? 'Yes' : 'No') },
  //   { title: 'Due Date', dataIndex: 'dueDate', key: 'dueDate', render: (text) => (text ? new Date(text).toLocaleDateString() : '-') },
  //   { title: 'Assigned To', dataIndex: 'assignedTo', key: 'assignedTo' },
  //   { title: 'Release Date', dataIndex: 'releaseDate', key: 'releaseDate', render: (text) => (text ? new Date(text).toLocaleDateString() : '-') },
  //   {
  //     title: 'Action',
  //     key: 'Action',
  //     render: (_, record) => (
  //       <Flex gap="small">
  //         <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
  //         <Popconfirm
  //           title="Are you sure delete this task?"
  //           onConfirm={() => handleDelete(record.id)}
  //           okText="Yes"
  //           cancelText="No"
  //         >
  //           <Button icon={<DeleteOutlined />} danger />
  //         </Popconfirm>
  //         <Button icon={<EyeOutlined />} onClick={() => handleShowMore(record)} />
  //       </Flex>
  //     ),
  //   },
  // ];

  const columnDefs=[
    {headerName : "Task Name", field : "taskName", flex : 2, sortable : true,filter: true},
    // {headerName : "Task Description", field : "taskDescription", flex : 1, sortable : true,filter: true},
    {headerName : "Status", field : "status", flex : 1, filter: true, cellRenderer :(params)=>{
      let color = 'green';
      if (params.value === 'On Going') color = 'orange';
      else if (params.value === 'On Hold') color = 'geekblue';
      else if (params.value === 'Not Started') color = 'red';
      return <Tag color={color}>{params.value}</Tag>;
    }},
    {headerName : "Business Partner", field:"bp", flex : 1, sortable : true,filter: true},
    {headerName : "Client Name", field:"clientName", flex : 1, sortable : true,filter: true},
    {headerName : "Due Date" ,field : "dueDate", flex : 1, sortable : true,filter: true},
    {headerName : "Actions", field : "actions", flex : 1, cellRenderer : (params)=>{
      return (
      <Flex gap="small">
        <Button icon={<EditOutlined />} onClick={() => handleEdit(params.data)} />
        <Popconfirm
          title="Are you sure delete this task?"
          onConfirm={() => handleDelete(params.data.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} danger />
        </Popconfirm>
        <Button icon={<EyeOutlined />} onClick={() => handleShowMore(params.data)} />
      </Flex>
    )}},
  ];

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    // <Table columns={columns} dataSource={tasks} rowKey="id" pagination={{ pageSize: 8 }} />
    <AgGridReact 
      columnDefs={columnDefs}
      rowData={tasks}
      pagination={true}
      paginationPageSizeSelector={[10,20, 50, 100]}
      domLayout='autoHeight'
    />
    
  );
};

export default DisplayTable;
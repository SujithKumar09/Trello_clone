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


ModuleRegistry.registerModules([
  TextFilterModule,
  PinnedRowModule,
  ClientSideRowModelModule,
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
    {headerName : "Created Date" ,field : "dateCreated", flex : 1, sortable : true,filter: true},
    {headerName : "Due Date" ,field : "dueDate", flex : 1, sortable : true,filter: true},
    {headerName : "Actions", field : "actions", flex : 1,


      cellRenderer: (params) => (
        <Flex gap="small">
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(params.data)} 
          />
          <Popconfirm 
            title="Delete this task?" 
            onConfirm={() => handleDelete(params.data.id)} 
            okText="Yes" 
            cancelText="No"
          >
            <Button 
              type="link" 
              icon={<DeleteOutlined />} 
              danger 
            />
          </Popconfirm>
          <Button type="link" icon={<EyeOutlined/>} onClick={()=>handleShowMore(params.data)}/>
        </Flex>
      ),},
  ];

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{textAlign:"left"}}>
      <AgGridReact 
        columnDefs={columnDefs}
        rowData={tasks}
        pagination={true}
        paginationPageSizeSelector={[10,20, 50, 100]}
        domLayout='autoHeight'
      />
    </div>
  );
};

export default DisplayTable;
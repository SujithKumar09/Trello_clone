import React from 'react';
import { Button, Popconfirm, Tag } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined} from "@ant-design/icons";
import axios from "axios";
import {FormData} from './Header';
import "./Header.css"



import { AgGridReact } from "ag-grid-react";

import {
  ClientSideRowModelModule,
  ModuleRegistry,
  NumberFilterModule,
  PinnedRowModule,
  TextFilterModule,
  ValidationModule,
  DateFilterModule,
  PaginationModule,
  TooltipModule,
  ColDef
} from "ag-grid-community";


ModuleRegistry.registerModules([
  TextFilterModule,
  PinnedRowModule,
  ClientSideRowModelModule,
  NumberFilterModule,
  ValidationModule,
  DateFilterModule ,
  PaginationModule,
  TooltipModule,
]);

interface TaskListProps{
  tasks : FormData[],
  onEdit : (task : FormData)=>void,
  fetchTasks : ()=>void,
  onShowMore : (task : FormData)=> void,
}

function TaskList({ tasks, onEdit, fetchTasks, onShowMore} : TaskListProps) {


  const handleDelete = async (taskId : number) => {
    if (!taskId) {
      console.error("Task ID is undefined, cannot delete.");
      alert("Error: Task ID is missing!");
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${taskId}`);
      fetchTasks();
      console.log("Task deleted Successfully!");
    } catch (error) {
      if(axios.isAxiosError(error)){
        console.error("Error deleting task:", error.response?.data || error.message);
        alert("Failed to delete task!");
      }
    }
  };


  const columnDefs : ColDef[]= [

    { headerName: "Task Name", field: "taskName", sortable: true, filter: true,flex:2,tooltipField: "taskName", },
    {
      headerName: "Status",
      field: "status",
      flex:1,
      sortable: true, filter: true,
      cellRenderer: (params : {value : string}) => {
        const status = params.value;
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
      }
    },    
    { headerName: "Business Partner", field: "bp", sortable: true, filter: true ,flex :1,tooltipField: "bp"},
    { headerName: "Approved By", field: "approvedBy", sortable: true, filter: true ,flex :1,tooltipField:"approvedBy"},
    { headerName: "Due Date", field: "dueDate", sortable: true, filter: "agDateColumnFilter",flex :1 },


    {
      headerName: "Actions", 
      field: "actions", 
      flex :1, 
      cellRenderer: (params : {data : FormData}) => (
        <>
          <Button 
            type="link" 
            icon={<EditOutlined />} 
            onClick={() => onEdit(params.data)} 
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
          <Button type="link" icon={<EyeOutlined/>} onClick={()=>onShowMore(params.data)}/>
        </>
      ),
    },
    
  ];
  

  



  return (
      <div className="ag-theme-alpine">
        <AgGridReact
          rowData={tasks}
          columnDefs={columnDefs}
          pagination={true} 
          paginationPageSizeSelector={[10,20, 50, 100]} 
          domLayout="normal"
        />
      </div>
  );

}

export default TaskList;
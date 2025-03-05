import React from 'react';
import { Form, Input, Select, InputNumber, Radio, Button, Row , Col } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import {FormData} from './Header';
import MyDatePicker from './MyDatePicker'

interface DetailedFormProps{
  onFormSubmit : (data : FormData)=>void,
  editingTask : (FormData |null)
}

const DetailedForm : React.FC<DetailedFormProps> = ({ onFormSubmit, editingTask}) => {
  const dateFormat="YYYY-MM-DD";

  const Option=Select.Option;

  const [form] = Form.useForm();

  const [details, setDetails] = useState({
    id:0,
    taskName: "",
    taskDescription: "",
    status: "Not Started",
    dateCreated: "",
    bp: "",
    clientName : "",
    devHours: 0,
    qaHours: 0,
    approvedBy: "",
    isBillable: false ,
    dueDate: "",
    assignedTo: "",
    releaseDate: "",
  });

  useEffect(() => {
    if (editingTask!=null) {
      setDetails({
        ...editingTask,
        dueDate: editingTask.dueDate ? moment(editingTask.dueDate).format(dateFormat) : "", 
        releaseDate: editingTask.releaseDate ? moment(editingTask.releaseDate).format(dateFormat) : "",
        dateCreated: editingTask.dateCreated ? moment(editingTask.dateCreated).format(dateFormat) : ""
      });
      form.setFieldsValue
      ({
       taskName:editingTask.taskName,
       approvedBy:editingTask.approvedBy,
      dateCreated: editingTask.dateCreated ? moment(editingTask.dateCreated):null
      }); 
    }else {
      setDetails({
        id:0,
        taskName: "",
        taskDescription: "",
        status: "Not Started",
        dateCreated: "",
        bp: "",
        clientName : "",
        devHours: 0,
        qaHours: 0,
        approvedBy: "",
        isBillable: false,
        dueDate: "",
        assignedTo: "",
        releaseDate: "",
      });
      form.setFieldsValue
      ({
         taskName:"",
         dateCreated:null,
         approvedBy:"",
      });
    }
    
  }, [editingTask,onFormSubmit,form]);

 
  const handleChange = (key : string, value:string|number|null) => {
  
    setDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  
  };
  


  const handleSubmit = () => {
    onFormSubmit({ ...details,dateCreated : details.dateCreated ? moment(details.dateCreated).format(dateFormat) : "",releaseDate: details.releaseDate ? moment(details.releaseDate).format(dateFormat) : "" ,dueDate: details.dueDate ? moment(details.dueDate).format(dateFormat) : ""});
  };

  return (
    <Form form={form} layout="horizontal" onFinish={handleSubmit} >
      <Row>
        <Col span={12}>
        <Form.Item label="Task Name" name="taskName" rules={[{ required: true, message: 'Please input your task name' }]} labelCol={{ span: 9 }} wrapperCol={{ span: 14 }} labelAlign="left">

          <Input value={details.taskName} onChange={(e) => handleChange("taskName", e.target.value)} width={"100%"}/>
        </Form.Item>
        </Col>
        <Col span={12}>
        <Form.Item label="Task Description" labelCol={{ span: 9 }} wrapperCol={{ span: 15 }} labelAlign="left">
          <TextArea rows={2} value={details.taskDescription} onChange={(e) => handleChange("taskDescription", e.target.value)} />
        </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="Status" labelCol={{ span: 9 }} wrapperCol={{ span: 14 }} labelAlign="left">
            <Select value={details.status} onChange={(value) => handleChange("status", value)}>
              <Option value="Not Started">Not Started</Option>
              <Option value="On Going">On Going</Option>
              <Option value="On Hold">On Hold</Option>
              <Option value="Completed">Completed</Option>
            </Select>
          </Form.Item>
          </Col>
          <Col span={12}>
          <Form.Item label="Created Date" name="dateCreated" rules={[{ required: true, message: 'Please input the created date' }]} labelCol={{ span: 9 }} wrapperCol={{ span: 15 }} labelAlign="left">
            <MyDatePicker
              value={details.dateCreated ? moment(details.dateCreated) : ""}
              onChange={(date) => handleChange('dateCreated', moment(date).format(dateFormat))}
              format={dateFormat}
            />
          </Form.Item>
          </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item label="Business Partner"  labelCol={{ span: 9 }} wrapperCol={{ span: 14 }} labelAlign="left">
            <Input value={details.bp} onChange={(e) => handleChange("bp", e.target.value)} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Client Name"  labelCol={{ span: 9 }} wrapperCol={{ span: 15 }} labelAlign="left">
            <Input value={details.clientName} onChange={(e) => handleChange("clientName", e.target.value)} />
          </Form.Item>
        </Col>
      </Row>
      <Row >
        <Col span={12}>
          <Form.Item label="Development Hours" labelCol={{ span: 9 }} wrapperCol={{ span: 15 }} labelAlign="left">
            <InputNumber min={0} value={details.devHours} onChange={(value) => handleChange("devHours", value)} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="QA Hours"  labelCol={{ span: 9 }} wrapperCol={{ span: 15 }} labelAlign="left">
            <InputNumber min={0} value={details.qaHours} onChange={(value) => handleChange("qaHours", value)} />
          </Form.Item>
        </Col>
      </Row>

      <Row >
        <Col span={12}>
          <Form.Item label="ApprovedBy" name="approvedBy" rules={[{ required: true, message: 'Please input name of approver' }]} labelCol={{ span: 9 }} wrapperCol={{ span: 14 }} labelAlign="left">

            <Input value={details.approvedBy} onChange={(e) => handleChange("approvedBy", e.target.value)} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Assigned To" labelCol={{ span: 9 }} wrapperCol={{ span: 15 }} labelAlign="left">
            <Input value={details.assignedTo} onChange={(e) => handleChange("assignedTo", e.target.value)} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
        <Form.Item label="Billable">
          <Radio.Group
            value={details.isBillable}
            onChange={(e) => handleChange("isBillable", e.target.value)}
          >
            <Radio value={true}>Yes</Radio>
            <Radio value={false}>No</Radio>
          </Radio.Group>
        </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Due Date">
          <MyDatePicker
              value={details.dueDate ? moment(details.dueDate) : ""}
              onChange={(date) => handleChange('dueDate', date ? moment(date).format(dateFormat): "")}
              format={dateFormat}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Release Date">
            <MyDatePicker value={details.releaseDate!==""?moment(details.releaseDate,dateFormat):null} onChange={(date) => handleChange("releaseDate",date ? moment(date).format(dateFormat):"")} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item wrapperCol={{ offset: 10, span: 12 }}>
        <Button type="primary" htmlType="submit" style={{width:"33.33%"}}>Submit</Button>
      </Form.Item>
    </Form>


  );
};

export default DetailedForm;

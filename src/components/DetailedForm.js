import { Form, Input, Select, DatePicker, InputNumber, Radio, Button, Row , Col } from "antd";
import { useEffect, useState } from "react";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";

const { Option } = Select;

const DetailedForm = ({ onFormSubmit, editingTask }) => {

  const [details, setDetails] = useState({
    taskName: "",
    taskDescription: "",
    status: "Not Started",
    dateCreated: moment().format("YYYY-MM-DD"), // Set current date by default
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
    console.log(editingTask)
    if (editingTask!=null) {
      setDetails({
        ...editingTask,
        dueDate: editingTask.dueDate ? moment(editingTask.dueDate) : null, 
      releaseDate: editingTask.releaseDate ? moment(editingTask.releaseDate) : null,
      dateCreated: editingTask.dateCreated ? moment(editingTask.dateCreated):null
      });
    }else {
      setDetails({
        taskName: "",
        taskDescription: "",
        status: "Not Started",
        dateCreated: moment().format("YYYY-MM-DD"),
        bp: "",
        clientName : "",
        devHours: 0,
        qaHours: 0,
        approvedBy: "",
        isBillable: false,
        dueDate: null,
        assignedTo: "",
        releaseDate: null,
      });
    }
  
  }, [editingTask,onFormSubmit]);

 
  const handleChange = (key, value) => {
  
    setDetails((prev) => ({
      ...prev,
      [key]: value,
    }));
  
  };
  


  const handleSubmit = () => {
    onFormSubmit({ ...details,releaseDate: details.releaseDate ? details.releaseDate.format("YYYY-MM-DD") : null ,dueDate: details.dueDate ? details.dueDate.format("YYYY-MM-DD") : null});
  };

  return (
    <Form  layout="horizontal" onFinish={handleSubmit} >
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
            <DatePicker
              value={details.dateCreated ? moment(details.dateCreated) : null}
              onChange={(date, dateString) => handleChange('dateCreated', dateString)}
              format="YYYY-MM-DD"
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
            <DatePicker value={details.dueDate} onChange={(date) => handleChange("dueDate", date)} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Release Date">
            <DatePicker value={details.releaseDate} onChange={(date) => handleChange("releaseDate", date)} />
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

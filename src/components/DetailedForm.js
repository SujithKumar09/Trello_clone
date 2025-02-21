import { Form, Input, Select, DatePicker, InputNumber, Radio, Button } from "antd";
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
      releaseDate: editingTask.releaseDate ? moment(editingTask.releaseDate) : null,// Convert dueDate to moment object
<<<<<<< HEAD
=======
      });
    }else {
      setDetails({
        taskName: "",
        taskDescription: "",
        status: "Not Started",
        dateCreated: moment().format("YYYY-MM-DD"),
        bp: "",
        devHours: 0,
        qaHours: 0,
        approvedBy: "",
        isBillable: false,
        dueDate: null,
        assignedTo: "",
        releaseDate: null,
>>>>>>> dev2
      });
    }
  
  }, [editingTask,onFormSubmit]);

  // const handleChange = (field, value) => {
  //   setDetails((prev) => ({ ...prev, [field]: value }));
  // };
  const handleChange = (key, value) => {
    // console.log("Before update:", key, "=", value);
    setDetails((prev) => ({
      ...prev,
      [key]: value, // Directly set value
    }));
    // console.log("After update:", key, "=", value);
  };
  


  const handleSubmit = () => {
    onFormSubmit({ ...details,releaseDate: details.releaseDate ? details.releaseDate.format("YYYY-MM-DD") : null ,dueDate: details.dueDate ? details.dueDate.format("YYYY-MM-DD") : null });
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Task Name" required>
        <Input value={details.taskName} onChange={(e) => handleChange("taskName", e.target.value)} />
      </Form.Item>

      <Form.Item label="Task Description">
        <TextArea rows={3} value={details.taskDescription} onChange={(e) => handleChange("taskDescription", e.target.value)} />
      </Form.Item>

      <Form.Item label="Status">
        <Select value={details.status} onChange={(value) => handleChange("status", value)}>
          <Option value="Not Started">Not Started</Option>
          <Option value="On Going">On Going</Option>
          <Option value="On Hold">On Hold</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      </Form.Item>

      <Form.Item label="Business Partner">
        <Input value={details.bp} onChange={(e) => handleChange("bp", e.target.value)} />
      </Form.Item>

      <Form.Item label="Development Hours">
        <InputNumber min={0} value={details.devHours} onChange={(value) => handleChange("devHours", value)} />
      </Form.Item>

      <Form.Item label="QA Hours">
        <InputNumber min={0} value={details.qaHours} onChange={(value) => handleChange("qaHours", value)} />
      </Form.Item>

      <Form.Item label="ApprovedBy">
        <Input value={details.approvedBy} onChange={(e) => handleChange("approvedBy", e.target.value)} />
      </Form.Item>

      <Form.Item label="Billable">
      <Radio.Group
  value={details.isBillable} // Ensure value is boolean (true/false)
  onChange={(e) => handleChange("isBillable", e.target.value)}
>
  <Radio value={true}>Yes</Radio>
  <Radio value={false}>No</Radio>
</Radio.Group>



      </Form.Item>

      <Form.Item label="Due Date">
        <DatePicker value={details.dueDate} onChange={(date) => handleChange("dueDate", date)} />
      </Form.Item>

      <Form.Item label="Assigned To">
        <Input value={details.assignedTo} onChange={(e) => handleChange("assignedTo", e.target.value)} />
      </Form.Item>
      <Form.Item label="Release Date">
        <DatePicker value={details.releaseDate} onChange={(date) => handleChange("releaseDate", date)} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" onClick={handleSubmit}>Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default DetailedForm;

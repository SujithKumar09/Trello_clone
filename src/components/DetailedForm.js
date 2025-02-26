import { Form, Select, Input, DatePicker, InputNumber, Radio, Button } from 'antd';
import moment from 'moment';
import TextArea from 'antd/es/input/TextArea';
import { useSelector, useDispatch } from 'react-redux';
import setFormData  from './taskSlice';
import editTask  from './taskSlice';
import  addTask from './taskSlice';

const DetailedForm = () => {
  const dispatch = useDispatch();
  const { data, isEditMode } = useSelector((state) => state.tasks.form);

  const handleChange = (fieldName, value) => {
    dispatch(setFormData({ [fieldName]: value }));
  };

  const handleSubmit = () => {
    if (isEditMode) {
      dispatch(editTask(data));
    } else {
      dispatch(addTask(data));
    }
  };

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      layout="horizontal"
      style={{ maxWidth: 700 }}
      labelAlign="left"
      onFinish={handleSubmit}
    >
      <Form.Item label="Task Name" name="taskName" rules={[{ required: true, message: 'Please input your task name' }]}>
        <Input
          value={data.taskName}
          name="taskName"
          placeholder="Enter Task Name"
          onChange={(e) => handleChange('taskName', e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Task Description" name="taskDescription">
        <TextArea
          value={data.taskDescription}
          placeholder="Enter Task Description"
          onChange={(e) => handleChange('taskDescription', e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Status">
        <Select value={data.status} onChange={(value) => handleChange('status', value)}>
          <Select.Option value="Not Started">Not Started</Select.Option>
          <Select.Option value="On Going">On Going</Select.Option>
          <Select.Option value="Completed">Completed</Select.Option>
          <Select.Option value="On Hold">On Hold</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Created Date" name="dateCreated" rules={[{ required: true, message: 'Please input the created date' }]}>
        <DatePicker
          value={data.dateCreated ? moment(data.dateCreated) : null}
          onChange={(date, dateString) => handleChange('dateCreated', dateString)}
          format="YYYY-MM-DD"
        />
      </Form.Item>
      <Form.Item label="BP" name="bp" rules={[{ required: true, message: 'Enter name of BP' }]}>
        <Input
          value={data.bp}
          name="bp"
          placeholder="Enter name of BP"
          onChange={(e) => handleChange('bp', e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Dev Hours" name="devHours" rules={[{ type: 'number', min: 0, message: 'Dev hours cannot be negative' }]}>
        <InputNumber
          value={data.devHours}
          name="devHours"
          placeholder="Enter No of Dev Hours"
          onChange={(value) => handleChange('devHours', value)}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label="QA Hours" name="qaHours" rules={[{ type: 'number', min: 0, message: 'QA hours cannot be negative' }]}>
        <InputNumber
          value={data.qaHours}
          name="qaHours"
          placeholder="Enter No of QA Hours"
          onChange={(value) => handleChange('qaHours', value)}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item label="Approved By" name="approvedBy" rules={[{ required: true, message: 'Name of approved person' }]}>
        <Input
          value={data.approvedBy}
          name="approvedBy"
          placeholder="Enter Approved Person Name"
          onChange={(e) => handleChange('approvedBy', e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Billable or Not" name="isBillable" rules={[{ required: true, message: 'Please select whether the task is billable!' }]}>
        <Radio.Group value={data.isBillable} onChange={(e) => handleChange('isBillable', e.target.value)}>
          <Radio value={true}>Yes</Radio>
          <Radio value={false}>No</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Due Date" name="dueDate">
        <DatePicker
          value={data.dueDate ? moment(data.dueDate) : null}
          onChange={(date, dateString) => handleChange('dueDate', dateString)}
          format="YYYY-MM-DD"
        />
      </Form.Item>
      <Form.Item label="Assigned To" name="assignedTo">
        <Input
          value={data.assignedTo}
          name="assignedTo"
          placeholder="Enter Assigned Person Name"
          onChange={(e) => handleChange('assignedTo', e.target.value)}
        />
      </Form.Item>
      <Form.Item label="Release Date" name="releaseDate">
        <DatePicker
          value={data.releaseDate ? moment(data.releaseDate) : null}
          onChange={(date, dateString) => handleChange('releaseDate', dateString)}
          format="YYYY-MM-DD"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DetailedForm;
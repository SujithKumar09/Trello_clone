import { Form, Select, Input, DatePicker, InputNumber, Radio, Button, Row, Col } from 'antd';
import moment from 'moment';
import TextArea from 'antd/es/input/TextArea';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setFormData, editTask, addTask, setModalOpen, resetFormData } from './taskSlice';

const DetailedForm = () => {
  const dispatch = useDispatch();
  const { data, isModalOpen, isEditMode } = useSelector((state) => state.tasks.form);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue({
        ...data,
        dateCreated: data.dateCreated ? moment(data.dateCreated) : null,
        dueDate: data.dueDate ? moment(data.dueDate) : null,
        releaseDate: data.releaseDate ? moment(data.releaseDate) : null,
      });
    }
  }, [isModalOpen, data, form]);

  const handleChange = (fieldName, value) => {
    let newValue = value;
    if (moment.isMoment(value)) {
      newValue = value.format('YYYY-MM-DD');
    } else if (value === null || value === undefined) {
      newValue = null; 
    }
    dispatch(setFormData({ ...data, [fieldName]: newValue }));
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const updatedData = {
          ...data,
          ...values,
          dateCreated: values.dateCreated && moment.isMoment(values.dateCreated) ? values.dateCreated.format('YYYY-MM-DD') : values.dateCreated,
          // dueDate: values.dueDate && moment.isMoment(values.dueDate) ? values.dueDate.format('YYYY-MM-DD') : values.dueDate,
          // releaseDate: values.releaseDate && moment.isMoment(values.releaseDate) ? values.releaseDate.format('YYYY-MM-DD') : values.releaseDate,
        };
        if (isEditMode) {
          dispatch(editTask(updatedData));
        } else {
          dispatch(addTask(updatedData));
        }
        dispatch(setModalOpen(false));
        dispatch(resetFormData());
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validation Failed:', info);
      });
  };

  return (
    <Form
      form={form}
      layout="horizontal"
      onFinish={handleSubmit}
      initialValues={data}
    >
      <Row>
        <Col span={12}>
          <Form.Item
            label="Task Name"
            name="taskName"
            rules={[{ required: true, message: 'Please input your task name' }]}
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 14 }}
            labelAlign="left"
          >
            <Input
              onChange={(e) => handleChange('taskName', e.target.value)}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Task Description"
            name="taskDescription"
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 15 }}
            labelAlign="left"
          >
            <TextArea
              rows={2}
              onChange={(e) => handleChange('taskDescription', e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label="Status"
            name="status"
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 14 }}
            labelAlign="left"
          >
            <Select onChange={(value) => handleChange('status', value)}>
              <Select.Option value="Not Started">Not Started</Select.Option>
              <Select.Option value="On Going">On Going</Select.Option>
              <Select.Option value="On Hold">On Hold</Select.Option>
              <Select.Option value="Completed">Completed</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Created Date"
            name="dateCreated"
            rules={[{ required: true, message: 'Please input the created date' }]}
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 15 }}
            labelAlign="left"
          >
            <DatePicker
              onChange={(date) => handleChange('dateCreated', date)}
              format="YYYY-MM-DD"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label="Business Partner"
            name="bp"
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 14 }}
            labelAlign="left"
          >
            <Input onChange={(e) => handleChange('bp', e.target.value)} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Client Name"
            name="clientName"
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 15 }}
            labelAlign="left"
          >
            <Input onChange={(e) => handleChange('clientName', e.target.value)} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label="Development Hours"
            name="devHours"
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 14 }}
            labelAlign="left"
          >
            <InputNumber
              min={0}
              onChange={(value) => handleChange('devHours', value)}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="QA Hours"
            name="qaHours"
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 15 }}
            labelAlign="left"
          >
            <InputNumber
              min={0}
              onChange={(value) => handleChange('qaHours', value)}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item
            label="Approved By"
            name="approvedBy"
            rules={[{ required: true, message: 'Please input name of approver' }]}
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 14 }}
            labelAlign="left"
          >
            <Input onChange={(e) => handleChange('approvedBy', e.target.value)} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Assigned To"
            name="assignedTo"
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 15 }}
            labelAlign="left"
          >
            <Input onChange={(e) => handleChange('assignedTo', e.target.value)} />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Form.Item label="Billable" name="isBillable">
            <Radio.Group
              onChange={(e) => handleChange('isBillable', e.target.value)}
            >
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Due Date">
            <DatePicker onChange={(date) => handleChange("dueDate", date)} />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Release Date">
            <DatePicker onChange={(date) => handleChange("releaseDate", date)} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item wrapperCol={{ offset: 10, span: 12 }}>
        <Button type="primary" htmlType="submit" style={{ width: '33.33%' }}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DetailedForm;
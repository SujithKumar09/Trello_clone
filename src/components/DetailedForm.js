  import { Form ,Input, Select, DatePicker, InputNumber, Radio, Button} from "antd";
  import { useState , useEffect} from "react";
  import moment from "moment";
  import TextArea from "antd/es/input/TextArea";

  const DetailedForm=(props)=>{
    const [details,setDetails]=useState(props.data);

    useEffect(() => {
      if (props.data) {
          setDetails({
              ...props.data
          });
      }
  }, [props.data]);

    const handleChange = (fieldName,value) => {
      setDetails((prevState) => ({
        ...prevState, 
        [fieldName]: value,
      }));
    };

    const handleSubmit=()=>{
      props.onFormSubmit(details);
    }

    return( 
      <Form
          key={details.id || Math.random()}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          layout="horizontal"
          style={{
            maxWidth: 700,
          }}
          labelAlign="left"
          onFinish={handleSubmit}
          initialValues={{
            taskName: details.taskName || "",
            taskDescription: details.taskDescription || "",
            status: details.status || "Not Started",
            dateCreated: details.dateCreated ? moment(details.dateCreated) : null,
            bp: details.bp || "",
            devHours: details.devHours || 0,
            qaHours: details.qaHours || 0,
            approvedBy: details.approvedBy || "",
            isBillable: details.isBillable !== undefined ? details.isBillable : true,
            dueDate: details.dueDate ? moment(details.dueDate) : null,
            assignedTo: details.assignedTo || "",
            releaseDate: details.releaseDate ? moment(details.releaseDate) : null,
          }}
      >
        <Form.Item label="Task Name" name ="taskName"rules={[
          {
            required: true,
            message: 'Please input your taskname',
          },
        ]}>
          <Input value={details.taskName} name="taskName" placeholder="Enter Task Name" onChange={(e)=>handleChange("taskName",e.target.value)}/>
        </Form.Item>


        <Form.Item label="Task Description" rules={[
          {
            required: true,
            message: 'Please input your task description',
          },
        ]}>
          <TextArea  value={details.taskDescription} placeholder="Enter Task Description" onChange={(e)=>handleChange("taskDescription",e.target.value)}/>
        </Form.Item>


        <Form.Item label="Status">
          <Select value={details.status} onChange={(value)=>handleChange("status",value)}>
            <Select.Option value="Not Started">Not Started</Select.Option>
            <Select.Option value="On Going">On Going</Select.Option>
            <Select.Option value="Completed">Completed</Select.Option>
            <Select.Option value="On Hold">on Hold</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Created Date" rules={[
          {
            required: true,
            message: 'Please input your task description',
          },
        ]}>
          <DatePicker value={details.dateCreated ? moment(details.dateCreated) : null} onChange={(date,dateString)=>handleChange("dateCreated",dateString)} format="YYYY-MM-DD"/>
        </Form.Item>

        <Form.Item label="BP" name ="bp"rules={[
          {
            required: true,
            message: 'Enter name of BP',
          },
        ]}>
          <Input value={details.bp} name="bp" placeholder="Enter name of BP" onChange={(e)=>handleChange("bp",e.target.value)}/>
        </Form.Item>

        <Form.Item label="Dev Hours" name ="devHours" rules={[{
          type: 'number',
          min: 0,
          message: 'Dev hours cannot be negative',
        },]}>
          <InputNumber value={details.devHours} name="devHours " placeholder="Enter No of Dev Hours" onChange={(value)=>handleChange("devHours",value)} style={{width:"100%"}}/>
        </Form.Item>

        <Form.Item label="QA Hours" name ="qaHours" rules={[{
          type: 'number',
          min: 0,
          message: 'Dev hours cannot be negative',
        },]}>
          <InputNumber value={details.qaHours} name="qaHours " placeholder="Enter No of QAHours" onChange={(value)=>handleChange("qaHours",value)} style={{width:"100%"}}/>
        </Form.Item>

        <Form.Item label="Approved By" name ="approvedBy" rules={[
          {
            required: true,
            message: ' name of approved person',
          },
        ]}>
          <Input value={details.approvedBy} name="approvedBy" placeholder="Enter Approved Person Name" onChange={(e)=>handleChange("approvedBy",e.target.value)}/>
        </Form.Item>
        
        <Form.Item
        label="Billable or Not"
        name="isBillable"
        rules={[
          {
            required: true,
            message: 'Please select whether the task is billable!',
          },
        ]}
      >
        <Radio.Group
          value={details.isBillable}
          onChange={(e) => handleChange("isBillable", e.target.value)}
        >
          <Radio value={true}> Yes </Radio>
          <Radio value={false}> No </Radio>
        </Radio.Group>
      </Form.Item>

        <Form.Item label="Due Date">
          <DatePicker value={details.dueDate? moment(details.dueDate) : null} onChange={(date,dateString)=>handleChange("dueDate",dateString)} format="YYYY-MM-DD"/>
        </Form.Item>

        <Form.Item label="Assigned To" name ="assignedTo">
          <Input value={details.assignedTo} name="assignedTo" placeholder="Enter Assigned Person Name" onChange={(e)=>handleChange("assignedTo",e.target.value)}/>
        </Form.Item>

        <Form.Item label="Release Date">
          <DatePicker value={details.releaseDate? moment(details.releaseDate) : null} onChange={(date,dateString)=>handleChange("releaseDate",dateString)} format="YYYY-MM-DD"/>
        </Form.Item>

        <Form.Item>
        <Button type="primary" htmlType="submit" style={{width:"100%"}}>Submit</Button>
        </Form.Item>
        
      </Form>
    );
  }

  export default DetailedForm;  
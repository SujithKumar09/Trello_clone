import { SearchOutlined } from '@ant-design/icons';
import { Button, Row, Col, Input, Modal } from 'antd';
import DetailedForm from './DetailedForm';
import DisplayTable from './DisplayTable';
import './Header.css';
import { useSelector, useDispatch } from 'react-redux';
import {setModalOpen, resetFormData, setEditMode, setCardData} from './taskSlice';
import DetailsCard from './DetailsCard';

const Header = () => {
  const dispatch = useDispatch();
  const { isModalOpen, isEditMode } = useSelector((state) => state.tasks.form);
  const {details} = useSelector((state) => state.tasks.card);

  const formRender = () => {
    dispatch(setEditMode(false));
    dispatch(resetFormData());
    dispatch(setModalOpen(true));
  };

  const handleCancel = () => {
    dispatch(setModalOpen(false));
    dispatch(setCardData({}));
  };

  return (
    <div>
        <Row>
          <Col span={18}>
            <Input className="inputStyle" placeholder="Search" prefix={<SearchOutlined />} />
          </Col>
          <Col span={6}>
            <Button type="primary" size="middle" onClick={formRender}>
              ADD
            </Button>
          </Col>
        </Row>
        <Modal
          title={isEditMode ? 'Edit Task' : 'Add New Task'}
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
          width="60%"
        >
          <DetailedForm />
        </Modal>
        <Modal
          title="Task Details"
          open={JSON.stringify(details) === "{}"?false:true}
          onCancel={handleCancel}
          footer={null}
        >
          <DetailsCard />
        </Modal>
      <DisplayTable />
    </div>
  );
};

export default Header;
import { SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Input, Modal } from 'antd';
import DetailedForm from './DetailedForm';
import DisplayTable from './DisplayTable';
import './Header.css';
import { useSelector, useDispatch } from 'react-redux';
import setModalOpen  from './taskSlice';
import resetFormData  from './taskSlice';
import setEditMode from './taskSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { isModalOpen, isEditMode } = useSelector((state) => state.tasks.form);

  const formRender = () => {
    dispatch(setEditMode(false));
    dispatch(resetFormData());
    dispatch(setModalOpen(true));
  };

  const handleCancel = () => {
    dispatch(setModalOpen(false));
  };

  return (
    <div>
      <header className="header">
        <Flex gap="large">
          <Input className="inputStyle" placeholder="Search" prefix={<SearchOutlined />} />
          <Button type="primary" size="middle" onClick={formRender}>
            ADD
          </Button>
          <Modal
            title={isEditMode ? 'Edit Task' : 'Add New Task'}
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <DetailedForm />
          </Modal>
        </Flex>
      </header>
      <DisplayTable />
    </div>
  );
};

export default Header;
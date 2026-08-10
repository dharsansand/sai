import { Modal } from "antd";

const OpenModel = ({ open, setOpen, children, formik, handleCancel }) => {
  return (
    <Modal
      footer={null}
      open={open}
      centered
      onCancel={() => handleCancel(formik, setOpen)}
      width={750}
      destroyOnClose
    >
      {children}
    </Modal>
  );
};

export default OpenModel;

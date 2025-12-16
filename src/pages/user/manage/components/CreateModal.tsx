import { saveUser } from "@/api/userController";
import { ProTable, type ProColumns } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import "./index.css";

interface Props {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: API.User) => void;
  columns: ProColumns<API.User>[];
}

const CreateModal = (props: Props) => {
  const { visible, onCancel, onSubmit, columns } = props;

  const handleAdd = async (values: API.User) => {
    const hide = message.loading("提交中...");
    try {
      await saveUser(values);
      hide();
      message.success("提交成功");
      return true;
    } catch (error: any) {
      hide();
      message.error("创建失败：" + error.message);
      return false;
    }
  };

  return (
    <Modal
      title="创建用户"
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
    >
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (values: API.User) => {
          const result = await handleAdd(values);
          if (result) {
            onSubmit(values);
          }
        }}
        search={{
          className: "pro-table-search",
        }}
      />
    </Modal>
  );
};

export default CreateModal;

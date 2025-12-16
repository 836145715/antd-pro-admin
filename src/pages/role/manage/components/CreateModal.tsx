import { addRole } from "@/api/roleController";
import { ProTable, type ProColumns } from "@ant-design/pro-components";
import { message, Modal } from "antd";
import "./index.css";

interface Props {
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
}

const CreateModal = (props: Props) => {
  const { visible, onCancel, onSubmit } = props;

  const handleAdd = async (values: API.Role) => {
    const hide = message.loading("提交中...");
    try {
      await addRole(values);
      hide();
      message.success("提交成功");
      return true;
    } catch (error: any) {
      hide();
      message.error("创建失败：" + error.message);
      return false;
    }
  };

  const columns: ProColumns<API.Role>[] = [
    {
      title: "角色名称",
      dataIndex: "roleName",
      width: "md",
      formItemProps: {
        rules: [{ required: true, message: "请输入角色名称" }],
      },
    },
    {
      title: "备注",
      dataIndex: "comments",
      width: "md",
      valueType: "textarea",
      fieldProps: {
        rows: 4,
      },
    },
  ];

  return (
    <Modal
      title="创建角色"
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <ProTable
        type="form"
        columns={columns}
        onSubmit={async (values: API.Role) => {
          const result = await handleAdd(values);
          if (result) {
            onSubmit();
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
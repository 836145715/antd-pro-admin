import { updateRole } from "@/api/roleController";
import {
  ProTable,
  type ProColumns,
  type ProFormInstance,
} from "@ant-design/pro-components";
import { message, Modal } from "antd";
import { useEffect, useRef } from "react";
import "./index.css";

interface Props {
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  initialValues?: API.Role;
}

const EditModal = (props: Props) => {
  const { visible, onCancel, onSubmit, initialValues } = props;
  const formRef = useRef<ProFormInstance>(undefined);

  useEffect(() => {
    if (visible && initialValues) {
      formRef.current?.setFieldsValue(initialValues);
    }
  }, [initialValues, visible]);

  const handleEdit = async (values: API.Role) => {
    const hide = message.loading("更新中...");
    // 初始数据合并
    const updateValue = { ...initialValues, ...values };
    try {
      await updateRole(updateValue);
      hide();
      message.success("更新成功");
      return true;
    } catch (error: any) {
      hide();
      message.error("更新失败：" + error.message);
      return false;
    }
  };

  const columns: ProColumns<API.Role>[] = [
    {
      title: "角色ID",
      dataIndex: "roleId",
      width: "md",
      readonly: true,
    },
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
      title="更新角色"
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden
    >
      <ProTable
        type="form"
        columns={columns}
        formRef={formRef}
        form={{ initialValues }}
        onSubmit={async (values: API.Role) => {
          const result = await handleEdit(values);
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

export default EditModal;

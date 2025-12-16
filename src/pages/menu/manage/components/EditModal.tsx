import { updateMenu } from "@/api/menuController";
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
  onSubmit: (values: API.Menu) => void;
  columns: ProColumns<API.Menu>[];
  initialValues?: API.Menu;
}

const EditModal = (props: Props) => {
  const { visible, onCancel, onSubmit, columns, initialValues } = props;
  const formRef = useRef<ProFormInstance>(undefined);

  useEffect(() => {
    console.log("initialValues update: ", initialValues);
    formRef.current?.setFieldsValue(initialValues);
  }, [initialValues, formRef]);

  const handleEdit = async (values: API.Menu) => {
    const hide = message.loading("更新中...");
    // 初始数据合并
    const updateValue = { ...initialValues, ...values };
    try {
      await updateMenu(updateValue);
      hide();
      message.success("更新成功");
      return true;
    } catch (error: any) {
      hide();
      message.error("更新失败：" + error.message);
      return false;
    }
  };

  return (
    <Modal
      title="更新菜单"
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
        onSubmit={async (values: API.Menu) => {
          const result = await handleEdit(values);
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

export default EditModal;
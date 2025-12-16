import {
  ProTable,
  type ProColumns,
  type ProFormInstance,
} from "@ant-design/pro-components";
import { Modal } from "antd";
import { useEffect, useRef } from "react";
import "./index.css";

interface BaseProps<T = any> {
  visible: boolean;
  onCancel: () => void;
  columns: ProColumns<T>[];
  title: string;
  onSubmit: (values: T) => Promise<boolean>;
  initialValues?: T;
  destroyOnHidden?: boolean;
}

/**
 * 通用表单弹窗组件
 */
const FormModal = <T extends Record<string, any>>({
  visible,
  onCancel,
  columns,
  title,
  onSubmit,
  initialValues,
  destroyOnHidden,
}: BaseProps<T>) => {
  const formRef = useRef<ProFormInstance>(undefined);

  useEffect(() => {
    if (visible && initialValues) {
      formRef.current?.setFieldsValue(initialValues);
    }
  }, [initialValues, visible]);

  const handleSubmit = async (values: T) => {
    const result = await onSubmit(values);
    if (result) {
      formRef.current?.resetFields();
    }
    return result;
  };

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnHidden={destroyOnHidden}
    >
      <ProTable
        type="form"
        columns={columns}
        formRef={formRef}
        form={{ initialValues }}
        onSubmit={handleSubmit}
        search={{
          className: "pro-table-search",
        }}
      />
    </Modal>
  );
};

export default FormModal;

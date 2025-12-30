import { message } from "antd";
import FormModal from "../FormModal";

interface Props<T = any> {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: T) => void | Promise<void>;
  columns: any[];
  initialValues?: T;
  title?: string;
  updateApi?: (values: T) => Promise<any>;
  successMessage?: string;
  loadingMessage?: string;
  errorMessage?: string;
}

/**
 * 通用编辑表单弹窗组件
 */
const EditFormModal = <T extends Record<string, any>>({
  visible,
  onCancel,
  onSubmit,
  columns,
  initialValues,
  title = "更新",
  updateApi,
  successMessage = "更新成功",
  loadingMessage = "更新中...",
  errorMessage = "更新失败",
}: Props<T>) => {
  const handleSubmit = async (values: T): Promise<boolean> => {
    const hide = message.loading(loadingMessage);
    // 初始数据合并
    const updateValue = { ...initialValues, ...values };
    try {
      if (updateApi) {
        await updateApi(updateValue);
        message.success(successMessage);
      }
      await onSubmit(values);
      return true;
    } catch (error: any) {
      message.error(errorMessage + "：" + error.message);
      return false;
    } finally {
      hide();
    }
  };

  return (
    <FormModal<T>
      visible={visible}
      onCancel={onCancel}
      columns={columns}
      title={title}
      onSubmit={handleSubmit}
      initialValues={initialValues}
      destroyOnHidden={true}
    />
  );
};

export default EditFormModal;

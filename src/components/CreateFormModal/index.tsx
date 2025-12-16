import { message } from "antd";
import FormModal from "../FormModal";

interface Props<T = any> {
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  columns: any[];
  title?: string;
  createApi: (values: T) => Promise<any>;
  successMessage?: string;
  loadingMessage?: string;
  errorMessage?: string;
}

/**
 * 通用创建表单弹窗组件
 */
const CreateFormModal = <T extends Record<string, any>>({
  visible,
  onCancel,
  onSubmit,
  columns,
  title = "创建",
  createApi,
  successMessage = "创建成功",
  loadingMessage = "提交中...",
  errorMessage = "创建失败",
}: Props<T>) => {
  const handleSubmit = async (values: T): Promise<boolean> => {
    const hide = message.loading(loadingMessage);
    try {
      await createApi(values);
      hide();
      message.success(successMessage);
      onSubmit();
      return true;
    } catch (error: any) {
      hide();
      message.error(errorMessage + "：" + error.message);
      return false;
    }
  };

  return (
    <FormModal<T>
      visible={visible}
      onCancel={onCancel}
      columns={columns}
      title={title}
      onSubmit={handleSubmit}
      destroyOnClose={true}
    />
  );
};

export default CreateFormModal;
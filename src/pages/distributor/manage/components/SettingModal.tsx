import { distributorSettingSave } from "@/api/distributorController";
import {
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { message, Modal } from "antd";
import React from "react";

interface SettingModalProps {
  visible: boolean;
  onCancel: () => void;
  distributorId?: number;
  distributorName?: string;
  initialValues?: API.DistributorSetting;
}

const SettingModal: React.FC<SettingModalProps> = ({
  visible,
  onCancel,
  distributorId,
  distributorName,
  initialValues,
}) => {
  return (
    <Modal
      title={`运营参数 - ${distributorName || ""}`}
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
      width={800}
    >
      <ProForm<API.DistributorSetting>
        initialValues={initialValues}
        grid={true}
        layout="vertical"
        onFinish={async (values) => {
          if (!distributorId) return false;
          try {
            await distributorSettingSave({
              distributorId: distributorId,
              ...initialValues,
              ...values,
            });
            message.success("运营参数已保存");
            onCancel();
            return true;
          } catch (error: any) {
            message.error("保存失败: " + error.message);
            return false;
          }
        }}
        submitter={{
          searchConfig: { submitText: "保存", resetText: "重置" },
        }}
      >
        <ProFormDigit
          name="precharge"
          label="预充金额"
          colProps={{ span: 12 }}
        />
        <ProFormDigit name="minute" label="免费分钟" colProps={{ span: 12 }} />
        <ProFormDigit
          name="minuteFee"
          label="每分钟金额"
          colProps={{ span: 12 }}
        />
        <ProFormDigit
          name="overMinute"
          label="超出分钟段"
          colProps={{ span: 12 }}
        />
        <ProFormDigit
          name="overminuteFee"
          label="超出金额"
          colProps={{ span: 12 }}
        />
        <ProFormDigit
          name="lastMinute"
          label="最后每增加(分钟)"
          colProps={{ span: 12 }}
        />
        <ProFormDigit
          name="lastMinuteFee"
          label="最后每增加费用"
          colProps={{ span: 12 }}
        />
        <ProFormDigit
          name="dispatchingFee"
          label="调度费用"
          colProps={{ span: 12 }}
        />
        <ProFormSelect
          name="isannounce"
          label="是否通知"
          valueEnum={{ 0: "关闭", 1: "开启" }}
          colProps={{ span: 12 }}
        />
        <ProFormText name="mobile" label="联系电话" colProps={{ span: 12 }} />
        <ProFormText
          name="announceTitle"
          label="通知标题"
          colProps={{ span: 24 }}
        />
        <ProFormTextArea
          name="announceContent"
          label="通知内容"
          colProps={{ span: 24 }}
        />
        <ProFormText
          name="sweepCodeTip"
          label="扫码提示"
          colProps={{ span: 24 }}
        />
      </ProForm>
    </Modal>
  );
};

export default SettingModal;

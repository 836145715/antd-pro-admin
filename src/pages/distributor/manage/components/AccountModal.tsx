import { distributorAccountSave } from "@/api/distributorController";
import {
  ProForm,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { message, Modal } from "antd";
import React from "react";

interface AccountModalProps {
  visible: boolean;
  onCancel: () => void;
  distributorId?: number;
  distributorName?: string;
  initialValues?: API.DistributorAccount;
}

const AccountModal: React.FC<AccountModalProps> = ({
  visible,
  onCancel,
  distributorId,
  distributorName,
  initialValues,
}) => {
  return (
    <Modal
      title={`账户信息 - ${distributorName || ""}`}
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
      width={800}
    >
      <ProForm<API.DistributorAccount>
        initialValues={initialValues}
        grid={true}
        layout="vertical"
        onFinish={async (values) => {
          if (!distributorId) return false;
          try {
            await distributorAccountSave({
              distributorId: distributorId,
              ...initialValues,
              ...values,
            });
            message.success("账户信息已保存");
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
        <ProFormText name="aliPay" label="支付宝账号" colProps={{ span: 12 }} />
        <ProFormText
          name="weixinPay"
          label="微信账号"
          colProps={{ span: 12 }}
        />
        <ProFormText
          name="bankAccount"
          label="银行卡号"
          colProps={{ span: 12 }}
        />
        <ProFormText name="bankType" label="银行类别" colProps={{ span: 12 }} />
        <ProFormText name="realName" label="真实姓名" colProps={{ span: 12 }} />
        <ProFormText name="mobile" label="手机号" colProps={{ span: 12 }} />
        <ProFormText name="email" label="邮箱" colProps={{ span: 12 }} />
        <ProFormText
          name="payName"
          label="支付宝转款姓名"
          colProps={{ span: 12 }}
        />
        <ProFormText
          name="payAccount"
          label="支付宝转款账号"
          colProps={{ span: 12 }}
        />
        <ProFormTextArea
          name="payRemark"
          label="支付备注"
          colProps={{ span: 24 }}
        />
      </ProForm>
    </Modal>
  );
};

export default AccountModal;

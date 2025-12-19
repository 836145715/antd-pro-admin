import { ProCard } from "@ant-design/pro-components";
import React from "react";
import DistributorList from "./components/DistributorList";
import WithdrawalList from "./components/WithdrawalList";

const DistributorManage: React.FC = () => {
  return (
    <ProCard tabs={{ type: "card" }}>
      <ProCard.TabPane key="list" tab="运营商列表">
        <DistributorList />
      </ProCard.TabPane>
      <ProCard.TabPane key="withdrawal" tab="提现记录">
        <WithdrawalList />
      </ProCard.TabPane>
    </ProCard>
  );
};

export default DistributorManage;

import { useState } from "react";
import Title from "antd/es/typography/Title";
import DictList from "./DictList";
import DictItemList from "./DictItemList";

/**
 * 字典管理页面 - 左右布局
 * 左侧：字典分类列表
 * 右侧：字典明细列表
 */
export default function DatadictManage() {
  const [selectedDict, setSelectedDict] = useState<API.Datadict>();

  return (
    <>
      <Title level={3}>字典管理</Title>
      <div style={{ display: "flex", gap: 16, height: "calc(100vh - 180px)" }}>
        <DictList selectedDict={selectedDict} onSelectDict={setSelectedDict} />
        <DictItemList selectedDict={selectedDict} />
      </div>
    </>
  );
}

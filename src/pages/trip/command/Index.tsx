import {
  tripCommandDel,
  tripCommandPage,
  tripCommandSave,
  tripCommandUpdate,
} from "@/api/tripCommandController";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import type { ActionType } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, message } from "antd";
import Title from "antd/es/typography/Title";
import { useRef, useState } from "react";
import CreateFormModal from "@/components/CreateFormModal";
import EditFormModal from "@/components/EditFormModal";
import { createColumns } from "./columns";

/**
 * 行程命令管理页面
 */
export default function TripCommand() {
  const actionRef = useRef<ActionType>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<API.TripCommand>();

  const onCreateSubmit = async (values: API.TripCommand) => {
    const res = await tripCommandSave(values);
    if (res.success) {
      message.success("创建成功");
      setCreateModalOpen(false);
      actionRef.current?.reload();
    } else {
      message.error("创建失败: " + res.message);
      throw new Error(res.message);
    }
  };

  const onEditSubmit = async (values: API.TripCommand) => {
    const res = await tripCommandUpdate({
      ...values,
      id: currentRow?.id,
    });
    if (res.success) {
      message.success("更新成功");
      setEditModalOpen(false);
      actionRef.current?.reload();
    } else {
      message.error("更新失败: " + res.message);
      throw new Error(res.message);
    }
  };

  const handleDelete = (id: number) => {
    tripCommandDel({ id })
      .then((res: any) => {
        if (res.success) {
          message.success("删除成功");
          actionRef.current?.reload();
        } else {
          message.error("删除失败: " + res.message);
        }
      })
      .catch((error: any) => {
        message.error("删除失败: " + error.message);
      });
  };

  const handleEdit = (record: API.TripCommand) => {
    setCurrentRow(record);
    setEditModalOpen(true);
  };

  const columns = createColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <>
      <Title level={3}>行程命令管理</Title>
      <ProTable<API.TripCommand>
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        scroll={{ x: 1200 }}
        request={async (params) => {
          const res = await tripCommandPage({
            pageNum: params.current,
            pageSize: params.pageSize,
            qrNumber: params.qrNumber,
            imei: params.imei,
            type: params.type,
            bicycleType: params.bicycleType,
            hasExecuted: params.hasExecuted,
            memberId: params.memberId,
          });

          if (res.data) {
            return {
              data: res.data.list || [],
              success: true,
              total: Number(res.data.total) || 0,
            };
          }
          return {
            data: [],
            success: false,
            total: 0,
          };
        }}
        columnsState={{
          persistenceKey: "pro-table-trip-command",
          persistenceType: "localStorage",
        }}
        search={{
          labelWidth: "auto",
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
        }}
        dateFormatter="string"
        headerTitle="行程命令管理"
        toolBarRender={() => [
          <Button
            icon={<PlusOutlined />}
            onClick={() => {
              setCreateModalOpen(true);
            }}
            type="primary"
          >
            新建
          </Button>,
          <Button
            icon={<ReloadOutlined />}
            onClick={() => {
              actionRef.current?.reload();
            }}
          >
            刷新
          </Button>,
        ]}
      />

      {/* 新建弹窗 */}
      <CreateFormModal<API.TripCommand>
        visible={createModalOpen}
        onCancel={() => setCreateModalOpen(false)}
        onSubmit={onCreateSubmit}
        columns={columns}
        title="新增行程命令"
        createApi={tripCommandSave}
        successMessage="创建成功"
      />

      {/* 编辑弹窗 */}
      <EditFormModal<API.TripCommand>
        visible={editModalOpen}
        onCancel={() => {
          setEditModalOpen(false);
          setCurrentRow(undefined);
        }}
        onSubmit={onEditSubmit}
        columns={columns}
        initialValues={currentRow}
        title="修改行程命令"
        updateApi={tripCommandUpdate}
        successMessage="更新成功"
      />
    </>
  );
}

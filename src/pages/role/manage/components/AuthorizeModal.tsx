import { roleAuthorize, roleGetMenus } from "@/api/roleController";
import { menuGetTree } from "@/api/menuController";
import { Tree, message, Modal } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";
import { useEffect, useState } from "react";
import { getAllKeys } from "@/utils/menuUtil";

interface Props {
  visible: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  roleId?: number;
}

const AuthorizeModal = (props: Props) => {
  const { visible, onCancel, onSubmit, roleId } = props;
  const [treeData, setTreeData] = useState<DataNode[]>([]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);

  // 获取菜单树
  const fetchMenuTree = async () => {
    try {
      const response = await menuGetTree();
      if (response.success && response.data) {
        const data = transformMenuData(response.data);
        setTreeData(data);
        setExpandedKeys(getAllKeys(data));
      }
    } catch (error: any) {
      message.error("获取菜单树失败：" + error.message);
    }
  };

  // 获取角色已有的菜单权限
  const fetchRoleMenus = async () => {
    if (!roleId) return;

    try {
      const response = await roleGetMenus({ roleId });
      if (response.success && response.data) {
        setCheckedKeys(response.data);
      }
    } catch (error: any) {
      message.error("获取角色菜单权限失败：" + error.message);
    }
  };

  // 转换菜单数据为树形结构
  const transformMenuData = (menus: API.Menu[]): DataNode[] => {
    return menus.map(
      (menu) =>
        ({
          title: menu.name,
          key: menu.id,
          children: menu.children
            ? transformMenuData(menu.children)
            : undefined,
        } as DataNode)
    );
  };

  // 处理确认授权
  const handleAuthorize = async () => {
    if (!roleId) {
      message.error("角色ID不能为空");
      return;
    }

    setLoading(true);
    try {
      await roleAuthorize({
        roleId,
        menuIds: checkedKeys.map((key) => key.toString()),
      });
      message.success("授权成功");
      onSubmit();
    } catch (error: any) {
      message.error("授权失败：" + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchMenuTree();
      fetchRoleMenus();
    }
  }, [visible, roleId]);

  const onCheck: TreeProps["onCheck"] = (checkedKeysValue) => {
    setCheckedKeys(checkedKeysValue as React.Key[]);
  };

  const onExpand: TreeProps["onExpand"] = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue as React.Key[]);
  };

  return (
    <Modal
      title="分配菜单权限"
      open={visible}
      onCancel={onCancel}
      onOk={handleAuthorize}
      confirmLoading={loading}
      width={600}
      destroyOnHidden
    >
      <Tree
        checkable
        checkedKeys={checkedKeys}
        onCheck={onCheck}
        treeData={treeData}
        height={400}
        expandedKeys={expandedKeys}
        onExpand={onExpand}
      />
    </Modal>
  );
};

export default AuthorizeModal;

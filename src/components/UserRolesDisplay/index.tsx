import { useEffect, useState } from "react";
import { Tag } from "antd";

interface Props {
  roleIds?: number[];
  allRoles: API.Role[];
}

/**
 * 用户角色显示组件
 */
const UserRolesDisplay = ({ roleIds, allRoles }: Props) => {
  const [roleNames, setRoleNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserRoles = async () => {
      if (!roleIds) return;

      setLoading(true);
      try {
        const names = allRoles
          .filter((role) => roleIds.includes(role.roleId!))
          .map((role) => role.roleName!);
        setRoleNames(names);
      } catch (error) {
        console.error("获取用户角色失败:", error);
        setRoleNames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRoles();
  }, [roleIds, allRoles]);

  if (loading) {
    return <span style={{ color: "#999" }}>加载中...</span>;
  }

  if (roleNames.length === 0) {
    return <span style={{ color: "#999" }}>无角色</span>;
  }

  return (
    <div>
      {roleNames.map((name, index) => (
        <Tag key={index} color="blue" style={{ marginBottom: 4 }}>
          {name}
        </Tag>
      ))}
    </div>
  );
};

export default UserRolesDisplay;

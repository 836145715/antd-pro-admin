import type { DataNode } from "antd/es/tree";

function getAllKeys(nodes: DataNode[] = []) {
    const keys: React.Key[] = [];
    const loop = (list: DataNode[]) => {
      list.forEach((item) => {
        keys.push(item.key);
        if (item.children) loop(item.children);
      });
    };
    loop(nodes);
    return keys;
}

export {getAllKeys};
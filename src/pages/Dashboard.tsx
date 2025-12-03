import React, { useState } from "react";
import { theme, Transfer, Tree } from "antd";
import type { GetProp, TransferProps, TreeDataNode } from "antd";

type TransferItem = GetProp<TransferProps, "dataSource">[number];

interface TreeTransferProps {
  dataSource: TreeDataNode[];
  targetKeys: TransferProps["targetKeys"];
  onChange: TransferProps["onChange"];
}

// Customize Table Transfer
const isChecked = (selectedKeys: React.Key[], eventKey: React.Key) =>
  selectedKeys.includes(eventKey);

const generateTree = (
  treeNodes: TreeDataNode[] = [],
  checkedKeys: TreeTransferProps["targetKeys"] = []
): TreeDataNode[] =>
  treeNodes.map(({ children, ...props }) => ({
    ...props,
    disabled: checkedKeys.includes(props.key as string),
    children: generateTree(children, checkedKeys),
  }));

const TreeTransfer: React.FC<TreeTransferProps> = ({
  dataSource,
  targetKeys = [],
  ...restProps
}) => {
  const { token } = theme.useToken();

  const transferDataSource: TransferItem[] = [];
  function flatten(list: TreeDataNode[] = []) {
    list.forEach((item) => {
      transferDataSource.push(item as TransferItem);
      flatten(item.children);
    });
  }
  flatten(dataSource);

  return (
    <Transfer
      {...restProps}
      targetKeys={targetKeys}
      dataSource={transferDataSource}
      className="tree-transfer"
      render={(item) => item.title!}
      showSelectAll={false}
    >
    {({ direction, onItemSelect, onItemSelectAll, selectedKeys }) => {
        if (direction === "left") {
          // 左側 Tree 的勾選狀態只對應到「目前被選取準備 Transfer 的節點」
          const checkedKeys = selectedKeys;
          return (
            <div style={{ padding: token.paddingXS }}>
              <Tree
                blockNode
                checkable
                defaultExpandAll
                checkedKeys={checkedKeys}
                treeData={generateTree(dataSource, targetKeys)}
                onCheck={(checkedKeysValue) => {
                  // Ant Design Tree 在勾選父節點時，會同時回傳所有被勾選的 keys（包含子節點）。
                  // 這裡直接用「Tree 的 checkedKeys」對齊 Transfer 左側的 selectedKeys，
                  // 並透過 Transfer 提供的 onItemSelectAll 一次性同步，避免多次調用造成 state 被覆蓋。
                  const newCheckedList = Array.isArray(checkedKeysValue)
                    ? (checkedKeysValue as React.Key[])
                    : ((checkedKeysValue as { checked: React.Key[] }).checked ??
                       []);

                  const nextChecked = newCheckedList.filter(
                    (k): k is string => typeof k === "string"
                  ) as string[];

                  const prevSelectedKeys = selectedKeys;

                  const toSelect = nextChecked.filter(
                    (k) => !prevSelectedKeys.includes(k)
                  );
                  const toUnselect = prevSelectedKeys.filter(
                    (k) => !nextChecked.includes(k as string)
                  );

                  if (toSelect.length) {
                    onItemSelectAll(toSelect, true);
                  }
                  if (toUnselect.length) {
                    onItemSelectAll(toUnselect, false);
                  }
                }}
                onSelect={(_, { node: { key } }) => {
                  onItemSelect(key as string, !isChecked(checkedKeys, key));
                }}
              />
            </div>
          );
        }
      }}
    </Transfer>
  );
};

const treeData: TreeDataNode[] = [
  { key: "0-0", title: "0-0" },
  {
    key: "0-1",
    title: "0-1",
    children: [
      { key: "0-1-0", title: "0-1-0" },
      { key: "0-1-1", title: "0-1-1" },
    ],
  },
  { key: "0-2", title: "0-2" },
];

export default function Dashboard() {
  const [targetKeys, setTargetKeys] = useState<React.Key[]>([]);

  return (
    <div>
      <TreeTransfer
        dataSource={treeData}
        targetKeys={targetKeys}
        onChange={(keys) => setTargetKeys(keys)}
      />
    </div>
  );
}

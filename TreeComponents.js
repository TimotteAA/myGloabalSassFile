import React, { useState } from "react";

import classNames from "classnames";

import "./App.css";

export default function App(props) {
  const init = (data) => {
    // 给每个非叶子节点加个cnt属性
    if (!data || !data.length) return;

    for (let node of data) {
      if (node.children && node.children.length) {
        node.cnt = 0;
        init(node);
      } else {
        return;
      }
    }
    return data;
  };

  const data = [
    {
      id: 1,
      title: "电脑",
      clicked: false,
      opened: true,
      children: [
        {
          parent: 1,
          id: 21,
          title: "华硕",
          clicked: false,
          opened: false,
          children: [
            {
              parent: 21,
              id: 21131231231,
              title: "a-1",
              clicked: false,
              opened: false,
            },
            {
              parent: 21,
              id: 311231231231,
              title: "a-2",
              clicked: false,
              opened: false,
            },
            {
              parent: 21,
              id: 41123121231231,
              title: "a-3",
              clicked: false,
              opened: true,
            },
          ],
        },
        { parent: 1, id: 31, title: "微星", clicked: false, opened: false },
        { parent: 1, id: 41, title: "弘基", clicked: false, opened: true },
      ],
    },
    { id: 2, title: "电脑", clicked: false, opened: false },
    { id: 3, title: "电脑", clicked: false, opened: false },
    { id: 4, title: "电脑", clicked: false, opened: true },
    {
      id: 5,
      title: "手机",
      clicked: false,
      opened: true,
      children: [
        {
          parent: 5,
          id: 212,
          title: "华为",
          clicked: false,
          opened: false,
          children: [
            {
              parent: 212,
              id: 2113,
              title: "a-1",
              clicked: false,
              opened: false,
            },
            {
              parent: 212,
              id: 31123,
              title: "a-2",
              clicked: false,
              opened: false,
            },
            {
              parent: 212,
              id: 4112312,
              title: "a-3",
              clicked: false,
              opened: true,
            },
          ],
        },
        { parent: 5, id: 311, title: "阿萨德", clicked: false, opened: false },
        { parent: 5, id: 412, title: "asdas", clicked: false, opened: true },
      ],
    },
  ];

  const [rootData, setRootData] = useState(data);

  const dfs = (item, state) => {
    if (item.children && item.children.length) {
      for (let child of item.children) {
        child.clicked = state;
        dfs(child, state);
      }
    } else {
      return;
    }
  };

  // clicked：当前选中的一支
  // checkbox：是否选择当前项及子项
  const Tree = ({ data }) => {
    return (
      <ul className="tree">
        {data.map((item) => {
          return (
            <li className="tree-item" key={item.id}>
              {item.children && item.children.length && (
                <div
                  className={classNames({ opened: true, yes: item.opened })}
                  onClick={() => {
                    item.opened = !item.opened;
                    setRootData([...rootData]);
                  }}
                ></div>
              )}
              <div
                className={classNames({ checkbox: true, yes: item.clicked })}
                onClick={() => {
                  item.clicked = !item.clicked;
                  // 修改子组件clicked
                  dfs(item, item.clicked);

                  if (!item.children) {
                    // 点击了叶子结点
                  }
                  setRootData([...rootData]);
                }}
              ></div>
              <div className="title">{item.title}</div>

              {item.opened && item.children && item.children && (
                <Tree data={item.children} />
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return <Tree data={rootData} />;
}

import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

function Sidebar({ children }) {
  const [collapsed, toggleCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => toggleCollapsed(!collapsed)}
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="home">
            <Icon type="home" />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="create-set">
            <Icon type="plus-square" />
            <span>Create Set</span>
          </Menu.Item>
          <Menu.Item key="settings">
            <Icon type="setting" />
            <span>Settings</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="folder" />
                <span>Folders</span>
              </span>
            }
          >
            <Menu.Item key="create-folder">
              <Icon type="folder-add" />
              <span>Create folder</span>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="logout">
            <Icon type="logout" />
            <span>Logout</span>
          </Menu.Item>
        </Menu>
      </Sider>
      {children}
    </Layout>
  );
}

export default Sidebar;

import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import User from './User';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

function Sidebar({ history, children }) {
  const [collapsed, toggleCollapsed] = useState(false);

  function handleOnSelect({ selectedKeys }) {
    const [selected] = selectedKeys;
    switch (selected) {
      case 'home':
        history.push('/dashboard');
        break;
      case 'create-deck':
        history.push('/create-deck');
        break;
      default:
        break;
    }
  }

  return (
    <User>
      {({ data }) => (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={() => toggleCollapsed(!collapsed)}
          >
            <div className="logo" />
            <Menu
              onSelect={handleOnSelect}
              theme="dark"
              defaultSelectedKeys={['1']}
              mode="inline"
            >
              <Menu.Item key="home">
                <Icon type="home" />
                <span>Home</span>
              </Menu.Item>
              <Menu.Item key="create-deck">
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

              {data.me && (
                <Menu.Item key="logout">
                  <Icon type="logout" />
                  <span>Logout</span>
                </Menu.Item>
              )}
            </Menu>
          </Sider>
          {children}
        </Layout>
      )}
    </User>
  );
}

export default withRouter(Sidebar);

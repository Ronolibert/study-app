import React, { useState } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { withRouter } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import User from './User';

const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

const FOLDERS_QUERY = gql`
  query {
    folders {
      id
      name
    }
  }
`;

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
        <Query query={FOLDERS_QUERY}>
          {({ data }) => (
            <Layout style={{ minHeight: '100vh' }}>
              <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={() => toggleCollapsed(!collapsed)}
              >
                <div className="logo" />
                <Menu onSelect={handleOnSelect} theme="dark" mode="inline">
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
                    {data.folders &&
                      data.folders.map(({ name, id }) => (
                        <Menu.Item key={id}>
                          <Icon type="folder-add" />
                          <span>{name}</span>
                        </Menu.Item>
                      ))}
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
        </Query>
      )}
    </User>
  );
}

export default withRouter(Sidebar);
export { FOLDERS_QUERY };

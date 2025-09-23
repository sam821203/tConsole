import { Layout, Menu, Button, Typography } from 'antd'
import {
  DashboardOutlined,
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { useAuth, mockUsers } from '../context/AuthContext'

const { Header, Sider, Content } = Layout

export default function AppLayout() {
  const location = useLocation()
  const { user, login, logout } = useAuth()

  const selectedKeys = [location.pathname]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div style={{ height: 48, margin: 16, background: 'rgba(255,255,255,0.2)' }} />
        <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
          <Menu.Item key="/" icon={<DashboardOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="/users" icon={<UserOutlined />}>
            <Link to="/users">Users</Link>
          </Menu.Item>
          <Menu.Item key="/admin" icon={<LockOutlined />}>
            <Link to="/admin">Admin</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ display: 'flex', alignItems: 'center', padding: '0 16px', background: '#fff' }}>
          <Typography.Title level={4} style={{ margin: 0, flex: 1 }}>tConsole</Typography.Title>
          {user ? (
            <>
              <span style={{ marginRight: 12 }}>Hello, {user.name}</span>
              <Button onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button style={{ marginRight: 8 }} onClick={() => login(mockUsers.user)}>Login User</Button>
              <Button type="primary" onClick={() => login(mockUsers.admin)}>Login Admin</Button>
            </>
          )}
        </Header>
        <Content style={{ margin: 16, width: '100%' }}>
          <div style={{ padding: 16, background: '#fff', minHeight: 360, width: '100%' }}>
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

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
    <Layout className="!w-full" style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div style={{ height: 48, margin: 16, background: 'rgba(255,255,255,0.2)' }} />
        <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
          {[
            {
              key: '/',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
              to: '/',
            },
            {
              key: '/users',
              icon: <UserOutlined />,
              label: 'Users',
              to: '/users',
            },
            {
              key: '/admin',
              icon: <LockOutlined />,
              label: 'Admin',
              to: '/admin',
            },
          ].map(item => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.to}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className='!w-full'>
        <Header style={{ width: '100%', display: 'flex', alignItems: 'center', background: '#fff' }}>
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

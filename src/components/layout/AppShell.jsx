// src/components/layout/AppShell.jsx
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export function AppShell() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <main style={{
        flex: 1, padding: '32px', overflowY: 'auto',
        background: 'var(--bg-base)',
        backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,200,255,0.06), transparent)',
      }}>
        <Outlet />
      </main>
    </div>
  )
}

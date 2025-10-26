import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  TrendingUp, 
  Target, 
  Settings,
  BarChart3,
  MessageSquare,
  Calendar,
  Boxes,
  Zap
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ activeTab, setActiveTab, isOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: '#00ADB5' },
    { id: 'orders', label: 'Orders', icon: Package, color: '#E31E6A' },
    { id: 'intake', label: 'New Order', icon: Calendar, color: '#21C685' },
    { id: 'production', label: 'Production', icon: Boxes, color: '#D4AF37' },
    { id: 'customers', label: 'Customers', icon: Users, color: '#6366f1' },
    { id: 'goals', label: 'Goals', icon: Target, color: '#f59e0b' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: '#8b5cf6' },
    { id: 'ai-coach', label: 'AI Coach', icon: Zap, color: '#ec4899' },
    { id: 'messages', label: 'Messages', icon: MessageSquare, color: '#10b981' },
    { id: 'settings', label: 'Settings', icon: Settings, color: '#6b7280' }
  ];

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <nav className="sidebar-nav">
        <div className="nav-section">
          <span className="nav-section-title">Main</span>
          {menuItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                style={{
                  '--item-color': item.color
                }}
              >
                <Icon size={20} className="nav-icon" />
                {isOpen && <span className="nav-label">{item.label}</span>}
                {activeTab === item.id && <div className="active-indicator" />}
              </button>
            );
          })}
        </div>

        <div className="nav-section">
          <span className="nav-section-title">Business Intelligence</span>
          {menuItems.slice(5, 8).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                style={{
                  '--item-color': item.color
                }}
              >
                <Icon size={20} className="nav-icon" />
                {isOpen && <span className="nav-label">{item.label}</span>}
                {activeTab === item.id && <div className="active-indicator" />}
              </button>
            );
          })}
        </div>

        <div className="nav-section">
          <span className="nav-section-title">System</span>
          {menuItems.slice(8).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                style={{
                  '--item-color': item.color
                }}
              >
                <Icon size={20} className="nav-icon" />
                {isOpen && <span className="nav-label">{item.label}</span>}
                {activeTab === item.id && <div className="active-indicator" />}
              </button>
            );
          })}
        </div>
      </nav>

      <div className="sidebar-footer">
        {isOpen && (
          <div className="system-status">
            <div className="status-dot active"></div>
            <span>All Systems Active</span>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

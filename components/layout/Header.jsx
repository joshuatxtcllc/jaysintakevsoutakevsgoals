import React from 'react';
import { Sun, Moon, Menu, Bell } from 'lucide-react';
import './Header.css';

const Header = ({ darkMode, toggleTheme, toggleSidebar }) => {
  return (
    <header className="app-header">
      <div className="header-left">
        <button onClick={toggleSidebar} className="menu-button">
          <Menu size={24} />
        </button>
        <div className="logo-section">
          <h1 className="logo-text">Jay's Frames</h1>
          <span className="logo-subtitle">Production Analytics</span>
        </div>
      </div>

      <div className="header-right">
        <button className="icon-button notification-button">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>

        <button 
          onClick={toggleTheme} 
          className="icon-button theme-toggle"
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="user-section">
          <div className="user-avatar">JJ</div>
          <div className="user-info">
            <span className="user-name">Jay Johnson</span>
            <span className="user-role">Owner</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

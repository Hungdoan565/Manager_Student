import {
    BarChart3,
    Bell,
    Calendar,
    Home,
    LogOut,
    Menu,
    Search,
    Settings,
    User,
    Users,
    X
} from 'lucide-react';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import GooeyNav from './GooeyNav';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Trang chủ', href: '/', icon: Home },
    { name: 'Sinh viên', href: '/students', icon: Users },
    { name: 'Lớp học', href: '/classes', icon: Users },
    { name: 'Điểm danh', href: '/attendance', icon: Calendar },
    { name: 'Thời khóa biểu', href: '/schedules', icon: Calendar },
    { name: 'Báo cáo', href: '/reports', icon: BarChart3 },
    { name: 'Cài đặt', href: '/settings', icon: Settings },
  ];

  // Find active index for GooeyNav
  const getActiveIndex = () => {
    const currentPath = location.pathname;
    return navigationItems.findIndex(item => {
      if (item.href === '/') {
        return currentPath === '/';
      }
      return currentPath.startsWith(item.href);
    });
  };

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SMS</span>
              </div>
              <span className="text-xl font-bold text-foreground">Student Management</span>
            </Link>
          </div>

          {/* Desktop Navigation with GooeyNav */}
          <div className="hidden md:flex items-center">
            <GooeyNav
              items={navigationItems}
              initialActiveIndex={getActiveIndex()}
              className="mx-4"
            />
          </div>

          {/* Right side - Search, Notifications, Profile */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="pl-10 pr-4 py-2 w-64 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button className="flex items-center space-x-2 p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">Giáo viên</span>
              </button>
            </div>

            {/* Logout */}
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
              <LogOut className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-card border-t border-border">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            {/* Mobile Profile Actions */}
            <div className="px-3 py-2 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Giáo viên</span>
                </div>
                <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

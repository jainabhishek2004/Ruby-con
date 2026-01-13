import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  LogOut, 
  User, 
  Shield, 
  Home, 
  Info, 
  BarChart3, 
  LifeBuoy, 
  Mail, 
  Bell,
  Settings
} from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isLoggedIn: boolean;
  isAdmin?: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export default function Header({ 
  currentPage, 
  onPageChange, 
  isLoggedIn, 
  isAdmin = false,
  onLogin, 
  onLogout 
}: HeaderProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: Info },
    { id: 'tokenomics', label: 'Tokenomics', icon: BarChart3 },
   
    { id: 'support', label: 'Support', icon: LifeBuoy },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  // Add protected navigation items for logged-in users
  const protectedNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: User, protected: true },
  ];

  // Add admin-only navigation items
  const adminNavItems = [
    { id: 'admin', label: 'Admin Panel', icon: Settings, adminOnly: true },
  ];

  const allNavItems = [
    ...navItems,
    ...(isLoggedIn ? protectedNavItems : []),
    ...(isAdmin ? adminNavItems : [])
  ];

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onPageChange('home')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-md">
              <div className="w-5 h-5 bg-white rounded-md transform rotate-45"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">RubyCon</h1>
              <p className="text-xs text-muted-foreground">RBQ Token Platform</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {allNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center space-x-2 ${
                    item.adminOnly ? 'text-primary' : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.adminOnly && (
                    <Shield className="w-3 h-3 ml-1" />
                  )}
                </Button>
              );
            })}
          </nav>

          {/* Auth Section */}
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                {/* User Status Badge */}
                <div className="flex items-center space-x-2">
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    <User className="w-3 h-3 mr-1" />
                    Logged In
                  </Badge>
                  {isAdmin && (
                    <Badge variant="default" className="bg-primary text-primary-foreground">
                      <Shield className="w-3 h-3 mr-1" />
                      Admin
                    </Badge>
                  )}
                </div>
                
                {/* Logout Button */}
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={onLogout}
                  className="flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </Button>
              </div>
            ) : (
              <Button 
                onClick={onLogin}
                className="flex items-center space-x-2"
              >
                <Shield className="w-4 h-4" />
                <span>Login</span>
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex flex-wrap gap-2">
            {allNavItems.slice(0, 6).map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(item.id)}
                  className={`flex items-center space-x-1 text-xs ${
                    item.adminOnly ? 'text-primary' : ''
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{item.label}</span>
                  {item.adminOnly && (
                    <Shield className="w-2 h-2 ml-1" />
                  )}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
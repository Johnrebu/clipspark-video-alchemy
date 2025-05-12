
import React from 'react';
import { MenuIcon, X, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

const Navbar = ({ toggleSidebar, sidebarCollapsed }: NavbarProps) => {
  return (
    <header className="h-16 border-b border-border bg-background">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="mr-4"
          >
            {sidebarCollapsed ? (
              <MenuIcon className="h-5 w-5" />
            ) : (
              <X className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <h1 className="text-lg font-medium hidden md:block">Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
            <User className="h-5 w-5 text-accent-foreground" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

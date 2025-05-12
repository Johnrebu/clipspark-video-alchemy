
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Video, Settings, FolderOpen, PlusCircle } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
}

const Sidebar = ({ collapsed }: SidebarProps) => {
  return (
    <aside 
      className={`bg-sidebar transition-all duration-300 ease-in-out ${
        collapsed ? 'w-16' : 'w-64'
      } h-full overflow-hidden`}
    >
      <div className="h-full flex flex-col border-r border-border">
        <div className="p-4 flex items-center justify-center">
          {!collapsed ? (
            <Link to="/" className="flex items-center gap-2">
              <Video className="h-6 w-6 text-brand-purple" />
              <span className="font-bold text-lg text-white">Text2Video AI</span>
            </Link>
          ) : (
            <Link to="/" className="flex items-center justify-center">
              <Video className="h-6 w-6 text-brand-purple" />
            </Link>
          )}
        </div>
        
        <nav className="flex-1 mt-6">
          <ul className="space-y-2 px-2">
            <li>
              <Link 
                to="/" 
                className="flex items-center p-3 text-muted-foreground hover:text-white hover:bg-accent rounded-md transition-colors"
              >
                <Home className="h-5 w-5" />
                {!collapsed && <span className="ml-3">Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/projects" 
                className="flex items-center p-3 text-muted-foreground hover:text-white hover:bg-accent rounded-md transition-colors"
              >
                <FolderOpen className="h-5 w-5" />
                {!collapsed && <span className="ml-3">My Projects</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/new" 
                className="flex items-center p-3 text-muted-foreground hover:text-white hover:bg-accent rounded-md transition-colors"
              >
                <PlusCircle className="h-5 w-5" />
                {!collapsed && <span className="ml-3">New Project</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/settings" 
                className="flex items-center p-3 text-muted-foreground hover:text-white hover:bg-accent rounded-md transition-colors"
              >
                <Settings className="h-5 w-5" />
                {!collapsed && <span className="ml-3">Settings</span>}
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="p-4">
          {!collapsed && (
            <div className="bg-muted rounded-lg p-3 mb-4">
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-white">Pro Tip</p>
                <p className="text-xs mt-1">Try our new AI templates for faster video creation!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

import { useState } from 'react';
import { Building2, LayoutDashboard, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-amber-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Building2 className="h-8 w-8" />
              <span className="text-xl font-bold">ConstructionXpert</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/projects"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-700 transition-colors duration-150"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Projects</span>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 transition-colors duration-150"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/projects"
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-700 transition-colors duration-150"
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard className="h-5 w-5" />
                <span>Projects</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
import { Building2, LayoutDashboard } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
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
          <div className="flex items-center space-x-4">
            <Link
              to="/projects"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium hover:bg-amber-700 transition-colors"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Projets</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
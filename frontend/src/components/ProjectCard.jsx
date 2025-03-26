import { Calendar, Clock, Trash2, Edit2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project, projectId, onDelete, onEdit }) {

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <h3 className="text-xl font-semibold text-amber-900 mb-3 truncate">{project.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{project.description || 'No description provided'}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-5">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-amber-600" />
            <span>Start: {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-amber-600" />
            <span>End: {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <Link to={`/projects/${projectId}/edit`}>
              <button
                className="inline-flex items-center px-3 py-1.5 border border-amber-600 text-amber-600 rounded-md hover:bg-amber-50 focus:ring-2 focus:ring-amber-500 transition-colors duration-150"
              >
                <Edit2 className="h-4 w-4 mr-1" />
                Edit
              </button>
            </Link>
            
            <button
              onClick={() => onDelete(project._id)}
              className="inline-flex items-center px-3 py-1.5 border border-red-600 text-red-600 rounded-md hover:bg-red-50 focus:ring-2 focus:ring-red-500 transition-colors duration-150"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </button>
          </div>
          
          <Link
            to={`/projects/${projectId}`}
            className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 transition-colors duration-150"
          >
            Details
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
import { Calendar, Clock, Trash2, Edit2, ArrowRight, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TaskCard({ task, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-2 truncate">{task.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{task.description || 'No description'}</p>
        
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-5">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-amber-600" />
            <span>Start: {task.startDate ? new Date(task.startDate).toLocaleDateString() : 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1 text-amber-600" />
            <span>End: {task.endDate ? new Date(task.endDate).toLocaleDateString() : 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-1 text-amber-600" />
            <span>{task.resourceCount || 0} Resources</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <button
              onClick={() => onEdit(task)}
              className="inline-flex items-center px-3 py-1.5 border border-amber-600 text-amber-600 rounded-md hover:bg-amber-50 focus:ring-2 focus:ring-amber-500 transition-colors duration-150"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="inline-flex items-center px-3 py-1.5 border border-red-600 text-red-600 rounded-md hover:bg-red-50 focus:ring-2 focus:ring-red-500 transition-colors duration-150"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </button>
          </div>
          
          <Link
            to={`/tasks/${task._id}`}
            className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 transition-colors duration-150"
          >
            Resources
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
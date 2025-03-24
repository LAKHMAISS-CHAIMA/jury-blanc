import { Calendar, Clock, Trash2, Edit2, ArrowRight, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TaskCard({ task, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-amber-900 mb-2">{task.name}</h3>
        <p className="text-gray-600 mb-4">{task.description}</p>
        
        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Start: {new Date(task.startDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>End: {new Date(task.endDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <Package className="h-4 w-4 mr-1" />
            <span>{task.resourceCount} Resources</span>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <button
              onClick={() => onEdit(task)}
              className="inline-flex items-center px-3 py-1.5 border border-amber-600 text-amber-600 rounded-md hover:bg-amber-50 transition-colors"
            >
              <Edit2 className="h-4 w-4 mr-1" />
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="inline-flex items-center px-3 py-1.5 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </button>
          </div>
          
          <Link
            to={`/tasks/${task._id}`}
            className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            Resources
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
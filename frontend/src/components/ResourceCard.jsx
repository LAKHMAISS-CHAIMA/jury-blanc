import { Package, Trash2, Edit2 } from 'lucide-react';

export default function ResourceCard({ resource, onDelete, onEdit }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="flex items-center mb-3">
          <Package className="h-5 w-5 text-amber-600 mr-2" />
          <h3 className="text-lg font-semibold text-amber-900">{resource.name}</h3>
        </div>
        
        <p className="text-gray-600 mb-3">{resource.description}</p>
        
        <div className="text-sm text-gray-500 mb-4">
          Quantity: <span className="font-medium">{resource.quantity}</span>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => onEdit(resource)}
            className="inline-flex items-center px-3 py-1.5 border border-amber-600 text-amber-600 rounded-md hover:bg-amber-50 transition-colors"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </button>
          <button
            onClick={() => onDelete(resource._id)}
            className="inline-flex items-center px-3 py-1.5 border border-red-600 text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
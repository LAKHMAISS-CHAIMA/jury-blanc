import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Trash2, Edit } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { getTask } from '../api/tasks';
import { getResources, deleteResource } from '../api/resources';

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTaskAndResources();
  }, [id]);

  const loadTaskAndResources = async () => {
    try {
      const taskResponse = await getTask(id);
      console.log('Task loaded:', taskResponse);
      setTask(taskResponse);

      try {
        const resourcesResponse = await getResources(id);
        console.log('Resources loaded:', resourcesResponse);
        setResources(resourcesResponse || []);
      } catch (error) {
        console.error('Error loading resources:', error);
        setResources([]);
      }
    } catch (error) {
      console.error('Error loading task/resources:', error);
      toast.error('Failed to load task details');
      navigate('/projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResource = async (resourceId) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await deleteResource(resourceId);
        toast.success('Resource deleted successfully');
        setResources(resources.filter((res) => res._id !== resourceId));
      } catch (error) {
        console.error('Error deleting resource:', error);
        toast.error('Failed to delete resource');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  if (!task) {
    return <p>Task not found.</p>;
  }

  return (
    <div className="p-5">
      <div className="flex items-center mb-6">
        <Link to={`/projects/${task.projectId}`} className="text-amber-600 hover:text-amber-700 mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-3xl font-bold text-amber-900">{task.name}</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-600">{task.description}</p>
        <div className="flex items-center space-x-4 mt-4 text-sm text-gray-500">
          <span>Start: {new Date(task.startDate).toLocaleDateString()}</span>
          <span>End: {new Date(task.endDate).toLocaleDateString()}</span>
          <span>Status: {task.status}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-amber-900">Resources</h2>
        <Link
          to={`/tasks/${id}/resources/new`}
          className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Resource
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.isArray(resources) && resources.length > 0 ? (
          resources.map((resource) => (
            <div key={resource._id} className="bg-white rounded-lg shadow-md p-4 relative">
              <h3 className="text-lg font-semibold text-amber-900">{resource.name}</h3>
              <p className="text-gray-600">{resource.description}</p>
              <p className="text-sm text-gray-500">
                Quantity: {resource.quantity} {resource.unit}
              </p>
              <div className="flex space-x-2 mt-2">
                <Link
                  to={`/resources/${resource._id}/edit`}
                  className="text-amber-600 hover:text-amber-700 flex items-center"
                >
                  <Edit className="h-5 w-5 mr-1" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteResource(resource._id)}
                  className="text-red-600 hover:text-red-700 flex items-center"
                >
                  <Trash2 className="h-5 w-5 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 col-span-2">
            <p className="text-gray-500 text-lg">No resources found. Add your first resource!</p>
          </div>
        )}
      </div>
    </div>
  );
}
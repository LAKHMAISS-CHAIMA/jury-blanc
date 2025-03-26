import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';
import ResourceCard from '../components/ResourceCard';
import { getTask } from '../api/tasks';
import { getResources, deleteResource } from '../api/resources';

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [task, setTask] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTaskAndResources();
  }, [id, location.state?.refresh]);

  const loadTaskAndResources = async () => {
    try {
      const taskResponse = await getTask(id);
      setTask(taskResponse);

      const resourcesResponse = await getResources(id);
      setResources(resourcesResponse || []);
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
        toast.error('Failed to delete resource');
      }
    }
  };

  const handleEditResource = (resource) => {
    navigate(`/resources/${resource._id}/edit`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-amber-600"></div>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-500 text-lg">Task not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link to={`/projects/${task.projectId}`} className="text-amber-600 hover:text-amber-700 mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-3xl font-bold text-amber-900">{task.name}</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-600 mb-4">{task.description || 'No description'}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span>Start: {task.startDate ? new Date(task.startDate).toLocaleDateString() : 'N/A'}</span>
          <span>End: {task.endDate ? new Date(task.endDate).toLocaleDateString() : 'N/A'}</span>
          <span>Status: {task.status}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-amber-900">Resources</h2>
        <Link
          to={`/tasks/${id}/resources/new`}
          className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 transition-colors duration-150"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Resource
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(resources) && resources.length > 0 ? (
          resources.map((resource) => (
            <ResourceCard
              key={resource._id}
              resource={resource}
              onDelete={handleDeleteResource}
              onEdit={handleEditResource}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No resources found. Add your first resource!</p>
          </div>
        )}
      </div>
    </div>
  );
}
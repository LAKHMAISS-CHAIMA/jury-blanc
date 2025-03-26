import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { Plus, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import TaskCard from '../components/TaskCard';
import {deleteTask } from '../api/tasks';
import axios from 'axios';

export default function ProjectDetails() {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    loadProjectAndTasks();
  }, [projectId, location.state?.refresh]);

  const loadProjectAndTasks = async () => {
    try {
      const projectRes = await axios.get(`http://localhost:7000/api/projects/${projectId}`);
      setProject(projectRes.data);
    } catch (error) {
      toast.error('Failed to load project details');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(taskId);
        toast.success('Task deleted successfully');
        loadProjectAndTasks();
      } catch (error) {
        toast.error('Failed to delete task');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link to="/projects" className="text-amber-600 hover:text-amber-700 mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-3xl font-bold text-amber-900">{project?.name || 'Project'}</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <p className="text-gray-600 mb-4">{project?.description || 'No description'}</p>
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span>Start: {project?.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}</span>
          <span>End: {project?.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold text-amber-900">Tasks</h2>
        <Link
          to={`/projects/${projectId}/tasks/new`}
          className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 focus:ring-2 focus:ring-amber-500 transition-colors duration-150"
        >
          <Plus className="h-5 w-5 mr-1" />
          Add Task
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        { project.tasks.length > 0 ? (
          project.tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={handleDeleteTask}
              onEdit={(task) => navigate(`/tasks/${task._id}/edit`)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500 text-lg">No tasks found. Add your first task!</p>
          </div>
        )}
      </div>
    </div>
  );
}
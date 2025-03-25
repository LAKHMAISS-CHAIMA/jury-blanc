import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Edit, Trash2, Eye } from 'lucide-react';
import { getProjects, deleteProject } from '../api/projects';
import { toast } from 'react-hot-toast';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await getProjects();
      setProjects(res.data || []);
    } catch (error) {
      toast.error('Failed to load projects');
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(projectId);
        toast.success('Project deleted successfully');
        loadProjects();
      } catch (error) {
        toast.error('Failed to delete project');
      }
    }
  };

  const handleEditProject = (projectId) => {
    console.log(`Navigating to edit project: ${projectId}`); // اختبار
    navigate(`/projects/${projectId}/edit`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center insecticides-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-amber-900">Projects</h1>
        <Link to="/projects/new" className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700">
          Add Project
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.isArray(projects) && projects.length > 0 ? (
          projects.map((project) => (
            <div
              key={project._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-amber-900">{project.name}</h2>
              <p className="text-gray-600 mt-2">{project.description}</p>
              <div className="mt-4 text-sm text-gray-500">
                <p>Start: {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}</p>
                <p>End: {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'N/A'}</p>
              </div>
              <div className="flex justify-end space-x-3 mt-4">
                <button
                  onClick={() => handleEditProject(project._id)}
                  className="text-amber-600 hover:text-amber-700"
                  title="Edit Project"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteProject(project._id)}
                  className="text-red-600 hover:text-red-700"
                  title="Delete Project"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
                <Link
                  to={`/projects/${project._id}`}
                  className="text-blue-600 hover:text-blue-700"
                  title="View Details"
                >
                  <Eye className="h-5 w-5" />
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 col-span-2">
            <p className="text-gray-500 text-lg">No projects found. Add your first project!</p>
          </div>
        )}
      </div>
    </div>
  );
}
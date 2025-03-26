import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import * as yup from 'yup';
import { getTask, updateTask } from '../api/tasks';

const schema = yup.object().shape({
  name: yup.string().required('Task name is required'),
  description: yup.string().required('Description is required'),
  startDate: yup.date().required('Start date is required'),
  endDate: yup.date().required('End date is required').min(yup.ref('startDate'), 'End date must be after start date'),
  status: yup.string().required('Status is required').oneOf(['pending', 'in-progress', 'completed'], 'Invalid status'),
});

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'pending',
    projectId: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTask();
  }, [id]);

  const loadTask = async () => {
    try {
      const response = await getTask(id);
      console.log('Raw response from getTask:', response); 
      const task = response; 
      if (!task) {
        throw new Error('Task not found');
      }
      setFormData({
        name: task.name || '',
        description: task.description || '',
        startDate: task.startDate ? new Date(task.startDate).toISOString().split('T')[0] : '',
        endDate: task.endDate ? new Date(task.endDate).toISOString().split('T')[0] : '',
        status: task.status || 'pending',
        projectId: task.projectId || '',
      });
    } catch (error) {
      console.error('Error loading task:', error);
      toast.error('Failed to load task');
      navigate('/projects'); 
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      await updateTask(id, formData);
      toast.success('Task updated successfully');
      navigate(`/projects/${formData.projectId}`);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error('Update error:', error);
        toast.error('Failed to update task');
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

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link to={`/projects/${formData.projectId}`} className="text-amber-600 hover:text-amber-700 mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-3xl font-bold text-amber-900">Edit Task</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Task Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            {errors.startDate && <p className="mt-1 text-sm text-red-600">{errors.startDate}</p>}
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            {errors.endDate && <p className="mt-1 text-sm text-red-600">{errors.endDate}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
        </div>

        <div className="flex justify-end space-x-3">
          <Link to={`/projects/${formData.projectId}`} className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700"
          >
            Update Task
          </button>
        </div>
      </form>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "react-hot-toast";
import { getResource } from '../api/resources';

export default function ResourceDetails() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResource = async () => {
      try {
        const response = await getResource(id);
        console.log("Resource loaded:", response);
        setResource(response);
      } catch (error) {
        console.error("Error loading resource:", error);
        toast.error("Failed to load resource");
      } finally {
        setLoading(false);
      }
    };
    loadResource();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-amber-600"></div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-gray-500 text-lg">No resource found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link to={`/tasks/${resource.taskId}`} className="text-amber-600 hover:text-amber-700 mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-3xl font-bold text-amber-900">{resource.name}</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600 mb-4">{resource.description || 'No description provided'}</p>
        <div className="text-sm text-gray-500 space-y-2">
          <p>
            Quantity: <span className="font-medium">{resource.quantity} {resource.unit || ''}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getResource } from '../api/resources';

const ResourceDetails = () => {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResource = async () => {
      try {
        const response = await getResource(id);
        console.log("Resource loaded:", response); // تسجيل للتحقق
        setResource(response);
      } catch (error) {
        console.error("Error loading resource:", error);
        toast.error("Échec du chargement de la ressource");
      } finally {
        setLoading(false);
      }
    };
    loadResource();
  }, [id]);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (!resource) {
    return <p>Aucune ressource trouvée.</p>;
  }

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">{resource.name}</h1>
      <p className="text-gray-700">{resource.description}</p>
      <p className="text-sm text-gray-500">
        Quantité: {resource.quantity} {resource.unit}
      </p>
    </div>
  );
};

export default ResourceDetails;
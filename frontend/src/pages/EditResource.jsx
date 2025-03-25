import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { getResource, updateResource } from "../api/resources";

const schema = yup.object().shape({
  name: yup.string().required("Le nom de la ressource est requis"),
  description: yup.string().required("La description est requise"),
  quantity: yup
    .number()
    .required("La quantité est requise")
    .min(0, "La quantité doit être positive"),
  unit: yup.string().required("L'unité est requise"),
});

export default function EditResource() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    unit: "",
    taskId: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResource();
  }, [id]);

  const loadResource = async () => {
    try {
      const response = await getResource(id);
      console.log("Resource loaded:", response);
      setFormData({
        name: response.name || "",
        description: response.description || "",
        quantity: response.quantity || "",
        unit: response.unit || "",
        taskId: response.taskId || "",
      });
    } catch (error) {
      console.error("Error loading resource:", error);
      toast.error("Failed to load resource");
      navigate("/tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToValidate = {
        ...formData,
        quantity: formData.quantity ? Number(formData.quantity) : "",
      };

      await schema.validate(dataToValidate, { abortEarly: false });

      console.log("Resource data sent to API:", dataToValidate);
      const response = await updateResource(id, dataToValidate);
      console.log("Response from updateResource:", response);
      toast.success("Ressource mise à jour avec succès !");
      navigate(`/tasks/${formData.taskId}`);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Erreur lors de la mise à jour :", error);
        toast.error(error.response?.data?.message || "Échec de la mise à jour de la ressource");
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
        <Link to={`/tasks/${formData.taskId}`} className="text-amber-600 hover:text-amber-700 mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-3xl font-bold text-amber-900">Modifier la Ressource</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl bg-white rounded-lg shadow-md p-6">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Nom de la Ressource
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
            <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
              Quantité
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
          </div>

          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-1">
              Unité
            </label>
            <input
              type="text"
              id="unit"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              placeholder="ex: kg, m², pièces"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            {errors.unit && <p className="mt-1 text-sm text-red-600">{errors.unit}</p>}
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Link
            to={`/tasks/${formData.taskId}`}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            <Save className="h-5 w-5 mr-1" />
            Mettre à jour
          </button>
        </div>
      </form>
    </div>
  );
}
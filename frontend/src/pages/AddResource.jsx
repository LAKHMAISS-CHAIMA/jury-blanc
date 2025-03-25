import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import * as yup from "yup";
import { createResource } from "../api/resources";

const schema = yup.object().shape({
  name: yup.string().required("Le nom de la ressource est requis"),
  description: yup.string().required("La description est requise"),
  quantity: yup
    .number()
    .required("La quantité est requise")
    .min(0, "La quantité doit être positive"),
  unit: yup.string().required("L'unité est requise"),
});

export default function AddResource() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: "",
    unit: "",
  });
  const [errors, setErrors] = useState({});

  if (!taskId) {
    toast.error("Task ID is missing");
    navigate("/projects");
    return null;
  }

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

      const resourceData = {
        ...dataToValidate,
        taskId,
      };
      console.log("Resource data sent to API:", resourceData);
      const response = await createResource(resourceData);
      console.log("Response from createResource:", response);
      toast.success("Ressource ajoutée avec succès !");
      navigate(`/tasks/${taskId}`);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Erreur lors de l'ajout :", error.response?.data || error);
        toast.error(error.response?.data?.message || "Échec de l'ajout de la ressource");
      }
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link to={`/tasks/${taskId}`} className="text-amber-600 hover:text-amber-700 mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-3xl font-bold text-amber-900">Nouvelle Ressource</h1>
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
            to={`/tasks/${taskId}`}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Annuler
          </Link>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
          >
            <Plus className="h-5 w-5 mr-1" />
            Ajouter la Ressource
          </button>
        </div>
      </form>
    </div>
  );
}
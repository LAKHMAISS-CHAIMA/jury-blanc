import { Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      <Building2 className="h-24 w-24 text-amber-600 mb-8" />
      <h1 className="text-4xl font-bold text-amber-900 mb-4">
        Bienvenue sur ConstructionXpert Services Solution      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        Votre solution complète de gestion de projets de construction. Suivez vos projets, gérez vos tâches et supervisez vos ressources en un seul endroit.
      </p>
      <Link
        to="/projects"
        className="bg-amber-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-amber-700 transition-colors"
      >
        Voir les projets
      </Link>
    </div>
  );
}
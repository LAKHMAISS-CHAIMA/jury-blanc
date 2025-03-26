import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-amber-800 text-white py-4 text-center">
      <p>&copy; {new Date().getFullYear()} ConstructionXpert. All rights reserved.</p>
    </footer>
  );
}
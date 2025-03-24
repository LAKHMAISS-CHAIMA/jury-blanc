import React from 'react'

function Footer() {
  return (
    <div className="bg-blue-800 text-white py-4 text-center">
      <p>&copy; {new Date().getFullYear()} BuildTrack Pro. Tous droits réservés.</p>
    </div>
  )
}

export default Footer
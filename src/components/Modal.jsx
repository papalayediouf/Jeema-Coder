

export default function Modal({ utilisateur, onClose }) {
  if (!utilisateur) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2>Détails de l'utilisateur</h2>
        <p><strong>Prénom:</strong> {utilisateur.prenom}</p>
        <p><strong>Nom:</strong> {utilisateur.nom}</p>
        <p><strong>Email:</strong> {utilisateur.email}</p>
        <p><strong>Téléphone:</strong> {utilisateur.telephone}</p>
        <button onClick={onClose} className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Fermer</button>
      </div>
    </div>
  );
}

export default function TableauUtilisateur({ utilisateurs, onDelete, onEdit, onView }) {
    return (
      <>
        <h1 className="text-center text-2xl font-bold mb-4">Utilisateurs</h1>
  
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Prénom</th>
                <th className="py-3 px-6 text-left">Nom</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Téléphone</th>
                <th className="py-3 px-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {utilisateurs.length > 0 ? (
                utilisateurs.map((user, index) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left">{user.prenom}</td>
                    <td className="py-3 px-6 text-left">{user.nom}</td>
                    <td className="py-3 px-6 text-left">{user.email}</td>
                    <td className="py-3 px-6 text-left">{user.telephone}</td>
                    <td className="py-3 px-6 text-center">
                      <button
                        className="bg-yellow-500 text-white py-1 px-3 rounded mr-2 hover:bg-yellow-600"
                        onClick={() => onEdit(index)}
                      >
                        Modifier
                      </button>
                      <button
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                        onClick={() => onDelete(index)}
                      >
                        Supprimer
                      </button>
                      <button
                        className="bg-blue-500 text-white py-1 px-3 rounded ml-2 hover:bg-blue-600"
                        onClick={() => onView(index)}
                      >
                        Voir
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-3 px-6 text-center text-gray-500">
                    Aucune donnée disponible
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </>
    );
  }
  
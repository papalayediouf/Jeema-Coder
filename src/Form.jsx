

import { Component } from "react";
import TableauUtilisateur from "./component/tableauUtilisateur";
import Modal from "./component/Modal";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      utilisateurs: [],
      selectedUserIndex: null,
      showModal: false,
      selectedUser: null,
      isEditing: false,
      phoneError: ''
    };
  }

  componentDidMount() {
    const storedUsers = JSON.parse(localStorage.getItem('utilisateurs')) || [];
    this.setState({ utilisateurs: storedUsers });
  }

  saveToLocalStorage = (utilisateurs) => {
    localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { input1, input2, input3, input4, selectedUserIndex, phoneError } = this.state;

    if (!input1 || !input2 || !input3 || !input4) {
      alert("Tous les champs doivent être remplis !");
      return;
    }

    if (phoneError) {
      alert("Veuillez entrer un numéro de téléphone valide !");
      return;
    }

    const newUser = { prenom: input1, nom: input2, email: input3, telephone: input4 };

    if (selectedUserIndex !== null) {
      this.setState(prevState => {
        const updatedUsers = [...prevState.utilisateurs];
        updatedUsers[selectedUserIndex] = newUser;
        this.saveToLocalStorage(updatedUsers);
        return {
          utilisateurs: updatedUsers,
          input1: '',
          input2: '',
          input3: '',
          input4: '',
          selectedUserIndex: null,
          isEditing: false,
          phoneError: ''
        };
      });
    } else {
      this.setState(prevState => {
        const updatedUsers = [...prevState.utilisateurs, newUser];
        this.saveToLocalStorage(updatedUsers);
        return {
          utilisateurs: updatedUsers,
          input1: '',
          input2: '',
          input3: '',
          input4: '',
          phoneError: ''
        };
      });
    }
  };

  handleDelete = (index) => {
    this.setState(prevState => {
      const updatedUsers = prevState.utilisateurs.filter((_, i) => i !== index);
      this.saveToLocalStorage(updatedUsers);
      return { utilisateurs: updatedUsers };
    });
  };

  handleEdit = (index) => {
    const utilisateur = this.state.utilisateurs[index];
    this.setState({
      input1: utilisateur.prenom,
      input2: utilisateur.nom,
      input3: utilisateur.email,
      input4: utilisateur.telephone,
      selectedUserIndex: index,
      isEditing: true
    });
  };

  handleView = (index) => {
    const utilisateur = this.state.utilisateurs[index];
    this.setState({
      selectedUser: utilisateur,
      showModal: true
    });
  };

  closeModal = () => {
    this.setState({ showModal: false, selectedUser: null });
  };

  validatePhoneNumber = (value) => {
    const regex = /^[0-9]{9}$/;
    if (!regex.test(value)) {
      this.setState({ phoneError: 'Le numéro de téléphone doit contenir exactement 9 chiffres.' });
    } else {
      this.setState({ phoneError: '' });
    }
  };

  render() {
    const { isEditing, phoneError, utilisateurs } = this.state;

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        
        <div className="container max-w-lg bg-white p-6 rounded-lg shadow-lg mt-6">
          <h1 className="text-center font-semibold text-2xl mb-4">Jeemacoder gestion utilisateurs</h1>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={this.handleSubmit}>
            <div>
              <label htmlFor="prenom">Prénom</label>
              <input
                type="text"
                id="prenom"
                placeholder="Prénom"
                className="w-full p-2 border border-gray-300 rounded"
                value={this.state.input1}
                onChange={(e) => this.setState({ input1: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                id="nom"
                placeholder="Nom"
                className="w-full p-2 border border-gray-300 rounded"
                value={this.state.input2}
                onChange={(e) => this.setState({ input2: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded"
                value={this.state.input3}
                onChange={(e) => this.setState({ input3: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="telephone">Téléphone</label>
              <input
                type="tel"
                id="telephone"
                placeholder="Téléphone (9 chiffres)"
                className="w-full p-2 border border-gray-300 rounded"
                value={this.state.input4}
                onChange={(e) => {
                  this.setState({ input4: e.target.value });
                  this.validatePhoneNumber(e.target.value);
                }}
              />
              {phoneError && <p className="text-red-500">{phoneError}</p>}
            </div>
            <button
              type="submit"
              className={`col-span-1 md:col-span-2 p-4 rounded ${isEditing ? 'bg-yellow-500' : 'bg-blue-500'} text-white hover:${isEditing ? 'bg-yellow-600' : 'bg-blue-600'} flex justify-center`}
            >
              {this.state.selectedUserIndex !== null ? 'Modifier' : 'Ajouter'}
            </button>
          </form>

          {this.state.showModal && (
            <Modal utilisateur={this.state.selectedUser} onClose={this.closeModal} />
          )}
        </div>

        <div className="container max-w-full overflow-x-auto mt-6">
          <TableauUtilisateur
            utilisateurs={utilisateurs}
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
            onView={this.handleView}
          />
        </div>

      </div>
    );
  }
}

export default Form;

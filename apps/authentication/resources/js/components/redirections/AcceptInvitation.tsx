import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import PublicLayout from '../layouts/PublicLayout';
import Loader from '../layouts/Loader';
import Modal from '../layouts/Modal';

const AcceptInvitation: React.FC = () => {
  const { email, token } = useParams();

  const [name, setName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [completeName, setCompleteName] = useState<string|null>(null);
  const [password, setPassword] = useState<string|null>(null);
  const [passwordConfirmation, setPasswordConfirmation] = useState<string|null>(null);

  const history = useHistory();

  const loadInvitation = () => {
    axios.get(`/api/invitation/${email}/${token}`).then(({ data }) => {
      if (data.error) {
        setError(data.error);
        return;
      }

      if (data.invitation) {
        setName(data.invitation);
      }
    });
  }

  const register = () => {
    axios.post(`/api/invitation/${email}/${token}`, {
      name: completeName,
      password: password,
      password_confirmation: passwordConfirmation
    }).then(({ data }) => {
      if (data.error) {
        setError(data.error);
        return;
      }

      if (data.success) {
        history.push('/connexion?welcome=true');
      }
    });
  }

  useEffect(() => {
    if (!loaded) {
      loadInvitation();
    }
  }, [loaded]);

  return (
    <PublicLayout>
      {!name || loading && <Loader />}

      <Modal hidden={!error} closeModal={() => setError(null)}>
        <p className="text-center">{error}</p>
        <button className="btn btn-danger btn-block" onClick={() => setError(null)}>Bien compris</button>
      </Modal>

      {name &&
        <>

          <h2>Inscrivez-vous sur AOS Force suite à l'invitation de {name}</h2>

          <div className="form-group">
            <input type="text" className="form-control" placeholder="Votre prénom et nom" onChange={(e) => setCompleteName(e.target.value)} />
          </div>

          <div className="form-group">
            <input type="password" className="form-control" placeholder="Un mot de passe de votre choix" onChange={(e) => setPassword(e.target.value)} />
          </div>

          <div className="form-group">
            <input type="password" className="form-control" placeholder="Confirmez le mot de passe" onChange={(e) => setPasswordConfirmation(e.target.value)} />
          </div>

          <div className="form-group">
            <input type="button" className="btn btn-danger btn-block" value="Créer mon compte" onClick={() => register()} />
          </div>
        </>
      }
    </PublicLayout>
  );
}

export default AcceptInvitation;

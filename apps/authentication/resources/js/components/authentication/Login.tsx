import React, { useEffect, useState } from 'react';

import { Link, useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import PublicLayout from '../layouts/PublicLayout';
import Modal from '../layouts/Modal';

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const parameters = queryString.parse(location.search);

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>(null);
  const [success, setSuccess] = useState<string>(null);

  const logIn = () => {
    if (email && password) {
      setLoading(true);

      axios.post('api/login', { email, password }).then(({ data }) => {
        if (data.error) {
          setError(data.error);
          return;
        } else {
          window.localStorage.setItem('project_manager', data.domains.project_manager);
          window.localStorage.setItem('contracts_manager', data.domains.contracts_manager);
          
          history.push('/dashboard');
        }
      }).finally(() => setLoading(false));
    }
  }

  const closeModal = () => {
    history.push('/connexion'); 
    setSuccess(null);
  }

  useEffect(() => {
    if (parameters.welcome) {
      setSuccess('Bravo ! Vous êtes désormais inscrit(e) sur AOS Force. Vous n\'avez plus qu\'à vous identifier.');
    }
  }, [parameters.welcome])

  return (
    <PublicLayout>

      <Modal hidden={!error && !success} closeModal={() => setError(null)}>
        {error && <p className="text-center">{error}</p>}
        {success && <p className="alert alert-success">{success}</p>}

        <a className={error ? 'btn btn-danger btn-block' : 'btn btn-success btn-block'} onClick={() => error ? setError(null) : closeModal()}>Bien compris</a>
      </Modal>

      <h2>Se connecter</h2>

      <div className="form-group">
        <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      </div>

      <div className="form-group">
        <input type="password" className="form-control" onChange={(e) => setPassword(e.target.value)} placeholder="Mot de passe" />
      </div>

      <div className="form-group d-flex justify-content-between">
        <div>
          <input type="checkbox" /> Se souvenir de moi
        </div>
        <Link to="/identifiants-perdus" className="text-danger"><b>Mot de passe oublié</b></Link>
      </div>

      <div className="form-group">
        <input type="button" className="btn btn-danger btn-block" disabled={loading || !email || !password} value={loading ? 'Chargement...' : 'Connexion'} onClick={() => logIn()} />
      </div>

    </PublicLayout>
  )
}

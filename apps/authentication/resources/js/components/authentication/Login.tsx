import React, { useState } from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';
import PublicLayout from '../layouts/PublicLayout';
import Modal from '../layouts/Modal';

export default function Login() {
  const history = useHistory();
  const location = useLocation();

  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>(null);

  const logIn = () => {
    if (email && password) {
      setLoading(true);

      axios.post('api/login', { email, password }).then(({ data }) => {
        if (data.error) {
          setError(data.error);
          return;
        }

        else history.push('/consultation_open');
      }).finally(() => setLoading(false));
    }
  }


  return (
    <PublicLayout>

      <Modal hidden={!error} closeModal={() => setError(null)}>
        <p className="text-center">{error}</p>

        <a className="btn btn-danger btn-block" onClick={() => setError(null)}>Bien compris</a>
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
        <b className="text-danger">Mot de passe oublié</b>
      </div>

      <div className="form-group">
        <input type="button" className="btn btn-danger btn-block" disabled={loading || !email || !password} value={loading ? 'Chargement...' : 'Connexion'} onClick={() => logIn()} />
      </div>

    </PublicLayout>
  )
}

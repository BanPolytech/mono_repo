import React, { useState, useEffect } from 'react';

import { Link, useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import PublicLayout from '../layouts/PublicLayout';
import Modal from '../layouts/Modal';
import Loader from '../layouts/Loader';

export default function RecoveryPassword() {
  const { token, email } = useParams();

  const history = useHistory();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [requestIsValid, setRequestIsValid] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>(null);

  function loadRequest() {
    setLoading(true);

    axios.get(`/api/recovery-password/${email}/${token}`).then(({ data }) => {
      if (data.error) {
        setError(data.error);
        return;
      }

      if (data.success) {
        setRequestIsValid(true);
        setFirstName(data.first_name);
        return;
      }

      setError('Impossible de trouver cette demande.');
    }).finally(() => setLoading(false));
  }

  function changePassword() {
    setError('');
    setSuccess('');

    if (password && passwordConfirmation) {
      setLoading(true);
      axios.post(`/api/recovery-password/${email}/${token}`, {
        password,
        password_confirmation: passwordConfirmation,
      }).then(({ data }) => {
        if (data.error) {
          setError(data.error);
          return;
        }

        if (data.success) {
          setSuccess(data.success);
        }
      })
        .finally(() => setLoading(false));
    }
  }

  const closeModal = () => {
    setError(null);
    setSuccess(null);
  }

  useEffect(() => {
    loadRequest();
  }, []);

  return (
    <>
      <PublicLayout>

        <Modal hidden={!error && !success} closeModal={() => closeModal()}>
          {error &&
            <>
              <p className="text-center">{error}</p>
              <a className="btn btn-danger btn-block" onClick={() => setError(null)}>Bien compris</a>
            </>
          }

          {success &&
            <>
              <div className="alert alert-success">{success}</div>
              <Link className="btn btn-success btn-block" to='/connexion'>Bien reçu</Link>
            </>
          }
        </Modal>

        {loading && !requestIsValid && <Loader />}

        {requestIsValid && <>

          <h2>{firstName}, vous pouvez désormais définir votre nouveau mot de passe</h2>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Nouveau mot de passe"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Confirmer le nouveau mot de passe"
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>

          <div className="form-group">
            <input type="button" className="btn btn-danger btn-block" value="Changer le mot de passe" onClick={() => changePassword()} />
          </div>
        </>
        }

      </PublicLayout>

    </>
  );
}

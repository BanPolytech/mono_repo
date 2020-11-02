import React, { useState, useEffect } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

export default function RecoveryPassword() {
  const { token, email } = useParams();

  const history = useHistory();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [requestIsValid, setRequestIsValid] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  function loadRequest() {
    axios.get(`/api/recovery-password/${token}/${email}`).then(({ data }) => {
      if (data.error) {
        setError(data.error);
        return;
      }

      if (data.success) {
        setRequestIsValid(true);
      }
    });
  }

  function changePassword() {
    setError('');
    setSuccess('');

    if (password && passwordConfirmation) {
      if (password !== passwordConfirmation) {
        setError('Les mots de passe doivent être identiques !');
        return;
      }
      setLoading(true);
      axios.post(`/api/recovery-password/${token}/${email}`, {
        password,
        password_confirmation: passwordConfirmation,
      }).then(({ data }) => {
        if (data.error) {
          setError(data.error);
          return;
        }

        if (data.success) {
          setSuccess(data.success);
          history.push('/login?success=true');
        }
      })
        .finally(() => setLoading(false));
    }
  }

  useEffect(() => {
    loadRequest();
  }, []);

  return (
    <>
      <div className="container height-100">
        <div className="d-flex align-items-center row height-100">
          <div className="col-lg-6">
            <div className="card card-body card-auth mt-3">
              <img src="/images/logo-chantier-prive.svg" alt="Logo chantier privé" />

              <p className="mt-4">
                Veuillez ici réinitialiser votre mot de passe :
              </p>

              <div className="text-danger">{error && error}</div>

              <input
                type="password"
                className="form-control"
                placeholder="Nouveau mot de passe"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Nouveau mot de passe à nouveau"
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />

           
            </div>
          </div>
          <div className="col-lg-6 pl-5">
          </div>
        </div>
      </div>
    </>
  );
}

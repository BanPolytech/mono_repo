import React, { useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import Modal from '../layouts/Modal';

export default function PasswordLost() {
  const [email, setEmail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(false);
  const [loading, setLoading] = useState<boolean>(false);

  function sendResetLink() {
    setError(null);
    setSuccess(null);

    if (email) {
      setLoading(true);
      axios.post('api/forgot-password', { email }).then(({ data }) => {
        if (data.error) {
          setError(data.error);
          return;
        }

        if (data.success) {
          setSuccess(data.success);
          return;
        }
      })
        .finally(() => setLoading(false));
    }
  }


  return (
    <PublicLayout>

      <Modal hidden={!error && !success} closeModal={() => setError(null)}>
        {error &&
          <>
            <p className="text-center">{error}</p>
            <a className="btn btn-danger btn-block" onClick={() => setError(null)}>Bien compris</a>
          </>
        }

        {success &&
          <>
            <div className="alert alert-success">{success}</div>
            <a className="btn btn-success btn-block" onClick={() => setSuccess(null)}>Bien reçu</a>
          </>
        }


      </Modal>

      <h2>Mot de passe oublié</h2>

      <div className="form-group">
        <input type="text" className="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      </div>

      <div className="form-group">
        <input type="button" className="btn btn-danger btn-block" disabled={loading || !email} value={loading ? 'Chargement...' : 'Réinitialiser'} onClick={() => sendResetLink()} />
      </div>

    </PublicLayout>
  );
}

import React, { useState } from 'react';

import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ResetPassword() {
  const [mail, setMail] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  function sendResetLink() {
    setError(null);
    setSuccess(null);

    if (mail) {
      setLoading(true);
      const toMail = mail.trim().toLowerCase();
      axios.post('api/reset-password', { mail: toMail }).then(({ data }) => {
        if (data.error) {
          setError(data.error);
          return;
        }

        if (data.success) {
          setOpen(true);
        }
      })
        .finally(() => setLoading(false));
    }
  }

  const closeModal = () => {
    setOpen(false);
  };

  function setErrorMessage(err: string) {
    switch (err) {
      case ('auth.user_not_found'):
        return "Ce compte n'existe pas. Veuillez vous inscrire.";
      default:
        return err;
    }
  }

  return (
    <>
      {mail && 'mail sent'}
      <div className="container height-100">
        <div className="d-flex align-items-center row height-100">
          <div className="col-lg-6">
            
          </div>
          <div className="col-lg-6 pl-5">
          </div>
        </div>
      </div>
    </>
  );
}

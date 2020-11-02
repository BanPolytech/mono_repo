import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const AccessPromotion: React.FC = () => {
  const { token } = useParams();
  const history = useHistory();

  function validateToken() {
    axios.post(`/api/promotion/${token}`)
      .then(({ data }) => {
        console.log(data);
        if (data.error) {
          history.push('/login?promotion=error');
        }
        if (data.success) {
          if (data.user) history.push(`/register/payment/${token}`);
          else history.push(`/register?token=${token}`);
        }
      });
  }

  useEffect(() => {
    validateToken();
  }, []);

  return (
    <>
    </>
  );
};

export default AccessPromotion;
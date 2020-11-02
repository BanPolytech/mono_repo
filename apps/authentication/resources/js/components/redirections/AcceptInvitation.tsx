import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function AcceptInvitation() {
  const { token } = useParams();

  function validateInvitation(): void {
    axios.post(`/api/invitation/${token}`).then(({ data }) => {
      if (data.error) {
        document.location.href = '/login?created=failure';
      }

      if (data.success) {
        // TODO : Change this calling :
        document.location.href = '/login?created=success';
      }
    });
  }

  useEffect(() => {
    validateInvitation();
  });

  return (
    <div />
  );
}

export default AcceptInvitation;

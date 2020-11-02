import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AcceptInvitation: React.FC = () => {
  const { email, token } = useParams();

  const loadInvitation = () => {
    axios.post(`/api/invitation/${email}/${token}`).then(({ data }) => {
      if (data.error) {
        //document.location.href = '/login?created=failure';
      }

      if (data.success) {
        // TODO : Change this calling :
        //document.location.href = '/login?created=success';
      }
    });
  }

  useEffect(() => {
    loadInvitation();
  });

  return (
    <div />
  );
}

export default AcceptInvitation;

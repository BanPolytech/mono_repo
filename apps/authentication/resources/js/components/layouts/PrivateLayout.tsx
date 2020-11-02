import React, { } from 'react';
import { Link } from 'react-router-dom';

const PrivateLayout: React.FC = (props) => {
  return (
    <div className="height-100">

      <Link to="/"><img src="/images/aos-logo.png" className="logo" /></Link>

      <div className="container height-100">
        <div className="row height-100" style={{ paddingTop: 120 }}>
          <div className="col-lg-12">
              {props.children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivateLayout;
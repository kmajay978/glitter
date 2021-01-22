import { useState } from "react";
import { css } from "@emotion/core";
import BarLoader from "react-spinners/BarLoader";
import {NotificationContainer, NotificationManager} from 'react-notifications';
// import 'react-notifications/lib/notifications.css';
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

function Dummy() {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const createNotification = (type) => {
    return () => {
      switch (type) {
        case 'info':
          NotificationManager.info('Info message');
          break;
        case 'success':
          NotificationManager.success('Success message', 'Title here');
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
      }
    };
  };
  return (
    <div className="sweet-loading">
       <button className='btn btn-info'
          onClick={createNotification('info')}>Info
        </button>
        <hr/>
        <button className='btn btn-success'
          onClick={createNotification('success')}>Success
        </button>
        <hr/>
        <button className='btn btn-warning'
          onClick={createNotification('warning')}>Warning
        </button>
        <hr/>
        <button className='btn btn-danger'
          onClick={createNotification('error')}>Error
        </button>

        <NotificationContainer/>
      {/* <button onClick={() => setLoading(!loading)}>Toggle Loader</button>
      <BarLoader color={color} loading={loading} css={override} size={150} /> */}
    </div>
  );
}

export default Dummy;
import './Alert.css';

function Alert({ showAlert, messageAlert }) {
  return (
    <div className={
      showAlert
        ? 'alert alert_active'
        : 'alert'
    }>
      <p className="alert__text">{messageAlert}</p>
    </div>
  );
}

export default Alert;

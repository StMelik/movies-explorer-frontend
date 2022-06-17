import { Link } from "react-router-dom";
import './ProfileButton.css';

function ProfileButton() {
  return (
    <div className="profile-button">
      <Link className="profile-button__link" to='/profile'>Аккаунт</Link>
      <div className="profile-button__photo"></div>
    </div>
  );
}

export default ProfileButton;

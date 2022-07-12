import { Link } from "react-router-dom";

import './ProfileButton.css';

import { PAGES } from '../../utils/constants'

function ProfileButton() {
  return (
    <div className="profile-button">
      <Link className="profile-button__link" to={PAGES.PROFILE}>Аккаунт</Link>
      <div className="profile-button__photo"></div>
    </div>
  );
}

export default ProfileButton;

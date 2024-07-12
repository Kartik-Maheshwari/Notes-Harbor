import React from 'react';
import { Link, Route } from 'react-router-dom';
import ManageUploads from '../components/ManageUploads';
import ManageFollowers from '../components/ManageFollowers';
import ManageFollowing from '../components/ManageFollowing';
import AccountSettings from '../components/AccountSettings';

const Settings = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to="/settings/uploads">Manage Uploads</Link></li>
          <li><Link to="/settings/followers">Manage Followers</Link></li>
          <li><Link to="/settings/following">Manage Following</Link></li>
          <li><Link to="/settings/account-settings">Account Settings</Link></li>
        </ul>
      </nav>
      <Route path="/settings/uploads" component={ManageUploads} />
      <Route path="/settings/followers" component={ManageFollowers} />
      <Route path="/settings/following" component={ManageFollowing} />
      <Route path="/settings/account-settings" component={AccountSettings} />
    </div>
  );
};

export default Settings;

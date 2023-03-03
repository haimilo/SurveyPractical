import * as React from "react";
import { IUserProfile } from "./IUserProfile";

const UserProfile = (props: IUserProfile) => {
  const { userDisplayName, userEmail } = props;

  return (
    <div>
      <h1>Current User Profile</h1>
      <p>
        <b>User Name:</b> {userDisplayName}
      </p>
      <p>
        <b>User Email:</b> {userEmail}
      </p>
      <hr />
    </div>
  );
};

export default UserProfile;

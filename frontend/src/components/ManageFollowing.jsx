import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFollowing, unfollowUser } from "../store/userSlice";

const ManageFollowing = () => {
  const dispatch = useDispatch();
  // const following = useSelector(state => state.user.following);

  useEffect(() => {
    dispatch(fetchFollowing());
  }, [dispatch]);

  const handleUnfollowUser = (userId) => {
    dispatch(unfollowUser(userId));
  };

  return (
    <div>
      <h2>Manage Following</h2>
      {/* <ul>
        {following.map(user => (
          <li key={user.id}>
            {user.name} 
            <button onClick={() => handleUnfollowUser(user.id)}>Unfollow</button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default ManageFollowing;

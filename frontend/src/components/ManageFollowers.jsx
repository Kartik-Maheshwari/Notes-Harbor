import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFollowers, removeFollower } from "../store/userSlice";

const ManageFollowers = () => {
  const dispatch = useDispatch();
  // const followers = useSelector(state => state.user.followers);

  useEffect(() => {
    dispatch(fetchFollowers());
  }, [dispatch]);

  const handleRemoveFollower = (followerId) => {
    dispatch(removeFollower(followerId));
  };

  return (
    <div>
      <h2>Manage Followers</h2>
      {/* <ul>
        {followers.map(follower => (
          <li key={follower.id}>
            {follower.name} 
            <button onClick={() => handleRemoveFollower(follower.id)}>Remove</button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default ManageFollowers;

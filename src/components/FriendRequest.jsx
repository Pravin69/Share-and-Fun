import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import CustomButton from "./CustomButton";
import { apiRequest } from "../utils";
import { useCallback, useEffect, useState } from "react";

const FriendRequest = ({ user }) => {
  const [friendRequest, setFriendRequest] = useState([]);

  const fetchFriendRequests = useCallback(async () => {
    try {
      const res = await apiRequest({
        url: "/users/get-friend-request",
        token: user?.token,
        method: "GET",
      });
      setFriendRequest(res?.data);
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  const acceptFriendRequest = useCallback(
    async (id, status) => {
      try {
        const res = await apiRequest({
          url: "/users/accept-request",
          token: user?.token,
          method: "POST",
          data: { rid: id, status },
        });
        setFriendRequest(res?.data);
      } catch (error) {
        console.log(error);
      }
    },
    [user]
  );

  useEffect(() => {
    fetchFriendRequests();
  }, []);

  useEffect(() => {}, [friendRequest]);

  return (
    <div className="w-full bg-primary shadow-sm rounded-lg px-6 py-5">
      <div className="flex items-center justify-between text-lg text-ascent-1 pb-2 border-b border-[#66666645]">
        <span>Friend Request</span>
        <span>{friendRequest?.length}</span>
      </div>
      <div className="w-full flex flex-col gap-4 pt-4">
        {friendRequest?.map(({ _id, requestFrom: from }) => (
          <div key={_id} className="flex items-center justify-between">
            <Link
              to={"/profile/" + from._id}
              className="w-full flex gap-4 items-center cursor-pointer"
            >
              <img
                src={from?.profileUrl ?? NoProfile}
                alt={from?.firstName}
                className="w-10 h-10 object-cover rounded-full"
              />
              <div className="flex-1">
                <p className="text-base font-medium text-ascent-1">
                  {from?.firstName} {from?.lastName}
                </p>
                <span className="text-sm text-ascent-2">
                  {from?.profession ?? "No Profession"}
                </span>
              </div>
            </Link>
            <div className="flex gap-1">
              <CustomButton
                onClick={() => acceptFriendRequest(_id, "Accepted")}
                title="Accept"
                containerStyles="bg-[#0444a4] text-xs text-white px-1.5 py-1 rounded-full"
              />
              <CustomButton
                onClick={() => acceptFriendRequest(_id, "Denied")}
                title="Deny"
                containerStyles="border border-[#666] text-xs text-ascent-1 px-1.5 py-1 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequest;

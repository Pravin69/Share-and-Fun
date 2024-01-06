import { Link } from "react-router-dom";
import { NoProfile } from "../assets";
import { BsPersonFillAdd } from "react-icons/bs";
import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";
import { apiRequest, sendFriendRequest } from "../utils";

const SuggestedFriends = ({ user }) => {
  const [suggestedFriends, setSuggestedFriends] = useState([]);

  const fetchSuggestedFriends = useCallback(async () => {
    try {
      const res = await apiRequest({
        url: "/users/suggested-friends",
        token: user?.token,
        method: "GET",
      });
      setSuggestedFriends(res?.data);
    } catch (error) {
      console.log(error);
    }
  }, [user]);

  const handleFriendRequest = async (id) => {
    try {
      const res = await sendFriendRequest(user?.token, id);
      if (res?.success) {
        toast.success(res?.message);
      } else if (res?.status === "failed") {
        toast.error(res?.message);
      }
      await fetchSuggestedFriends();
    } catch (error) {
      console.log(error?.response?.data.message);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSuggestedFriends();
  }, [fetchSuggestedFriends]);

  return (
    <div className="w-full bg-primary shadow-sm rounded-lg px-5 py-5">
      <div className="flex items-center justify-between text-lg text-ascent-1 pb-2 border-b border-[#66666645]">
        <span>Friend Suggestion</span>
      </div>
      <div className="w-full flex flex-col gap-4 pt-4">
        {suggestedFriends?.map((friend) => (
          <div className="flex items-center justify-between" key={friend._id}>
            <Link
              to={"/profile/" + friend?._id}
              className="w-full flex gap-4 items-center cursor-pointer"
            >
              <img
                src={friend?.profileUrl ?? NoProfile}
                alt={friend?.firstName}
                className="w-10 h-10 object-cover rounded-full"
              />
              <div className="flex-1">
                <p className="text-base font-medium text-ascent-1">
                  {friend?.firstName} {friend?.lastName}
                </p>
                <span className="text-sm text-ascent-2">
                  {friend?.profession ?? "No Profession"}
                </span>
              </div>
            </Link>
            <div className="flex gap-1">
              <button
                className="bg-[#0444a430] text-sm text-white p-1 rounded"
                onClick={() => handleFriendRequest(friend?._id)}
              >
                <BsPersonFillAdd size={20} className="text-[#0f52b6]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedFriends;

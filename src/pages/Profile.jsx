import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  FriendsCard,
  Loading,
  PostCard,
  ProfileCard,
  TopBar,
} from "../components";
import { deletePost, fetchPosts, getUserInfo, likePost } from "../utils";

const Profile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState(user);
  const { posts } = useSelector((state) => state.posts);
  const [loading, setLoading] = useState(false);

  const getUser = async () => {
    const res = await getUserInfo(user?.token, id);
    setUserInfo(res);
  };

  const getPosts = async () => {
    const uri = "/posts/get-user-post/" + id;
    await fetchPosts(user?.token, dispatch, uri);
    setLoading(false);
  };

  const handleDelete = async (id) => {
    await deletePost(id, user?.token);
    await getPosts();
  };
  const handleLikePost = async (uri) => {
    await likePost({ uri, token: user?.token });
    await getPosts();
  };

  useEffect(() => {
    setLoading(true);
    getUser();
    getPosts();
  }, [id]);

  return (
    <>
      <div className="home w-full px-0  lg:px-10 pb-20 2xl:px-40 bg-bgColor lg:rounded-lg h-screen overflow-hidden">
        <TopBar />

        <div className="w-full flex gap-2 lg:gap-4 md:pl-4 pt-5 pb-10 h-full">
          {/* Left */}
          <div className="hidden w-1/3 lg:w-1/4 h-full md:flex flex-col gap-6 overflow-y-auto">
            <ProfileCard user={user} />

            <div className="block lg:hidden">
              <FriendsCard friends={user?.friends} />
            </div>
          </div>

          {/* Center */}
          <div className="flex flex-1 flex-col h-full px-4 gap-6 overflow-y-auto rounded-lg">
            {loading ? (
              <Loading />
            ) : posts?.length > 0 ? (
              posts?.map((post) => (
                <PostCard
                  key={post?._id}
                  post={post}
                  user={user}
                  deletePost={handleDelete}
                  likePost={handleLikePost}
                />
              ))
            ) : (
              <div className="flex w-full h-full items-center justify-center">
                <p className="text-lg text-ascent-2">No Post Available</p>
              </div>
            )}
          </div>

          {/* Right */}
          <div className="hidden w-1/4 h-full lg:flex flex-col gap-8 overflow-y-auto">
            <FriendsCard friends={userInfo?.friends} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

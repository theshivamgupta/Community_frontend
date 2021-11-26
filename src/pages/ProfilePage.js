import {
  Avatar,
  Button,
  Container,
  Grid,
  Hidden,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React from "react";
import Navbar from "../components/NavBar/NavBar";
import SEO from "../components/shared/SEO";
import UserCard from "../components/Post/UserCard";
import FeedPostSkeleton from "../components/Post/FeedPostSkeleton";
// import UserStackCard from "../components/Profile/UserStackCard";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useQuery } from "@apollo/client";
import { GET_USER_BY_ID } from "../graphql/query";
import { UserContext } from "../App";
import "./profile.css";
import PostCard from "../components/Post/PostCard";

const ProfilePage = () => {
  const { userId } = useParams();
  const variables = {
    id: userId,
  };
  const { data, loading, error } = useQuery(GET_USER_BY_ID, { variables });
  console.log(data);
  const [activeTab, setActiveTab] = React.useState({
    profile: true,
    followers: false,
    followings: false,
  });
  if (loading) {
    <h1 className="text-white">Loading...</h1>;
  }
  const { currentUserId } = React.useContext(UserContext);
  const user = data?.getUserById;
  const isOwner = user?.id === currentUserId;
  return (
    <>
      <SEO title={"Profile"} />
      <Navbar />
      <Container>
        <ProfileMainCard
          user={user}
          isOwner={isOwner}
          //   setActiveTab={setActiveTab}
        />
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <ProfileSideCard user={user} />
          </Grid>
          <Grid item xs={12} md={8}>
            {user?.posts.map((post) => {
              return (
                <React.Suspense key={post?.id} fallback={<FeedPostSkeleton />}>
                  <div className="my-10">
                    <PostCard post={post} user={user} />
                  </div>
                </React.Suspense>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

function ProfileMainCard({ user, isOwner }) {
  const coverImgRef = React.useRef(null);
  const bannerImage =
    "https://img5.goodfon.com/wallpaper/nbig/7/64/abstract-background-rounded-shapes-colorful-abstraktsiia-tek.jpg";
  return (
    <div>
      <Paper className="covercard">
        <Grid
          // className={classes.cover}
          className="cover-main"
          container
        >
          <Grid
            // className={classes.coverimg}
            className="coverimg-main"
            item
            xs={12}
            style={{
              background: `url(${bannerImage}) no-repeat center center`,
            }}
          ></Grid>
          {isOwner && (
            <input
              type="file"
              ref={coverImgRef}
              className="hidden"
              accept="image/*"
              //   onChange={handleUpdateProfilePic}
            />
          )}
          <Grid
            // className={classes.profile}
            className="profile-main"
            item
            xs={12}
          >
            <Grid style={{ height: "100%", width: "100%" }} container>
              <Grid className="main-profile-image-grid" item xs={4} md={3}>
                <Avatar
                  className="main-profile-image cursor-pointer"
                  alt="John Doe"
                  src={user?.profileImage}
                  onClick={() => {
                    if (isOwner) coverImgRef.current.click();
                  }}
                />
              </Grid>
              <Grid
                // className={classes.profileinfo}
                className="profileinfo-main"
                item
                xs={7}
                md={6}
              >
                <Grid container style={{ width: "100%", height: "100%" }}>
                  <Grid item xs={12}>
                    <Typography
                      // className={classes.name}
                      className="name-main"
                    >
                      {user?.firstName} {user?.lastName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      // className={classes.username}
                      className="username-main"
                    >
                      {user?.username}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                // className={classes.coverButtons}
                className="coverButtons-main"
                item
                xs={1}
                md={3}
              >
                <div
                  // className={classes.editprofile}
                  className="editprofile-main"
                >
                  <Hidden smDown>
                    {isOwner && (
                      <Link to="/accounts/edit">
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<EditOutlinedIcon />}
                        >
                          Edit Profile
                        </Button>
                      </Link>
                    )}
                  </Hidden>
                  <div
                  // onClick={() => setShowOption((prev) => !prev)}
                  >
                    <svg
                      aria-label="Options"
                      // className={classes.settings}
                      className="settings-main"
                      fill="#262626"
                      height="24"
                      viewBox="0 0 48 48"
                      width="24"
                    >
                      <path
                        clipRule="evenodd"
                        d="M46.7 20.6l-2.1-1.1c-.4-.2-.7-.5-.8-1-.5-1.6-1.1-3.2-1.9-4.7-.2-.4-.3-.8-.1-1.2l.8-2.3c.2-.5 0-1.1-.4-1.5l-2.9-2.9c-.4-.4-1-.5-1.5-.4l-2.3.8c-.4.1-.8.1-1.2-.1-1.4-.8-3-1.5-4.6-1.9-.4-.1-.8-.4-1-.8l-1.1-2.2c-.3-.5-.8-.8-1.3-.8h-4.1c-.6 0-1.1.3-1.3.8l-1.1 2.2c-.2.4-.5.7-1 .8-1.6.5-3.2 1.1-4.6 1.9-.4.2-.8.3-1.2.1l-2.3-.8c-.5-.2-1.1 0-1.5.4L5.9 8.8c-.4.4-.5 1-.4 1.5l.8 2.3c.1.4.1.8-.1 1.2-.8 1.5-1.5 3-1.9 4.7-.1.4-.4.8-.8 1l-2.1 1.1c-.5.3-.8.8-.8 1.3V26c0 .6.3 1.1.8 1.3l2.1 1.1c.4.2.7.5.8 1 .5 1.6 1.1 3.2 1.9 4.7.2.4.3.8.1 1.2l-.8 2.3c-.2.5 0 1.1.4 1.5L8.8 42c.4.4 1 .5 1.5.4l2.3-.8c.4-.1.8-.1 1.2.1 1.4.8 3 1.5 4.6 1.9.4.1.8.4 1 .8l1.1 2.2c.3.5.8.8 1.3.8h4.1c.6 0 1.1-.3 1.3-.8l1.1-2.2c.2-.4.5-.7 1-.8 1.6-.5 3.2-1.1 4.6-1.9.4-.2.8-.3 1.2-.1l2.3.8c.5.2 1.1 0 1.5-.4l2.9-2.9c.4-.4.5-1 .4-1.5l-.8-2.3c-.1-.4-.1-.8.1-1.2.8-1.5 1.5-3 1.9-4.7.1-.4.4-.8.8-1l2.1-1.1c.5-.3.8-.8.8-1.3v-4.1c.4-.5.1-1.1-.4-1.3zM24 41.5c-9.7 0-17.5-7.8-17.5-17.5S14.3 6.5 24 6.5 41.5 14.3 41.5 24 33.7 41.5 24 41.5z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            // className={classes.navigation}
            className="navigation-main"
            xs={12}
          >
            <Tabs
              //   value={value}
              //   onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab
                // className={classes.navtab}
                className="navtab-main"
                label="Profile"
                // onClick={() => {
                //   setActiveTab((prev) => ({
                //     ...prev,
                //     profile: true,
                //     followers: false,
                //     followings: false,
                //   }));
                // }}
              />
            </Tabs>
          </Grid>
        </Grid>
      </Paper>
      {/* {showOption && <OptionsMenu handleCloseMenu={handleCloseMenu} />}
      {showUnfollowDialog && (
        <UnfollowDialog
          onUnfollowUser={onUnfollowUser}
          user={user}
          onClose={() => setUnfollowDialog(false)}
        />
      )} */}
    </div>
  );
}

function ProfileSideCard({ user }) {
  return (
    <div>
      <Paper className="sidecard-side" elevation={3}>
        <Grid className="frienddata-side" container spacing={1}>
          <Grid className="data-side" item xs={3}>
            <Typography className="friends-side">Followers</Typography>
          </Grid>
          <Grid className="data" item xs={3}>
            <Typography className="number-side">
              {user?.posts?.length}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

export default ProfilePage;

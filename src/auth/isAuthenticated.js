import Cookies from "js-cookie";

export const isAuthenticated = () => {
  const token = {
    refreshToken: Cookies.get("refresh-token"),
    accessToken: Cookies.get("access-token"),
  };
  // console.log(token.accessToken);
  return !!token.accessToken;
};

import Axios from 'axios'
import { globalActions } from '../slices/globalSlice';
import { userActions } from '../slices/userSlice';

export const register = async (registerUser) => {
  try {
    const user = await Axios.post("/api/user", registerUser);
    localStorage.setItem("userId", user.data.id);
    // console.log("action user:", user);
    return user.data.id;
  } catch (error) {
    console.log(error);
  }

  return {};
};

export const loggedUser = async (login) => {
  try {
    const user = await Axios.post("/api/login", login);
    // console.log(user.data);
    if (user.data.userId && user.data.token) {
      localStorage.setItem("userId", user.data.userId)
      localStorage.setItem("token", user.data.token)
    }
    return user.data;
  } catch (error) {
    console.log(error);
  }

  return {};
};

export const checkUserToken = async (dispatch, router) => {
  try {
    dispatch(globalActions.updateLoading(true));
    let userId = localStorage.getItem('userId')
    let token = localStorage.getItem('token')
    let refresh = await Axios.post("/api/refresh", { userId, token })

    if (refresh.data.token) {
      localStorage.setItem("token", refresh.data.token)
      // setRefreshToken(refreshToken + 1)
      dispatch(userActions.updateUserLoggedStatus(true));
      dispatch(globalActions.updateLoading(false));
    } else {
      if(router) {
        router.replace("/");
      }
      dispatch(userActions.updateUserLoggedStatus(false));
      dispatch(globalActions.updateLoading(false));
    }

  } catch (err) {
    dispatch(userActions.updateUserLoggedStatus(false));
    dispatch(globalActions.updateLoading(false));
    console.log(err)
  }
}

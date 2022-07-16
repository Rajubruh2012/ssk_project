import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/slices/userSlice";
import { globalActions } from "../../store/slices/globalSlice";
import { loggedUser } from "../../store/actions/userActions";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const gap = {
  marginBottom: "1.5rem",
};

const label = {
  color: "#000",
  fontSize: "1rem",
  lineHeight: 2,
  fontWeight: 500,
};

export default function LoginForm({ validateRegex }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down("md"));

  const login = useSelector((state) => state.user.userLoginData);
  const [isError, setIsError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const EMAIL_REGEX = /\S+@\S+\.\S+/;

  useEffect(() => {
    if (validateRegex(login.email, EMAIL_REGEX) && login.password) {
      setIsError(false);
    } else {
      setIsError(true);
    }
  }, [login]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      userActions.updateLoginUserData({
        name,
        value,
      })
    );
  };

  const handleLogin = async () => {
    if (isError) {
      setIsSubmit(true);
    }
    if (!isError) {
      dispatch(globalActions.updateLoading(true));
      setIsSubmit(false);
      const logged = await loggedUser(login);
      console.log("logged Login", logged)
      if (logged.userId) {
        dispatch(userActions.updateUserLoggedStatus(true));
        dispatch(globalActions.updateLoading(false));
      }
      if(!logged.userId) {
        toast.error('User Not found');
        dispatch(globalActions.updateLoading(false));
      }
    }
  };

  return (
    <>
      <Box component="li" sx={gap}>
        <Box sx={label}>{"Email"}</Box>
        <TextField
          name="email"
          variant="standard"
          sx={{ width: `${mobileView ? "100%" : "50%"}` }}
          onChange={handleChange}
          {...(isSubmit === true && login.email === ""
            ? {
                error: true,
                helperText: "Email is Required",
              }
            : null)}
          {...(!validateRegex(login.email, EMAIL_REGEX) && login.email !== ""
            ? {
                error: true,
                helperText: "Invalid Email",
              }
            : null)}
        />
      </Box>
      <Box component="li" sx={gap}>
        <Box sx={label}>{"Passward"}</Box>
        <TextField
          name="password"
          type="password"
          variant="standard"
          sx={{ width: `${mobileView ? "100%" : "50%"}` }}
          onChange={handleChange}
        />
      </Box>
      <Box component="li" sx={gap}>
        <Button
          variant="text"
          sx={{ marginLeft: "-0.7rem", color: "#000" }}
          onClick={handleLogin}
        >
          Login
        </Button>
      </Box>
    </>
  );
}

import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/slices/userSlice';
import { globalActions } from "../../store/slices/globalSlice";
import { register, loggedUser } from '../../store/actions/userActions';
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

export default function RegisterForm({ validateRegex }) {
  const dispatch = useDispatch();
  const registerUser = useSelector((state) => state.user.userRegisterData);
  const [isError, setIsError] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const EMAIL_REGEX = /\S+@\S+\.\S+/;

  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if(validateRegex(registerUser.email, EMAIL_REGEX) && registerUser.password && registerUser.name) {
      setIsError(false);
    } else {
      setIsError(true);
    }
  }, [registerUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(userActions.updateRegisterUserData({
      name,
      value,
    }))
  };

  const handleRegister = async () => {
    if(isError) {
      setIsSubmit(true);
    }
    if(!isError) {
      setIsSubmit(false);
      dispatch(globalActions.updateLoading(true));
      const user = await register(registerUser);
      console.log("user rrr", user);
      if(user) {
        const login = { email: registerUser.email, password: registerUser.password }
        const logged = await loggedUser(login);
        if(logged) {
          dispatch(userActions.updateUserLoggedStatus(true));
          dispatch(globalActions.updateLoading(false));
        }
      }
      if(!user) {
        toast.error('User already exist');
        dispatch(globalActions.updateLoading(false));
      }
    }
  }

  return (
    <>
      <Box component="li" sx={gap}>
        <Box sx={label}>{"Email Address"}</Box>
        <TextField
          variant="standard"
          name="email"
          sx={{ width: `${mobileView ? "100%" : "50%"}` }}
          onChange={handleChange}
          {...(isSubmit === true && registerUser.email === ""
            ? {
                error: true,
                helperText: "Email is Required",
              }
            : null)}
          {...(!validateRegex(registerUser.email, EMAIL_REGEX) &&
          registerUser.email !== ""
            ? {
                error: true,
                helperText: "Invalid Email",
              }
            : null)}
        />
      </Box>

      <Box component="li" sx={gap}>
        <Box sx={label}>{"Full Name"}</Box>
        <TextField
          name="name"
          variant="standard"
          sx={{ width: `${mobileView ? "100%" : "50%"}` }}
          onChange={handleChange}
          {...(isSubmit === true && registerUser.name === ""
            ? {
                error: true,
                helperText: "Name is Required",
              }
            : null)}
        />
      </Box>

      <Box component="li" sx={gap}>
        <Box sx={label}>{"Password"}</Box>
        <TextField
          name="password"
          type="password"
          variant="standard"
          sx={{ width: `${mobileView ? "100%" : "50%"}` }}
          onChange={handleChange}
          {...(isSubmit === true && registerUser.password === ""
            ? {
                error: true,
                helperText: "Password is Required",
              }
            : null)}
        />
      </Box>

      <Box component="li" sx={gap}>
        <Button
          variant="text"
          sx={{ marginLeft: "-0.5rem", color: "#000" }}
          onClick={handleRegister}
        >
          Register
        </Button>
      </Box>
    </>
  );
}

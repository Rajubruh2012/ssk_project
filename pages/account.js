import { Box, Container, Grid } from "@mui/material";
import MainNavigationDesktop from "../components/navigation/MainNavigationDesktop";
import MainNavigationMobile from "../components/navigation/MainNavigationMobile";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import styles from "../styles/Account.module.css";
import { useEffect, useState } from "react";
import { checkUserToken } from "../store/actions/userActions";
import axios from "axios";
import Cards from "../components/Card";

import { useRouter } from 'next/router'
import Skeleton from '@mui/material/Skeleton';

export default function Account() {
  const dispatch = useDispatch();
  const router = useRouter()
  const userLoggedStatus = useSelector((state) => state.user.userLoggedStatus);
  const slideMenu = useSelector((state) => state.homePage.displaySlideMenu);
  const [selectedNavMenuItem, setSelectedNavMenuItem] = useState("My Tickets");
  const [myDetails, setMyDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e) => {
    setSelectedNavMenuItem(e.target.innerText);
    if(e.target.innerText === "Logout") {
      localStorage.clear();
      checkUserToken(dispatch);
      router.push('/');
    }
  };

  useEffect(() => {
    if (!userLoggedStatus) {
      checkUserToken(dispatch, router);
    }
  }, [userLoggedStatus]);

  const getTickets = async () => {
    setIsLoading(true);
    try {
      let userId = localStorage.getItem("userId");
      let token = localStorage.getItem("token");
      await axios
        .post("/api/account", { userId, token })
        .then((res) => {
          setMyDetails(res.data || {});
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setIsLoading(false);
        });
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    // console.log("userLoggedStatus::", userLoggedStatus);
    // if(!userLoggedStatus) {
    //   router.replace("/");
    // }
    getTickets();
  }, []);

  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Box sx={{ background: "rgb(149,208,169)", minHeight: "100vh" }}>
        {mobileView ? (
          <MainNavigationMobile />
        ) : (
          <MainNavigationDesktop onHome={false} />
        )}
        <Container>
          <Grid
            container
            justifyContent="center"
            style={slideMenu ? { display: "none" } : { display: "flex" }}
          >
            <Grid item xs={11} sm={11} md={12} sx={{ paddingTop: "8rem" }}>
              <Box
                component="h1"
                sx={
                  mobileView
                    ? { fontSize: "2rem", fontWeight: "400" }
                    : { fontSize: "5rem", fontWeight: "400" }
                }
              >
                {"Welcome Back,"}
              </Box>
            </Grid>

            <Grid item xs={11} sm={11} md={12}>
              <Box
                component="h2"
                sx={
                  mobileView
                    ? {
                        fontSize: "1.7rem",
                        lineHeight: "1.2",
                        fontWeight: "400",
                        paddingY: "1rem",
                      }
                    : {
                        fontSize: "2.5rem",
                        lineHeight: "1.1",
                        fontWeight: "400",
                        paddingY: "1rem",
                      }
                }
              >
                {myDetails.name || "User"}
              </Box>
            </Grid>

            <Grid
              item
              container
              xs={11}
              sm={11}
              md={12}
              sx={{ margin: "0 0 4rem 0" }}
            >
              <Grid item xs={12} py={2}>
                <hr className={styles.animated} />
              </Grid>

              <Grid item container xs={12} spacing={2} paddingY={2}>
                <Grid
                  item
                  xs={3}
                  sm={2}
                  className={`${styles.mainNavigationDesktopScreenItem} ${
                    styles.btnLink
                  } ${selectedNavMenuItem === "My Tickets" && styles.selected}`}
                >
                  <Box
                    component="h4"
                    sx={
                      mobileView
                        ? {
                            fontSize: "1rem",
                            lineHeight: "1.2",
                            fontWeight: "400",
                          }
                        : {
                            fontSize: "1.2rem",
                            lineHeight: "1.1",
                            fontWeight: "400",
                          }
                    }
                    onClick={handleClick}
                  >
                    {"My Tickets"}
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={2}
                  sm={2}
                  className={`${styles.mainNavigationDesktopScreenItem} ${
                    styles.btnLink
                  } ${selectedNavMenuItem === "Logout" && styles.selected}`}
                >
                  <Box
                    component="h4"
                    sx={
                      mobileView
                        ? {
                            fontSize: "1rem",
                            lineHeight: "1.2",
                            fontWeight: "400",
                          }
                        : {
                            fontSize: "1.2rem",
                            lineHeight: "1.1",
                            fontWeight: "400",
                          }
                    }
                    onClick={handleClick}
                  >
                    {"Logout"}
                  </Box>
                </Grid>
              </Grid>

              <Grid
                item
                container
                xs={12}
                className={`${styles.mainNavigationDesktopScreenItem} ${
                  styles.btnLink
                } ${selectedNavMenuItem === "My Tickets" && styles.selected}`}
                spacing={2}
              >
                <>
                  {isLoading && (
                    <Grid item xs={12} sx={{ height: "300px" }}>
                      <Skeleton
                        sx={{
                          backgroundColor: "rgb(221,221,221)",
                          borderRadius: "4px",
                        }}
                        variant="rectangular"
                        width={"100%"}
                        height={"100%"}
                      />
                    </Grid>
                  )}
                  {myDetails?.tickets?.map((ticket) => (
                    <Cards key={ticket.id} ticket={ticket} />
                  ))}
                </>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

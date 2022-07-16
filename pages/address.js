import { Box, Container, Grid } from "@mui/material";
import MainNavigationDesktop from "../components/navigation/MainNavigationDesktop";
import MainNavigationMobile from "../components/navigation/MainNavigationMobile";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import styles from "../styles/NavigationMenu.module.css";
import { useEffect } from "react";
import { checkUserToken } from "../store/actions/userActions";

export default function Address() {
  const dispatch = useDispatch();
  const slideMenu = useSelector((state) => state.homePage.displaySlideMenu);
  const userLoggedStatus = useSelector((state) => state.user.userLoggedStatus);

  useEffect(() => {
    if (!userLoggedStatus) {
      checkUserToken(dispatch);
    }
  }, [userLoggedStatus]);

  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Box sx={{ background: "rgb(218,204,152)", minHeight: "100vh" }}>
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
                {"Address and Opening Hours"}
              </Box>
            </Grid>
            <Grid item xs={11} sm={11} md={12}>
              <Box
                sx={
                  mobileView
                    ? {
                        fontSize: "1.2rem",
                        lineHeight: "1.8",
                        fontWeight: "400",
                      }
                    : {
                        fontSize: "1.2rem",
                        lineHeight: "1.8",
                        fontWeight: "400",
                        width: "50%",
                      }
                }
              >
                {
                  "The Srimanta Sankaradeva Kalakshetra Museum is open and accessible to everyone. View the opening hours and find out how to get to the museum."
                }
              </Box>
            </Grid>
            <Grid
              item
              container
              xs={11}
              sm={11}
              md={12}
              sx={{ margin: "2rem 0 4rem 0" }}
            >
              <Grid item xs={12} py={2}>
                <hr className={styles.animated} />
              </Grid>

              <Grid item xs={12} sm={6}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.0237719108677!2d91.82019194984011!3d26.130767883389453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a58ae0e649857%3A0x400b530a25e9b515!2sSrimanta%20Sankaradeva%20Kalakshetra%2C%20Guwahati!5e0!3m2!1sen!2sin!4v1657533557268!5m2!1sen!2sin"
                  width="100%"
                  style={
                    mobileView
                      ? {
                          border: "0",
                          borderRadius: "0.5rem",
                          minHeight: "300px",
                        }
                      : { border: "0", borderRadius: "0.5rem", height: "100%" }
                  }
                  loading="lazy"
                ></iframe>
              </Grid>

              <Grid
                item
                container
                xs={12}
                sm={6}
                sx={mobileView ? { paddingX: "0" } : { paddingX: "2rem" }}
              >
                <Grid item xs={12} sm={12}>
                  <Box
                    component="h2"
                    sx={
                      mobileView
                        ? {
                            fontSize: "1.7rem",
                            lineHeight: "1.2",
                            fontWeight: "400",
                            paddingY: "2rem",
                          }
                        : {
                            fontSize: "2.5rem",
                            lineHeight: "1.1",
                            fontWeight: "400",
                            paddingY: "2rem",
                          }
                    }
                  >
                    {"Address"}
                  </Box>

                  <Grid item xs={12} sm={6}>
                    <Box
                      component="span"
                      sx={
                        mobileView
                          ? {
                              fontSize: "1.2rem",
                              lineHeight: "1.8",
                              fontWeight: "400",
                            }
                          : {
                              fontSize: "1.2rem",
                              lineHeight: "1.8",
                              fontWeight: "400",
                            }
                      }
                    >
                      {"Panjabari Rd, Batahguli, Guwahati, Assam 781037"}
                    </Box>
                  </Grid>

                  <Grid item xs={12} py={2}>
                    <hr className={styles.animated} />
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={12}>
                  <Box
                    component="h2"
                    sx={
                      mobileView
                        ? {
                            fontSize: "1.7rem",
                            lineHeight: "1.2",
                            fontWeight: "400",
                            padding: "1rem 0 2rem 0",
                          }
                        : {
                            fontSize: "2.5rem",
                            lineHeight: "1.1",
                            fontWeight: "400",
                            padding: "1rem 0 2rem 0",
                          }
                    }
                  >
                    {"Opening Hours"}
                  </Box>

                  <Grid item xs={12} sm={10}>
                    <Box
                      component="span"
                      sx={
                        mobileView
                          ? {
                              fontSize: "1.2rem",
                              lineHeight: "1.8",
                              fontWeight: "400",
                            }
                          : {
                              fontSize: "1.2rem",
                              lineHeight: "1.8",
                              fontWeight: "400",
                            }
                      }
                    >
                      {"Open daily from 10 am to 7 pm."}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

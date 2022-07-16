import { Box, Container, Grid } from "@mui/material";
import MainNavigationDesktop from "../components/navigation/MainNavigationDesktop";
import MainNavigationMobile from "../components/navigation/MainNavigationMobile";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import styles from "../styles/NavigationMenu.module.css";
import { useEffect } from "react";
import { checkUserToken } from "../store/actions/userActions";

export default function OpenAirVenue() {
  const dispatch = useDispatch();
  const userLoggedStatus = useSelector((state) => state.user.userLoggedStatus);
  const slideMenu = useSelector((state) => state.homePage.displaySlideMenu);

  useEffect(() => {
    if (!userLoggedStatus) {
      checkUserToken(dispatch);
    }
  }, [userLoggedStatus]);

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
                {"Open Air Venues"}
              </Box>
            </Grid>

            <Grid
              item
              container
              xs={11}
              sm={11}
              md={12}
              sx={{ margin: "2rem 0 0 0" }}
            >
              <Grid item xs={12} py={2}>
                <hr className={styles.animated} />
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
                          paddingY: "1rem",
                        }
                      : {
                          fontSize: "2.5rem",
                          lineHeight: "1.1",
                          fontWeight: "400",
                          paddingY: "2rem",
                        }
                  }
                >
                  {"Rang Ghar Bakori Mancha"}
                </Box>
              </Grid>
              <Grid item xs={12} sm={5} sx={{ textAlign: "center" }}>
                <Box
                  component="img"
                  src="/rang-ghar-bakori.jpg"
                  alt="Rang Ghar Bakori"
                  height="100%"
                  width="100%"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  component="p"
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
                          paddingLeft: "1rem",
                        }
                  }
                >
                  {
                    "This platform adjacent to the ‘Rang Ghar Bakori’ has an open area in the front. This stage along with the ground is best suitable for holding outdoor events like festivals, fairs and other open shows."
                  }
                </Box>
              </Grid>
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

              <Grid item xs={12} sm={12}>
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
                          paddingY: "2rem",
                        }
                  }
                >
                  {"Open Air Theatre"}
                </Box>
              </Grid>
              <Grid item xs={12} sm={5} sx={{ textAlign: "center" }}>
                <Box
                  component="img"
                  src="/Open-Air-Theatre.jpg"
                  alt="Open Air Theatre"
                  height="100%"
                  width="100%"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box
                  component="p"
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
                          paddingLeft: "1rem",
                        }
                  }
                >
                  {
                    "This amphitheater can accommodate 2000 people for audience. This facility is a great platform to hold various events like folk festivals, traditional dance and drama performances, events of schools etc. Seated in the open air under the sky, spectators get to experience a different kind of involvement during various shows that are presented here."
                  }
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

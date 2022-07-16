import { Box, Container, Grid } from "@mui/material";
import MainNavigationDesktop from "../components/navigation/MainNavigationDesktop";
import MainNavigationMobile from "../components/navigation/MainNavigationMobile";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import styles from "../styles/NavigationMenu.module.css";
import { useEffect } from "react";
import { checkUserToken } from "../store/actions/userActions";

export default function Accommodation() {
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
                {"Accommodation"}
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
                  {"VIP Guest House"}
                </Box>
              </Grid>
              <Grid item xs={12} sm={5} sx={{ textAlign: "center" }}>
                <Box
                  component="img"
                  src="/VIP-Guest-house.jpg"
                  alt="VIP Guest House"
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
                    "A VIP Guest House with five suites each having two beds is also there for accommodating eminent personalities and distinguished guests."
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
                  {"Artists Village"}
                </Box>
              </Grid>
              <Grid item xs={12} sm={5} sx={{ textAlign: "center" }}>
                <Box
                  component="img"
                  src="/Artists-Village.jpg"
                  alt="Artists Village"
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
                    "This place serves as an accommodation for performers, artisans, trainees, scholars etc. who come to participate in various festivals, workshops, seminars and so on. It can accommodate 150 people in its well furnished dormitories and rooms. The cluster of small houses here are of traditional designs that offer the guests an experience and an atmosphere of the villages of Assam."
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

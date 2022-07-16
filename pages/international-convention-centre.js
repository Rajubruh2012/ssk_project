import { Box, Container, Grid } from "@mui/material";
import MainNavigationDesktop from "../components/navigation/MainNavigationDesktop";
import MainNavigationMobile from "../components/navigation/MainNavigationMobile";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { checkUserToken } from "../store/actions/userActions";
import { useEffect } from "react";

export default function InternationalConventionCentre() {
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
        <Box sx={{ background: "rgb(242,111,33)", minHeight: "100vh" }}>
          {mobileView ? <MainNavigationMobile /> : <MainNavigationDesktop onHome={false}/>}
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
                  {"International Convention Centre"}
                </Box>
              </Grid>
              <Grid
                item
                container
                xs={11}
                sm={11}
                md={12}
                sx={{ margin: "2rem 0 4rem 0" }}
                spacing={2}
              >
                <Grid item xs={12} sm={12}>
                  <Box
                    component="p"
                    sx={mobileView ? {
                      fontSize: "1.2rem",
                      lineHeight: "1.8",
                      fontWeight: "400",
                    } : {
                      fontSize: "1.2rem",
                      lineHeight: "1.8",
                      fontWeight: "400",
                    }}
                  >
                    {
                      "The Auditorium complex is designed to have 3 Auditoria – Sri Sri Madhavadeva International Auditorium with a capacity of 300 and Srimanta Sankaradeva International Auditorium with a capacity of 1250 are ready and in use since 30th Jan 2006 and 1st March 2016 respectively. These two auditoria have all the modern and high-tech facilities and are of any International standard."
                    }
                  </Box>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Box
                    component="p"
                    sx={mobileView ? {
                      fontSize: "1.2rem",
                      lineHeight: "1.8",
                      fontWeight: "400",
                    } : {
                      fontSize: "1.2rem",
                      lineHeight: "1.8",
                      fontWeight: "400",
                    }}
                  >
                    {
                      "The third auditorium is in progress and will be able to accommodate 800 people for audience."
                    }
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
                    <Box
                      component="img"
                      src="/International-Convention-Centre-1.jpg"
                      alt="International-Convention-Centre-1"
                      height="100%"
                      width="100%"
                    />
                </Grid>
                <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
                    <Box
                      component="img"
                      src="/International-Convention-Centre-2.jpg"
                      alt="International-Convention-Centre-1"
                      height="100%"
                      width="100%"
                    />
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
}
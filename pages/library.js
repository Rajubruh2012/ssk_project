import { Box, Container, Grid } from "@mui/material";
import MainNavigationDesktop from "../components/navigation/MainNavigationDesktop";
import MainNavigationMobile from "../components/navigation/MainNavigationMobile";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { checkUserToken } from "../store/actions/userActions";
import { useEffect } from "react";

export default function Library() {
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
        <Box sx={{ background: "rgb(163,200,216)", minHeight: "100vh" }}>
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
                  {"Library"}
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
                <Grid item xs={12} sm={12} sx={{ textAlign: "center" }}>
                  <Box
                    component="img"
                    src="/library.jpg"
                    alt="Library"
                    height="100%"
                    width="100%"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Box
                    component="p"
                    sx={{
                      fontSize: "1.2rem",
                      lineHeight: "1.8",
                      fontWeight: "400",
                      padding: "1rem 0 1rem 0",
                    }}
                  >
                    {
                      "Srimanta Sankaradeva Kalakshetra has a unique library of rare books and manuscripts. It also has a publication wing, which undertakes the publication of books on literature of different ethnic groups of the state. Special emphasis is given to books on cultural heritage of the people. Various other publications like seminars, lectures on Assamese folk literature would be preserved in this library.  This library would be divided into different sections viz., Art and culture, Literature, Music and Drama."
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
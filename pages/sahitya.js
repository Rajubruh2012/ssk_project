import { Box, Container, Grid } from "@mui/material";
import MainNavigationDesktop from "../components/navigation/MainNavigationDesktop";
import MainNavigationMobile from "../components/navigation/MainNavigationMobile";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { checkUserToken } from "../store/actions/userActions";
import { useEffect } from "react";

export default function Sahitya() {
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
                  {"Sahitya"}
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
                <Grid item xs={12} sm={5} sx={{ textAlign: "center" }}>
                  <Box
                    component="img"
                    src="/Sahitya.jpg"
                    alt="Sahitya"
                    height="100%"
                    width="100%"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
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
                        paddingLeft: "1rem"
                    }}
                  >
                    {
                      "The Sahitya Section of the Srimanta Sankaradeva Kalakshetra has strived to build a forum for the discussion and upliftment of the rich written and oral literary traditions of the region. It has organized different seminars and discussions from time to time. Srimanta Sankaradeva Kalakshetra has been organising Sahitya Baktrita Mala, Author’s Meet in the field of Assamese literature."
                    }
                  </Box>
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
                      "The Sahitya Section has been regularly holding lectures, workshops, discussions, book reading sessions and so on to promote literature and light up the interest for literature which is a huge part of the cultural heritage of this region. The book stall at Srimanta Sankaradeva Kalakshetra Society now has one section completely for the sale of books published by Assam Sahitya Sabha. There have been many publications made by Srimanta Sankaradeva Kalakshetra Society of noteworthy literary works."
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
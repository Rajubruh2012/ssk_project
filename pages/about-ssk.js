import { Box, Container, Grid } from "@mui/material";
import MainNavigationDesktop from "../components/navigation/MainNavigationDesktop";
import MainNavigationMobile from "../components/navigation/MainNavigationMobile";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { checkUserToken } from "../store/actions/userActions";
import { useEffect } from "react";

export default function AboutSSK() {
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
        <Box sx={{ background: "orange", minHeight: "100vh" }}>
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
                  {"About SSK"}
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
                {mobileView && (
                  <Grid item xs={12} sm={5} sx={{ textAlign: "center", paddingBottom: "1rem" }}>
                    <Box
                      component="img"
                      src="/about-ssk.jpg"
                      alt="about-ssk"
                      height="100%"
                      width="100%"
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Box
                    component="p"
                    sx={{
                      fontSize: "1.2rem",
                      lineHeight: "1.8",
                      fontWeight: "400",
                    }}
                  >
                    {
                      "Srimanta Sankaradeva Kalakshetra (SSK) was conceived as a grand exposition of the life and culture of the people of Assam and North-East India, of its diverse ethnic groups & sub-groups that created the cultural mosaic of the North-East in general and particularly of Assam, in respect to all its beauty and splendour."
                    }
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box
                    component="p"
                    sx={mobileView ? {
                      fontSize: "1.2rem",
                      lineHeight: "1.8",
                      fontWeight: "400",
                      paddingBottom: "1rem",
                    } : {
                      fontSize: "1.2rem",
                      lineHeight: "1.8",
                      fontWeight: "400",
                    }}
                  >
                    {
                      "Named after the great unifier of Assam and one of the greatest integrators of the Indian society of the 15th Century, Srimanta Sankaradeva, the Kalakshetra Society attempts to capture and convey the essence of the great seer’s spirit, which preaches the message of unity in diversity and the universal brotherhood of human beings. The institution attempts for preservation, restoration, research, promotion and development of the rich cultural heritage of the diverse ethnic communities inhabiting the state."
                    }
                  </Box>
                </Grid>
                {!mobileView && (
                  <Grid item xs={12} sm={5} sx={{ textAlign: "center" }}>
                    <Box
                      component="img"
                      src="/about-ssk.jpg"
                      alt="about-ssk"
                      height="100%"
                      width="100%"
                    />
                  </Grid>
                )}
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
                      "The Cultural Complex was planned and conceived by the Cultural Advisory Committee of the Government of Assam in a meeting held on 5th August, 1986. It was decided to set up a complex to serve as a centre of activities in the field of dance, drama, music, fine-arts, literature etc.; with the view of preserving and promoting the cultural heritage of the people of Assam. It falls under the Clause VI of Assam Accord (1985) which constitutionalizes the legislative and administrative safeguards, as may be appropriate, shall be provided to protect, preserve and promote the cultural, social, linguistic identity and heritage of the people of Assam. This complex is an active nerve centre of cultural excellence of Assam and the neighbouring states of the region."
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
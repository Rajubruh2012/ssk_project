import { Box, Container, Grid } from "@mui/material";
import MainNavigationDesktop from "../components/navigation/MainNavigationDesktop";
import MainNavigationMobile from "../components/navigation/MainNavigationMobile";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import { checkUserToken } from "../store/actions/userActions";

export default function SrimantaSankaradevaStudyCentre() {
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
        <Box sx={{ background: "rgb(244,151,175)", minHeight: "100vh" }}>
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
                  {"Srimanta Sankaradeva Study Centre"}
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
                    src="/ssk-study-centre.jpg"
                    alt="SSk Stydy Centre"
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
                      "A study centre has been set up to initiate and support academic activities on various aspects of the great Saint of Assam – Mahapurush Srimanta Sankaradeva. This centre promotes study and research activities on the contributions made by Srimanta Sankaradeva in the field of literature, dance, drama, music, painting and other related areas. This Centre was inaugurated on 1st March 2016. Presently it has a collection of important books apart from age-old manuscripts, thesis papers and so on. Kalakshetra Society is contemplating on introducing courses on Performing Arts under this centre."
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
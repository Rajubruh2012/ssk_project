import { Box, Container, Grid } from "@mui/material";
import MainNavigationDesktop from "../components/navigation/MainNavigationDesktop";
import MainNavigationMobile from "../components/navigation/MainNavigationMobile";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { checkUserToken } from "../store/actions/userActions";
import { useEffect } from "react";

export default function Sangrahalaya() {
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
        <Box sx={{ background: "rgb(221,221,221)", minHeight: "100vh" }}>
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
                  {"Sangrahalaya"}
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
                    src="/Sangrahalaya.jpg"
                    alt="Sangrahalaya"
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
                      "The Sangrahalayas house a variety of items related to indigenous cultural lives of this region. There are museums dedicated separately for Textiles, Masks, Cane and Bamboo Crafts, Musical Instruments, Pottery, Terracotta, Jewellery etc. There are other segments of the Museums which are also dedicated to eminent personalities like D, Bhupen Hazarika, Sahityarathi Lakhi Nath Bezbaroa. The main aim of the museums is to preserve and exhibit every bit of culturally related items from every group of tribal or non tribal."
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
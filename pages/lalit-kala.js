import { Box, Container, Grid } from "@mui/material";
import MainNavigationDesktop from "../components/navigation/MainNavigationDesktop";
import MainNavigationMobile from "../components/navigation/MainNavigationMobile";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import { checkUserToken } from "../store/actions/userActions";

export default function LalitKala() {
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
                  {"Lalit Kala"}
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
                    src="/Lalit_kala.jpg"
                    alt="Lalit Kala"
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
                      "The Lalit Kala section of Srimanta Sankaradeva Kalakshetra Society is responsible for the promotion, preservation and protection of Fine Art arena of this region. Many exhibitions and workshops on paintings, woodcrafts, sketches, Sattriya masks etc have helped in providing a platform to local artists to showcase their art and talent and also have helped in creating interest in young artists about the age old Cultural Fine Arts Tradition of Assam and Northeast."
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
                      padding: "1rem 0 0 0",
                    }}
                  >
                    {
                      "Since its inception, the Lalit Kala section of Srimanta Sankaradeva Kalakshetra has been holding various exhibitions and workshops on paintings, woodcraft, sketches, graphics and crafts both at the state and national level. Some of these are held in collaboration with Lalit Kala, New Delhi, National Lalit Kala Centre, Kolkata and All India Fine Arts and Craft Society (AIFACS), New Delhi. Solo Exhibitions by various artists are held regularly. The newly constructed  A.C. Art Gallery  has held various exhibitions on amateur artists of the State. The Srimanta Sankaradeva Kalakshetra Society has also held various competitions of art and craft."
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
                      "Srimanta Sankaradeva Kalakshetra, has also regularly organised crafts fairs displaying the rich handloom, textiles and other artistic crafts of the region, to boost the morale of the dying cottage industry.  Exhibition cum workshop like Olympic Fine Arts International Exhibition and Symposium. This event had the first of its kind in the North-East part of India. The participation of 57 renowned artists from 33 Nation showcasing their creative pursuits have in Guwahati along with local talented artists of North East."
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
import { Box, Container, Grid } from "@mui/material";
import MainNavigationDesktop from "../components/navigation/MainNavigationDesktop";
import MainNavigationMobile from "../components/navigation/MainNavigationMobile";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import styles from "../styles/NavigationMenu.module.css";
import { useEffect } from "react";
import { checkUserToken } from "../store/actions/userActions";

export default function ArtGallery() {
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

  const imgData = [
    {
      img: '/gallery-4.jpg',
      title: 'gallery-4',
    },
    {
      img: '/gallery-5.jpg',
      title: 'gallery-5',
    },
    {
      img: '/gallery-6.jpg',
      title: 'gallery-6',
    },
    {
      img: '/gallery-3.jpg',
      title: 'gallery-3',
    },
    {
      img: '/gallery-2.webp',
      title: 'gallery-2',
    },
    {
      img: '/gallery-1.jpg',
      title: 'gallery-1',
    },
  ];

  return (
    <>
      <Box sx={{ background: "rgb(221,221,221)", minHeight: "100vh" }}>
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
                {"Art Gallery"}
              </Box>
            </Grid>

            <Grid
              item
              container
              xs={11}
              sm={11}
              md={12}
              sx={{ margin: "2rem 0 0 0" }}
              spacing={2}
            >
              <Grid item xs={12} py={2}>
                <hr className={styles.animated} />
              </Grid>

              {imgData?.map((item) => (
                <Grid item xs={12} sm={4} key={item.img}>
                  <Box
                    component="img"
                    src={`${item.img}`}
                    alt={item.title}
                    height="250px"
                    width="100%"
                  />
                </Grid>
              ))}

              {/* <Grid item xs={12} sm={4}>
                <Box
                  component="img"
                  src="/gallery-1.jpg"
                  alt="gallery-1"
                  height="100%"
                  width="100%"
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Box
                  component="img"
                  src="/gallery-3.jpg"
                  alt="gallery-3"
                  height="100%"
                  width="100%"
                />
              </Grid> */}

              <Grid item xs={12} py={2}>
                <hr className={styles.animated} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

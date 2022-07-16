import { Box, Container, Grid } from "@mui/material";
import MainNavigationDesktop from "../components/navigation/MainNavigationDesktop";
import MainNavigationMobile from "../components/navigation/MainNavigationMobile";
import { useSelector, useDispatch } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";
import { checkUserToken } from "../store/actions/userActions";

export default function Stories() {
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
                  {"The Life of Srimanta Sankaradev"}
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
                      src="/sankar-dev.png"
                      alt="Sankaradeva"
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
                      "The great Vaishnavite saint and reformer Srimanta Sankardev was born in Alipukhuri, Nagaon in 1449. His father was Kusumbar Bhuyan and his mother’s name was Satyasandhya.Mahapurush Srimanta Sankardev was a saint, scholar, playwright, social and religious reformer is a colossal figure in the cultural and religious history of Assam. He was destined to play a significant role in preaching to humanity and protecting human religion. ‘Ek Sarania Nam Dharma’ preached by him believed in worship of Lord Vishnu. Mahapurush Srimanta Sankardev was a great scholar and literacy genius."
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
                      "His major literacy creations are the ‘Kirtan Ghosa’, ‘Gunamala’ etc. The holy songs written by him are known as ‘Borgeet’. The dramas written by him are known as ‘Ankia Naat’ and Sattriya Dance at that time was a part of it. In the ‘Ankiya Naats’ Srimanta Sankardev used the style of story telling through drama, mostly depicting the life of Lord Krishna and Lord Rama. The first dramatical work by him was ‘Chihnajatra’. The various ‘Ankia Naats’ written by him are ‘Kaliya Daman’, ‘Patni Prasad’, ‘Keli Gopal’, ‘Rukmini Haran’, ‘Parijat Haran’ and ‘Rambijay’ naat. When he started going to school at the age of twelve, he wrote a poem on the praise of Lord Vishnu -‘Karatala Kamala Kamala Dala Nayana’ without using any vowels as he had learnt only the consonants till that time."
                    }
                  </Box>
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
                      "The ‘Sattras’ or the monasteries set by the Vaishnavite saint developed as the hub of religious, spiritual and cultural life of the people of Assam. Srimanta Sankardev used the charm of art and culture to spread his philosophy of monotheism i.e. Vaishnavism, so that it could be used as a medium of instructions. The chief disciple of Srimanta Sankardev was Sri Sri Madhavdev, who also worked for spreading Vaishnavism and contributed by his literacy works including ‘Nam Ghosa’, ‘Bhakti Rattna’ etc."
                    }
                  </Box>
                </Grid>
                {!mobileView && (
                  <Grid item xs={12} sm={5} sx={{ textAlign: "center" }}>
                    <Box
                      component="img"
                      src="/sankar-dev.png"
                      alt="Sankaradeva"
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
                      "The great saint died at the age of 120 years in 1568 in Koch Bihar."
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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/NavigationMobile.module.css";

import NavigationMenuMobileScreen from "./NavigationMenuMobileScreen";
import { homePageActions } from "../../store/slices/homePageSlice";

import CloseIcon from "@mui/icons-material/Close";
import NotesIcon from '@mui/icons-material/Notes';
import { Box } from "@mui/material";

export default function MainNavigationMobile() {
  const [openItem, setOpenItem] = useState("");
  const [openMenu, setOpenMenu] = useState(false)
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.user.userLoggedStatus);

  useEffect(() => {
    if (openItem !== "" || openMenu) {
      dispatch(homePageActions.updateSlideMenu(true));
    } else {
      dispatch(homePageActions.updateSlideMenu(false));
    }
  }, [openItem, openMenu]);

  useEffect(() => {
    if (loggedUser) {
      setOpenItem("");
    }
  }, [loggedUser]);

  const handleClick = (e) => {
    if (openItem === e.target.innerText) {
      setOpenItem("");
    } else {
      setOpenItem(e.target.innerText);
    }
  };

  return (
    <Box
      sx={{ backgroundColor: "transparent" }}
    >
      <nav className={styles.mainNavigation}>
        <div>
          <div
            className={`${styles.mainNavigationMobile} ${styles.gridContainer}`}
          >
            <div className={`${styles.mainNavigationMobileHeader}`}>
              <ul className={`${styles.mainNavigationMobileButtons}`}>
                <li>
                  <button
                    className={styles.btnIcon}
                    onClick={() => {
                      setOpenMenu(!openMenu);
                      setOpenItem("");
                    }}
                  >
                    {openMenu ? (
                      <CloseIcon fontSize="large" className={styles.iconMenu} />
                    ) : (
                      <NotesIcon fontSize="large" className={styles.iconMenu} />
                    )}
                  </button>
                </li>
              </ul>
              <div className={styles.mainNavigationMobileAside}>
                {!openMenu && (
                  <Box
                    component="a"
                    href="/"
                    className={styles.mainNavigationMobileLogo}
                  >
                    <img
                      src="/SSK_LOGO.jpg"
                      alt="LOGO"
                      style={{
                        height: "80px",
                        width: "80px",
                        aspectRatio: "80 /80",
                      }}
                    />
                  </Box>
                )}
              </div>
            </div>

            {openMenu && openItem === "" && (
              <div
                className={`${styles.mainNavigationMobileMenu} ${styles.gridContainer}`}
              >
                <div className={styles.mainNavigationMobileMenuHeader}>
                  <div className={styles.mainNavigationMobileMenuBack}></div>
                  <h3
                    className={`${styles.mainNavigationMobileMenuHeading} ${styles.heading2}`}
                  >
                    {"Menu"}
                  </h3>
                </div>
                <hr className={styles.animated} />
                <ul className={styles.mainNavigationMobileMenuItems}>
                  <li>
                    <Box
                      component="a"
                      href="/"
                      className={`${styles.mainNavigationMobileMenuItem} ${styles.btnLink}`}
                    >
                      <span onClick={handleClick}>{"Home"}</span>
                    </Box>
                  </li>
                  <li>
                    <Box
                      component="button"
                      className={`${styles.mainNavigationMobileMenuItem} ${styles.btnLink}`}
                    >
                      <span onClick={handleClick}>{"Visit & Tickets"}</span>
                    </Box>
                  </li>
                  <li>
                    <Box
                      component="button"
                      className={`${styles.mainNavigationMobileMenuItem} ${styles.btnLink}`}
                    >
                      <span onClick={handleClick}>{"Art & Culture"}</span>
                    </Box>
                  </li>
                  <li>
                    <Box
                      component="button"
                      className={`${styles.mainNavigationMobileMenuItem} ${styles.btnLink}`}
                    >
                      <span onClick={handleClick}>{"About"}</span>
                    </Box>
                  </li>

                  {!loggedUser && (
                    <li>
                      <Box
                        component="button"
                        className={`${styles.mainNavigationMobileMenuItem} ${styles.btnLink}`}
                      >
                        <span onClick={handleClick}>{"Login | Register"}</span>
                      </Box>
                    </li>
                  )}
                  {loggedUser && (
                    <li>
                      <Box
                        component="a"
                        href="/account"
                        className={`${styles.mainNavigationMobileMenuItem} ${styles.btnLink}`}
                      >
                        <span onClick={handleClick}>{"Account"}</span>
                      </Box>
                    </li>
                  )}
                </ul>
                <div className={styles.mainNavigationMobileFooter}>
                  <hr className={styles.animated} />
                  <ul className={styles.mainNavigationMobileFooterItems}></ul>
                </div>
              </div>
            )}

            {openItem === "Visit & Tickets" && openMenu && (
              <NavigationMenuMobileScreen
                openItem={"Visit & Tickets"}
                listItems={{
                  "Book your tickets": "ticket-book",
                  "Address and Opening Hours": "address",
                  "Open Air Venues": "open-air-venues",
                  "International Convention Centre": "international-convention-centre",
                  "Srimanta Sankaradeva Study Centre": "srimanta-sankaradeva-study-centre",
                }}
                setOpenItem={setOpenItem}
              />
            )}

            {openItem === "Art & Culture" && openMenu && (
              <NavigationMenuMobileScreen
                openItem={"Art & Culture"}
                listItems={{
                  "Art Gallery": "art-gallery",
                  "The Life of Srimanta Sankaradeva": "stories",
                  "Accommodation": "accommodation",
                  "Library": "library",
                }}
                setOpenItem={setOpenItem}
              />
            )}

            {openItem === "About" && openMenu && (
              <NavigationMenuMobileScreen
                openItem={"About"}
                listItems={{
                  "About SSK": "about-ssk",
                }}
                setOpenItem={setOpenItem}  
              />
            )}

            {openItem === "Login | Register" && openMenu && (
              <NavigationMenuMobileScreen openItem={"Login | Register"} setOpenItem={setOpenItem} />
            )}
          </div>
        </div>
      </nav>
    </Box>
  );
}

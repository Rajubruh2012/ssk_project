import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Navigation.module.css";

import NavigationMenu from "./NavigationMenu";
import { homePageActions } from "../../store/slices/homePageSlice";

import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";

export default function MainNavigationDesktop({ onHome }) {
  const [openItem, setOpenItem] = useState("");
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.user.userLoggedStatus);

  useEffect(() => {
    if (openItem !== "") {
      dispatch(homePageActions.updateSlideMenu(true));
    } else {
      dispatch(homePageActions.updateSlideMenu(false));
    }
  }, [openItem]);

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
      sx={onHome ? {
        position: "fixed",
        top: "0",
        zIndex: "10",
      } : { position: "relative", backgroundColor: "transparent", }}
    >
      <nav className={styles.mainNavigation}>
        <div>
          <div
            className={`${styles.mainNavigationDesktop} ${styles.gridContainer}`}
          >
            <ul className={styles.mainNavigationDesktopItems}>
              <li>
                <Box
                  component="a"
                  href="/"
                  className={`${styles.btnLink} ${styles.mainNavigationDesktopItem}`}
                >
                  <span onClick={handleClick}>{"Home"}</span>
                </Box>
              </li>

              <li>
                <button
                  className={`${styles.btnLink} ${
                    styles.mainNavigationDesktopItem
                  } ${openItem === "Visit & Tickets" ? styles.open : ""}`}
                >
                  <span onClick={handleClick}>{"Visit & Tickets"}</span>
                </button>
              </li>

              <li>
                <button
                  className={`${styles.btnLink} ${
                    styles.mainNavigationDesktopItem
                  } ${openItem === "Art & Culture" ? styles.open : ""}`}
                >
                  <span onClick={handleClick}>{"Art & Culture"}</span>
                </button>
              </li>

              <li>
                <button
                  className={`${styles.btnLink} ${
                    styles.mainNavigationDesktopItem
                  } ${openItem === "About" ? styles.open : ""}`}
                >
                  <span onClick={handleClick}>{"About"}</span>
                </button>
              </li>

              {!loggedUser && (
                <li>
                  <button
                    className={`${styles.btnLink} ${
                      styles.mainNavigationDesktopItem
                    } ${openItem === "Login | Register" ? styles.open : ""}`}
                  >
                    <span onClick={handleClick}>{"Login | Register"}</span>
                  </button>
                </li>
              )}

              {loggedUser && (
                <li>
                  <Box
                    component="a"
                    href="/account"
                    className={`${styles.btnLink} ${styles.mainNavigationDesktopItem}`}
                  >
                    <span onClick={handleClick}>Account</span>
                  </Box>
                </li>
              )}
            </ul>

            <div>
              {openItem === "" && (
                <Box
                  component="a"
                  href="/"
                  className={styles.mainNavigationDesktopLogo}
                >
                  <img src="/SSK_LOGO.jpg" alt="LOGO" />
                </Box>
              )}

              {openItem !== "" && (
                <button
                  className={styles.btnLink}
                  onClick={() => setOpenItem("")}
                >
                  <CloseIcon fontSize="large" />
                </button>
              )}
            </div>

            {openItem === "Visit & Tickets" && (
              <NavigationMenu
                openItem={"Visit & Tickets"}
                listItems={{
                  "Book your tickets": "ticket-book",
                  "Address and Opening Hours": "address",
                  "Open Air Venues": "open-air-venues",
                  "International Convention Centre": "international-convention-centre",
                  "Srimanta Sankaradeva Study Centre": "srimanta-sankaradeva-study-centre",
                }}
              />
            )}

            {openItem === "Art & Culture" && (
              <NavigationMenu
                openItem={"Art & Culture"}
                listItems={{
                  "Art Gallery": "art-gallery",
                  "The Life of Srimanta Sankaradev": "stories",
                  "Accommodation": "accommodation",
                  "Library": "library",
                }}
              />
            )}

            {openItem === "About" && (
              <NavigationMenu
                openItem={"About"}
                listItems={{
                  "About SSK": "about-ssk",
                }}
              />
            )}

            {openItem === "Login | Register" && (
              <NavigationMenu openItem={"Login | Register"} />
            )}
          </div>
        </div>
      </nav>
    </Box>
  );
}

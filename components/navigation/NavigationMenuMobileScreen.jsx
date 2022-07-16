import { useState } from "react";
import styles from "../../styles/NavigationMobile.module.css";

import RegisterForm from "../form/RegisterForm";
import LoginForm from "../form/LoginForm";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box } from "@mui/material";

export default function NavigationMenuMobileScreen(props) {
  const { openItem, listItems, setOpenItem } = props;
  const [selectedNavMenuItem, setSelectedNavMenuItem] = useState("");

  const handleClick = (e) => {
    setSelectedNavMenuItem(e.target.innerText);
  };

  const validateRegex = (value, regex) => {
    const re = new RegExp(regex);
    return re.test(value);
  };

  return (
    <div
      className={`${styles.mainNavigationMobileScreen} ${styles.gridContainer}`}
    >
      <div className={styles.mainNavigationMobileScreenHeader}>
        <div className={styles.mainNavigationMobileMenuBack}>
          <Box
            component="button"
            className={styles.btnIcon}
            onClick={() => {
                if(selectedNavMenuItem) {
                    setOpenItem("Login | Register")
                    setSelectedNavMenuItem("")
                } else {
                    setOpenItem("")
                }
            }}
          >
            <ArrowBackIcon fontSize="large" className={styles.iconMenu} />
          </Box>
        </div>
        <h3
          className={`${styles.mainNavigationMobileScreenHeading} ${styles.heading2}`}
        >
          {selectedNavMenuItem ? selectedNavMenuItem : openItem}
        </h3>
      </div>
      <aside className={styles.mainNavigationMobileScreenSidebar}></aside>
      <hr className={styles.animated} />
      {listItems && (
        <ul className={styles.mainNavigationMobileScreenItems}>
          {Object.entries(listItems).map(([keyName, value]) => (
            <li key={`${keyName}_${value}`}>
              <Box
                component="a"
                href={`/${value}`}
                className={`${styles.mainNavigationMobileScreenItem} ${styles.btnLink}`}
              >
                <span>{keyName}</span>
              </Box>
            </li>
          ))}
        </ul>
      )}
      {openItem === "Login | Register" && selectedNavMenuItem === "" && (
        <ul className={styles.mainNavigationMobileScreenItems}>
          <li>
            <Box
              component="button"
              className={`${styles.mainNavigationMobileScreenItem} ${styles.btnLink}`}
              onClick={handleClick}
            >
              <span>{"Login"}</span>
            </Box>
          </li>
          <li>
            <Box
              component="button"
              className={`${styles.mainNavigationMobileScreenItem} ${styles.btnLink}`}
              onClick={handleClick}
            >
              <span>{"Register"}</span>
            </Box>
          </li>
        </ul>
      )}

      {openItem === "Login | Register" && selectedNavMenuItem === "Login" && (
        <ul className={styles.mainNavigationMobileScreenItems}>
          <LoginForm validateRegex={validateRegex} />
        </ul>
      )}

      {openItem === "Login | Register" && selectedNavMenuItem === "Register" && (
        <ul className={styles.mainNavigationMobileScreenItems}>
          <RegisterForm validateRegex={validateRegex} />
        </ul>
      )}
      
      <div className={styles.mainNavigationMobileMenuFooter}>
        <hr className={styles.animated} />
        <ul className={styles.mainNavigationMobileMenuFooterItems}></ul>
      </div>
    </div>
  );
}

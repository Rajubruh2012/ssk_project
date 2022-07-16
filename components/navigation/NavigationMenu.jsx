import { useState } from "react";
import styles from "../../styles/NavigationMenu.module.css";

import RegisterForm from "../form/RegisterForm";
import LoginForm from "../form/LoginForm";
import { Box } from "@mui/material";

export default function NavigationMenu(props) {
  const { openItem, listItems } = props;
  const [selectedNavMenuItem, setSelectedNavMenuItem] = useState("Login");

  const handleClick = (e) => {
    setSelectedNavMenuItem(e.target.innerText);
  };

  const validateRegex = (value, regex) => {
    const re = new RegExp(regex);
    return re.test(value);
  };

  return (
    <div
      className={`${styles.mainNavigationDesktopScreen} ${styles.gridContainer}`}
    >
      <h3
        className={`${styles.mainNavigationDesktopScreenHeading} ${styles.heading2}`}
      >
        {openItem}
      </h3>
      <hr className={styles.animated} />
      <div
        className={`${styles.mainNavigationDesktopScreenWrapper} ${styles.gridRow}`}
      >
        <aside className={styles.mainNavigationDesktopScreenSidebar}>
          {openItem === "Login | Register" && (
            <ul className={styles.loginRegister}>
              <li>
                <Box
                  component="a"
                  className={`${styles.mainNavigationDesktopScreenItem} ${
                    styles.btnLink
                  } ${selectedNavMenuItem === "Login" && styles.selected}`}
                >
                  <span onClick={handleClick}>Login</span>
                </Box>
              </li>

              <li>
                <Box
                  component="a"
                  className={`${styles.mainNavigationDesktopScreenItem} ${
                    styles.btnLink
                  } ${selectedNavMenuItem === "Register" && styles.selected}`}
                >
                  <span onClick={handleClick}>Register</span>
                </Box>
              </li>
            </ul>
          )}
        </aside>
        <section className={`${styles.mainNavigationDesktopScreenContent}`}>
          {listItems && (
            <ul className={styles.mainNavigationDesktopScreenItems}>
              {Object.entries(listItems).map(([keyName, value]) => (
                <li key={`${keyName}_${value}`}>
                  <Box
                    component="a"
                    href={`/${value}`}
                    className={`${styles.mainNavigationDesktopScreenItem} ${styles.btnLink}`}
                  >
                    <span>{keyName}</span>
                  </Box>
                </li>
              ))}
            </ul>
          )}

          {openItem === "Login | Register" && selectedNavMenuItem === "Login" && (
            <ul className={styles.mainNavigationDesktopScreenItems}>
              <LoginForm validateRegex={validateRegex} />
            </ul>
          )}

          {openItem === "Login | Register" &&
            selectedNavMenuItem === "Register" && (
              <ul className={styles.mainNavigationDesktopScreenItems}>
                <RegisterForm validateRegex={validateRegex} />
              </ul>
            )}

          <div>
            <hr className={styles.animated} />
            <ul className={styles.mainNavigationDesktopFooterItems}>
              {/* <li>
                <Box
                  component="a"
                  className={`${styles.mainNavigationDesktopFooterItem} ${styles.btnLink}`}
                >
                  <span>{"Contact"}</span>
                </Box>
              </li> */}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

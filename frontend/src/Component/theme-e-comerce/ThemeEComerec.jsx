import React from "react";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTheme } from "../../Context/Theme";
import { Button } from "@mui/material";

const ThemeEComerec = () => {
  const [theme, setTheme] = useTheme();
  return (
    <>
      {theme ? (
        <Button
          style={{
            fontSize: "18px",
            width: "24%",
            background: theme ? "white" : "black",
            color: theme ? "black" : "white",
          }}
          onClick={() => setTheme(false)}
          variant="outlined"
        >
          <LightModeIcon />
        </Button>
      ) : (
        <Button
          style={{
            fontSize: "18px",
            width: "24%",
            background: theme ? "white" : "black",
            color: theme ? "black" : "white",
          }}
          onClick={() => setTheme(true)}
        >
          <DarkModeIcon />
        </Button>
      )}
    </>
  );
};

export default ThemeEComerec;

import { Box, Switch, useTheme } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeMode } from "../../context/ThemeContext";

const ThemeToggle = () => {
  const { mode, toggleTheme } = useThemeMode();
const theme = useTheme();

  return (
    <Box display="flex" alignItems="center" sx={{ mx: 1 }}>
      <LightModeIcon/>
      <Switch
        checked={mode === "dark"}
        onChange={toggleTheme}
        color="primary"
        inputProps={{ "aria-label": "theme toggle" }}
      />
      <DarkModeIcon />
    </Box>
  );
};

export default ThemeToggle;

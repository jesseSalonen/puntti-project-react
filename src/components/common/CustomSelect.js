import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export const CustomSelect = styled(InputBase)(({ theme, darkMode = true }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 13,
    position: "relative",
    background: darkMode 
      ? "linear-gradient(to right, #49555C, #3F484F)" 
      : "linear-gradient(to right, #f9fafb, #f3f4f6)",
    fontSize: 16,
    color: darkMode ? "rgb(209, 213, 219)" : "rgb(55, 65, 81)",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    border: darkMode ? "1px solid rgba(74, 222, 128, 0.2)" : "1px solid rgba(5, 150, 105, 0.3)",
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 13,
      boxShadow: darkMode 
        ? "0 0 0 0.2rem rgba(25,250,143,.25)" 
        : "0 0 0 0.2rem rgba(5,150,105,.25)",
    },
  },
  "& .MuiSelect-icon": {
    color: darkMode ? "rgb(209, 213, 219)" : "rgb(55, 65, 81)",
  },
}));

// Add styled MenuItem for dropdown items
export const StyledMenuItem = styled('div')(({ theme, darkMode = true }) => ({
  padding: '8px 16px',
  fontSize: 16,
  cursor: 'pointer',
  backgroundColor: darkMode ? 'rgb(31, 41, 55)' : 'rgb(255, 255, 255)',
  color: darkMode ? 'rgb(209, 213, 219)' : 'rgb(55, 65, 81)',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: darkMode ? 'rgb(55, 65, 81)' : 'rgb(243, 244, 246)',
    color: darkMode ? 'rgb(74, 222, 128)' : 'rgb(5, 150, 105)',
  },
  '&.Mui-selected': {
    backgroundColor: darkMode ? 'rgb(55, 65, 81)' : 'rgb(243, 244, 246)',
    color: darkMode ? 'rgb(74, 222, 128)' : 'rgb(5, 150, 105)',
    '&:hover': {
      backgroundColor: darkMode ? 'rgb(75, 85, 99)' : 'rgb(229, 231, 235)',
    },
  },
}));

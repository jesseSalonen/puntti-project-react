import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";

export const CustomSelect = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    borderRadius: 13,
    position: "relative",
    background: "linear-gradient(to right, #49555C, #3F484F)",
    fontSize: 16,
    color: "rgb(209, 213, 219)",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
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
      boxShadow: "0 0 0 0.2rem rgba(25,250,143,.25)",
    },
  },
  "& .MuiSelect-icon": {
    color: "rgb(209, 213, 219)",
  },
}));

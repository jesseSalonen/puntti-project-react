import { FormControl, InputBase, MenuItem, Select } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
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
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));

function CustomSelect() {
  const { i18n } = useTranslation("common");

  return (
    <FormControl fullWidth>
      <Select
        value={i18n.language === "fi" ? "fi" : "en"}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
        input={<BootstrapInput />}
      >
        <MenuItem value="fi">Finnish</MenuItem>
        <MenuItem value="en">English</MenuItem>
      </Select>
    </FormControl>
  );
}

export default CustomSelect;

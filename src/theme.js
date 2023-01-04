import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      light: "#ff76961",
      main: "#f44336",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
  components: {
    // MuiButton: {
    //   styleOverrides: {
    //     root: { borderRadius: 50, textTransform: "none" },
    //     containedPrimary: {
    //       backgroundColor: "#f44336",
    //       boxShadow: "1px 1px grey",
    //       color: "#ff76961",
    //       "&:hover": {
    //         backgroundColor: "#002884",
    //         color: "#ff76961",
    //       },
    //       "&:active": {
    //         backgroundColor: "#002884",
    //         color: "#ff76961",
    //       },
    //     },
    //   },
    // },
  },
});

export default theme;

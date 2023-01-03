import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    //   primary: {
    //     light: "#ff76961",
    //     main: "#f44336",
    //     dark: "#002884",
    //     contrastText: "#fff",
    //   },
    //   secondary: {
    //     light: "#757ce8",
    //     main: "#3f50b5",
    //     dark: "#ba000d",
    //     contrastText: "#000",
    //   },
    /////////
    //   mode: "light",
    //   primary: {
    //     main: orange[500],
    //   },
    //   secondary: {
    //     light: red[500],
    //     main: red[700],
    //     dark: red[900],
    //     contrastText: grey[50],
    //   },
    /////////
    //   error: {
    //     light: red[400],
    //     main: red[500],
    //     dark: red[300],
    //     contrastText: grey[800],
    //   },
    //   success: {
    //     main: green[500],
    //   },
    //   warning: {
    //     main: yellow[500],
    //     contrastText: grey[800],
    //   },
    //   info: {
    //     main: lightBlue[500],
    //   },
    //   text: {
    //     primary: grey[900],
    //     secondary: grey[700],
    //     disabled: grey[500],
    //   },
    //   action: {
    //     active: red[200],
    //     activeOpacity: 1,
    //     disabled: grey[700],
    //     disabledBackground: grey[200],
    //     hover: red[100],
    //     hoverOpacity: 0.7,
    //     focus: red[600],
    //     focusOpacity: 1,
    //     selected: red[300],
    //     selectedOpacity: 1,
    //   },
    //   background: {
    //     default: orange[300],
    //     paper: grey[200],
    //   },
    //   common: {
    //     black: grey[900],
    //     white: grey[200],
    //   },
    //   tonalOffset: 0.2,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: "16px", textTransform: "none" },
        containedPrimary: {
          backgroundColor: "#f44336",
          boxShadow: "1px 1px grey",
          color: "#ff76961",
          "&:hover": {
            backgroundColor: "#002884",
            color: "#ff76961",
          },
          "&:active": {
            backgroundColor: "#002884",
            color: "#ff76961",
          },
        },
      },
    },
  },
});

// export default theme;
// palette: {
//     primary: {
//       light: "#ff76961",
//       main: "#f44336",
//       dark: "#002884",
//       contrastText: "#fff",
//     },
//     secondary: {
//       light: "#757ce8",
//       main: "#3f50b5",
//       dark: "#ba000d",
//       contrastText: "#000",
//     },
//   },

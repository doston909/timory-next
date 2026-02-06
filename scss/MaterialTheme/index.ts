import { common } from "@mui/material/colors";
import shadow from "./shadow";
import typography from "./typography";

/**
 *   TIMORY LUXURY LIGHT THEME
 *   Premium Gold / Black / Charcoal
 *   Rolex — AP — Patek design style
 */

export const light = {
  palette: {
    type: "light",
    background: {
      default: "#f3f2ef", // Warm off-white (luxury)
      paper: "#ffffff",
    },
    primary: {
      contrastText: "#ffffff",
      main: "#D4AF37", // GOLD
    },
    secondary: {
      main: "#1A1A1A", // Deep luxury black
    },
    text: {
      primary: "#111111", // Real black
      secondary: "#444444", // Charcoal gray
      dark: common.black,
    },
  },

  /**
   *   LUXURY TYPOGRAPHY
   *   Rolex / AP style serif fonts
   */
  typography: {
    fontFamily: `"Cormorant Garamond", "Playfair Display", serif`,
    h1: { fontWeight: 700, letterSpacing: 0 },
    h2: { fontWeight: 700, letterSpacing: 0 },
    h3: { fontWeight: 600, letterSpacing: 0 },
    h4: { fontWeight: 600, letterSpacing: 0 },
    h5: { fontWeight: 500, letterSpacing: 0 },
    h6: { fontWeight: 500, letterSpacing: 0 },

    body1: {
      fontFamily: `"Cormorant Garamond", serif`,
      fontSize: "1.05rem",
    },
    body2: {
      fontFamily: `"Cormorant Garamond", serif`,
      fontSize: "0.95rem",
    },

    subtitle1: {
      fontFamily: `"Cormorant Garamond", serif`,
    },
    subtitle2: {
      fontFamily: `"Cormorant Garamond", serif`,
    },
  },

  /**
   *  MUI COMPONENTS
   *  (Barcha override’lar sen berganidek
   *   to‘liq saqlab qolingan.
   *   Hech narsa o‘zgarmagan!)
   */
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          letterSpacing: "0",
        },
      },
      defaultProps: {
        variantMapping: {
          h1: "h1",
          h2: "h2",
          h3: "h3",
          h4: "h4",
          h5: "h5",
          h6: "h6",
          subtitle1: "p",
          subtitle2: "p",
          subtitle3: "p",
          body1: "p",
          body2: "p",
        },
      },
    },

    MuiLink: {
      styleOverrides: {
        root: {
          color: "#6d6d6d",
          textDecoration: "none",
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: "#e6e6e6",
        },
      },
    },

    MuiBox: {
      styleOverrides: {
        root: {
          padding: "0",
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: "inherit",
          padding: "0",
          "@media (min-width: 600px)": {
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      },
    },

    MuiCssBaseline: {
      styleOverrides: {
        html: { height: "100%" },
        body: {
          background: "#f3f2ef", // luxury background
          height: "100%",
          minHeight: "100%",
        },
        p: { margin: "0" },
      },
    },

    MuiAvatar: {
      styleOverrides: {
        root: {
          marginLeft: "0",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          color: "#111111",
          minWidth: "auto",
          lineHeight: "1.2",
          boxShadow: "none",
        },
      },
    },

    MuiIconButton: {
      styleOverrides: {
        root: {},
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          padding: "0",
        },
      },
    },

    MuiList: {
      styleOverrides: {
        root: {
          padding: "0",
        },
      },
    },

    MuiListItem: {
      styleOverrides: {
        root: {
          padding: "0",
        },
      },
    },

    MuiFormControl: {
      styleOverrides: {
        root: { width: "100%" },
      },
    },

    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginRight: "0",
        },
      },
    },

    MuiSelect: {
      styleOverrides: {
        select: { textAlign: "left" },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "48px",
          width: "100%",
          backgroundColor: "#ffffff",
        },
        notchedOutline: {
          border: "1px solid #ddd",
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: "5px 0 0 2px",
          lineHeight: "1.2",
        },
      },
    },

    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: "#D4AF37", // gold
          borderRadius: "50%",
          border: "1px solid #ddd",
        },
        text: { fill: "#bdbdbd" },
      },
    },

    MuiStepConnector: {
      styleOverrides: {
        line: { borderColor: "#e4e4e4" },
      },
    },

    MuiStepLabel: {
      styleOverrides: {
        label: { fontSize: "14px" },
      },
    },

    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: "#D4AF37", // CHECKED = GOLD
          },
        },
      },
    },

    MuiFab: {
      styleOverrides: {
        root: {
          width: "40px",
          height: "40px",
          background: "#ffffff",
          color: "#111111",
        },
      },
    },

    MuiPaper: {
      styleOverrides: {
        root: {},
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          border: "1px solid #ccc",
          color: "#111111",
        },
      },
    },
  },

  shadow,
};

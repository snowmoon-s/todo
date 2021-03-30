// import { createMuiTheme } from '@material-ui/core'

// export const primary = {
//   50: '#f9fbe7',
//   100: '#f0f4c3',
//   200: '#e6ee9c',
//   300: '#dce775',
//   400: '#d4e157',
//   500: '#cddc39',
//   600: '#c0ca33',
//   700: '#afb42b',
//   800: '#9e9d24',
//   900: '#827717',
//   A100: '#f4ff81',
//   A200: '#eeff41',
//   A400: '#c6ff00',
//   A700: '#aeea00',
//   contrastDefaultColor: 'dark',
// }

// export const Theme = createMuiTheme({
//   palette: {
//     type: 'light',
//     primary: primary,
//   },
// })

import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#ffddc1',
      main: '#ffab91',
      dark: '#c97b63',
      contrastText: '#333',
    },
    secondary: {
      light: '#be9c91',
      main: '#8d6e63',
      dark: '#5f4339',
      contrastText: '#fff',
    },
  },
})

export const Theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: theme.palette.primary,
    secondary: theme.palette.secondary,
  },
})

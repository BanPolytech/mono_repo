import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    text: '#212121',
    white: '#fff',
    bg1: '#F5F5F6',
    bg2: '#E1E2E1',
    palette: {
        primary: {
            light: '#ffebee',
            main: '#e30513',
            dark: '#bf0712',
            contrastText: '#fff'
        }
    },
    typography: {
        fontFamily: ['"Poppins"', 'Roboto'].join(','),
        fontSize: 16,
        h1: {
            fontSize: '3rem',
            fontWeight: 300
        },
        h2: {
            fontSize: '2.2rem',
            fontWeight: 300
        },
        h3: {
            fontSize: '2rem',
            fontWeight: 300,
            marginBottom: '1rem'
        }
    },
    overrides: {
        MuiMenuItem: {
            root: {
                marginBottom: '0'
            }
        },
        MuiInputBase: {
            root: {
                marginBottom: '0'
            }
        },
        MuiFormControl: {
            marginNormal: {
                marginTop: "0px",
                marginBottom: "0px"
            }
        }
    }
});

export default theme;

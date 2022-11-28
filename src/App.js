import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import {createTheme, ThemeProvider} from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles';
import HomePage from "./pages/HomePage";

const theme = createTheme({
    typography: {
        fontSize: 12,
        fontFamily: "Lato, sans-serif",
        h1: {
            fontWeight: 800,
            textTransform: "uppercase"
        },
        h2: {
            fontWeight: 700,
        },
        h3: {
            fontWeight: 600,
        },
        h4: {
            fontWeight: 600,
        },
        h5: {
            fontWeight: 600,
        }
    },
    palette: {
        primary: {
            main: "#6CACE4",
            light: "#DDEAF1",
            dark: "#0072CE"
        },
        background: {
            default: "#F5F5F5",
            paper: "white",
        }
    },
    shape: {
        borderRadius: 30,
    }
});

function App() {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <Router>
                    <Routes>
                        <Route path="/" element={<LandingPage />}/>
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/users" element={<h1>Users</h1>}/>
                    </Routes>
                </Router>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;

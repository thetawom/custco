import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles';
import HomePage from "./pages/HomePage";
import JoinOrdersPage from "./pages/JoinOrdersPage";
import {OrdersProvider} from "./contexts/ordersContext";
import JoinOrderPage from "./pages/JoinOrderPage";

const theme = createTheme({
    typography: {
        fontSize: 13,
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
            fontWeight: 800,
        },
        h5: {
            fontWeight: 800,
        },
        h6: {
            fontWeight: 600,
        },
    },
    palette: {
        primary: {
            main: "#6CACE4",
            light: "#DDEAF1",
            dark: "#0072CE",
            contrastText: "white",
        },
        secondary: {
            main: "#FFBB45",
        },
        background: {
            default: "#F5F5F5",
            gray: "#F5F5F5",
            white: "white",
        },
        success: {
            main: "#3FB63D",
            contrastText: "white",
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    fontSize: "1em",
                    borderRadius: 2
                },
                tooltipPlacementBottom: {
                    top: "-5px"
                }
            }
        },
    }
});

function App() {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <OrdersProvider>
                    <Router basename={process.env.PUBLIC_URL}>
                        <Routes>
                            <Route path="/" element={<LandingPage />}/>
                            <Route path="/home" element={<HomePage />} />
                            <Route path="/orders/" element={<JoinOrdersPage />}/>
                            <Route path="/orders/platform/:id" element={<JoinOrdersPage />}/>
                            <Route path="/orders/:id" element={<JoinOrderPage />}/>
                        </Routes>
                    </Router>
                </OrdersProvider>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;

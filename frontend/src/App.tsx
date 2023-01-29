import MyRoutes from "./routes";
import ThemeProvider from "./context/themeContext";

const App = () => {
    return (
        <ThemeProvider>
            <MyRoutes />
        </ThemeProvider>
    );
};

export default App;

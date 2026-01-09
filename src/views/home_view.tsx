import { Box } from "@mui/material";
import { NavBar } from "../components/NavBar";

const HomeView = () => {
    return (
        <Box
            sx={{
                position: "relative",
                overflow: "hidden",
                width: "100vw",
                height: "100vh",
            }}
        >
            <NavBar/>
        </Box>
    );
}

export default HomeView;
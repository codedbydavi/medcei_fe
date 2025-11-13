import { Box, Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useState } from "react";
import backgroundImage from "../assets/pandemic_cover.jpg";
import TextType from "../components/TextType/TextType";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import RegisterView from "./register_view";
import { Lock, Person } from "@mui/icons-material";
import { useMobile } from "../hooks/mobile_hook";
import { PATHS } from "../routes/paths";

const LoginView = () => {
    const isMobile = useMobile();
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);

    const handleLogin = async () => {
        // Call api
        const isValid = validate();
        if (!isValid) return;
        console.log("Login:", username, password);
        navigate(PATHS.HOME_PAGE);
    };

    const handleRegister = () => {
        setOpen(true);
    };

    const handleCloseRegister = () => {
        setOpen(false);
    };

    const validate = () => {
        if (!username || !password) {
            toast.warn("All fields are required", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
            return false;
        }
        return true;
    }

    return (
        <>
            <Box
                sx={{
                    position: "relative",
                    overflow: "hidden",
                    width: "100vw",
                    height: "100vh",
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-100%, -50%)",
                    width: "45vw",
                    height: "30vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}
                >
                    {!isMobile && (
                        <TextType
                            text={["“It is not the strongest of the species that survives, nor the most intelligent, but the one that is most responsive to change.” \n— Charles Darwin"]}
                            typingSpeed={75}
                            pauseDuration={1500}
                            showCursor={true}
                            cursorCharacter="|"
                            style={{ color: "white", fontFamily: "monospace", fontWeight: "bolder", fontSize: "42px" }}
                        />
                    )}
                </Box>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: { xs: "50%", sm: "40%", md: "50%" },
                        transform: !isMobile ? "translate(30%, -50%)" : "translate(-50%, -50%)",
                        width: { xs: "80%", sm: "40%", md: "30%" },
                        height: "auto",
                        borderRadius: 3,
                        boxShadow: 4,
                        padding: "24px",
                        bgcolor: "rgba(255, 255, 255, 0.85)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Typography fontSize={30} sx={{ mb: 2, fontFamily: "cursive" }}>Welcome Back!</Typography>
                    <TextField
                        label="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        fullWidth
                        sx={{ mb: 2 }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Person />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        fullWidth
                        sx={{ mb: 2 }}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Lock />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <Button
                        onClick={handleLogin}
                        fullWidth
                        sx={{
                            backgroundColor: "darkblue",
                            color: "white",
                            "&:hover": { backgroundColor: "blue" },
                        }}
                    >
                        Log In
                    </Button>
                    <Button sx={{ mb: 2, mt: 2 }} onClick={handleRegister}>Register</Button>

                </Box>
                <ToastContainer
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={true}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    transition={Bounce}
                    style={{zIndex: 9999}}
                />
            </Box>
            <RegisterView open={open} onClose={handleCloseRegister} />
        </>
    );
};

export default LoginView;

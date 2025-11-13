import { useEffect, useState } from "react";
import { Backdrop, Box, Button, Modal, Slide, TextField, Typography, InputAdornment } from "@mui/material";
import { Lock, Mail, Person } from "@mui/icons-material";
import { Bounce, toast } from "react-toastify";

interface RegisterViewProps {
    open: boolean;
    onClose: () => void;
}

const RegisterView = (props: RegisterViewProps) => {
    const { open, onClose } = props;
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (open) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    }, [open]);

    const handleSubmit = async () => {
        const isValid = validate();
        if (!isValid) return;
        console.log("submitted");
        handleClose();
    }

    const handleClose = () => {
        setVisible(false);
        setTimeout(() => {
            onClose();
        }, 300)
    }

    const validate = () => {
        if (!username || !email || !password) {
            toast.warn("All fields must be filled", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            }
            );
            return false;
        }
        return true;
    }

    return (
        <Modal
            open={open || visible}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 300,
                }
            }}
        >
            <Box sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

            }}>
                <Slide
                    in={visible}
                    timeout={300}
                    direction="up"
                >
                    <Box
                        sx={{
                            position: "absolute",
                            transform: "translate(-50%, -50%)",
                            width: { xs: "90%", sm: 400, md: 500 },
                            bgcolor: "background.paper",
                            boxShadow: 24,
                            borderRadius: 2,
                            p: 4,
                            maxHeight: "90vh",
                            overflowY: "auto",
                        }}
                    >
                        <Typography variant="h6" mb={2} fontFamily="cursive">
                            Register
                        </Typography>
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
                            label="Email"
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            fullWidth
                            sx={{ mb: 2 }}
                            placeholder="exemple@gmail.com"
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Mail />
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
                            onClick={handleSubmit}
                            fullWidth
                            sx={{
                                backgroundColor: "darkblue",
                                color: "white",
                                "&:hover": { backgroundColor: "blue" },
                            }}
                        >
                            Register
                        </Button>
                    </Box>
                </Slide>
            </Box>
        </Modal>
    );


}

export default RegisterView;
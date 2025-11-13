import { useMediaQuery } from "@mui/material";

export const useMobile = () => {
    const isMobile = useMediaQuery("(max-width:600px)");
    return isMobile;
}
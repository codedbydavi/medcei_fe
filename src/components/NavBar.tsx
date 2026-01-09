import { AppBar, Avatar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import React from "react";
import MedceiLogo from "../assets/medcei_logo_simples_verde.png";

const settings = ['Perfil', 'Logout'];

export const NavBar = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none', borderBottom: '1px solid #f0f0f0' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    
                    {/* LOGO - Lado Esquerdo */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img 
                            src={MedceiLogo} 
                            alt="Medcei Logo" 
                            style={{ width: '35px', height: 'auto' }} 
                        />
                    </Box>

                    {/* MENU DE USUÁRIO - Lado Direito */}
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Abrir configurações">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                {/* O Avatar "U" cinza da sua imagem de referência */}
                                <Avatar sx={{ bgcolor: '#ccc', width: 35, height: 35, fontSize: '1rem' }}>U</Avatar>
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography sx={{ textAlign: 'center', minWidth: '100px' }}>
                                        {setting}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    
                </Toolbar>
            </Container>
        </AppBar>
    );
}
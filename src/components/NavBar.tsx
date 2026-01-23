import React, { useState } from "react";
import {
  Avatar,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { Logout, Person } from "@mui/icons-material";
import { Home } from "lucide-react";
import MedceiLogo from "../assets/medcei_logo_simples_verde.png";
import { PATHS } from "../routes/Paths";
import { useAuth } from "../context/AuthContext";
import { useRoleFormatter } from "../utils/useRoleFormatter";

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useAuth();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const {formattedRole} = useRoleFormatter();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate(PATHS.LOGIN);
    handleCloseUserMenu();
  };

  const userInitial = user?.fullName?.charAt(0).toUpperCase() || "U";
  const isHome = location.pathname === PATHS.HOME_PAGE;

  return (
    <nav
      className="sticky top-0 z-[1100] w-full border-b border-white/30"
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters className="justify-between">
          {/* SEÇÃO ESQUERDA */}
          <div className="flex items-center gap-8">
            <div
              onClick={() => navigate(PATHS.HOME_PAGE)}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <img
                src={MedceiLogo}
                alt="Logo"
                className="w-8 h-auto transition-transform duration-300 group-hover:scale-110"
              />
              <Typography
                className="font-extrabold text-gray-800 tracking-tight hidden sm:block"
                sx={{ fontSize: "1.15rem", fontWeight: 800 }}
              >
                Medcei <span className="text-emerald-500">Sim</span>
              </Typography>
            </div>

            <div
              onClick={() => navigate(PATHS.HOME_PAGE)}
              className={`flex items-center gap-2 cursor-pointer transition-all duration-300 relative py-2 group
                                ${
                                  isHome
                                    ? "text-emerald-600"
                                    : "text-gray-600 hover:text-emerald-500"
                                }`}
            >
              <Home size={18} strokeWidth={2.5} />
              <span className="text-sm font-bold">Início</span>
              <div
                className={`absolute bottom-0 left-0 h-[2.5px] bg-emerald-500 transition-all duration-300 
                                ${
                                  isHome ? "w-full" : "w-0 group-hover:w-full"
                                }`}
              />
            </div>
          </div>

          {/* SEÇÃO DIREITA */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col items-end leading-tight">
              <span className="text-sm font-bold text-gray-700">
                {user?.fullName || "Usuário"}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                {formattedRole() || "Membro"}
              </span>
            </div>

            <Tooltip title="Minha Conta">
              <IconButton
                onClick={handleOpenUserMenu}
                // ANEL VERDE (RING)
                className="ring-2 ring-emerald-500 ring-offset-2 ring-offset-white/10 p-0 transition-all hover:scale-105"
                sx={{ padding: 0 }}
              >
                <Avatar
                  sx={{
                    bgcolor: "#10b981",
                    width: 32,
                    height: 32,
                    fontSize: "0.85rem",
                    fontWeight: "800",
                  }}
                >
                  {userInitial}
                </Avatar>
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              slotProps={{
                paper: {
                  elevation: 0,
                  sx: {
                    mt: 1.5,
                    borderRadius: "16px",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    minWidth: 180,
                  },
                },
              }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <MenuItem
                onClick={() => {
                  navigate(PATHS.PROFILE_PAGE);
                  handleCloseUserMenu();
                }}
                className="gap-3 py-3 text-sm font-semibold text-gray-700"
              >
                <ListItemIcon>
                  <Person fontSize="small" />
                </ListItemIcon>
                Meu Perfil
              </MenuItem>
              <Divider sx={{ opacity: 0.5 }} />
              <MenuItem
                onClick={handleLogout}
                className="gap-3 py-3 text-sm font-semibold text-red-500"
              >
                <ListItemIcon>
                  <Logout fontSize="small" sx={{ color: "#ef4444" }} />
                </ListItemIcon>
                Sair da conta
              </MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </Container>
    </nav>
  );
};

import {
    AppBar,
    Container,
    IconButton,
    Toolbar,
    Typography,
    Menu,
    MenuItem,
    Box,
    Button,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useState } from "react"
import Image from "next/image"

export const Navbar = () => {
    const [anchorElNav, setAnchorElNav] = useState(null)

    const pages = [
        {
            text: "Telegram",
            link: "https://t.me/caishenkinfinance",
        },
        {
            text: "Twitter",
            link: "https://twitter.com/CaishkinFinance",
        },
    ]

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    return (
        <AppBar position="static" color="transparent">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <a href="https://caishenkin.finance">
                        <Image
                            src="/cknlogo.png"
                            alt="logo"
                            width="64"
                            height="64"
                            className="navbar--logo"
                        />
                    </a>
                    <Box display={"flex"} flexGrow={1} justifyContent="space-between">
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "flex", md: "none" },
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <a href={page["link"]}>
                                            <Typography
                                                textAlign="center"
                                                className="link--text--mobile"
                                            >
                                                {page["text"]}
                                            </Typography>
                                        </a>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: "none", md: "flex" },
                            }}
                        >
                            {pages.map((page) => (
                                <Button
                                    key={page["text"]}
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                    variant="text"
                                >
                                    <a
                                        href={page["link"]}
                                        className="link--text"
                                    >
                                        {page["text"]}
                                    </a>
                                </Button>
                            ))}
                        </Box>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

import { Box, Menu, MenuItem, Stack, IconButton, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Link from "next/link";
import {
  Logout,
  Close,
  Search,
  ShoppingBagOutlined,
  NotificationsNoneOutlined,
  DarkModeOutlined,
  Language,
  PersonOutline,
  
} from "@mui/icons-material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useCart } from "@/libs/context/CartContext";

const Top = () => {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isSliding, setIsSliding] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { cartItems, removeFromCart } = useCart();
  const routerBoxRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef<number>(0);
  const originalSizeRef = useRef<{ width: number; height: number } | null>(null);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleRemoveItem = (id: number) => {
    removeFromCart(id);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isSearchOpen) {
          setIsSearchOpen(false);
        }
        if (isCartOpen) {
          setIsCartOpen(false);
        }
      }
    };

    if (isSearchOpen || isCartOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen, isCartOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrolled = scrollY > 300;
      const wasScrolled = lastScrollY.current > 300;
      
      setIsScrolled(scrolled);
      
     
      if (scrolled) {
        setIsVisible(true);
     
        if (!wasScrolled) {
          setIsSliding(true);
          
         
          setTimeout(() => {
            setIsSliding(false);
          }, 400); 
        }
        
       
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
       
        scrollTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
        }, 6000); // 10 soniya = 10000ms
      } else {
       
        setIsVisible(true);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      }
      
      lastScrollY.current = scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Simple auth check based on jwtToken in localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("jwtToken");
      setIsUserLoggedIn(!!token);
    }
  }, []);

  // Original o'lchamlarni birinchi marta saqlash
  useEffect(() => {
    if (containerRef.current && !originalSizeRef.current) {
      const container = containerRef.current;
      originalSizeRef.current = {
        width: container.offsetWidth,
        height: container.offsetHeight,
      };
      
      // CSS variables ni o'rnatish
      container.style.setProperty('--original-width', `${originalSizeRef.current.width}px`);
      container.style.setProperty('--original-height', `${originalSizeRef.current.height}px`);
    }
  }, []);

  // Scroll bo'lganda original o'lchamlarni saqlab qolish
  useEffect(() => {
    if (containerRef.current && originalSizeRef.current) {
      const container = containerRef.current;
      
      if (isScrolled) {
        // Original o'lchamlarni ishlatish
        container.style.width = `${originalSizeRef.current.width}px`;
        container.style.height = `${originalSizeRef.current.height}px`;
      } else {
        // Scroll bo'lmaganda original o'lchamlarni tiklash
        container.style.width = '';
        container.style.height = '';
      }
    }
  }, [isScrolled]);

  return (
    <>
      <Stack className={"navbar"}>
        <Stack className={"head"}>
          <Box component={"div"} className="left">hello</Box>
          <Box component={"div"} className="main1">hello</Box>
          <Box component={"div"} className="right">hello</Box>
        </Stack>
        <Stack 
          className={`container ${isScrolled ? "scrolled" : ""} ${!isVisible ? "hidden" : ""} ${isSliding ? "sliding" : ""}`}
          ref={containerRef}
        >
          <Box component={"div"} className={"logo-box"}>
            <Link href={"/"}>
              <img src="/img/logo/logoo.png" alt="Timory Logo" />
            </Link>
          </Box>

          <Box
            component={"div"}
            className={"router-box"}
            ref={routerBoxRef}
          >
            <div className="nav-item-wrapper">
              <div
                className={`nav-item ${
                  router.pathname === "/" ? "active" : ""
                }`}
                onClick={() => router.push("/")}
              >
                <span>Home</span>
              </div>
            </div>

            {/* WATCHES */}
            <div className="nav-item-wrapper">
              <div
                className={`nav-item ${
                  router.pathname.startsWith("/watch") ? "active" : ""
                }`}
                onClick={() => router.push("/watch")}
              >
                <span>Watches</span>
              </div>
            </div>

            {/* COMMUNITY */}
            <div className="nav-item-wrapper">
              <div
                className={`nav-item ${
                  router.pathname.startsWith("/community") ? "active" : ""
                }`}
                onClick={() => router.push("/community")}
              >
                <span>Community</span>
              </div>
            </div>

            {/* ABOUT US */}
            <div
              className="nav-item-wrapper"
              onClick={() => router.push("/about")}
            >
              <div className={`nav-item ${
                router.pathname.startsWith("/about") ? "active" : ""
              }`}>
                <span>About Us</span>
              </div>
            </div>

            {/* CS */}
            <div
              className="nav-item-wrapper"
              onClick={() => router.push('/cs')}
            >
              <div
                className={`nav-item ${
                  router.pathname.startsWith("/cs") ? "active" : ""
                }`}
              >
                <span>Cs</span>
              </div>
            </div>
          </Box>

          <Box component={"div"} className={"user-box"}>
            <>
              <div className="login-user">
                {/* SEARCH */}
                <IconButton
                  aria-label="Search"
                  onClick={handleSearchToggle}
                  sx={{
                    color: "#000",
                    p: 0,
                    "&:hover": {
                      color: "#E5C8A3",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                    },
                  }}
                >
                  <Search fontSize="large" />
                </IconButton>

                {/* BAG */}
                <IconButton
                  aria-label="Bag"
                  onClick={handleCartToggle}
                  sx={{
                    color: "#000",
                    p: 0,
                    position: "relative",
                    "&:hover": {
                      color: "#E5C8A3",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                    },
                  }}
                >
                  <ShoppingBagOutlined fontSize='large'/>
                  {cartItems.length > 0 && (
                    <Box
                      component="span"
                      sx={{
                        position: "absolute",
                        top: -4,
                        right: -6,
                        bgcolor: "#e8994a",
                        color: "#fff",
                        fontSize: "10px",
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 600,
                      }}
                    >
                      {cartItems.length}
                    </Box>
                  )}
                </IconButton>

                {/* NOTIFICATION */}
                <IconButton
                  aria-label="Notifications"
                  sx={{
                    color: "#000",
                    p: 0,
                    "&:hover": {
                      color: "#E5C8A3",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                    },
                  }}
                >
                  <NotificationsNoneOutlined />
                </IconButton>

                {/* DARK MODE */}
                <IconButton
                  aria-label="Dark mode"
                  sx={{
                    color: "#000",
                    p: 0,
                    "&:hover": {
                      color: "#E5C8A3",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                    },
                  }}
                >
                  <DarkModeOutlined />
                </IconButton>

                {/* LANGUAGE */}
                <Box
                  className="lang-box"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                >
                  <Language
                    sx={{
                      color: "#000",
                      "&:hover": { color: "#E5C8A3", cursor: "pointer" },
                    }}
                  />
                  
                </Box>

                {/* USER */}
                <Box className="user-menu" sx={{ position: "relative" }}>
                  <IconButton
                    aria-label="User"
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    sx={{
                      color: "#000",
                      p: 0,
                      "&:hover": {
                        color: "#E5C8A3",
                        backgroundColor: "transparent",
                        cursor: "pointer",
                      },
                    }}
                  >
                    <PersonOutline />
                  </IconButton>

                  {isUserMenuOpen && (
                    <Box
                      className="user-menu-dropdown"
                      ref={userMenuRef}
                      onMouseLeave={() => setIsUserMenuOpen(false)}
                    >
                      {isUserLoggedIn ? (
                        <>
                          <Box
                            className="user-menu-item"
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              router.push("/mypage?category=myProfile");
                            }}
                          >
                            My Page
                          </Box>
                          <Box
                            className="user-menu-item"
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              // TODO: integrate real logout when auth is implemented
                              localStorage.removeItem("jwtToken");
                              setIsUserLoggedIn(false);
                            }}
                          >
                            Logout
                          </Box>
                        </>
                      ) : (
                        <>
                          <Box
                            className="user-menu-item"
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              router.push("/account");
                            }}
                          >
                            Login / Signup
                          </Box>
                          <Box
                            className="user-menu-item"
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              
                            }}
                          >
                            Contact Admin
                          </Box>
                        </>
                      )}
                    </Box>
                  )}
                </Box>
              </div>

            </>
          </Box>
        </Stack>
      </Stack>

      {isSearchOpen && (
        <div
          className="search-modal-overlay"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="search-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSearchSubmit} className="search-form">
              <div className="search-input-wrapper">
                <img
                  src="/img/logo/search.svg"
                  alt="search"
                  className="search-icon-large"
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for watches, brands, models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="search-clear-button"
                    onClick={() => setSearchQuery("")}
                    aria-label="Clear search"
                  >
                    <Close sx={{ fontSize: 20, color: "#999" }} />
                  </button>
                )}
              </div>

              <button type="submit" className="search-submit-button">
                Search
              </button>
            </form>

            {/* Recent searches or suggestions (optional) */}
            <div className="search-suggestions">
              <p className="search-suggestions-title">Popular Searches</p>
              <div className="search-tags">
                <button className="search-tag">Rolex</button>
                <button className="search-tag">Omega</button>
                <button className="search-tag">Cartier</button>
                <button className="search-tag">Vintage</button>
                <button className="search-tag">Sport Watches</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Wishlist Cart Modal */}
      {isCartOpen && (
        <div
          className="cart-modal-overlay"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="cart-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <Box className="cart-modal-header">
              <Typography className="cart-modal-title">Wishlist Cart</Typography>
              <IconButton
                onClick={() => setIsCartOpen(false)}
                sx={{
                  color: "#000",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                <Close />
              </IconButton>
            </Box>

            {cartItems.length === 0 ? (
              <Box className="cart-empty-state">
                <Typography className="cart-empty-text">Wishlist Cart is Empty...</Typography>
              </Box>
            ) : (
              <TableContainer component={Paper} className="cart-table-container">
                <Table>
                  <TableHead>
                    <TableRow className="cart-table-header">
                      <TableCell>IMAGE</TableCell>
                      <TableCell>WATCH</TableCell>
                      <TableCell>PRICE</TableCell>
                      <TableCell>PURCHASE</TableCell>
                      <TableCell>REMOVE</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: "80px", height: "100px", objectFit: "cover", cursor: "pointer" }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsCartOpen(false);
                              router.push(`/watch/detail?id=${item.id}`);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Typography>{item.name}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{item.price}</Typography>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            sx={{
                              fontSize: "16px",
                              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                              borderColor: "#1a1a1a",
                              color: "#1a1a1a",
                              textTransform: "none",
                            }}
                          >
                            Contact dealer
                          </Button>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => handleRemoveItem(item.id)}
                            sx={{
                              color: "#8C6F5A",
                            }}
                          >
                            <DeleteOutlineOutlinedIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Top;

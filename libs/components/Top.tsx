import { Box, Menu, MenuItem, Stack, IconButton, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Link from "next/link";
import {
  Logout,
  Close,
  Search,
  ShoppingBagOutlined,
  NotificationsNoneOutlined,
  DarkMode,
  LightMode,
  Language,
  PersonOutline,
} from "@mui/icons-material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useCart } from "@/libs/context/CartContext";
import { useTheme } from "@/libs/context/ThemeContext";
import { useLocale } from "@/libs/context/LocaleContext";
import { useTranslation } from "@/libs/context/useTranslation";

const Top = () => {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isSliding, setIsSliding] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { mode, setMode } = useTheme();
  const { locale, setLocale } = useLocale();
  const { t } = useTranslation();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const { isCartOpen, setIsCartOpen, cartItems, removeFromCart } = useCart();
  const routerBoxRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const langMenuRef = useRef<HTMLDivElement | null>(null);
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
      router.push("/watch?search=" + encodeURIComponent(searchQuery.trim()));
      setIsSearchOpen(false);
    }
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleNotificationToggle = () => {
    setIsNotificationOpen(!isNotificationOpen);
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
      if (langMenuRef.current && !langMenuRef.current.contains(target)) {
        setIsLangMenuOpen(false);
      }
    };

    if (isUserMenuOpen || isLangMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen, isLangMenuOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isSearchOpen) {
          setIsSearchOpen(false);
        }
        if (isCartOpen) {
          setIsCartOpen(false);
        }
        if (isNotificationOpen) {
          setIsNotificationOpen(false);
        }
      }
    };

    if (isSearchOpen || isCartOpen || isNotificationOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen, isCartOpen, isNotificationOpen]);

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
                <span>{t("nav.home")}</span>
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
                <span>{t("nav.watches")}</span>
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
                <span>{t("nav.community")}</span>
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
                <span>{t("nav.aboutUs")}</span>
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
                <span>{t("nav.cs")}</span>
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
                    color: mode === "dark" ? "#e4e4e4" : "#000",
                    p: 0,
                    "&:hover": {
                      color: "#f09620",
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
                    color: mode === "dark" ? "#e4e4e4" : "#000",
                    p: 0,
                    position: "relative",
                    "&:hover": {
                      color: "#f09620",
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
                  onClick={handleNotificationToggle}
                  sx={{
                    color: mode === "dark" ? "#e4e4e4" : "#000",
                    p: 0,
                    "&:hover": {
                      color: "#f09620",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                    },
                  }}
                >
                  <NotificationsNoneOutlined />
                </IconButton>

                {/* DARK MODE */}
                <IconButton
                  aria-label={mode === "dark" ? "Light mode" : "Dark mode"}
                  onClick={() => setMode((prev) => (prev === "dark" ? "light" : "dark"))}
                  sx={{
                    color: mode === "dark" ? "#ffffff" : "#000",
                    p: 0,
                    "&:hover": {
                      color: "#f09620",
                      backgroundColor: "transparent",
                      cursor: "pointer",
                    },
                  }}
                >
                  {mode === "dark" ? (
                    <LightMode sx={{ color: "inherit" }} />
                  ) : (
                    <DarkMode sx={{ color: "inherit" }} />
                  )}
                </IconButton>

                {/* LANGUAGE */}
                <Box
                  className="lang-box"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    position: "relative",
                    cursor: "pointer",
                  }}
                  onClick={() => setIsLangMenuOpen((prev) => !prev)}
                  ref={langMenuRef}
                >
                  <Language
                    sx={{
                      color: mode === "dark" ? "#e4e4e4" : "#000",
                      "&:hover": { color: "#f09620", cursor: "pointer" },
                    }}
                  />
                  {isLangMenuOpen && (
                    <Box
                      className="lang-menu-dropdown"
                      onMouseLeave={() => setIsLangMenuOpen(false)}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Box
                        className="lang-menu-item"
                        onClick={() => {
                          setLocale("en");
                          setIsLangMenuOpen(false);
                        }}
                        sx={{
                          backgroundColor: locale === "en" ? "#2196f3" : undefined,
                          color: locale === "en" ? "#fff" : undefined,
                        }}
                      >
                        ENG
                      </Box>
                      <Box
                        className="lang-menu-item"
                        onClick={() => {
                          setLocale("ko");
                          setIsLangMenuOpen(false);
                        }}
                        sx={{
                          backgroundColor: locale === "ko" ? "#2196f3" : undefined,
                          color: locale === "ko" ? "#fff" : undefined,
                        }}
                      >
                        KOR
                      </Box>
                      <Box
                        className="lang-menu-item"
                        onClick={() => {
                          setLocale("ru");
                          setIsLangMenuOpen(false);
                        }}
                        sx={{
                          backgroundColor: locale === "ru" ? "#2196f3" : undefined,
                          color: locale === "ru" ? "#fff" : undefined,
                        }}
                      >
                        RUS
                      </Box>
                    </Box>
                  )}
                </Box>

                {/* USER */}
                <Box className="user-menu" sx={{ position: "relative" }}>
                  <IconButton
                    aria-label="User"
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    sx={{
                      color: mode === "dark" ? "#e4e4e4" : "#000",
                      p: 0,
                      "&:hover": {
                        color: "#f09620",
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
                      sx={{
                        minWidth: locale === "ko" || locale === "ru" ? 300 : undefined,
                      }}
                    >
                      {isUserLoggedIn ? (
                        <>
                          <Box
                            className="user-menu-item"
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              router.push("/mypage");
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
                            {t("nav.loginSignup")}
                          </Box>
                          <Box
                            className="user-menu-item"
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              router.push("/cs#cs-contact-section");
                            }}
                          >
                            {t("nav.contactAdmin")}
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
                <button
                  type="button"
                  className="search-tag"
                  onClick={() => {
                    router.push("/watch?brand=" + encodeURIComponent("Rolex"));
                    setIsSearchOpen(false);
                  }}
                >
                  Rolex
                </button>
                <button
                  type="button"
                  className="search-tag"
                  onClick={() => {
                    router.push("/watch?brand=" + encodeURIComponent("Omega"));
                    setIsSearchOpen(false);
                  }}
                >
                  Omega
                </button>
                <button
                  type="button"
                  className="search-tag"
                  onClick={() => {
                    router.push("/watch?brand=" + encodeURIComponent("Cartier"));
                    setIsSearchOpen(false);
                  }}
                >
                  Cartier
                </button>
                <button
                  type="button"
                  className="search-tag"
                  onClick={() => {
                    router.push("/watch?watchType=" + encodeURIComponent("Sport"));
                    setIsSearchOpen(false);
                  }}
                >
                  Sport Watches
                </button>
                <button
                  type="button"
                  className="search-tag"
                  onClick={() => {
                    router.push("/community?type=" + encodeURIComponent("News"));
                    setIsSearchOpen(false);
                  }}
                >
                  News
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Modal */}
      {isNotificationOpen && (
        <div
          className="cart-modal-overlay"
          onClick={() => setIsNotificationOpen(false)}
        >
          <div
            className="notification-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <Box className="cart-modal-header">
              <Typography className="cart-modal-title">{t("nav.notificationCart")}</Typography>
              <IconButton
                onClick={() => setIsNotificationOpen(false)}
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
            <Box className="cart-empty-state">
              <Typography className="cart-empty-text">{t("nav.notificationCartEmpty")}</Typography>
            </Box>
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
              <Typography className="cart-modal-title">{t("nav.wishlistCart")}</Typography>
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
                <Typography className="cart-empty-text">{t("nav.wishlistCartEmpty")}</Typography>
              </Box>
            ) : (
              <TableContainer component={Paper} className="cart-table-container">
                <Table>
                  <TableHead>
                    <TableRow className="cart-table-header">
                      <TableCell>{t("nav.image")}</TableCell>
                      <TableCell>{t("nav.watch")}</TableCell>
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

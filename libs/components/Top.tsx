import { Box, Menu, MenuItem, Stack, IconButton } from "@mui/material";
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
import React, { useState, useEffect, useRef } from "react";

const Top = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isSliding, setIsSliding] = useState(false);
  const routerBoxRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef<number>(0);
  const originalSizeRef = useRef<{ width: number; height: number } | null>(null);



  // Hover-based open/close for navbar dropdowns
  const handleDropdownOpen = (menuName: string) => {
    setActiveDropdown(menuName);
  };

  const handleDropdownClose = () => {
    setActiveDropdown(null);
  };

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        routerBoxRef.current &&
        !routerBoxRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown !== null) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("keydown", handleEscape);

      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen]);

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
                  activeDropdown === "home" ? "active" : ""
                }`}
                onMouseEnter={() => handleDropdownOpen("home")}
              >
                <span>Home</span>

                {activeDropdown === "home" && (
                  <div
                    className="dropdown-menu"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link href="/">Home Page</Link>
                    <Link href="/?section=about">About</Link>
                  </div>
                )}
              </div>
            </div>

            {/* SHOP */}
            <div
              className="nav-item-wrapper"
            
            >
              <div
                className={`nav-item ${
                  activeDropdown === "shop" ? "active" : ""
                }`}
                onMouseEnter={() => handleDropdownOpen("shop")}
              >
                <span>Shop</span>

                {activeDropdown === "shop" && (
                  <div
                    className="dropdown-menu"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link href="/watch?type=men">Men Watches</Link>
                    <Link href="/watch?type=women">Women Watches</Link>
                    <Link href="/watch?type=unisex">Unisex</Link>
                    <Link href="/watch?type=sport">Sport</Link>
                  </div>
                )}
              </div>
            </div>

            {/* BRANDS */}
            <div
              className="nav-item-wrapper"
           
            >
              <div
                className={`nav-item ${
                  activeDropdown === "brands" ? "active" : ""
                }`}
                onMouseEnter={() => handleDropdownOpen("brands")}
              >
                <span>Brands</span>

                {activeDropdown === "brands" && (
                  <div
                    className="dropdown-menu"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link href="/brand/rolex">Rolex</Link>
                    <Link href="/brand/omega">Omega</Link>
                    <Link href="/brand/cartier">Cartier</Link>
                    <Link href="/brand/ap">Audemars Piguet</Link>
                    <Link href="/brand/patek">Patek Philippe</Link>
                  </div>
                )}
              </div>
            </div>

            {/* WATCHES */}
            <div
              className="nav-item-wrapper"
             
            >
              <div
                className={`nav-item ${
                  activeDropdown === "watches" ? "active" : ""
                }`}
                onMouseEnter={() => handleDropdownOpen("watches")}
              >
                <span>Watches</span>

                {activeDropdown === "watches" && (
                  <div
                    className="dropdown-menu"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link href="/watch?sort=popular">Popular</Link>
                    <Link href="/watch?sort=new">New Arrivals</Link>
                    <Link href="/watch?sort=best">Best Sellers</Link>
                    <Link href="/watch?sort=vintage">Vintage</Link>
                  </div>
                )}
              </div>
            </div>

            {/* COMMUNITY */}
            <div
              className="nav-item-wrapper"
            
            >
              <div
                className={`nav-item ${
                  activeDropdown === "community" ? "active" : ""
                }`}
                onMouseEnter={() => handleDropdownOpen("community")}
              >
                <span>Community</span>

                {activeDropdown === "community" && (
                  <div
                    className="dropdown-menu"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link href="/community?articleCategory=FREE">
                      Free Board
                    </Link>
                    <Link href="/community?articleCategory=NEWS">News</Link>
                    <Link href="/community?articleCategory=REVIEW">
                      Reviews
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* PAGES */}
            <div
              className="nav-item-wrapper"
              
            >
              <div
                className={`nav-item ${
                  activeDropdown === "pages" ? "active" : ""
                }`}
                onMouseEnter={() => handleDropdownOpen("pages")}
              >
                <span>Pages</span>

                {activeDropdown === "pages" && (
                  <div
                    className="dropdown-menu"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link href="/cs">Customer Center</Link>
                    <Link href="/terms">Terms & Conditions</Link>
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/faq">FAQ</Link>
                  </div>
                )}
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
                    0
                  </Box>
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
                <IconButton
                  aria-label="User"
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
              </div>

              <Menu id="basic-menu" sx={{ mt: "5px" }} open={false}>
                <MenuItem>
                  <Logout
                    fontSize="small"
                    style={{ color: "#E5C28C", marginRight: "10px" }}
                  />
                  Logout
                </MenuItem>
              </Menu>
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
    </>
  );
};

export default Top;

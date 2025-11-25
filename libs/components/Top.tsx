import { Box, Menu, MenuItem, Stack } from "@mui/material";
import Link from "next/link";
import { Logout, Close } from "@mui/icons-material";
import React, { useState, useEffect, useRef } from "react";

const Top = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const routerBoxRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleDropdownToggle = (menuName: string) => {
    setActiveDropdown(activeDropdown === menuName ? null : menuName);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      // Search ochilganda inputga focus
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Search qilish logikasi
      console.log("Searching for:", searchQuery);
      // Masalan: router.push(`/search?q=${searchQuery}`);
    }
  };

  // Click outside to close dropdown
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

  // ESC bosilganda search modalni yopish
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("keydown", handleEscape);
      // Search modal ochilganda body scrollni o'chirish
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen]);

  return (
    <>
      <Stack className={"navbar"}>
        <Stack className={"container"}>
            <Box component={"div"} className={"logo-box"}>
              <Link href={"/"}>
                <img src="/img/logo/Timorylogo.png" alt="Timory Logo" />
              </Link>
            </Box>

            <Box 
              component={"div"} 
              className={"router-box"}
              ref={routerBoxRef}
            >
              <div 
                className={`nav-item ${activeDropdown === "home" ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropdownToggle("home");
                }}
              >
                <span>Home</span>
                {activeDropdown === "home" && (
                  <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    <Link href="/">Home Page</Link>
                    <Link href="/?section=about">About</Link>
                  </div>
                )}
              </div>

              <div 
                className={`nav-item dropdown ${activeDropdown === "shop" ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropdownToggle("shop");
                }}
              >
                <span>Shop</span>
                {activeDropdown === "shop" && (
                  <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    <Link href="/watch?type=men">Men Watches</Link>
                    <Link href="/watch?type=women">Women Watches</Link>
                    <Link href="/watch?type=unisex">Unisex</Link>
                    <Link href="/watch?type=sport">Sport</Link>
                  </div>
                )}
              </div>

              <div 
                className={`nav-item dropdown ${activeDropdown === "brands" ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropdownToggle("brands");
                }}
              >
                <span>Brands</span>
                {activeDropdown === "brands" && (
                  <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    <Link href="/brand/rolex">Rolex</Link>
                    <Link href="/brand/omega">Omega</Link>
                    <Link href="/brand/cartier">Cartier</Link>
                    <Link href="/brand/ap">Audemars Piguet</Link>
                    <Link href="/brand/patek">Patek Philippe</Link>
                  </div>
                )}
              </div>

              <div 
                className={`nav-item dropdown ${activeDropdown === "watches" ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropdownToggle("watches");
                }}
              >
                <span>Watches</span>
                {activeDropdown === "watches" && (
                  <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    <Link href="/watch?sort=popular">Popular</Link>
                    <Link href="/watch?sort=new">New Arrivals</Link>
                    <Link href="/watch?sort=best">Best Sellers</Link>
                    <Link href="/watch?sort=vintage">Vintage</Link>
                  </div>
                )}
              </div>

              <div 
                className={`nav-item dropdown ${activeDropdown === "agents" ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropdownToggle("agents");
                }}
              >
                <span>Agents</span>
                {activeDropdown === "agents" && (
                  <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    <Link href="/agent?type=premium">Premium Agents</Link>
                    <Link href="/agent?type=verified">Verified Agents</Link>
                    <Link href="/agent?type=all">All Agents</Link>
                  </div>
                )}
              </div>

              <div 
                className={`nav-item dropdown ${activeDropdown === "community" ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropdownToggle("community");
                }}
              >
                <span>Community</span>
                {activeDropdown === "community" && (
                  <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    <Link href="/community?articleCategory=FREE">Free Board</Link>
                    <Link href="/community?articleCategory=NEWS">News</Link>
                    <Link href="/community?articleCategory=REVIEW">Reviews</Link>
                  </div>
                )}
              </div>

              <div 
                className={`nav-item dropdown ${activeDropdown === "pages" ? "active" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDropdownToggle("pages");
                }}
              >
                <span>Pages</span>
                {activeDropdown === "pages" && (
                  <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                    <Link href="/cs">Customer Center</Link>
                    <Link href="/terms">Terms & Conditions</Link>
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/faq">FAQ</Link>
                  </div>
                )}
              </div>
            </Box>

            <Box component={"div"} className={"user-box"}>
              <>
                <div className="login-user">
                  <button
                    className="icon-button search-icon"
                    onClick={handleSearchToggle}
                    aria-label="Search"
                  >
                    <img src="/img/logo/search.svg" alt="search" className="icon" />
                  </button>
                  <img src="/img/logo/user.svg" alt="user" className="icon" />
                  <div className="bag-wrapper">
                    <img src="/img/logo/bag.svg" alt="bag" className="icon" />
                    <span className="bag-badge">0</span>
                  </div>
                  <div className="lang-box">
                    <select>
                      <option value="uz">UZ</option>
                      <option value="kr">KR</option>
                      <option value="en">EN</option>
                      <option value="ru">RU</option>
                    </select>
                  </div>
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
        <Stack className={"navbar-main"}>
          
        </Stack>
      </Stack>

      {/* Search Modal Overlay */}
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
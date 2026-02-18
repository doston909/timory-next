import { Stack, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";
import Footer from "../Footer";
import Top from "../Top";

const withLayoutBasic = (Component: any) => {
  return (props: any) => {
    const router = useRouter();
    
    // Page nomini va breadcrumb ni generate qilish
    const { pageTitle, breadcrumb } = useMemo(() => {
      const path = router.pathname || router.asPath;
      const pathSegments = path.split('/').filter(Boolean);
      
      // Page title mapping
      const titleMap: { [key: string]: string } = {
        '': 'Home',
        'watch': 'Watches',
        'community': 'Community',
        'about': 'About Us',
        'mypage': 'My Page',
        'account': 'Login',
        'signup': 'Sign Up',
        'reset': 'Reset Password',
        'register': 'Register',
        'detail': 'Detail Page',
        'index': 'Home',
      };
      
      // Breadcrumb mapping
      const breadcrumbMap: { [key: string]: string } = {
        'watch': 'Watches',
        'community': 'Community',
        'about': 'About Us',
        'mypage': 'My Page',
        'account': 'Account',
        'signup': 'Sign Up',
        'reset': 'Reset Password',
        'register': 'Register',
        'detail': 'Detail',
      };
      
      let title = 'Home';
      let breadcrumbPath = 'Home';
      
      if (pathSegments.length === 0 || pathSegments[0] === 'index') {
        title = 'Home';
        breadcrumbPath = 'Home';
      } else {
        const firstSegment = pathSegments[0];
        const lastSegment = pathSegments[pathSegments.length - 1];
        
        // Account page uchun maxsus logika
        if (firstSegment === 'account') {
          if (pathSegments.length === 1 || lastSegment === 'index') {
            // /account yoki /account/index
            title = 'Login';
            breadcrumbPath = 'Home > Account > Login';
          } else {
            // /account/signup, /account/reset va hokazo
            const accountPageTitle = titleMap[lastSegment] || lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
            title = accountPageTitle;
            breadcrumbPath = `Home > Account > ${accountPageTitle}`;
          }
        } else {
          // Boshqa pagelar uchun
          if (pathSegments.length === 1) {
            title = titleMap[firstSegment] || firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1);
            breadcrumbPath = `Home > ${breadcrumbMap[firstSegment] || title}`;
          } else {
            // Agar detail yoki boshqa sub-page bo'lsa
            if (lastSegment === 'detail' || lastSegment === 'signup' || lastSegment === 'reset' || lastSegment === 'register') {
              const parentTitle = breadcrumbMap[firstSegment] || firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1);
              title = titleMap[lastSegment] || lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
              breadcrumbPath = `Home > ${parentTitle} > ${title}`;
            } else {
              title = titleMap[lastSegment] || lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
              breadcrumbPath = `Home > ${breadcrumbMap[firstSegment] || firstSegment.charAt(0).toUpperCase() + firstSegment.slice(1)} > ${title}`;
            }
          }
        }
      }
      
      return { pageTitle: title, breadcrumb: breadcrumbPath };
    }, [router.pathname, router.asPath]);

    return (
      <>
        <Head>
          <title>Timory</title>
        </Head>
        <Stack id="pc-wrap">
          <Stack id={"top"}>
            <Top />
          </Stack>

          <Stack
            className={`header-basic`}
            sx={{
              height: "400px",
              backgroundImage: "url('/img/profile/lay4.jpeg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "blur(0px)", // Blur darajasi (0px - aniq, 5px - o'rtacha, 10px - kuchli)
            }}
          >
            <Stack 
              className={"container header-container"}
              sx={{
                
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                height: "100%",
                marginLeft: "-40px"
              }}
            >
              <Typography 
                className="header-page-title"
                sx={{
                 
                  fontSize: '48px',
                  fontWeight: 700,
                  color: '#000000ff',
                  marginBottom: '8px',
                  marginLeft: '-1000px',
                  textAlign: 'center',
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {pageTitle}
              </Typography>
              <Typography 
                className="header-breadcrumb"
                sx={{filter: 'none',
                  fontSize: '22px',
                  fontWeight: 500,
                  marginLeft: '-1000px',
                  color: '#000000ff',
                  textAlign: 'center',
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {breadcrumb}
              </Typography>
            </Stack>
          </Stack>

          <Stack id={"main"}>
            <Component {...props} />
          </Stack>

          <Stack id={"footer"}>
            <Footer />
          </Stack>
        </Stack>
      </>
    );
  };
};

export default withLayoutBasic;
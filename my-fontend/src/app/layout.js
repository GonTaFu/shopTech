import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { Geist, Geist_Mono } from "next/font/google";
// import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shop Tech",
  description: "Những gì bạn muốn chúng tôi không có",
};

import MyAppBar from "../components/MyAppBar";
import MyFooter from "../components/MyFooter";
import { Box, margin, padding, width } from "@mui/system";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
      <AppRouterCacheProvider>
        <header>
          <MyAppBar></MyAppBar>
        </header>
        <Box sx={{
          marginTop: 20,
        }}>
          {children}
        </Box>
        <Box component="footer" sx={{ margin: 0, padding: 0 }}>
          <MyFooter></MyFooter>
        </Box>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}


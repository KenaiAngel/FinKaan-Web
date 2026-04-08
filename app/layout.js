import "./globals.css";
import Navbar from "../components/Navbar";
import { AuthProvider } from "../providers/AuthProvider";
export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    >
      <body className=" flex flex-col">
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

import Navbar from "@/components/layout/navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthContext from "./auth-context";
import Footer from "@/components/layout/footer";
import { ReduxProvider } from "@/redux/provider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sigma World",
  description: "Generated by create next app",
};
interface IProps {
  children: React.ReactNode;
}
export default async function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <AuthContext>
            <div className="bg-white">
              <Navbar />

              <main>{children}</main>

              <Footer />
            </div>
          </AuthContext>
        </ReduxProvider>
      </body>
    </html>
  );
}
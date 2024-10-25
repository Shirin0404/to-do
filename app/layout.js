import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazir = Vazirmatn({ subsets: ["latin"] });

export const metadata = {
  title: "ToDoList",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR" dir="rtl">
      <body className={vazir.className}>{children}</body>
    </html>
  );
}

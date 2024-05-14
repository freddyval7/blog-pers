import React from "react";
import Navbar from "./_components/navbar";
import Footer from "./_components/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
        <Navbar />
        {children}
        <Footer />
    </div>
  );
}

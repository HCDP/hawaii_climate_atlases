import NavBar from "@/components/NavBar";
import React from "react";

export default function MainLayout (
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>
) {
  return (
    <>
      <NavBar
        navLinks={[
          { text: 'Home', path: '/'},
          { text: 'Interactive Map', path: '/interactive-map' },
          { text: 'Downloads', path: '/downloads'},
          { text: 'How to cite', path: '/how-to-cite' },
          { text: 'History', path: '/history'},
          { text: 'Methods', path: '/methods' },
          { text: 'Rainfall', path: '/rainfall' },
          { text: 'Acknowledgements', path: '/acknowledgements' },
          { text: 'People', path: '/people' },
        ]}
        img="rainfall"
      />
      <main className="min-h-screen max-w-screen font-serif">
        {children}
      </main>
      <footer className="flex justify-center">
        Footer
      </footer>
    </>
  );
}

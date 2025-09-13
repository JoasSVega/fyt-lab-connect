import Contact from "@/components/Contact";
import Navbar from "../components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

const Contactos = () => (
  <div className="w-full bg-background overflow-x-hidden min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 w-full pt-16">
      <Contact />
    </main>
    <Footer />
    <FloatingContact />
  </div>
);

export default Contactos;

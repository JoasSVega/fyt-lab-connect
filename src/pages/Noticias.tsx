import News from "@/components/News";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

const Noticias = () => (
  <div className="w-full bg-background overflow-x-hidden min-h-screen flex flex-col">
    <Navbar />
    <main className="flex-1 w-full pt-16">
      <News />
    </main>
    <Footer />
    <FloatingContact />
  </div>
);

export default Noticias;

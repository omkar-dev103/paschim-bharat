// src/app/page.tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedDestinations from "@/components/home/FeaturedDestinations";
import Categories from "@/components/home/Categories";
import Stats from "@/components/home/Stats";
// import RestaurantCarousel from "@/components/home/RestaurantCarousel";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <FeaturedDestinations />
        <Categories />
        <Stats />
        {/* <RestaurantCarousel /> */}
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
import FacebookPage from '@/components/FacebookPage';
import Hero from './(sections)/Hero';
import About from './(sections)/About';
import Services from './(sections)/Services';
import Products from './(sections)/Products';
import Brands from './(sections)/Brands';
import Testimonials from './(sections)/Testimonials';
import CTA from './(sections)/CTA';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Products />
      <Brands />
      <Testimonials />

      {/* Facebook Embed Section */}
      <section className="container-section py-16">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Latest from our Facebook</h2>
  <FacebookPage pageUrl="https://www.facebook.com/mongaelectricals.sirsa" />
      </section>



      <CTA />
    </main>
  );
}

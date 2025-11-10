export default function CTA() {
  return (
    <section className="bg-brand text-white">
      <div className="container-section py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-semibold">Need electrical supplies today?</h3>
          <p className="text-white/80">Call us or message on Facebook. We’re happy to help.</p>
        </div>
        <div className="flex gap-3">
          <a href="#contact" className="bg-accent text-black px-5 py-3 rounded-md font-semibold">Contact</a>
          <a href="https://www.facebook.com/mongaelectricals.sirsa" target="_blank" rel="noopener noreferrer" className="border border-white/80 px-5 py-3 rounded-md font-semibold">Facebook</a>
        </div>
      </div>
    </section>
  );
}

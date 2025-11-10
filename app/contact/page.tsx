export const metadata = {
  title: 'Contact | Monga Electricals',
};

import ContactForm from '@/components/ContactForm';

export default function ContactPage() {
  return (
    <main id="contact">
      <section className="container-section py-16">
        <h1 className="text-3xl font-bold tracking-tight">Contact Us</h1>
        <div className="mt-8 grid lg:grid-cols-2 gap-10">
          <div className="space-y-4">
            <p><strong>Address:</strong> In front of Main Post Office , Dwarkapuri , Sirsa, Haryana</p>
            <p><strong>Phone:</strong> <a className="text-brand" href="tel:+91 9802200043">+91 98022 00043</a></p>
            <p><strong>Facebook:</strong> <a className="text-brand" href="https://www.facebook.com/mongaelectricals.sirsa" target="_blank" rel="noopener noreferrer">Monga Electricals</a></p>
            <div className="aspect-video rounded-md overflow-hidden border">
              <iframe
                title="Map"
                src="https://www.google.com/maps?q=Sirsa,Haryana&output=embed"
                className="w-full h-full"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}

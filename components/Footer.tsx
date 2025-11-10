export default function Footer() {
  return (
    <footer className="border-t mt-12 bg-gray-50">
      <div className="container-section py-8 text-sm text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Monga Electricals. All rights reserved.</p>
        <p>
          Visit us on{' '}
          <a 
            href="https://www.facebook.com/mongaelectricals.sirsa" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-brand hover:underline hover:text-brand-dark transition-colors"
          >
            Facebook
          </a>
        </p>
      </div>
    </footer>
  );
}

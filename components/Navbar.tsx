import Link from 'next/link';
import AuthControls from './LoginSignup';
import ChatTrigger from './ChatTrigger';
import CartButton from './CartButton';
import SearchBox from './SearchBox';

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b shadow-sm">
      <div className="container-section h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-brand text-lg hover:text-brand-dark transition-colors">
          Monga Electricals
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/#about" className="hover:text-brand transition-colors">About</Link>
          <Link href="/#services" className="hover:text-brand transition-colors">Services</Link>
          <Link href="/products" className="hover:text-brand transition-colors">Products</Link>
          <Link href="/contact" className="hover:text-brand transition-colors">Contact</Link>
          <Link href={'/product-of-the-month' as any} className="hover:text-brand transition-colors">Product of Month</Link>
          <Link href={'/blog' as any} className="hover:text-brand transition-colors">Blog</Link>
          {/* textual Cart link removed — use icon button */}
          <div className="ml-2">
            <SearchBox />
          </div>
          {/* Chat button opens assistant modal via custom event */}
          <ChatTrigger />
          <CartButton />
          <AuthControls />
        </nav>
        {/* mobile: show minimal actions */}
        <div className="md:hidden flex items-center gap-3">
          <ChatTrigger />
          <AuthControls />
        </div>
      </div>
    </header>
  );
}

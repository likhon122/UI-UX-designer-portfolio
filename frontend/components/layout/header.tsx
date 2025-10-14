'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';
import { 
  LayoutDashboard, 
  LogOut, 
  User, 
  ShoppingBag,
  Palette,
  Menu
} from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    router.push('/');
  };

  const isAdmin = user?.role === 'admin' || user?.role === 'superAdmin';
  const isCustomer = user?.role === 'customer';

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Palette className="h-6 w-6" />
          <span className="text-xl font-bold">Designer Portfolio</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/designs" className="text-sm font-medium hover:underline">
            Designs
          </Link>
          <Link href="/pricing" className="text-sm font-medium hover:underline">
            Pricing
          </Link>
          
          {isAuthenticated ? (
            <>
              {isAdmin && (
                <Link href="/admin/dashboard" className="text-sm font-medium hover:underline">
                  <LayoutDashboard className="h-4 w-4 inline mr-1" />
                  Admin
                </Link>
              )}
              {isCustomer && (
                <Link href="/customer/purchases" className="text-sm font-medium hover:underline">
                  <ShoppingBag className="h-4 w-4 inline mr-1" />
                  My Purchases
                </Link>
              )}
              <Link href="/profile" className="text-sm font-medium hover:underline">
                <User className="h-4 w-4 inline mr-1" />
                Profile
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
          
          <ThemeToggle />
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container space-y-4 px-4 py-4">
            <Link href="/designs" className="block text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Designs
            </Link>
            <Link href="/pricing" className="block text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
              Pricing
            </Link>
            
            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link href="/admin/dashboard" className="block text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                    Admin Dashboard
                  </Link>
                )}
                {isCustomer && (
                  <Link href="/customer/purchases" className="block text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                    My Purchases
                  </Link>
                )}
                <Link href="/profile" className="block text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                  Profile
                </Link>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full justify-start">
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link href="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full">Login</Button>
                </Link>
                <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

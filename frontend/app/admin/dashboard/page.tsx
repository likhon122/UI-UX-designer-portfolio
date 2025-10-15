'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchRevenue } from '@/store/slices/purchaseSlice';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Package,
  Tags,
  DollarSign,
  ShoppingCart,
  Users,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { revenue, loading, error } = useAppSelector((state) => state.purchase);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (user?.role !== 'admin' && user?.role !== 'superAdmin') {
      router.push('/');
      return;
    }

    dispatch(fetchRevenue());
  }, [dispatch, isAuthenticated, user, router]);

  if (!isAuthenticated || (user?.role !== 'admin' && user?.role !== 'superAdmin')) {
    return null;
  }

  const quickLinks = [
    {
      title: 'Designs',
      description: 'Manage design portfolio',
      icon: Package,
      href: '/admin/designs',
    },
    {
      title: 'Categories',
      description: 'Manage design categories',
      icon: Tags,
      href: '/admin/categories',
    },
    {
      title: 'Pricing Plans',
      description: 'Manage pricing options',
      icon: DollarSign,
      href: '/admin/pricing-plans',
    },
    {
      title: 'Purchases',
      description: 'View all purchases',
      icon: ShoppingCart,
      href: '/admin/purchases',
    },
  ];

  return (
    <MainLayout>
      <div className="container px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {user?.name || 'Admin'}
          </p>
        </div>

        {/* Revenue Stats */}
        {error && (
          <div className="text-center py-8 bg-destructive/10 rounded-lg mb-8">
            <p className="text-destructive font-semibold mb-2">Error loading revenue data</p>
            <p className="text-muted-foreground text-sm mb-4">{error}</p>
            <Button onClick={() => dispatch(fetchRevenue())} variant="outline">
              Try Again
            </Button>
          </div>
        )}

        {!error && loading && !revenue ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-4 bg-muted rounded w-24" />
                </CardHeader>
                <CardContent>
                  <div className="h-8 bg-muted rounded w-20" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !error && revenue ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="hover:shadow-lg transition-shadow duration-200 border-2">
              <CardHeader className="pb-2">
                <CardDescription>Total Revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">${revenue?.totalRevenue || 0}</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-200 border-2">
              <CardHeader className="pb-2">
                <CardDescription>Paid Purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{revenue?.paidPurchases || 0}</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-200 border-2">
              <CardHeader className="pb-2">
                <CardDescription>Pending</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-yellow-600">{revenue?.pendingPurchases || 0}</div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-200 border-2">
              <CardHeader className="pb-2">
                <CardDescription>Cancelled</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-red-600">{revenue?.cancelledPurchases || 0}</div>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {/* Quick Links */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href}>
                  <Card className="hover:shadow-xl hover:border-primary/50 transition-all duration-200 cursor-pointer h-full border-2">
                    <CardHeader>
                      <Icon className="h-10 w-10 mb-2 text-primary" />
                      <CardTitle>{link.title}</CardTitle>
                      <CardDescription>{link.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

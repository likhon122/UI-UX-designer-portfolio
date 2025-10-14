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
  const { revenue } = useAppSelector((state) => state.purchase);

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
        {revenue && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${revenue.totalRevenue}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Paid Purchases</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{revenue.paidPurchases}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Pending</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{revenue.pendingPurchases}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Cancelled</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{revenue.cancelledPurchases}</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Links */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link key={link.href} href={link.href}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
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

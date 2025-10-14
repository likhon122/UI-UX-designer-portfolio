'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, DollarSign, ShoppingBag } from 'lucide-react';
import { ROUTES } from '@/lib/config';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(ROUTES.login);
      return;
    }
    
    // Check if user is admin or superAdmin
    if (user?.role !== 'admin' && user?.role !== 'superAdmin') {
      router.push(ROUTES.dashboard);
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user || (user.role !== 'admin' && user.role !== 'superAdmin')) {
    return null;
  }

  const stats = [
    {
      title: 'Total Users',
      value: '0',
      icon: Users,
      description: 'Registered customers',
      trend: '+12.5%',
    },
    {
      title: 'Total Designs',
      value: '0',
      icon: Package,
      description: 'Published designs',
      trend: '+8.2%',
    },
    {
      title: 'Total Revenue',
      value: '$0',
      icon: DollarSign,
      description: 'This month',
      trend: '+24.3%',
    },
    {
      title: 'Total Purchases',
      value: '0',
      icon: ShoppingBag,
      description: 'All time purchases',
      trend: '+15.8%',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your platform and monitor key metrics
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
                <p className="text-xs text-green-600 mt-1">
                  {stat.trend} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Manage Designs</CardTitle>
            <CardDescription>
              Add, edit, or remove design listings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Access the design management panel to control your inventory
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              View and manage user accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Monitor user activity and manage permissions
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Sales Reports</CardTitle>
            <CardDescription>
              View detailed sales analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Generate reports and track revenue trends
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Pricing Plans</CardTitle>
            <CardDescription>
              Manage subscription tiers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Update pricing and features for each plan
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Reviews</CardTitle>
            <CardDescription>
              Moderate customer reviews
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Review and manage customer feedback
            </p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Categories</CardTitle>
            <CardDescription>
              Organize design categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Add or edit design category classifications
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest platform activities and transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No recent activity</p>
            <p className="text-sm text-muted-foreground mt-2">
              Activity will appear here as users interact with the platform
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

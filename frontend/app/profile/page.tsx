'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getMyProfile } from '@/store/slices/authSlice';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    dispatch(getMyProfile());
  }, [dispatch, isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  if (loading || !user) {
    return (
      <MainLayout>
        <div className="container px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <Card className="animate-pulse">
              <CardHeader>
                <div className="h-8 bg-muted rounded w-1/3 mb-2" />
                <div className="h-4 bg-muted rounded w-1/4" />
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded" />
                <div className="h-4 bg-muted rounded" />
              </CardContent>
            </Card>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My Profile</h1>
            <p className="text-muted-foreground">
              Manage your account information
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <CardDescription className="mt-2">
                    <Badge>{user.role}</Badge>
                  </CardDescription>
                </div>
                <Button variant="outline">Edit Profile</Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                  </div>

                  {user.phone && (
                    <div className="flex items-start space-x-3">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <p className="font-medium">{user.phone}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">User ID</p>
                      <p className="font-medium text-xs">{user.id}</p>
                    </div>
                  </div>

                  {user.address && (
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium">{user.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-6 border-t space-y-4">
                <h3 className="font-semibold">Account Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline">Change Password</Button>
                  <Button variant="outline">Update Email</Button>
                  {user.role === 'customer' && (
                    <Button variant="outline" onClick={() => router.push('/customer/purchases')}>
                      View Purchases
                    </Button>
                  )}
                  {(user.role === 'admin' || user.role === 'superAdmin') && (
                    <Button variant="outline" onClick={() => router.push('/admin/dashboard')}>
                      Admin Dashboard
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}

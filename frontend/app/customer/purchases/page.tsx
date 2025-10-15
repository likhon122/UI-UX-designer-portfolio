'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchMyPurchases } from '@/store/slices/purchaseSlice';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function MyPurchasesPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { myPurchases = [], loading, error } = useAppSelector((state) => state.purchase);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (user?.role !== 'customer') {
      router.push('/');
      return;
    }

    dispatch(fetchMyPurchases());
  }, [dispatch, isAuthenticated, user, router]);

  if (!isAuthenticated || user?.role !== 'customer') {
    return null;
  }

  return (
    <MainLayout>
      <div className="container px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Purchases</h1>
          <p className="text-muted-foreground">
            View and manage your purchased designs
          </p>
        </div>

        {error && (
          <div className="text-center py-12 bg-destructive/10 rounded-lg">
            <p className="text-destructive font-semibold mb-2">Error loading purchases</p>
            <p className="text-muted-foreground text-sm mb-4">{error}</p>
            <Button onClick={() => dispatch(fetchMyPurchases())} variant="outline">
              Try Again
            </Button>
          </div>
        )}

        {!error && loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="p-6">
                  <div className="h-6 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              </Card>
            ))}
          </div>
        ) : !error && (!myPurchases || myPurchases.length === 0) ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  You haven&apos;t made any purchases yet
                </p>
                <Link href="/designs">
                  <Button>Browse Designs</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {myPurchases && myPurchases.map((purchase) => {
              const design = typeof purchase?.design === 'object' ? purchase.design : null;
              const pricingPlan = typeof purchase?.pricingPlan === 'object' ? purchase.pricingPlan : null;
              
              return (
                <Card key={purchase?.id || Math.random()} className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Design Preview */}
                      {design && (
                        <div className="relative w-full md:w-48 h-32 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 flex-shrink-0">
                          {design?.previewImageUrl && (
                            <Image
                              src={design.previewImageUrl}
                              alt={design?.title || 'Design preview'}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                      )}

                      {/* Purchase Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-semibold mb-1">
                              {design?.title || 'Design'}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Plan: {pricingPlan?.name || 'N/A'}
                            </p>
                          </div>
                          <Badge
                            variant={
                              purchase?.paymentStatus === 'Paid'
                                ? 'default'
                                : purchase?.paymentStatus === 'Pending'
                                ? 'secondary'
                                : 'destructive'
                            }
                          >
                            {purchase?.paymentStatus || 'Unknown'}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Amount</p>
                            <p className="font-semibold text-primary">${purchase?.totalAmount || 0}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Purchase Date</p>
                            <p className="font-semibold">
                              {purchase?.createdAt ? new Date(purchase.createdAt).toLocaleDateString() : 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Order ID</p>
                            <p className="font-semibold text-xs">{purchase?.id ? purchase.id.slice(0, 8) + '...' : 'N/A'}</p>
                          </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                          {design?.id && (
                            <Link href={`/designs/${design.id}`}>
                              <Button variant="outline" size="sm">
                                View Design
                              </Button>
                            </Link>
                          )}
                          {purchase?.paymentStatus === 'Paid' && (
                            <Button size="sm">Download Files</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
}

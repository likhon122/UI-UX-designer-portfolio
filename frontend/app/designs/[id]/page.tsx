'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchDesignById } from '@/store/slices/designSlice';
import { fetchPricingPlans } from '@/store/slices/pricingPlanSlice';
import { createPurchase } from '@/store/slices/purchaseSlice';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';

export default function DesignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const id = params.id as string;
  
  const { currentDesign: design, loading } = useAppSelector((state) => state.design);
  const { pricingPlans } = useAppSelector((state) => state.pricingPlan);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchDesignById(id));
      dispatch(fetchPricingPlans());
    }
  }, [dispatch, id]);

  const handlePurchase = async () => {
    if (!isAuthenticated) {
      router.push('/auth/login');
      return;
    }

    if (!selectedPlan) {
      alert('Please select a pricing plan');
      return;
    }

    if (user?.role !== 'customer') {
      alert('Only customers can purchase designs');
      return;
    }

    setPurchasing(true);
    try {
      await dispatch(createPurchase({ design: id, pricingPlan: selectedPlan }));
      router.push('/customer/purchases');
    } catch (error) {
      alert('Failed to create purchase');
    } finally {
      setPurchasing(false);
    }
  };

  if (loading || !design) {
    return (
      <MainLayout>
        <div className="container px-4 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-96 bg-muted rounded-lg" />
            <div className="h-8 bg-muted rounded w-1/2" />
            <div className="h-4 bg-muted rounded w-3/4" />
          </div>
        </div>
      </MainLayout>
    );
  }

  const category = typeof design.category === 'object' ? design.category : null;

  return (
    <MainLayout>
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="relative h-96 rounded-lg overflow-hidden bg-muted">
              {design.previewImageUrl && (
                <Image
                  src={design.previewImageUrl}
                  alt={design.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Title and Description */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold mb-2">{design.title}</h1>
                  <div className="flex items-center gap-2">
                    {category && (
                      <Badge variant="secondary">{category.name}</Badge>
                    )}
                    <Badge variant="outline">{design.complexityLevel}</Badge>
                    <Badge variant={design.status === 'Active' ? 'default' : 'secondary'}>
                      {design.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">${design.price}</p>
                </div>
              </div>
              <p className="text-muted-foreground">{design.description}</p>
            </div>

            {/* Details */}
            <Card>
              <CardHeader>
                <CardTitle>Design Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Designer</h3>
                  <p className="text-muted-foreground">{design.designerName}</p>
                </div>

                {design.usedTools && design.usedTools.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Tools Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {design.usedTools.map((tool, index) => (
                        <Badge key={index} variant="outline">{tool}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {design.effects && design.effects.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Effects</h3>
                    <div className="flex flex-wrap gap-2">
                      {design.effects.map((effect, index) => (
                        <Badge key={index} variant="outline">{effect}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {design.tags && design.tags.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {design.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold mb-2">Design Process</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">{design.process}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Purchase Options */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Purchase This Design</CardTitle>
                <CardDescription>
                  Choose a pricing plan to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {pricingPlans.map((plan) => (
                  <div
                    key={plan.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedPlan === plan.id
                        ? 'border-primary bg-primary/5'
                        : 'hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedPlan(plan.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold">{plan.name}</h4>
                      <p className="font-bold">${plan.price}</p>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {plan.duration} days access
                    </p>
                    {plan.features && plan.features.length > 0 && (
                      <ul className="text-sm space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="text-muted-foreground">
                            • {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}

                {isAuthenticated ? (
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handlePurchase}
                    disabled={!selectedPlan || purchasing}
                  >
                    {purchasing ? 'Processing...' : 'Purchase Now'}
                  </Button>
                ) : (
                  <Link href="/auth/login">
                    <Button className="w-full" size="lg">
                      Login to Purchase
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Have questions about this design? Contact our support team.
                </p>
                <Button variant="outline" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

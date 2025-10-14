'use client';

import { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PricingPlan } from '@/types';
import { pricingApi } from '@/lib/api/pricing';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/lib/config';

export default function PricingPage() {
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const response = await pricingApi.getAll();
        setPlans(response.data);
      } catch (error) {
        console.error('Failed to fetch pricing plans:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleSelectPlan = () => {
    if (!isAuthenticated) {
      router.push(ROUTES.login);
      return;
    }
    // In a real app, this would initiate the purchase flow
    router.push(ROUTES.dashboard);
  };

  const getPlanBadge = (name: string) => {
    if (name === 'Premium') return 'Most Popular';
    if (name === 'Standard') return 'Best Value';
    return null;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-muted-foreground">Loading pricing plans...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Choose Your Plan</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Select the perfect plan for your design needs. All plans include commercial license and lifetime updates.
        </p>
      </div>

      {/* Pricing Cards */}
      {plans.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No pricing plans available at the moment.</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const badge = getPlanBadge(plan.name);
            const isPremium = plan.name === 'Premium';

            return (
              <Card
                key={plan.id}
                className={`relative ${isPremium ? 'border-primary shadow-lg scale-105' : ''}`}
              >
                {badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-4 py-1 text-xs font-semibold text-primary-foreground">
                      {badge}
                    </span>
                  </div>
                )}

                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription>
                    {plan.duration} day{plan.duration > 1 ? 's' : ''} access
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground">/{plan.duration}d</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className="w-full"
                    variant={isPremium ? 'default' : 'outline'}
                    onClick={handleSelectPlan}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}

      {/* FAQ Section */}
      <div className="mt-20 max-w-3xl mx-auto">
        <h2 className="mb-8 text-center text-3xl font-bold">Frequently Asked Questions</h2>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">What&apos;s included in each plan?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All plans include full design files, commercial license, and lifetime updates. Higher tiers offer additional features like priority support and exclusive designs.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Can I upgrade or downgrade my plan?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Yes, you can change your plan at any time. If you upgrade, you&apos;ll be charged the difference. Downgrades take effect at the end of your current billing period.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Do you offer refunds?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We offer a 30-day money-back guarantee. If you&apos;re not satisfied with your purchase, contact us within 30 days for a full refund.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

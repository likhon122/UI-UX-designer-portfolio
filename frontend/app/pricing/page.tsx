'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPricingPlans } from '@/store/slices/pricingPlanSlice';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const dispatch = useAppDispatch();
  const { pricingPlans = [], loading, error } = useAppSelector((state) => state.pricingPlan);

  useEffect(() => {
    dispatch(fetchPricingPlans());
  }, [dispatch]);

  return (
    <MainLayout>
      <div className="container px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include access to our premium designs.
          </p>
        </div>

        {error && (
          <div className="text-center py-12 bg-destructive/10 rounded-lg max-w-2xl mx-auto">
            <p className="text-destructive font-semibold mb-2">Error loading pricing plans</p>
            <p className="text-muted-foreground text-sm mb-4">{error}</p>
            <Button onClick={() => dispatch(fetchPricingPlans())} variant="outline">
              Try Again
            </Button>
          </div>
        )}

        {!error && loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-muted rounded mb-2" />
                  <div className="h-10 bg-muted rounded" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="h-4 bg-muted rounded" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : !error && (!pricingPlans || pricingPlans.length === 0) ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No pricing plans available</p>
          </div>
        ) : !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans && pricingPlans.map((plan, index) => (
              <Card
                key={plan?.id || index}
                className={`relative transition-all duration-200 hover:shadow-xl ${
                  plan?.name === 'Standard' ? 'border-primary shadow-lg scale-105' : ''
                }`}
              >
                {plan?.name === 'Standard' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan?.name || 'Plan'}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-primary">${plan?.price || 0}</span>
                    <span className="text-muted-foreground"> / {plan?.duration || 30} days</span>
                  </div>
                  <CardDescription>
                    Perfect for {plan?.name === 'Basic' ? 'individuals' : plan?.name === 'Standard' ? 'small teams' : 'enterprises'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan?.features && plan.features.length > 0 ? (
                      plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-muted-foreground">No features listed</li>
                    )}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/designs" className="w-full">
                    <Button
                      className="w-full"
                      variant={plan?.name === 'Standard' ? 'default' : 'outline'}
                    >
                      Get Started
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Not sure which plan to choose?</h2>
          <p className="text-muted-foreground mb-6">
            Contact our sales team for a custom solution tailored to your needs.
          </p>
          <Button size="lg">Contact Sales</Button>
        </div>
      </div>
    </MainLayout>
  );
}

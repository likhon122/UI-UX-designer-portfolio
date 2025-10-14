import Link from 'next/link';
import { ArrowRight, Palette, Zap, Shield, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ROUTES } from '@/lib/config';

export default function Home() {
  const features = [
    {
      icon: Palette,
      title: 'Premium Designs',
      description: 'Hand-crafted UI/UX designs by professional designers with years of experience.',
    },
    {
      icon: Zap,
      title: 'Instant Download',
      description: 'Get instant access to your purchased designs. No waiting, start working immediately.',
    },
    {
      icon: Shield,
      title: 'Licensed & Safe',
      description: 'All designs come with proper licensing. Use them in your commercial projects worry-free.',
    },
    {
      icon: Star,
      title: 'Quality Guaranteed',
      description: 'Every design goes through rigorous quality checks before being listed.',
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Premium UI/UX Designs
              <span className="block text-primary">For Your Next Project</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Browse hundreds of professional designs. Purchase what you need and start building amazing digital experiences today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={ROUTES.designs}>
                <Button size="lg" className="w-full sm:w-auto">
                  Browse Designs
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href={ROUTES.pricing}>
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose DesignHub?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide the best design marketplace experience for both designers and buyers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center border-0 shadow-lg">
                  <CardHeader>
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-primary text-primary-foreground border-0">
            <CardHeader className="text-center py-12">
              <CardTitle className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </CardTitle>
              <CardDescription className="text-lg text-primary-foreground/90 max-w-2xl mx-auto">
                Join thousands of satisfied customers who have found the perfect designs for their projects.
              </CardDescription>
            </CardHeader>
            <CardFooter className="justify-center pb-12">
              <Link href={ROUTES.signup}>
                <Button size="lg" variant="secondary">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Premium Designs</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

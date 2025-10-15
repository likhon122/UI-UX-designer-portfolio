import Link from 'next/link';
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Zap, Shield, Award } from 'lucide-react';

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="container px-4 py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Premium UI/UX Designs for Your Projects
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover and purchase professional UI/UX designs crafted by expert designers. 
            Perfect for web applications, mobile apps, and digital products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/designs">
              <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">Browse Designs</Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="hover:bg-primary/5">View Pricing</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gradient-to-b from-muted/50 to-background py-20">
        <div className="container px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Why Choose Us</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            We provide the best design solutions with professional quality and excellent service
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow duration-200 border-2 hover:border-primary/50">
              <CardHeader>
                <Palette className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Professional Designs</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  High-quality UI/UX designs created by experienced designers
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-200 border-2 hover:border-primary/50">
              <CardHeader>
                <Zap className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Instant Access</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Get immediate access to your purchased designs
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-200 border-2 hover:border-primary/50">
              <CardHeader>
                <Shield className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Secure Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Safe and secure payment processing for all transactions
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow duration-200 border-2 hover:border-primary/50">
              <CardHeader>
                <Award className="h-10 w-10 mb-2 text-primary" />
                <CardTitle>Premium Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Every design is reviewed and meets our quality standards
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-20">
        <div className="mx-auto max-w-3xl text-center bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-12 border-2 border-primary/20">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of satisfied customers who trust our platform for their design needs.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">Create Free Account</Button>
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}

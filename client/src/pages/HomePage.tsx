import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Palette, TrendingUp, Users } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchDesigns } from '../store/slices/designSlice';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const { designs, loading } = useAppSelector((state) => state.designs);
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchDesigns({ page: 1, limit: 6 }));
  }, [dispatch]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 px-4">
        <div className="container mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Premium UI/UX Design Solutions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover professionally crafted design templates and resources to elevate your digital products
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/designs">
                Browse Designs <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            {!isAuthenticated && (
              <Button size="lg" variant="outline" asChild>
                <Link to="/signup">Get Started</Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Palette className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Professional Designs</CardTitle>
                <CardDescription>
                  High-quality, modern designs crafted by experienced UI/UX designers
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Flexible Pricing</CardTitle>
                <CardDescription>
                  Choose from various pricing plans that fit your budget and needs
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Customer Support</CardTitle>
                <CardDescription>
                  Dedicated support team to help you with any questions or issues
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Designs Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Featured Designs</h2>
            <Button variant="outline" asChild>
              <Link to="/designs">View All</Link>
            </Button>
          </div>
          {loading ? (
            <div className="text-center py-12">Loading designs...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {designs.slice(0, 6).map((design) => (
                <Card key={design.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img
                      src={design.previewImageUrl}
                      alt={design.title}
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Design';
                      }}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{design.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {design.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold">${design.price}</span>
                      <Button size="sm" asChild>
                        <Link to={`/designs/${design.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Get Started?
          </h2>
          <p className="text-lg max-w-2xl mx-auto opacity-90">
            Join thousands of satisfied customers who have transformed their digital products with our designs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated ? (
              <Button size="lg" variant="secondary" asChild>
                <Link to="/designs">Browse Designs</Link>
              </Button>
            ) : (
              <>
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/signup">Sign Up Now</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                  <Link to="/pricing">View Pricing</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

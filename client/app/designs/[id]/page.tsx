'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Design } from '@/types';
import { designsApi } from '@/lib/api/designs';
import { useAppSelector } from '@/store/hooks';
import { ROUTES } from '@/lib/config';

export default function DesignDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const [design, setDesign] = useState<Design | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDesign = async () => {
      try {
        setLoading(true);
        const response = await designsApi.getSingle(id);
        setDesign(response.data);
      } catch (err) {
        setError('Failed to load design. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDesign();
    }
  }, [id]);

  const handlePurchase = () => {
    if (!isAuthenticated) {
      router.push(ROUTES.login);
      return;
    }
    // Navigate to pricing page with design ID
    router.push(`${ROUTES.pricing}?design=${id}`);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="mt-4 text-muted-foreground">Loading design...</p>
      </div>
    );
  }

  if (error || !design) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-destructive">{error || 'Design not found'}</p>
        <Button onClick={() => router.push(ROUTES.designs)} className="mt-4">
          Back to Designs
        </Button>
      </div>
    );
  }

  const categoryName =
    typeof design.category === 'string' ? design.category : design.category.name;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Design Preview */}
        <div>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
            <Image
              src={design.previewImageUrl}
              alt={design.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Design Info */}
        <div>
          <div className="mb-4 flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {categoryName}
            </span>
            <span className="rounded-full bg-secondary px-3 py-1 text-sm font-medium">
              {design.complexityLevel}
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-bold">{design.title}</h1>

          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">4.8</span>
              <span className="text-sm text-muted-foreground">(124 reviews)</span>
            </div>
          </div>

          <div className="mb-6">
            <span className="text-4xl font-bold text-primary">${design.price}</span>
          </div>

          <Button size="lg" className="mb-6 w-full" onClick={handlePurchase}>
            <ShoppingCart className="mr-2 h-5 w-5" />
            Purchase Design
          </Button>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>What&apos;s Included</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">Full design files</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">Lifetime updates</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">Commercial license</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span className="text-sm">Priority support</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4 text-sm">
            <div>
              <h3 className="mb-2 font-semibold">Designer</h3>
              <p className="text-muted-foreground">{design.designerName}</p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Tools Used</h3>
              <div className="flex flex-wrap gap-2">
                {design.usedTools.map((tool, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-secondary px-3 py-1 text-sm"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{design.description}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Design Process</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{design.process}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tags */}
      {design.tags && design.tags.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {design.tags.map((tag, index) => (
              <span
                key={index}
                className="rounded-full border px-3 py-1 text-sm text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

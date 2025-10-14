'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchDesigns } from '@/store/slices/designSlice';
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function DesignsPage() {
  const dispatch = useAppDispatch();
  const { designs, loading, pagination } = useAppSelector((state) => state.design);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchDesigns({ page, limit: 12 }));
  }, [dispatch, page]);

  const handleNextPage = () => {
    if (page * pagination.limit < pagination.total) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <MainLayout>
      <div className="container px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Design Gallery</h1>
          <p className="text-muted-foreground">
            Browse our collection of premium UI/UX designs
          </p>
        </div>

        {loading && designs.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted" />
                <CardHeader>
                  <div className="h-6 bg-muted rounded mb-2" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </CardHeader>
                <CardFooter>
                  <div className="h-10 bg-muted rounded w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : designs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No designs found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {designs.map((design) => (
                <Card key={design.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-muted">
                    {design.previewImageUrl && (
                      <Image
                        src={design.previewImageUrl}
                        alt={design.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <CardTitle className="text-xl">{design.title}</CardTitle>
                      <Badge variant={design.status === 'Active' ? 'default' : 'secondary'}>
                        {design.status}
                      </Badge>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {design.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-muted-foreground">
                        {typeof design.category === 'object' ? design.category.name : 'Uncategorized'}
                      </span>
                      <Badge variant="outline">{design.complexityLevel}</Badge>
                    </div>
                    <p className="text-2xl font-bold">${design.price}</p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/designs/${design.id}`} className="w-full">
                      <Button className="w-full">View Details</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {pagination.total > pagination.limit && (
              <div className="flex justify-center items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={handlePrevPage}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="text-sm">
                  Page {page} of {Math.ceil(pagination.total / pagination.limit)}
                </span>
                <Button
                  variant="outline"
                  onClick={handleNextPage}
                  disabled={page * pagination.limit >= pagination.total}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DesignCard from '@/components/design/DesignCard';
import { Design } from '@/types';
import { designsApi } from '@/lib/api/designs';

export default function DesignsPage() {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        setLoading(true);
        const response = await designsApi.getAll(page, 12);
        // The API returns data with a dynamic key (designs, etc.)
        const designsData = Object.values(response.data).find(
          (value) => Array.isArray(value)
        ) as Design[];
        
        setDesigns(designsData || []);
        if (response.data.pagination) {
          setTotalPages(Math.ceil(response.data.pagination.total / response.data.pagination.limit));
        }
      } catch (err) {
        setError('Failed to load designs. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, [page]);

  const filteredDesigns = designs.filter((design) =>
    design.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    design.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold">Browse Designs</h1>
        <p className="text-lg text-muted-foreground">
          Discover premium UI/UX designs for your next project
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search designs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="py-20 text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="mt-4 text-muted-foreground">Loading designs...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="py-20 text-center">
          <p className="text-destructive">{error}</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Try Again
          </Button>
        </div>
      )}

      {/* Designs Grid */}
      {!loading && !error && (
        <>
          {filteredDesigns.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-muted-foreground">No designs found.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredDesigns.map((design) => (
                <DesignCard key={design.id} design={design} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="px-4 text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                disabled={page === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

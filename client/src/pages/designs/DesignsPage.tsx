import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchDesigns } from '../../store/slices/designSlice';

const DesignsPage = () => {
  const dispatch = useAppDispatch();
  const { designs, loading, pagination } = useAppSelector((state) => state.designs);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchDesigns({ page: currentPage, limit: 12 }));
  }, [dispatch, currentPage]);

  const filteredDesigns = designs.filter((design) =>
    design.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    design.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Design Gallery</h1>
          <p className="text-muted-foreground">
            Browse our collection of premium UI/UX designs
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search designs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
            <p className="mt-4 text-muted-foreground">Loading designs...</p>
          </div>
        ) : (
          <>
            {/* Designs Grid */}
            {filteredDesigns.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No designs found</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                {filteredDesigns.map((design) => (
                  <Card key={design.id} className="overflow-hidden hover:shadow-lg transition-all hover:scale-105">
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <img
                        src={design.previewImageUrl}
                        alt={design.title}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Design';
                        }}
                      />
                      <div className="absolute top-2 right-2">
                        <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                          {design.complexityLevel}
                        </span>
                      </div>
                    </div>
                    <CardHeader className="space-y-2">
                      <CardTitle className="line-clamp-1 text-lg">{design.title}</CardTitle>
                      <CardDescription className="line-clamp-2 text-sm">
                        {design.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold">${design.price}</span>
                        <Button size="sm" asChild>
                          <Link to={`/designs/${design.id}`}>View</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.total > pagination.limit && (
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  Previous
                </Button>
                <span className="flex items-center px-4">
                  Page {pagination.page} of {Math.ceil(pagination.total / pagination.limit)}
                </span>
                <Button
                  variant="outline"
                  disabled={currentPage >= Math.ceil(pagination.total / pagination.limit)}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DesignsPage;

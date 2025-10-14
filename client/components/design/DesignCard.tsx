import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Design } from '@/types';
import { ROUTES } from '@/lib/config';
import { Star } from 'lucide-react';

interface DesignCardProps {
  design: Design;
}

export default function DesignCard({ design }: DesignCardProps) {
  const categoryName = typeof design.category === 'string' 
    ? design.category 
    : design.category.name;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full bg-muted">
          <Image
            src={design.previewImageUrl}
            alt={design.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-primary">{categoryName}</span>
          <span className="text-xs text-muted-foreground">{design.complexityLevel}</span>
        </div>
        <CardTitle className="mb-2 line-clamp-2 text-lg">{design.title}</CardTitle>
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {design.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">4.8</span>
          </div>
          <span className="text-lg font-bold text-primary">${design.price}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Link href={ROUTES.designDetail(design.id)} className="w-full">
          <Button className="w-full" variant="outline">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

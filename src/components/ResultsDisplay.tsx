import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Heart, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PredictionResult {
  animalType: 'cattle' | 'buffalo';
  breed: string;
  typeConfidence: number;
  breedConfidence: number;
  imageUrl?: string;
}

interface ResultsDisplayProps {
  result: PredictionResult | null;
  isLoading: boolean;
  className?: string;
}

function ConfidenceMeter({ label, confidence, variant = 'default' }: { 
  label: string; 
  confidence: number; 
  variant?: 'default' | 'success' | 'warning';
}) {
  const getColor = () => {
    if (variant === 'success') return 'bg-success';
    if (variant === 'warning') return 'bg-yellow-500';
    return 'bg-primary';
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">
          {(confidence * 100).toFixed(1)}%
        </span>
      </div>
      <Progress 
        value={confidence * 100} 
        className={cn("h-2", getColor())}
      />
    </div>
  );
}

export function ResultsDisplay({ result, isLoading, className }: ResultsDisplayProps) {
  if (isLoading) {
    return (
      <Card className={cn("shadow-card", className)}>
        <CardContent className="p-8">
          <div className="text-center space-y-4 animate-pulse">
            <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-muted-foreground animate-spin" />
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4 mx-auto" />
              <div className="h-3 bg-muted rounded w-1/2 mx-auto" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className={cn("shadow-card", className)}>
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-muted/50 rounded-full flex items-center justify-center">
              <Info className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <p className="font-medium text-muted-foreground">
                No results yet
              </p>
              <p className="text-sm text-muted-foreground">
                Upload an image to see AI-powered breed classification
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("shadow-card", className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          Classification Results
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {result.imageUrl && (
          <div className="aspect-video rounded-lg overflow-hidden bg-muted">
            <img
              src={result.imageUrl}
              alt="Analyzed livestock"
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="grid gap-4">
          <div className="flex items-center justify-between p-4 bg-gradient-card rounded-lg">
            <div>
              <p className="font-medium">Animal Type</p>
              <p className="text-2xl font-bold text-primary capitalize">
                {result.animalType}
              </p>
            </div>
            <Badge 
              variant={result.typeConfidence > 0.8 ? "default" : "secondary"}
              className="bg-gradient-primary"
            >
              {(result.typeConfidence * 100).toFixed(1)}% confident
            </Badge>
          </div>
          
          <div className="p-4 bg-gradient-card rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <p className="font-medium">Predicted Breed</p>
              <Badge variant="outline">
                {result.breed}
              </Badge>
            </div>
            
            <div className="space-y-3">
              <ConfidenceMeter
                label="Type Classification"
                confidence={result.typeConfidence}
                variant={result.typeConfidence > 0.8 ? 'success' : 'warning'}
              />
              <ConfidenceMeter
                label="Breed Recognition"
                confidence={result.breedConfidence}
                variant={result.breedConfidence > 0.7 ? 'success' : 'warning'}
              />
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-accent/30 rounded-lg">
          <p className="text-xs text-muted-foreground">
            <Info className="w-3 h-3 inline mr-1" />
            Results are generated using our two-stage AI classification pipeline.
            Higher confidence scores indicate more reliable predictions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UploadZone } from '@/components/UploadZone';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { Brain, Zap, Target, Github, FileText, Presentation } from 'lucide-react';
import heroImage from '@/assets/hero-livestock.jpg';
import aiIcon from '@/assets/ai-classification-icon.jpg';

interface PredictionResult {
  animalType: 'cattle' | 'buffalo';
  breed: string;
  typeConfidence: number;
  breedConfidence: number;
  imageUrl?: string;
}

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // Simulate API call with mock result
    setIsLoading(true);
    setTimeout(() => {
      setResult({
        animalType: 'cattle',
        breed: 'Gir',
        typeConfidence: 0.92,
        breedConfidence: 0.87,
        imageUrl: URL.createObjectURL(file),
      });
      setIsLoading(false);
    }, 2000);
  };

  const handleAnalyze = () => {
    if (!selectedFile) return;
    handleFileSelect(selectedFile);
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Agricultural Technology"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-hero" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-gradient-primary shadow-primary">
              Smart India Hackathon 2025
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary-glow to-success bg-clip-text text-transparent">
              AI Livestock Classification
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Advanced dual-stage AI system for precise cattle and buffalo breed recognition. 
              Combining computer vision with agricultural expertise for smart farming solutions.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-primary shadow-primary hover:shadow-glow transition-all duration-300">
                <Brain className="w-4 h-4 mr-2" />
                Try Classification
              </Button>
              <Button variant="outline" className="hover:shadow-card transition-all duration-300">
                <Github className="w-4 h-4 mr-2" />
                View Source
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Dual-Stage AI Pipeline
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-card hover:shadow-glow transition-all duration-300 bg-gradient-card">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Stage 1: Type Classification</CardTitle>
                <CardDescription>
                  Initial classification to distinguish between cattle and buffalo using advanced CNN models.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="shadow-card hover:shadow-glow transition-all duration-300 bg-gradient-card">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Stage 2: Breed Recognition</CardTitle>
                <CardDescription>
                  Specialized breed classification using type-specific models trained on diverse livestock datasets.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="shadow-card hover:shadow-glow transition-all duration-300 bg-gradient-card">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Real-time Analysis</CardTitle>
                <CardDescription>
                  Fast inference with confidence scoring and detailed breed information for agricultural applications.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Upload and Results Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Test the AI Classification
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Upload an image of cattle or buffalo to see our dual-stage AI pipeline in action. 
                Get instant breed classification with confidence scores.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <UploadZone
                  onFileSelect={setSelectedFile}
                  selectedFile={selectedFile}
                />
                
                {selectedFile && (
                  <Button
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="w-full bg-gradient-primary shadow-primary hover:shadow-glow transition-all duration-300"
                    size="lg"
                  >
                    {isLoading ? (
                      <>
                        <Brain className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Analyze Image
                      </>
                    )}
                  </Button>
                )}
              </div>
              
              <ResultsDisplay
                result={result}
                isLoading={isLoading}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Technical Architecture
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="shadow-card bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <img src={aiIcon} alt="AI" className="w-6 h-6" />
                  Frontend Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• React/Next.js with TypeScript</li>
                  <li>• Tailwind CSS for responsive design</li>
                  <li>• Drag-and-drop image upload</li>
                  <li>• Real-time confidence visualization</li>
                  <li>• Progressive Web App features</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="shadow-card bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  AI/ML Pipeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• FastAPI backend with Python</li>
                  <li>• PyTorch/TensorFlow models</li>
                  <li>• Two-stage classification system</li>
                  <li>• Image preprocessing & augmentation</li>
                  <li>• Confidence-based predictions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-12 text-center space-y-6">
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" className="hover:shadow-card transition-all duration-300">
                <FileText className="w-4 h-4 mr-2" />
                Documentation
              </Button>
              <Button variant="outline" className="hover:shadow-card transition-all duration-300">
                <Presentation className="w-4 h-4 mr-2" />
                SIH Presentation
              </Button>
              <Button variant="outline" className="hover:shadow-card transition-all duration-300">
                <Github className="w-4 h-4 mr-2" />
                GitHub Repository
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Developed for Smart India Hackathon 2025 • Problems SIH25004 & SIH25005
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;

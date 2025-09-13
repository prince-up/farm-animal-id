import { useState, useCallback } from 'react';
import { Upload, Camera, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  selectedFile: File | null;
  className?: string;
}

export function UploadZone({ onFileSelect, selectedFile, className }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => file.type.startsWith('image/'));
    
    if (imageFile) {
      onFileSelect(imageFile);
    }
  }, [onFileSelect]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  }, [onFileSelect]);

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300",
        "border-2 border-dashed",
        isDragging 
          ? "border-primary bg-accent/20 shadow-glow" 
          : "border-muted-foreground/30 hover:border-primary/50",
        selectedFile && "border-success bg-success/5",
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="p-8 text-center space-y-4">
        {selectedFile ? (
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center">
              <FileImage className="w-8 h-8 text-success" />
            </div>
            <div>
              <p className="font-medium text-success">{selectedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => document.getElementById('file-input')?.click()}
              className="transition-all duration-300 hover:shadow-card"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose Different Image
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className={cn(
              "w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-300",
              isDragging 
                ? "bg-primary/20 shadow-glow" 
                : "bg-muted/50"
            )}>
              <Camera className={cn(
                "w-10 h-10 transition-colors duration-300",
                isDragging ? "text-primary" : "text-muted-foreground"
              )} />
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-medium">
                Upload Livestock Image
              </p>
              <p className="text-muted-foreground max-w-md mx-auto">
                Drag and drop an image of cattle or buffalo, or click to browse files.
                Supports JPG, PNG, and WEBP formats.
              </p>
            </div>
            
            <Button
              onClick={() => document.getElementById('file-input')?.click()}
              className="bg-gradient-primary shadow-primary hover:shadow-glow transition-all duration-300"
            >
              <Upload className="w-4 h-4 mr-2" />
              Select Image
            </Button>
          </div>
        )}
        
        <input
          id="file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
    </Card>
  );
}
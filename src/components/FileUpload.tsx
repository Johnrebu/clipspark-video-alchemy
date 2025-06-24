
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Upload } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import mammoth from 'mammoth';

interface FileUploadProps {
  onTextExtracted: (text: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onTextExtracted }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const processFile = useCallback(async (file: File) => {
    setIsProcessing(true);
    
    try {
      let content = '';
      
      if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
        content = await file.text();
      } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.name.endsWith('.docx')) {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        content = result.value;
      } else {
        throw new Error('Unsupported file type. Please upload a .txt or .docx file.');
      }
      
      if (!content.trim()) {
        throw new Error('The file appears to be empty.');
      }
      
      onTextExtracted(content);
      toast({
        title: "File uploaded successfully",
        description: `${file.name} has been processed and text extracted.`,
      });
    } catch (error: any) {
      console.error('Error processing file:', error);
      toast({
        title: "Error processing file",
        description: error.message || "Failed to process the uploaded file.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [onTextExtracted, toast]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length === 0) return;

    const file = files[0];
    processFile(file);
  }, [processFile]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload a Document</CardTitle>
        <CardDescription>
          Upload a .txt or .docx file containing your text
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div 
          className={`border-2 border-dashed rounded-lg p-10 text-center transition-colors ${
            isDragging 
              ? 'border-brand-purple bg-brand-purple/5' 
              : 'border-muted hover:border-muted-foreground/50'
          }`}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div className={`transition-colors ${isDragging ? 'text-brand-purple' : 'text-muted-foreground'}`}>
              {isProcessing ? (
                <Upload className="h-10 w-10 animate-spin" />
              ) : (
                <FileText className="h-10 w-10" />
              )}
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-medium">
                {isDragging ? 'Drop your file here' : 'Drag and drop your file here'}
              </h3>
              <p className="text-sm text-muted-foreground">
                Supported formats: .txt, .docx (max 10MB)
              </p>
            </div>
            <label className="cursor-pointer">
              <Input 
                type="file" 
                className="hidden"
                accept=".txt,.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain" 
                onChange={handleFileInput}
                disabled={isProcessing}
              />
              <Button variant="outline" disabled={isProcessing}>
                {isProcessing ? 'Processing...' : 'Select File'}
              </Button>
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;

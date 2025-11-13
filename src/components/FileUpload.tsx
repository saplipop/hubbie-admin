import { useState, useRef } from "react";
import { Upload, Download, FileText, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { apiDataManager } from "@/lib/apiDataManager";

interface FileUploadProps {
  documentId: string;
  customerId: string;
  documentNumber: string;
  documentName: string;
  existingFileId?: string;
  onUploadComplete: (fileId: string) => void;
  onDelete?: () => void;
  acceptedFormats?: string;
  disabled?: boolean;
  disabledMessage?: string;
}

export function FileUpload({
  documentId,
  customerId,
  documentNumber,
  documentName,
  existingFileId,
  onUploadComplete,
  onDelete,
  acceptedFormats = ".pdf,.jpg,.jpeg,.png,.docx",
  disabled = false,
  disabledMessage = "Complete required fields before uploading",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const existingFile = undefined; // Backend-managed; preview handled elsewhere

  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!documentNumber?.trim()) {
      toast({
        title: "Document Number Required",
        description: "Enter a valid document number before uploading",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    const validTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Only PDF, JPG, and PNG files are allowed",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast({
        title: "File Too Large",
        description: "Please upload a file smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const { fileId } = await apiDataManager.uploadDocumentFile(
        customerId,
        documentId,
        file,
        documentNumber
      );

      setUploadProgress(100);

      onUploadComplete(fileId);
      toast({
        title: "Upload Successful",
        description: `${file.name} has been uploaded`,
      });
    } catch (error: any) {
      toast({
        title: "Upload Failed",
        description: error?.response?.data?.message || error?.message || "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => {
        setUploading(false);
        setUploadProgress(0);
      }, 300);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDownload = () => {
    // Backend-managed files - use fileUrl from backend
    toast({
      title: "Download",
      description: "File download from backend - implement with fileUrl",
    });
  };

  const handleDelete = async () => {
    if (onDelete) {
      try {
        await apiDataManager.deleteDocumentFile(customerId, documentId);
        onDelete();
        toast({
          title: "File Deleted",
          description: "The file has been removed",
        });
      } catch (error: any) {
        toast({
          title: "Delete Failed",
          description: error?.message || "Failed to delete file",
          variant: "destructive",
        });
      }
    }
  };

  const getFileIcon = () => {
    return <FileText className="h-4 w-4 text-primary" />;
  };

  const hasExistingFile = !!existingFileId;

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedFormats}
        onChange={handleFileSelect}
        className="hidden"
        id={`file-${documentId}`}
      />

      {hasExistingFile ? (
        <div className="flex items-center gap-2 p-3 border rounded-lg bg-muted/50">
          {getFileIcon()}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{documentName}</p>
            <p className="text-xs text-muted-foreground">File uploaded</p>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDelete}
              title="Delete"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              title="Re-upload"
            >
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <label
            htmlFor={disabled ? undefined : `file-${documentId}`}
            className={`flex items-center justify-center gap-2 p-4 border-2 border-dashed rounded-lg transition-colors ${
              disabled 
                ? "cursor-not-allowed opacity-50 bg-muted/30" 
                : "cursor-pointer hover:bg-muted/50"
            }`}
            title={disabled ? disabledMessage : undefined}
          >
            <Upload className="h-4 w-4" />
            <span className="text-sm">
              {uploading ? `Uploading... ${uploadProgress}%` : disabled ? disabledMessage : "Click to upload"}
            </span>
            <Badge variant="outline" className="text-xs">
              PDF, JPG, PNG
            </Badge>
          </label>
          {uploading && (
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className="bg-primary h-full transition-all duration-300 ease-out"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
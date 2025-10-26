import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, FileSpreadsheet } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isUploading: boolean;
}

export const FileUpload = ({ onFileSelect, isUploading }: FileUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
          toast.error("Please upload a CSV file");
          return;
        }
        onFileSelect(file);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
    multiple: false,
    disabled: isUploading,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        {...getRootProps()}
        className={`
          relative overflow-hidden card-elevated p-12 cursor-pointer
          transition-all duration-300 group
          ${isDragActive ? "border-primary scale-105" : "hover:border-primary/50"}
          ${isUploading ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-6">
          <motion.div
            animate={{
              scale: isDragActive ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
            className="p-6 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors"
          >
            {isDragActive ? (
              <FileSpreadsheet className="w-12 h-12 text-primary animate-pulse" />
            ) : (
              <Upload className="w-12 h-12 text-primary" />
            )}
          </motion.div>
          
          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-foreground">
              {isDragActive ? "Drop your file here" : "Upload Customer Data"}
            </h3>
            <p className="text-muted-foreground max-w-md">
              Drag and drop your CSV file here, or click to browse
            </p>
            <p className="text-sm text-muted-foreground/70">
              Supported format: CSV files only
            </p>
          </div>
        </div>

        {isUploading && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-medium text-foreground">Processing...</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

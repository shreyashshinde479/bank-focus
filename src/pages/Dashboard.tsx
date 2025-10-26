import { useState } from "react";
import { FileUpload } from "@/components/FileUpload";
import { ResultsTable } from "@/components/ResultsTable";
import { SummaryChart } from "@/components/SummaryChart";
import axios from "axios";
import { toast } from "react-hot-toast";
import Papa from "papaparse";
import { motion } from "framer-motion";

const API_BASE_URL = "http://localhost:5000";

interface Prediction {
  prediction: number;
  [key: string]: any;
}

export const Dashboard = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    
    try {
      // Parse CSV file
      Papa.parse(file, {
        header: true,
        complete: async (results) => {
          try {
            // Send to backend
            const response = await axios.post(`${API_BASE_URL}/predict`, {
              data: results.data,
            });

            setPredictions(response.data.predictions);
            toast.success("Predictions generated successfully!");
          } catch (error) {
            console.error("Prediction error:", error);
            toast.error("Failed to generate predictions. Make sure the backend is running.");
          } finally {
            setIsUploading(false);
          }
        },
        error: (error) => {
          console.error("CSV parsing error:", error);
          toast.error("Failed to parse CSV file");
          setIsUploading(false);
        },
      });
    } catch (error) {
      console.error("File processing error:", error);
      toast.error("Failed to process file");
      setIsUploading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/download`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "predictions.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      toast.success("CSV downloaded successfully!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download CSV");
    }
  };

  const churnCount = predictions.filter((p) => p.prediction === 1).length;
  const noChurnCount = predictions.filter((p) => p.prediction === 0).length;

  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Prediction Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Upload your customer data to get instant churn predictions
          </p>
        </motion.div>

        <div className="space-y-8">
          <FileUpload onFileSelect={handleFileSelect} isUploading={isUploading} />

          {predictions.length > 0 && (
            <>
              <SummaryChart churnCount={churnCount} noChurnCount={noChurnCount} />
              <ResultsTable predictions={predictions} onDownload={handleDownload} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

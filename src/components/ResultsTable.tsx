import { motion } from "framer-motion";
import { Download, TrendingDown, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Prediction {
  customer_id?: string;
  prediction: number;
  [key: string]: any;
}

interface ResultsTableProps {
  predictions: Prediction[];
  onDownload: () => void;
}

export const ResultsTable = ({ predictions, onDownload }: ResultsTableProps) => {
  const getColumns = () => {
    if (predictions.length === 0) return [];
    const firstRow = predictions[0];
    return Object.keys(firstRow).filter(key => key !== "prediction");
  };

  const columns = getColumns();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Prediction Results</h2>
          <p className="text-muted-foreground mt-1">
            Analyzed {predictions.length} customer records
          </p>
        </div>
        <Button
          onClick={onDownload}
          variant="success"
          className="gap-2"
        >
          <Download className="w-4 h-4" />
          Download CSV
        </Button>
      </div>

      <div className="card-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                {columns.map((column) => (
                  <TableHead key={column} className="font-semibold">
                    {column.replace(/_/g, " ").toUpperCase()}
                  </TableHead>
                ))}
                <TableHead className="font-semibold">PREDICTION</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {predictions.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-muted/30 transition-colors"
                >
                  {columns.map((column) => (
                    <TableCell key={column} className="font-medium">
                      {row[column]}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Badge
                      variant={row.prediction === 1 ? "destructive" : "success"}
                      className="flex items-center gap-2 w-fit"
                    >
                      {row.prediction === 1 ? (
                        <>
                          <TrendingDown className="w-3 h-3" />
                          Will Churn
                        </>
                      ) : (
                        <>
                          <TrendingUp className="w-3 h-3" />
                          No Churn
                        </>
                      )}
                    </Badge>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </motion.div>
  );
};

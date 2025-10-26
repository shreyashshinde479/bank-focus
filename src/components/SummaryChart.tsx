import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface SummaryChartProps {
  churnCount: number;
  noChurnCount: number;
}

export const SummaryChart = ({ churnCount, noChurnCount }: SummaryChartProps) => {
  const data = [
    { name: "Will Churn", value: churnCount, color: "hsl(var(--destructive))" },
    { name: "No Churn", value: noChurnCount, color: "hsl(var(--success))" },
  ];

  const total = churnCount + noChurnCount;
  const churnPercentage = ((churnCount / total) * 100).toFixed(1);
  const noChurnPercentage = ((noChurnCount / total) * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="card-elevated p-8"
    >
      <h3 className="text-xl font-bold text-foreground mb-6">Churn Summary</h3>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col justify-center gap-4">
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-muted-foreground mb-1">Customers at Risk</p>
              <p className="text-3xl font-bold text-destructive">{churnCount}</p>
              <p className="text-sm text-muted-foreground mt-1">{churnPercentage}% of total</p>
            </div>
            
            <div className="p-4 rounded-lg bg-success/10 border border-success/20">
              <p className="text-sm text-muted-foreground mb-1">Retained Customers</p>
              <p className="text-3xl font-bold text-success">{noChurnCount}</p>
              <p className="text-sm text-muted-foreground mt-1">{noChurnPercentage}% of total</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

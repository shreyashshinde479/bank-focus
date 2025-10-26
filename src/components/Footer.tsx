export const Footer = () => {
  return (
    <footer className="py-8 border-t border-border/50 mt-20">
      <div className="container mx-auto px-6 text-center">
        <p className="text-sm text-muted-foreground">
          © 2025{" "}
          <span className="font-semibold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Bank Churn Predictor
          </span>
          . Powered by AI Analytics
        </p>
      </div>
    </footer>
  );
};

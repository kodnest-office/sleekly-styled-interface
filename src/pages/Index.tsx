
const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 animate-fade-in">
      <div className="max-w-4xl w-full px-6 py-16 space-y-8">
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/5 text-primary animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Welcome to your application
          </div>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Start Building Your Amazing Project
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Create something extraordinary with modern tools and endless possibilities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="group relative overflow-hidden rounded-2xl hover-scale">
            <div className="p-8 glass-effect border">
              <h3 className="text-xl font-medium mb-2">Modern Design</h3>
              <p className="text-muted-foreground">
                Clean, minimal aesthetics with attention to every detail.
              </p>
            </div>
          </div>
          
          <div className="group relative overflow-hidden rounded-2xl hover-scale">
            <div className="p-8 glass-effect border">
              <h3 className="text-xl font-medium mb-2">Powerful Features</h3>
              <p className="text-muted-foreground">
                Built with the latest technologies for optimal performance.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 pt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <button className="px-6 py-2.5 rounded-full bg-primary text-primary-foreground hover:opacity-90 transition-opacity">
            Get Started
          </button>
          <button className="px-6 py-2.5 rounded-full border border-input bg-background hover:bg-secondary transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;

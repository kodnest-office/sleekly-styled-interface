
import { useRef, useState } from 'react';
import Editor from "@monaco-editor/react";
import { Loader2 } from 'lucide-react';

const Index = () => {
  const editorRef = useRef(null);
  const [output, setOutput] = useState("Output will be displayed here");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isOutputCollapsed, setIsOutputCollapsed] = useState(false);
  const [isEditorCollapsed, setIsEditorCollapsed] = useState(false);

  const defaultCode = `class Main {
  public static void main(String[] args) {
    System.out.println("I will get a Job.");
  }
}`;

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const runCode = async () => {
    if (!editorRef.current) return;

    try {
      setIsLoading(true);
      const sourceCode = editorRef.current.getValue();
      const languageId = 62;
      const apiKey = "3bb57c5278msh2673c6e0d2d15afp1a6c7djsne396dbe33ed5";
      const host = 'judge0-ce.p.rapidapi.com';
      
      const response = await fetch(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": host
          },
          body: JSON.stringify({
            source_code: sourceCode,
            language_id: languageId,
          }),
        }
      );

      const data = await response.json();
      let output;
      
      if (data?.stdout) {
        output = data.stdout;
        setIsError(false);
      } else if (data?.compile_output) {
        output = data.compile_output;
        setIsError(true);
      } else if (data?.stderr) {
        output = data.stderr;
        setIsError(true);
      } else {
        output = "There seems to be an issue with your code.";
        setIsError(true);
      }

      setOutput(output);
    } catch (error) {
      console.error("Error submitting code:", error);
      setOutput("Error running code. Please try again.");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Code Editor</h1>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Section */}
        <div className={`flex-1 border-r border-border transition-all duration-300 ${isEditorCollapsed ? 'w-0 opacity-0' : ''}`}>
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <button 
                onClick={() => setIsEditorCollapsed(!isEditorCollapsed)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {isEditorCollapsed ? '>' : '<'} Code Editor
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <Editor
                height="100%"
                defaultLanguage="java"
                defaultValue={defaultCode}
                theme="vs-dark"
                options={{
                  fontSize: 16,
                  minimap: { enabled: false },
                  padding: { top: 20 },
                }}
                onMount={handleEditorDidMount}
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Output Section */}
        <div className={`flex-1 transition-all duration-300 ${isOutputCollapsed ? 'w-0 opacity-0' : ''}`}>
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-border flex justify-between items-center">
              <button 
                onClick={() => setIsOutputCollapsed(!isOutputCollapsed)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Output {isOutputCollapsed ? '<' : '>'}
              </button>
            </div>
            <div className="flex-1 p-6 bg-card overflow-auto">
              {isLoading ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="animate-spin h-8 w-8 text-primary" />
                </div>
              ) : (
                <pre className={`font-mono text-sm ${isError ? 'text-destructive' : 'text-foreground'}`}>
                  {output}
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border bg-card p-4">
        <div className="flex justify-end">
          <button
            onClick={runCode}
            disabled={isLoading}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4" />
                Running...
              </>
            ) : (
              'Run Code'
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Index;

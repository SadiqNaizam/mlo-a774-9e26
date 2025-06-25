import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Save, Play } from 'lucide-react';

// Custom Layout Components
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

// Custom Page-Specific Components
import ComponentLibraryPanel, { BuildableComponentType } from '@/components/ComponentLibraryPanel';
import AppCanvas, { CanvasComponent } from '@/components/AppCanvas';
import PropertiesInspectorPanel from '@/components/PropertiesInspectorPanel';

// Shadcn/ui components
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";

const AppEditorPage: React.FC = () => {
  console.log('AppEditorPage loaded');
  const { toast } = useToast();
  
  // State to hold the component currently selected on the canvas
  const [selectedComponent, setSelectedComponent] = useState<CanvasComponent | null>(null);

  // This handler is called by the AppCanvas when a component is selected or deselected
  const handleComponentSelect = useCallback((component: CanvasComponent | null) => {
    console.log("Component selected in canvas:", component);
    setSelectedComponent(component);
  }, []);

  // This handler is called by the PropertiesInspectorPanel when a property is changed
  const handlePropertyChange = (componentId: string, propertyName: string, value: any) => {
    // In a fully integrated app, this would update the state of the components
    // array, which would then be passed as a prop to AppCanvas to re-render.
    // Due to the current self-contained state of AppCanvas, we will just log the action.
    console.log(
      `Property Change: Component ID: ${componentId}, Property: ${propertyName}, New Value:`,
      value
    );
    // Example: setCanvasComponents(prev => prev.map(c => c.id === componentId ? { ...c, props: { ...c.props, [propertyName]: value } } : c));
    toast({
        title: "Property Changed (Simulated)",
        description: `Property "${propertyName}" for component ${componentId} was changed. Canvas update is not implemented in the provided component.`,
    });
  };
  
  // This handler is called by the ComponentLibraryPanel when a component is clicked
  const handleAddComponent = (componentType: BuildableComponentType) => {
    // In a fully integrated app, this would add a new component to a central
    // state array, which would then be passed as a prop to AppCanvas.
    // Due to the current self-contained state of AppCanvas, we will just log the action.
    console.log(`Add Component Request: Type: ${componentType}`);
    toast({
      title: "Add Component (Simulated)",
      description: `Add a ${componentType}. Canvas update is not implemented in the provided component. Use canvas test buttons for now.`,
    });
  };
  
  const handleSave = () => {
    console.log("Saving project...");
    toast({
      title: "Project Saved",
      description: "Your application configuration has been saved successfully.",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-muted/40">
      <Header />

      {/* Editor-specific action bar */}
      <div className="bg-background border-b p-2 flex items-center justify-between px-4">
        <div>
          <h1 className="text-lg font-semibold">App Editor</h1>
          <p className="text-sm text-muted-foreground">My New Awesome App</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/">
                Back to Dashboard
            </Link>
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Play className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Preview your application</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save your project</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <main className="flex-grow p-4 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full rounded-lg border">
          <ResizablePanel defaultSize={20} minSize={15}>
            <ComponentLibraryPanel onAddComponent={handleAddComponent} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={55} minSize={30}>
            <div className="p-4 h-full">
              <AppCanvas onComponentSelect={handleComponentSelect} />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={25} minSize={15}>
            <PropertiesInspectorPanel
              selectedComponent={selectedComponent}
              onPropertyChange={handlePropertyChange}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
      
      {/* The footer is removed from this page to maximize editor space,
          which is common for application-style interfaces. A minimal status
          bar could be added if needed, but for now, we'll omit the full footer. */}
    </div>
  );
};

export default AppEditorPage;
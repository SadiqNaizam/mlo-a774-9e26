import React from 'react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MousePointerClick } from 'lucide-react';

// This interface defines the shape of the data for a component selected on the canvas.
// It can be exported to be used by the parent page (e.g., AppEditorPage).
export interface SelectedComponent {
  id: string;
  type: 'Button' | 'Card' | 'Input' | 'Text'; // Extend with more component types as needed
  props: {
    [key: string]: any;
  };
}

interface PropertiesInspectorPanelProps {
  selectedComponent: SelectedComponent | null;
  onPropertyChange: (componentId: string, propertyName: string, value: any) => void;
}

const PropertiesInspectorPanel: React.FC<PropertiesInspectorPanelProps> = ({ selectedComponent, onPropertyChange }) => {
  console.log('PropertiesInspectorPanel loaded');

  // Renders the appropriate form fields based on the selected component's type.
  const renderPropertyFields = () => {
    if (!selectedComponent) return null;

    const { id, type, props } = selectedComponent;

    // Generic handler for standard input elements
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onPropertyChange(id, e.target.name, e.target.value);
    };

    // Generic handler for shadcn/ui Select components
    const handleSelectChange = (propertyName: string) => (value: string) => {
      onPropertyChange(id, propertyName, value);
    };

    switch (type) {
      case 'Button':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="button-text">Text</Label>
              <Input
                id="button-text"
                name="children"
                value={props.children || ''}
                onChange={handleInputChange}
                placeholder="Button Label"
              />
            </div>
            <div>
              <Label htmlFor="button-variant">Variant</Label>
              <Select name="variant" onValueChange={handleSelectChange('variant')} value={props.variant || 'default'}>
                <SelectTrigger id="button-variant">
                  <SelectValue placeholder="Select variant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="destructive">Destructive</SelectItem>
                  <SelectItem value="outline">Outline</SelectItem>
                  <SelectItem value="secondary">Secondary</SelectItem>
                  <SelectItem value="ghost">Ghost</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="button-size">Size</Label>
              <Select name="size" onValueChange={handleSelectChange('size')} value={props.size || 'default'}>
                <SelectTrigger id="button-size">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                  <SelectItem value="icon">Icon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      
      case 'Card':
        return (
           <div className="space-y-4">
            <div>
              <Label htmlFor="card-title">Title</Label>
              <Input
                id="card-title"
                name="title"
                value={props.title || ''}
                onChange={handleInputChange}
                placeholder="Card Title"
              />
            </div>
            <div>
              <Label htmlFor="card-description">Description</Label>
              <Input
                id="card-description"
                name="description"
                value={props.description || ''}
                onChange={handleInputChange}
                placeholder="Card Description"
              />
            </div>
           </div>
        );

      default:
        return <p className="text-sm text-muted-foreground">No editable properties for this component type.</p>;
    }
  };

  return (
    <Card className="h-full flex flex-col" data-testid="properties-inspector-panel">
      <CardHeader>
        <CardTitle>Properties</CardTitle>
        <CardDescription>
          {selectedComponent ? `Editing: ${selectedComponent.type}` : 'Select an element to inspect.'}
        </CardDescription>
      </CardHeader>
      <ScrollArea className="flex-grow">
        <CardContent>
          {selectedComponent ? (
            renderPropertyFields()
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground pt-12">
              <MousePointerClick className="h-10 w-10 mb-4" />
              <p className="font-semibold">No Component Selected</p>
              <p className="text-sm px-4">Click on a component on the canvas to see its properties here.</p>
            </div>
          )}
        </CardContent>
      </ScrollArea>
    </Card>
  );
};

export default PropertiesInspectorPanel;
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MousePointerClick,
  RectangleVertical,
  Type,
  PanelTop,
  ImageIcon,
  Heading1,
} from 'lucide-react';

// Define the types of components that can be added
export type BuildableComponentType = 'Button' | 'Card' | 'Input' | 'Header' | 'Image' | 'Text';

interface ComponentLibraryPanelProps {
  onAddComponent: (componentType: BuildableComponentType) => void;
}

// Define the visual representation for each component in the library
const availableComponents: { name: BuildableComponentType; icon: React.ReactNode; description: string }[] = [
  {
    name: 'Button',
    icon: <MousePointerClick className="w-6 h-6 mb-2" />,
    description: 'Triggers an action.',
  },
  {
    name: 'Card',
    icon: <RectangleVertical className="w-6 h-6 mb-2" />,
    description: 'A content container.',
  },
  {
    name: 'Input',
    icon: <Type className="w-6 h-6 mb-2" />,
    description: 'A text input field.',
  },
  {
    name: 'Header',
    icon: <PanelTop className="w-6 h-6 mb-2" />,
    description: 'A section header.',
  },
  {
    name: 'Image',
    icon: <ImageIcon className="w-6 h-6 mb-2" />,
    description: 'A visual element.',
  },
  {
    name: 'Text',
    icon: <Heading1 className="w-6 h-6 mb-2" />,
    description: 'A block of text.',
  },
];

const ComponentLibraryPanel: React.FC<ComponentLibraryPanelProps> = ({ onAddComponent }) => {
  console.log('ComponentLibraryPanel loaded');

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Components</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <ScrollArea className="h-full pr-3">
          <div className="grid grid-cols-2 gap-4">
            {availableComponents.map((component) => (
              <div
                key={component.name}
                onClick={() => onAddComponent(component.name)}
                className="flex flex-col items-center justify-center p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:bg-accent hover:shadow-md hover:scale-105"
                title={`Add a ${component.name} component`}
              >
                {component.icon}
                <span className="text-sm font-medium text-center">{component.name}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ComponentLibraryPanel;
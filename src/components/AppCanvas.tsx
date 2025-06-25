import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { PlusCircle } from 'lucide-react';

// Define the structure for a component that can be placed on the canvas
export interface CanvasComponent {
  id: string;
  type: 'Button' | 'Input' | 'Card';
  props: any; // Can be more specific with discriminated unions if needed
  layout: { x: number; y: number };
}

interface AppCanvasProps {
  // In a real app, this would be used to inform the PropertiesInspectorPanel
  onComponentSelect: (component: CanvasComponent | null) => void;
  // A way for the ComponentLibraryPanel to add components
  // newComponentTypeToAdd: 'Button' | 'Input' | 'Card' | null; 
}

// A simple renderer for canvas components
const renderComponent = (component: CanvasComponent) => {
  switch (component.type) {
    case 'Button':
      return <Button {...component.props} className="pointer-events-none">{component.props.text || 'Button'}</Button>;
    case 'Input':
      return <Input {...component.props} className="pointer-events-none" placeholder={component.props.placeholder || 'Input Field'} />;
    case 'Card':
      return (
        <Card {...component.props} className="pointer-events-none w-[250px]">
          <CardContent className="p-4">
            <p>{component.props.content || "This is a card component. Select it to edit its properties."}</p>
          </CardContent>
        </Card>
      );
    default:
      return <div className="text-red-500">Unknown Component Type</div>;
  }
};

const AppCanvas: React.FC<AppCanvasProps> = ({ onComponentSelect }) => {
  console.log('AppCanvas loaded');
  const [components, setComponents] = useState<CanvasComponent[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  useEffect(() => {
    const selectedComponent = components.find(c => c.id === selectedComponentId) || null;
    onComponentSelect(selectedComponent);
    console.log('Selected component:', selectedComponent);
  }, [selectedComponentId, components, onComponentSelect]);

  const handleSelectComponent = (e: React.MouseEvent, id: string) => {
    e.stopPropagation(); // Prevent canvas click from unselecting immediately
    setSelectedComponentId(id);
  };
  
  const handleCanvasClick = () => {
    setSelectedComponentId(null);
  };

  const handleDragEnd = (event: any, info: any, componentId: string) => {
    setComponents(prevComponents =>
      prevComponents.map(c =>
        c.id === componentId
          ? { ...c, layout: { x: info.point.x, y: info.point.y } }
          : c
      )
    );
  };
  
  // --- Temporary function to simulate adding components from the library ---
  const addComponent = (type: 'Button' | 'Input' | 'Card') => {
    const newComponent: CanvasComponent = {
      id: `${type}-${Date.now()}`,
      type,
      props: {},
      layout: { x: 50, y: 50 }, // Default position
    };
    setComponents(prev => [...prev, newComponent]);
  };
  // --- End of temporary function ---

  return (
    <div
      onClick={handleCanvasClick}
      className="relative w-full h-full bg-gray-100 dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle, #E0E0E0 1px, rgba(0,0,0,0) 1px)',
        backgroundSize: '20px 20px'
      }}
    >
      {components.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400 p-4">
           <h2 className="text-xl font-semibold mb-2">App Canvas</h2>
          <p>This is your application canvas.</p>
          <p>Select components from the library panel to add them here.</p>
          <div className="mt-4 flex gap-2">
            <Button variant="outline" size="sm" onClick={(e) => {e.stopPropagation(); addComponent('Button')}}>Add Button (Test)</Button>
            <Button variant="outline" size="sm" onClick={(e) => {e.stopPropagation(); addComponent('Input')}}>Add Input (Test)</Button>
            <Button variant="outline" size="sm" onClick={(e) => {e.stopPropagation(); addComponent('Card')}}>Add Card (Test)</Button>
          </div>
        </div>
      )}

      {components.map((component) => (
        <motion.div
          key={component.id}
          className={clsx(
            'absolute cursor-grab p-2 rounded-md',
            { 'ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-100 dark:ring-offset-gray-900': selectedComponentId === component.id }
          )}
          onClick={(e) => handleSelectComponent(e, component.id)}
          dragMomentum={false}
          onDragEnd={(event, info) => handleDragEnd(event, info, component.id)}
          initial={{ x: component.layout.x, y: component.layout.y }}
          whileTap={{ cursor: 'grabbing' }}
        >
          <div className="pointer-events-none">
            {renderComponent(component)}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AppCanvas;
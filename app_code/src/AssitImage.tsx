// src/components/AssistImage.tsx

import { useState, useEffect } from "react";
import { Image } from "react-konva";
import Konva from "konva";
import type { StageItem } from "./App";

interface AssistImageProps {
    item: StageItem;
    setSelectedId: (id: string | null) => void;
    updateItem: (id: string, newAttributes: Partial<StageItem>) => void;
    itemRefs: React.MutableRefObject<{ [key: string]: any }>;
}

export default function AssistImage({ item, setSelectedId, updateItem, itemRefs }: AssistImageProps) {
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        if (item.src) {
            const img = new window.Image();
            img.src = item.src;
            
            img.onload = () => {
                setImage(img);
            };
            
            img.onerror = () => {
                console.error("🚨 O Konva não conseguiu achar a imagem neste caminho:", item.src);
            };
        }
    }, [item.src]);

    if (!image) return null;

    return (
        <Image 
            image={image}
            ref={(node) => { itemRefs.current[item.id] = node; }}
            onClick={() => setSelectedId(item.id)}
            onTap={() => setSelectedId(item.id)}
            x={item.x}
            y={item.y}
            draggable
            width={item.width || 200} 
            height={item.height || 200}
            onDragEnd={(e) => {
                updateItem(item.id, {
                    x: e.target.x(),
                    y: e.target.y(),
                });
            }}
            onTransformEnd={(e) => {
                const node = e.target as Konva.Image; 
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();

                node.scaleX(1);
                node.scaleY(1);

                updateItem(item.id, {
                    x: node.x(),
                    y: node.y(),
                    width: Math.max(5, node.width() * scaleX),
                    height: Math.max(5, node.height() * scaleY),
                })
            }}
        />
    );
}
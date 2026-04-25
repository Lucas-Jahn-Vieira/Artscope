// src/CanvasFeatures.tsx

import { useState, useEffect } from "react";
import type { StageItem } from "./App"; // Import the interface

export default function useCanvas() {
    // 1. STATES
    const [StageItems, setStageItems] = useState<StageItem[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [editingTextId, setEditingTextId] = useState<string | null>(null);

    // 2. ADD ITEM
    const AddItem = (newItem: StageItem) => {
        setStageItems((prevItems) => [...prevItems, newItem]);
    };

    // 3. UPDATE ITEM
    const updateItem = (id: string, newAttributes: Partial<StageItem>) => {
        setStageItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, ...newAttributes } : item
            )
        );
    };

    // 4. DELETE ITEM
    const deleteItem = () => {
        if (selectedId) {
            setStageItems((prevItems) => prevItems.filter(item => item.id !== selectedId));
            setSelectedId(null);
        }
    };

    // 5. KEYBOARD LISTENER (Deletion)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // We don't want to delete the item if the user is typing inside the text area!
            if (editingTextId) return; 

            if (e.key === "Delete" || e.key === "Backspace") {
                deleteItem();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [selectedId, editingTextId]);

    // 6. DESELECT ON BACKGROUND CLICK
    const checkDeselect = (e: any) => {
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            setSelectedId(null);
        }
    };

    // Export everything so App.tsx can use it
    return {
        StageItems,
        selectedId,
        setSelectedId,
        editingTextId,
        setEditingTextId,
        AddItem,
        updateItem,
        deleteItem,
        checkDeselect
    };
}
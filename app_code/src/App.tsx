// App.tsx

import { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Text, Rect, Image, Transformer } from "react-konva";
import Konva from 'konva';

import LeftBar from "./components/LeftBar";
import useLeftBar from "./useComponents/useLeftBar";

import Creator from "./components/Creator";
import useCreator from "./useComponents/useCreator";

import useCanvas from './CanvasFeatures';

// ============================================================================================= //
// ======================================= INTERFACES ========================================== //
// ============================================================================================= //

export type ItemType = "text" | "image" | "box";

export interface StageItem {
    id: string;
    type: ItemType;
    x: number;
    y: number;
    width?: number; 
    height?: number;
    fontSize?: number;
    text?: string; 
    src?: string; 
}

// ============================================================================================= //
// ======================================= MAIN CODE =========================================== //
// ============================================================================================= //

function App() {
    // Get the Canvas features
    const {
        StageItems,
        selectedId,
        setSelectedId,
        editingTextId,
        setEditingTextId,
        AddItem,
        updateItem,
        checkDeselect
    } = useCanvas();

    // Refs for Konva
    const trRef = useRef<any>(null); 
    const itemRefs = useRef<{[key:string]:any}>({});

    // RESTORED: Transformer effect! We need this to attach the blue handles to the selected item
    useEffect(() => {
        if (selectedId && itemRefs.current[selectedId]) {
            trRef.current.nodes([itemRefs.current[selectedId]]);
            trRef.current.getLayer().batchDraw();
        }
    }, [selectedId, StageItems]);
 
    // ----------------- hooks calls ------------------------------------------------------ //
    const { 
        CreatorOpen, 
        closeCreator, 
        mousePos, 
        handleContextMenu, 
        creatorAddText, 
        creatorAddImage, 
        creatorAddBox 
    } = useCreator(AddItem);

    const { LBaropen, openLBar, closeLBar, barAddText, barAddImg, barAddBox } = useLeftBar(AddItem);

     // ----------------- helpers code ------------------------------------------------------ //
    const URLImage = ({ item }: { item: StageItem }) => {
        const [image, setImage] = useState<HTMLImageElement | null>(null);

        useEffect(() => {
            if (item.src) {
                const img = new window.Image();
                img.src = item.src;
                img.onload = () => {
                    setImage(img);
                };
            }
        }, [item.src]);

        if (!image) return null;

        return (
            <Image // Using basic konva image to avoid naming conflicts if you imported it above
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
                    // FIXED: This is an Image, not a Text
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
    };

    // PAGE STRUCTURE ================================================================================

    return (
        <>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onContextMenu={handleContextMenu}
                // FIX 4: Adicionados eventos para deselecionar ao clicar no fundo
                onMouseDown={checkDeselect} 
                onTouchStart={checkDeselect}
                style={{ margin: 0, padding: 0 }}
            >
                <Layer>
                    {StageItems.length === 0 && (
                        <Text
                            x={window.innerWidth / 2}
                            y={window.innerHeight / 2}
                            fontSize={40}
                            text={"PRESS RIGHT_MOUSE_BUTTON\nOR USE THE LEFT BAR TO START CREATING"}
                            align="center"
                            offsetX={400}
                            offsetY={50}
                        />
                    )}

                    {StageItems.map((item) => {
                        if (item.type === "text") {
                            return (
                                <Text
                                    key={item.id}
                                    ref={(node) => { itemRefs.current[item.id] = node; }}
                                    onClick={() => setSelectedId(item.id)}
                                    onTap={() => setSelectedId(item.id)}

                                    // Trigger edit mode on double click/tap
                                    onDblClick={() => {
                                        setEditingTextId(item.id);
                                        setSelectedId(null); // Hides transformer while editing
                                    }}
                                    onDblTap={() => {
                                        setEditingTextId(item.id);
                                        setSelectedId(null);
                                    }}

                                    x={item.x}
                                    y={item.y}
                                    text={item.text}
                                    
                                    // 1. Agora ele usa a propriedade correta (fontSize)
                                    fontSize={item.fontSize || 20} 
                                    
                                    // 2. Definir o width ajuda o Konva a quebrar o texto em linhas no futuro
                                    width={item.width} 
                                    
                                    //Hide the Konva text AND disable dragging when editing
                                    visible={editingTextId !== item.id}
                                    draggable={editingTextId !== item.id}

                                    onDragEnd={(e) => {
                                        updateItem(item.id, {
                                            x: e.target.x(),
                                            y: e.target.y(),
                                        });
                                    }}

                                    onTransformEnd={(e) => {
                                        const node = e.target as Konva.Text;
                                        const scaleX = node.scaleX();
                                        // O scaleY é ignorado em textos na maioria dos apps para não "esticar" a letra feio
                                        
                                        // Reseta a escala para o React não bugar
                                        node.scaleX(1);
                                        node.scaleY(1);

                                        // 3. O SEGREDO ESTÁ AQUI: Atualizamos a fonte baseada nela mesma multiplicada pela escala
                                        updateItem(item.id, {
                                            x: node.x(),
                                            y: node.y(),
                                            width: Math.max(5, node.width() * scaleX), // Atualiza a caixa de limite
                                            fontSize: Math.max(5, node.fontSize() * scaleX), // Atualiza o tamanho da letra
                                        });
                                    }}
                                />
                            );
                        }
                        if (item.type === "box") {
                            return (
                                <Rect
                                    key={item.id}
                                    ref={(node) => { itemRefs.current[item.id] = node; }}
                                    onClick={() => setSelectedId(item.id)}
                                    onTap={() => setSelectedId(item.id)}
                                    x={item.x}
                                    y={item.y}
                                    // Usa os tamanhos do state ou um padrão 100
                                    width={item.width || 100} 
                                    height={item.height || 100}
                                    fill="lightgray" 
                                    stroke="black"   
                                    draggable
                                    onDragEnd={(e) => {
                                        updateItem(item.id, {
                                            x: e.target.x(),
                                            y: e.target.y(),
                                        });
                                    }}
                                    onTransformEnd={(e) => {
                                        const node = e.target as Konva.Text;
                                        const scaleX = node.scaleX();
                                        const scaleY = node.scaleY();
                                        node.scaleX(1);
                                        node.scaleY(1);
                                        updateItem(item.id, {
                                            x: node.x(),
                                            y: node.y(),
                                            width: Math.max(5, node.width() * scaleX),
                                            height: Math.max(5, node.height() * scaleY),
                                        });
                                    }}
                                />
                            );
                        }
                        if (item.type === "image") {
                            return <URLImage key={item.id} item={item} />;
                        }
                        return null; 
                    })}

                    {/* FIX 5: O Transformer AGORA ESTÁ DENTRO DA <Layer>! */}
                    {selectedId && (
                        <Transformer
                            ref={trRef}
                            boundBoxFunc={(oldBox, newBox) => {
                                if (newBox.width < 10 || newBox.height < 10) {
                                    return oldBox;
                                }
                                return newBox;
                            }}
                        />
                    )}
                </Layer>
            </Stage>

            {/* HTML Overlay for Text Editing */}
            {editingTextId && (
                (() => {
                    const editingItem = StageItems.find(item => item.id === editingTextId);
                    if (!editingItem || editingItem.type !== "text") return null;

                    return (
                        <textarea
                            value={editingItem.text}
                            onChange={(e) => updateItem(editingItem.id, { text: e.target.value })}
                            
                            // Finish editing when clicking completely outside the text area
                            onBlur={() => setEditingTextId(null)}
                            
                            onKeyDown={(e) => {
                                // Pressing 'Enter' finishes editing. 
                                // Pressing 'Shift + Enter' allows for multiple lines.
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    setEditingTextId(null);
                                }
                            }}
                            style={{
                                position: 'absolute',
                                top: editingItem.y,
                                left: editingItem.x,
                                fontSize: `${editingItem.fontSize || 20}px`,
                                width: editingItem.width ? `${editingItem.width}px` : 'auto',
                                minWidth: '150px',
                                background: 'transparent',
                                border: '1px dashed #ccc', // Subtle border to show it's editable
                                outline: 'none',
                                resize: 'none',
                                margin: 0,
                                padding: 0,
                                color: 'black',
                                fontFamily: 'Arial', // Konva's default font
                                overflow: 'hidden',
                                zIndex: 100, // Keeps the input above the canvas
                            }}
                            autoFocus // Automatically places the cursor inside the text area
                        />
                    );
                })()
            )}

            <LeftBar
                isOpen={LBaropen}
                openBar={openLBar}
                closeBar={closeLBar}
                addText={barAddText}
                addImage={barAddImg}
                addBox={barAddBox}
            />

            <Creator
                isOpen={CreatorOpen}
                onClose={closeCreator}
                mousePos={mousePos}
                addText={creatorAddText}
                addImage={creatorAddImage}
                addBox={creatorAddBox}
            />
        </>
    );
}

export default App;
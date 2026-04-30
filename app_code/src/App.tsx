// App.tsx

import { useState, useEffect, useRef } from 'react';
import { Stage, Layer, Text, Rect, Transformer } from "react-konva";
import Konva from 'konva';
import useCanvas from './CanvasFeatures';
import AssistImage from './AssitImage';

import LeftBar from "./components/LeftBar";
import useLeftBar from "./useComponents/useLeftBar";

import Creator from "./components/Creator";
import useCreator from "./useComponents/useCreator";



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

    // Function to attach the blue handles to the selected item
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

    // -- Keep canvas size code ---------------------------------------------------------- //

    const [stageSize, setStageSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
    });

    useEffect(() => {
        const checkSize = () => {
            setStageSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        // Avisa ao navegador para rodar a função 'checkSize' toda vez que a janela mudar de tamanho
        window.addEventListener("resize", checkSize);

        // Limpa o ouvinte quando o componente for desmontado (boa prática do React)
        return () => window.removeEventListener("resize", checkSize);
    }, []);
        

    // PAGE STRUCTURE ================================================================================

    return (
        <>
            <Stage
                width={stageSize.width}
                height={stageSize.height}
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

                                    // 1. ADICIONAMOS O onTransform PARA VER AO VIVO
                                    // Isso faz a quebra de linha acontecer enquanto você arrasta o mouse!
                                    onTransform={(e) => {
                                        const node = e.target as Konva.Text;
                                        const scaleX = node.scaleX();
                                        
                                        // Pega a escala que o mouse puxou e converte direto para largura
                                        node.setAttrs({
                                            width: Math.max(20, node.width() * scaleX),
                                            scaleX: 1, // Trava a escala horizontal
                                            scaleY: 1, // Trava a escala vertical
                                        });
                                    }}

                                    // 2. ATUALIZAMOS O onTransformEnd PARA SALVAR
                                    onTransformEnd={(e) => {
                                        const node = e.target as Konva.Text;
                                        
                                        // Como o onTransform já zerou a escala e mudou o width,
                                        // nós só precisamos salvar a posição e o width final no estado!
                                        updateItem(item.id, {
                                            x: node.x(),
                                            y: node.y(),
                                            width: node.width(), 
                                            // OBS: Removemos a linha do fontSize daqui!
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
                            return (
                                <AssistImage 
                                    key={item.id} 
                                    item={item} 
                                    setSelectedId={setSelectedId}
                                    updateItem={updateItem}
                                    itemRefs={itemRefs}
                                />
                            );
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
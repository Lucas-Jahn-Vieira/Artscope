import { Stage, Layer, Text, Rect } from "react-konva";
import { useState, useRef } from "react";
import Creator from "./components/Creator";
import type { AnchorPosition } from "./components/Creator";
import Konva from "konva";

function App() {
    //cretor setup ---------------------------------------------------------------------------------
    const stageRef = useRef<Konva.Stage | null>(null);

    const [items, setItems] = useState<any[]>([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuPos, setMenuPos] = useState<AnchorPosition>(null);
    const [stagePointer, setStagePointer] = useState<{ x: number; y: number }>({
        x: 0,
        y: 0,
    });

    const handleContextMenu = (e: Konva.KonvaEventObject<MouseEvent>) => {
        e.evt.preventDefault(); //makes so normal right-click menu doesn't appear
        const clientX = e.evt.clientX;
        const clientY = e.evt.clientY;
        setMenuPos({ x: clientX, y: clientY });

        const stage = stageRef.current;
        const pointer = stage?.getPointerPosition();
        setStagePointer(pointer ?? { x: 0, y: 0 });

        setMenuOpen(true);
    };

    const closeMenu = () => setMenuOpen(false);

    const addTextAtPointer = () => {
        setItems((prev) => [
            ...prev,
            {
                id: Date.now(),
                type: "text",
                text: "Novo comentário",
                x: stagePointer.x,
                y: stagePointer.y,
                fontSize: 18,
            },
        ]);
    };

    const addImgAtPointer = () => {
        setItems((prev) => [
            ...prev,
            {
                id: Date.now(),
                type: "rect",
                x: stagePointer.x,
                y: stagePointer.y,
                width: 120,
                height: 80,
                fill: "#ddd",
            },
        ]);
    };

    return (
        <>
            <Stage
            ref={stageRef}
            width={window.innerWidth} 
            height={window.innerHeight}
            onContextMenu={handleContextMenu}
            onMouseDown={() => menuOpen && closeMenu()}>
                <Layer>
                    {items.map(it => {
                        if (it.type === "text") {
                        return <Text key={it.id} text={it.text} x={it.x} y={it.y} fontSize={it.fontSize} draggable />;
                        }
                        return <Rect key={it.id} x={it.x} y={it.y} width={it.width} height={it.height} fill={it.fill} draggable />;
                    })}
                </Layer>
            </Stage>

            <Creator
                open={menuOpen}
                anchorPosition={menuPos}
                onClose={closeMenu}
                onAddText={addTextAtPointer}
                onAddImg={addImgAtPointer}
                onCustomAction={() => console.log("custom")}
            ></Creator>
        </>
    );
}

export default App;

import { useState, useRef } from "react";
import Konva from "konva";

function useCreator() {
const [CreatorOpen, setCreatorOpen] = useState(false);
    const [mousePos, getMousePos] = useState({ x: 0.0, y: 0.0 });
    const layer = useRef<Konva.Layer>(null);

    const handleContextMenu = (e: Konva.KonvaEventObject<PointerEvent>) => {
        e.evt.preventDefault(); //prevents the default right click menu from appearing

        const mainStage = e.target.getStage(); // gets the stage

        const point = mainStage?.getPointerPosition(); //gets the mouse postion on click

        if (point != null) {
            getMousePos({ x: point.x, y: point.y }); //sets mouse position
            setCreatorOpen(true); //opens creator
        }
    };

    const closeCreator = () => {
        setCreatorOpen(false);
    };

    const addText = () => {
        if (layer.current != null) {
            const newText = new Konva.Text({
                x: mousePos.x,
                y: mousePos.y,
                text: "Hello World",
                fontSize: 20,
                draggable: true,
            });

            layer.current.add(newText);
            layer.current.draw();
        }
    };

    return {
        CreatorOpen,
        closeCreator,
        mousePos,
        handleContextMenu,
        addText,
        layer
    }
}

export default useCreator
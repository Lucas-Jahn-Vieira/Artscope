//useLeftBar.tsx

import Konva from "konva";
import { useState } from "react";

export default function useLeftBar(
    layerRef: React.RefObject<Konva.Layer | null>,
) {
    const [LBaropen, setOpen] = useState(false);

    const openLBar = () => {
        setOpen(true);
    };
    const closeLBar = () => {
        setOpen(false);
    };

    const barAddText = () => {
        const layer = layerRef.current;
        if (layer == null) {
            return;
        }

        const stage = layer.getStage();
        if (stage == null) {
            return;
        }

        const centerX = stage.width() / 2;
        const centerY = stage.height() / 2;

        const newText = new Konva.Text({
            x: centerX,
            y: centerY,
            text: "New Text",
            fontSize: 20,
            draggable: true,
        });

        layer.add(newText);
        layer.draw();

        closeLBar();
    };

    const barAddImg = () => {
        // async function, so further actions will only ocurr after this one finishes
        return new Promise<void>((resolve) => {
            const layer = layerRef.current;
            if (layer == null) return;

            const stage = layer.getStage();
            if (stage == null) return;

            const centerX = stage.width() / 2;
            const centerY = stage.height() / 2;

            const imageObj = new Image();
            imageObj.src = "/PlaceholderImage.jpg";

            imageObj.onload = () => {
                const newImage = new Konva.Image({
                    x: centerX,
                    y: centerY,
                    image: imageObj,
                    draggable: true,
                    scaleX: 0.3,
                    scaleY: 0.3,
                    offsetX: imageObj.width / 2,
                    offsetY: imageObj.height / 2,
                });

                layer.add(newImage);
                layer.draw();

                closeLBar();

                resolve() // indicates that the function has finished
            };
        })
    };

    const barAddBox = () => {
        closeLBar();
    };

    return {
        LBaropen,
        openLBar,
        closeLBar,
        barAddText,
        barAddImg,
        barAddBox,
    };
}

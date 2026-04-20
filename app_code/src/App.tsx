//App.tsx

import { useState, useEffect } from "react";
import { Stage, Layer, Text, Rect, Image } from "react-konva";

import LeftBar from "./components/LeftBar";
import useLeftBar from "./useComponents/useLeftBar";

import Creator from "./components/Creator";
import useCreator from "./useComponents/useCreator";

// ============================================================================================= //

// creates a type for the items, so no unhandled element can be added
// exports it so useComponent files can also use this type
export type ItemType = "text" | "image" | "box";

export interface StageItem {
    id: string;
    type: ItemType;
    x: number;
    y: number;

    // optional props, used for specific elements
    text?: string; // for text
    src?: string; // for images
}

function App() {
    // list of all items suposed to be rendered on the page
    const [StageItems, setStageItems] = useState<StageItem[]>([]);

    // function to add a element to the list
    const AddItem = (newItem: StageItem) => {
        // gets the previous list (...StageItems) and adds one more (newItem)
        setStageItems([...StageItems, newItem]);
    };

    // helper function to add images more easily
    const URLImage = ({ item }: { item: StageItem }) => {
        const [image, setImage] = useState<HTMLImageElement | null>(null);

        // creates a JavaScript image, needed for Konva to render it
        useEffect(() => {
            if (item.src) {
                const img = new window.Image();
                img.src = item.src;
                img.onload = () => {
                    setImage(img);
                };
            }
        }, [item.src]);

        // Only renders the Image when the HTML image is fully loaded
        if (!image) return null;

        return (
            <Image
                image={image}
                x={item.x}
                y={item.y}
                draggable
                width={200} 
                height={200}
            />
        );
    };

    // -------- useComponent imports
    // both get the addItem function, so they dont need to get a layer/stage reference

    //gets the useCreator info
    const { 
        CreatorOpen, 
        closeCreator, 
        mousePos, 
        handleContextMenu, 
        creatorAddText, 
        creatorAddImage, 
        creatorAddBox 
    } = useCreator(AddItem);

    // gets the leftBar info
    const { LBaropen, openLBar, closeLBar, barAddText, barAddImg, barAddBox } =
        useLeftBar(AddItem);

    // PAGE STRUCTURE ================================================================================

    return (
        <>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onContextMenu={handleContextMenu}
                style={{ margin: 0, padding: 0 }}
            >
                <Layer>
                    {/* the introduction text only stays here if the list is empty */}
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

                    {/* reads all the list items and draw them */}
                    {StageItems.map((item) => {
                        // "===" ensures that they're from the same type
                        if (item.type === "text") {
                            return (
                                <Text
                                    key={item.id}
                                    x={item.x}
                                    y={item.y}
                                    text={item.text}
                                    fontSize={20}
                                    draggable
                                />
                            );
                        }
                        if (item.type === "box") {
                            return (
                                <Rect
                                    key={item.id}
                                    x={item.x}
                                    y={item.y}
                                    width={100}
                                    height={100}
                                    fill="lightgray" // Default color
                                    stroke="black"   // Border
                                    draggable
                                />
                            );
                        }
                        if (item.type === "image") {
                            return <URLImage key={item.id} item={item} />;
                        }

                        return null; // Fallback if type is unknown
                    })}
                </Layer>
            </Stage>

            <LeftBar
                isOpen={LBaropen}
                openBar={openLBar}
                closeBar={closeLBar}
                // when giving a action as a parameter make it as an anonymous func
                // anonymous func = {() => action()}
                addText={barAddText}
                addImage={barAddImg}
                addBox={barAddBox}
            />

            <Creator
            isOpen={CreatorOpen}
            onClose={closeCreator}
            mousePos={mousePos}
            // Passing the clean functions straight to the component!
            addText={creatorAddText}
            addImage={creatorAddImage}
            addBox={creatorAddBox}
            />
        </>
    );
}

export default App;

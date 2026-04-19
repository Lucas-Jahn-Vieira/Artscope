//App.tsx

import { Stage, Layer, Text } from "react-konva";

import LeftBar from "./components/LeftBar";
import useLeftBar from "./useComponents/useLeftBar";

import Creator from "./components/Creator";
import useCreator from "./useComponents/useCreator";


function App() {
    //gets info from useCreator
    const {CreatorOpen, closeCreator, mousePos, handleContextMenu, addText, layer} = useCreator();
    // gets the leftBar info, takes the reference to the layer from the useCreator
    const {LBaropen, openLBar, closeLBar, barAddText, barAddImg, barAddBox} = useLeftBar(layer)

    const ClearIntroduction = () => {
        const layerNode = layer.current;
        if (!layerNode) return;

        // if the layer has something other than the introduction, delete the intro
        const intro = layerNode.findOne('.introduction-text');
        if (intro) {
            intro.destroy();
            layerNode.draw();
        }
        
    };

    // async (action:() => void | Promise<void>) makes a function asyncronal so the await can be used
    const HandleAction = async (action:() => void | Promise<void>) => {
        await action();
        ClearIntroduction();
    }

    // MAIN CODE ------------------------------------------------------------------------------------
    return (
        <>  
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onContextMenu={handleContextMenu}

                style={{margin:0, padding:0}}
            >
                <Layer ref={layer}>
                    <Text
                        name='introduction-text'
                        x={window.innerWidth / 2}
                        y={window.innerHeight / 2}
                        fontSize={40}
                        draggable={true}
                        text={"PRESS RIGHT_MOUSE_BUTTON\nOR USE THE LEFT BAR TO START CREATING"}
                        align="center"
                        offsetX={400}
                        offsetY={50}
                        onDragEnd={() => {}} //so a warning doesn't appear when the text is not moved
                    />
                </Layer>
            </Stage>

            <LeftBar
                isOpen={LBaropen}
                openBar={openLBar}
                closeBar={closeLBar}
                // when giving a action as a parameter make it as an anonymous func
                // anonymous func = {() => action()}
                addText={() => HandleAction(barAddText)} 
                addImage={() => HandleAction(barAddImg)} 
                addBox={() => HandleAction(barAddBox)}
            />

            <Creator
                isOpen={CreatorOpen}
                onClose={closeCreator}
                mousePos={mousePos}
                addText={() => HandleAction(addText)}
            ></Creator>
        </>
    );
}

export default App;

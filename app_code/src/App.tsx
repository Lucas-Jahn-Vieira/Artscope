//App.tsx

import { Stage, Layer, Text } from "react-konva";
import Creator from "./components/Creator";
import useCreator from "./useComponents/useCreator";

function App() {
    //gets info from useCreator
    const {CreatorOpen, closeCreator, mousePos, handleContextMenu, addText, layer} = useCreator();

    // MAIN CODE ------------------------------------------------------------------------------------
    return (
        <>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                onContextMenu={handleContextMenu}
            >
                <Layer ref={layer}>
                    <Text
                        x={window.innerWidth / 2}
                        y={window.innerHeight / 2}
                        fontSize={40}
                        draggable={true}
                        text="PRESS RIGHT_MOUSE_BUTTON TO START CREATING"
                        align="center"
                        offsetX={550}
                        offsetY={55}
                    />
                </Layer>
            </Stage>

            <Creator
                isOpen={CreatorOpen}
                onClose={closeCreator}
                mousePos={mousePos}
                addText={addText}
            ></Creator>
        </>
    );
}

export default App;

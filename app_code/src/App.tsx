//App.tsx

import { Stage, Layer, Text } from "react-konva";

import LeftBar from "./components/LeftBar";
import useLeftBar from "./useComponents/useLeftBar";

import Creator from "./components/Creator";
import useCreator from "./useComponents/useCreator";


function App() {
    //gets info from useCreator
    const {CreatorOpen, closeCreator, mousePos, handleContextMenu, addText, layer} = useCreator();
    const {LBaropen, openLBar, closeLBar, barAddText, barAddImg, barAddBox} = useLeftBar()
    
    // PRÓXIMOS PASSOS NO GEMINI !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
                        x={window.innerWidth / 2}
                        y={window.innerHeight / 2}
                        fontSize={40}
                        draggable={true}
                        text="PRESS RIGHT_MOUSE_BUTTON TO START CREATING"
                        align="center"
                        offsetX={500}
                        offsetY={55}
                    />
                </Layer>
            </Stage>

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
                addText={addText}
            ></Creator>
        </>
    );
}

export default App;

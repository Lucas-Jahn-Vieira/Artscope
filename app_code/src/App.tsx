import { Stage, Layer, Text } from "react-konva";
// import { useState, useEffect } from "react";

function App() {
    return (
        // creates the main canva page(stage)
        <Stage width={window.innerWidth} height={window.innerHeight}>
            {/* Layer is a normal art program layer*/}
            <Layer>
                {/*this adds a text to the layer*/}
                {/*"draggable" makes the element draggable*/}
                <Text
                    text="Olá, Konva + React!"
                    x={50}
                    y={50}
                    fontSize={30}
                    draggable
                    fill="black"
                />
            </Layer>
        </Stage>
    );
}

export default App;

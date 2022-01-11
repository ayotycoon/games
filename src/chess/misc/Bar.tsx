import { useEffect, useRef, useState } from "react";
import { ChessPiece } from "../engine/ChessPiece";

function Bar({pieceWidth,horizontal}) {
    const arr = horizontal ? ChessPiece.availableXMovements: ChessPiece.availableYMovements;
return (


                <div className={horizontal ?'Bar-X': ''} >
                    {arr.map((c, x) => {
                        return (<div key={x} className={horizontal ?'Bar-X': 'Board-X'} style={{ width: pieceWidth + 'px', height: pieceWidth + 'px', }}>
                            {c}
                        </div>)
                    })}
                </div>
)
    
}

export default Bar;

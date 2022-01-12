import { ChessBoard } from "./ChessBoard";
import { ChessKing } from "./ChessKing";

export  class PieceMovement {
    id: number;
    prevPositionYIndex: number;
    prevPositionXIndex: number;
    positionYIndex: number;
    positionXIndex: number;

    constructor(
        id: number,
        prevPositionYIndex: number,
        prevPositionXIndex: number,
        positionYIndex: number,
        positionXIndex: number,

    ) {

        this.id = id;
        this.prevPositionYIndex = prevPositionYIndex;
        this.prevPositionXIndex = prevPositionXIndex;
        this.positionYIndex = positionYIndex;
        this.positionXIndex = positionXIndex;

    }
      


}

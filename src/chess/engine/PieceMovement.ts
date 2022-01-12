import { ChessBoard } from "./ChessBoard";
import { ChessKing } from "./ChessKing";
import { ChessPiece } from "./ChessPiece";

export class PieceMovement {
    id: number;
    name: string;
    icon: string;
    isPieceWhite: boolean

    prevPositionYIndex: number;
    prevPositionXIndex: number;
    prevPosition: string;
    positionYIndex: number;
    positionXIndex: number;
    position: string;

    constructor(
        piece: ChessPiece,
        prevPositionYIndex: number,
        prevPositionXIndex: number,
        positionYIndex: number,
        positionXIndex: number,

    ) {

        this.id = piece.id;
        this.name = piece.name;
        this.icon = piece.icon;
        this.isPieceWhite = piece.isPieceWhite;
        this.prevPositionYIndex = prevPositionYIndex;
        this.prevPositionXIndex = prevPositionXIndex;
        this.positionYIndex = positionYIndex;
        this.positionXIndex = positionXIndex;
        this.prevPosition = `${ChessPiece.availableXMovements[this.prevPositionXIndex]}${ChessPiece.availableYMovements[this.prevPositionYIndex]}`
        this.position = `${ChessPiece.availableXMovements[this.positionXIndex]}${ChessPiece.availableYMovements[this.positionYIndex]}`

    }
    toJSON() {
        return [
            this.id,
            this.name,
            this.icon,
            this.isPieceWhite,
            this.prevPositionYIndex,
            this.prevPositionXIndex,
            this.positionYIndex,
            this.positionXIndex,
            this.prevPosition,
            this.position,

        ]

    }
    toCSV() {
        return [
            // this.id,
            this.name,
            this.isPieceWhite?'white':'black',
            // this.prevPositionYIndex,
            // this.prevPositionXIndex,
            // this.positionYIndex,
            // this.positionXIndex,
            this.prevPosition,
            this.position,

        ]

    }
    fromJSON(el:any []){
        this.id = el[0]
        this.name = el[1]
        this.icon = el[2]
        this.isPieceWhite = el[3]
        this.prevPositionYIndex = el[4]
        this.prevPositionXIndex = el[5]
        this.positionYIndex = el[6]
        this.positionXIndex = el[7]
        this.prevPosition = el[8]
        this.position = el[9]

    }



}

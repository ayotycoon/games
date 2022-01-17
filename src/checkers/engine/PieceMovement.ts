
import { CheckerPiece } from "./CheckerPiece";

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
    jumpPosition: number[][]

    constructor(
        id: number,
        name:string,
        icon:string,
        isPieceWhite:boolean,
        prevPositionYIndex: number,
        prevPositionXIndex: number,
        positionYIndex: number,
        positionXIndex: number,
        jumpPosition: number[][] = []

    ) {

        this.id = id;
        this.name = name;
        this.icon = icon;
        this.isPieceWhite = isPieceWhite;
        this.prevPositionYIndex = prevPositionYIndex;
        this.prevPositionXIndex = prevPositionXIndex;
        this.positionYIndex = positionYIndex;
        this.positionXIndex = positionXIndex;
        this.prevPosition = `${CheckerPiece.availableXMovements[this.prevPositionXIndex]}${CheckerPiece.availableYMovements[this.prevPositionYIndex]}`
        this.position = `${CheckerPiece.availableXMovements[this.positionXIndex]}${CheckerPiece.availableYMovements[this.positionYIndex]}`
        this.jumpPosition = jumpPosition
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
            this.jumpPosition
        ]

    }
    toCSV() {
        return [
            // this.id,
            this.name,
            this.isPieceWhite ? 'white' : 'black',
            // this.prevPositionYIndex,
            // this.prevPositionXIndex,
            // this.positionYIndex,
            // this.positionXIndex,
            this.prevPosition,
            this.position,

        ]

    }
    fromJSON(el: any[]) {
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
        this.jumpPosition = el[10]

    }
    serialize(){
        return [
            this.id,
            this.name,
            this.icon,
            this.isPieceWhite,
            this.prevPositionYIndex,
            this.prevPositionXIndex,
            this.positionYIndex,
            this.positionXIndex,
            this.jumpPosition
        ]
    }



}

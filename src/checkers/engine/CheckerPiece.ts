import { devLog } from "../../env";
import { CheckerBoard } from "./CheckerBoard";
import { CheckerPawn } from "./CheckerPawn";
import { CheckerQueen } from "./CheckerQueen";

import { PieceMovement } from "./PieceMovement";

export abstract class CheckerPiece {
    name = 'piece'
    icon = 'chess'
    static availableXMovements = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    static availableYMovements = ['8', '7', '6', '5', '4', '3', '2', '1'];

    positionXIndex = 0;
    positionYIndex = 0;
    isPieceWhite = true;
    successfulMovements = 0;

    chessBoard: CheckerBoard = new CheckerBoard(true);
    static globalId = 0
    id = 0



    constructor(
        chessBoard: CheckerBoard,
        positionYIndex: number,
        positionXIndex: number,
        isPieceWhite: boolean,
        ghostId?: number
    ) {
        if (ghostId == undefined) {
            CheckerPiece.globalId++;
            this.id = CheckerPiece.globalId;
        } else {
            this.id = ghostId
        }



        this.chessBoard = chessBoard;
        this.isPieceWhite = isPieceWhite;
        this.positionYIndex = positionYIndex;
        this.positionXIndex = positionXIndex;

    }

    anticipateOppMoves = () => {
        const _: { [id: string]: boolean } = {}
        for (let i = 0; i < this.chessBoard.board.length; i++) {
            for (let j = 0; j < this.chessBoard.board[i].length; j++) {
                const cellPiece = this.chessBoard.board[i][j];
                if (cellPiece && cellPiece.isPieceWhite !== this.isPieceWhite) {
                    cellPiece.availableMoves()
                        .forEach(m => {
                            _[m.positionYIndex + "," + m.positionXIndex] = true
                        })
                }

            }
        }
        return _;
    }
    anticipateMyMoves = () => {
        const _ = {}
        for (let i = 0; i < this.chessBoard.board.length; i++) {
            for (let j = 0; j < this.chessBoard.board[i].length; j++) {
                const cell = this.chessBoard.board[i][j];
                if (cell && cell.isPieceWhite === this.isPieceWhite) {
                    cell.availableMoves()
                        .forEach(m => {
                            _[m.positionYIndex + "," + m.positionXIndex] = true
                        })
                }

            }
        }
        return _;
    }

    move(yIndex: number, xIndex: number, cb?: () => void) {
        const availableMoves = this.availableMoves();
        let canmove = false;
        let jumpPosition: undefined | number[][] = undefined;
        availableMoves.forEach(movements => {

            if (movements.positionYIndex === yIndex && movements.positionXIndex === xIndex) {
                canmove = true
                jumpPosition = movements.jumpPosition;
            }
        })
        const p = this.chessBoard.pieceHash[this.id];
        const movement = new PieceMovement(p.id,p.name,p.icon,p.isPieceWhite, this.positionYIndex, this.positionXIndex, yIndex, xIndex, jumpPosition);

        if (!canmove) {
            return false;
        }

        // swap pos in board;
        const temp = this.chessBoard.board[this.positionYIndex][this.positionXIndex]



        this.chessBoard.board[this.positionYIndex][this.positionXIndex] = null;

        const previousPositionYIndex = this.positionYIndex;
        const previousPositionXIndex = this.positionXIndex;
        this.positionYIndex = yIndex;
        this.positionXIndex = xIndex;

        // assign new pos
        this.chessBoard.board[this.positionYIndex][this.positionXIndex] = temp;
        // test to see if the move puts the king at risk


        if (cb) {
            cb()
        }

        this.successfulMovements++;
        this.chessBoard.addToMovement(movement);
        //devLog(movement)
        return true;


    }
    availableMoves = () => {
        return [] as {
            positionYIndex: number;
            positionY: string;
            positionXIndex: number;
            positionX: string;
            jumpPosition?: number[][]
        }[]

    }


    toString() {
        return {
            id: this.id,
            name: this.name,
            type: this.isPieceWhite ? 'White' : 'Black',
            position: `${CheckerPiece.availableXMovements[this.positionXIndex]}${CheckerPiece.availableYMovements[this.positionYIndex]}`
        }
            ;
    }
    currentPosition() {
        return `Y = ${this.positionYIndex}, X = ${this.positionXIndex}`
    }
    clone = (): CheckerPiece => {
        return null as any as CheckerPiece;
    }
    serialize = (toString = false) => {
        const s = [
            this.id,
            this.name,
            this.icon,
            this.positionYIndex,
            this.positionXIndex,
            this.isPieceWhite,
            this.successfulMovements,
        ]
        return toString ? JSON.stringify(s) : s;
    }
 



}

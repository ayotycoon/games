import { ChessQueen } from "./ChessQueen";
import { ChessPiece } from "./ChessPiece";

export class ChessPawn extends ChessPiece {
    name = 'pawn'
    icon = 'fas fa-chess-pawn'
    _parent = ChessPiece.prototype
     constructor(
        board:ChessPiece[][] |  null[][],
        positionYIndex:number,
        positionXIndex:number,
        isPieceWhite:boolean
        ) {
        super(board, positionYIndex, positionXIndex, isPieceWhite);
    }

    move = (yIndex:number, xIndex:number) => {

        return this._parent.move.apply(this, [yIndex, xIndex, () => {
            // check if its promotable

            if (this.isPieceWhite && yIndex === 0 || !this.isPieceWhite && yIndex === 7) {
                // promote
                const queen = new ChessQueen(this.board, yIndex, this.positionXIndex, this.isPieceWhite);
                queen.king = this.king;
                queen.oppKing = this.oppKing;
                this.board[this.positionYIndex][this.positionXIndex] = queen;
            }


        }])
    }

    availableMoves = () => {
        let indexes:{
            positionYIndex:number
            positionXIndex:number


        }[] = [];
        const incY1 = !this.isPieceWhite ? 1 : -1;
        const incY2 = !this.isPieceWhite ? 2 : -2;




        // check if it can move a step in y axes and if its own piece isnt on its moves


        if (this.positionYIndex + incY1 < ChessPiece.availableXMovements.length && this.positionYIndex + incY1 >= 0 && !this.board[this.positionYIndex + incY1][this.positionXIndex]) {
            indexes.push({ positionYIndex: this.positionYIndex + incY1, positionXIndex: this.positionXIndex })

            if (this.successfulMovements === 0) {
                // check if its first time, only move if theres nothing in the way

                if (this.positionYIndex + incY2 < ChessPiece.availableYMovements.length && this.positionYIndex + incY2 >= 0 && !this.board[this.positionYIndex + incY2][this.positionXIndex]) {
                    indexes.push({ positionYIndex: this.positionYIndex + incY2, positionXIndex: this.positionXIndex })

                }
            }



        }



    
        if (this.positionYIndex + incY1 < ChessPiece.availableYMovements.length && this.positionYIndex + incY1 >= 0  && this.board[this.positionYIndex + incY1][this.positionXIndex + 1]?.isPieceWhite === !this.isPieceWhite) {
            indexes.push({ positionYIndex: this.positionYIndex + incY1, positionXIndex: this.positionXIndex + 1 })
            // check diagonal if an opp is there
        }
 
        if (this.positionYIndex + incY1 < ChessPiece.availableYMovements.length  && this.board[this.positionYIndex + incY1][this.positionXIndex - 1]?.isPieceWhite === !this.isPieceWhite) {
            indexes.push({ positionYIndex: this.positionYIndex + incY1, positionXIndex: this.positionXIndex - 1 })
            // check diagonal if an opp is there
        }







        return indexes.map(index => {
            return {

                positionYIndex: index.positionYIndex,
                positionY: ChessPiece.availableYMovements[index.positionYIndex],
                positionXIndex: index.positionXIndex,
                positionX: ChessPiece.availableXMovements[index.positionYIndex]
            }
        })
    }


}

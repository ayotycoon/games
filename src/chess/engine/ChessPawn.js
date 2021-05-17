import { ChessPiece } from "./_ChessPiece";

export class ChessPawn extends ChessPiece {
    name = 'pawn'
    icon = 'fas fa-chess-pawn'
    constructor(board, positionYIndex, positionXIndex, isPieceWhite) {
        super(board, positionYIndex, positionXIndex,isPieceWhite);
    }



    availableMoves = () => {
        let indexes = [];
        const incY1 = !this.isPieceWhite ? 1 : -1;
        const incY2 = !this.isPieceWhite ? 2 : -2;




        // check if it can move a step in y axes and if its own piece isnt on its moves
        const possiblePiece = this.board[this.positionYIndex + incY1][this.positionXIndex];

        if (this.positionYIndex + incY1 < this.availableXMovements.length && this.positionYIndex + incY1 >= 0 && !possiblePiece) {
            indexes.push({ positionYIndex: this.positionYIndex + incY1, positionXIndex: this.positionXIndex })

            if (this.successfulMovements == 0) {
                // check if its first time, only move if theres nothing in the way
                const possiblePiece2 = this.positionYIndex + incY2 < 8 ? this.board[this.positionYIndex + incY2][this.positionXIndex] : null;
                if (this.positionYIndex + incY2 < this.availableYMovements.length && this.positionYIndex + incY2 >= 0 && !possiblePiece2) {
                    indexes.push({ positionYIndex: this.positionYIndex + incY2, positionXIndex: this.positionXIndex })

                }
            }



        }



        const opp = this.board[this.positionYIndex + incY1][this.positionXIndex + 1]
        if (this.positionYIndex + incY1 < this.availableYMovements.length && this.positionYIndex + incY1 >= 0 && opp && opp.isPieceWhite == !this.isPieceWhite) {
            indexes.push({ positionYIndex: this.positionYIndex + incY1, positionXIndex: this.positionXIndex + 1 })
            // check diagonal if an opp is there
        }
        const opp2 = this.board[this.positionYIndex + incY1][this.positionXIndex - 1]
        if (this.positionYIndex + incY1 < this.availableYMovements.length && this.positionYIndex + incY1 >= 0 && opp2 && opp2.isPieceWhite == !this.isPieceWhite) {
            indexes.push({ positionYIndex: this.positionYIndex + incY1, positionXIndex: this.positionXIndex - 1 })
            // check diagonal if an opp is there
        }







        return indexes.map(index => {
            return {

                positionYIndex: index.positionYIndex,
                positionY: this.availableYMovements[index.positionYIndex],
                positionXIndex: index.positionXIndex,
                positionX: this.availableXMovements[index.positionYIndex]
            }
        })
    }


}

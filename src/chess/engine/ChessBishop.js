import { ChessPiece } from "./_ChessPiece";

export class ChessBishop extends ChessPiece {
    name = 'pawn'
    icon = 'fas fa-chess-bishop'
    constructor(board, positionYIndex, positionXIndex,isPieceWhite) {
        super(board, positionYIndex, positionXIndex,isPieceWhite);
    }

    availableMoves = () => {
        let indexes = [];

        // check up




        const analyzeAndBreak = (incY,incX) => {
            if(incY < 0 || incY > 7 || incX < 0 || incX >7) return true;
            const possiblePiece = this.board[incY][incX]
            if (!possiblePiece) {
                indexes.push({ positionYIndex: incY, positionXIndex: incX })

            } else if (possiblePiece.isPieceWhite == this.isPieceWhite) {
                // if its same color
                return true

            } else {
                indexes.push({ positionYIndex: incY, positionXIndex: incX })

                return true

            }
        }



   
            // do diagonal 


            for (let i = 1; i < (8-this.positionYIndex); i++) {
                const incY = this.positionYIndex + i;
                const incX = this.positionXIndex + i;
               

                if (analyzeAndBreak( incY,incX)) {
                    break;
                }
            }
            for (let i = 1; i < this.positionYIndex; i++) {
                const incY = this.positionYIndex - i;
                const incX = this.positionXIndex -i
               

                if (analyzeAndBreak( incY,incX)) {
                    break;
                }
            }
        


            for (let i = 1; i < (8-this.positionYIndex); i++) {
                const incY = this.positionYIndex + i;
                const incX = this.positionXIndex - i;
               

                if (analyzeAndBreak( incY,incX)) {
                    break;
                }
            }
            for (let i = 1; i < this.positionYIndex; i++) {
                const incY = this.positionYIndex - i;
                const incX = this.positionXIndex + i
               

                if (analyzeAndBreak( incY,incX)) {
                    break;
                }
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

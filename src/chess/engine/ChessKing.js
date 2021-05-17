import { ChessPiece } from "./_ChessPiece";

export class ChessKing extends ChessPiece {
    name = 'pawn'
    icon = 'fas fa-chess-king'
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



       
        const movements = [
            [1,0],
            [0,1],
            [-1,0],
            [0,-1],

            [1,1],
            [-1,-1],
            [-1,1],
            [1,-1],



        ]
        


            for (let i = 0; i < movements.length; i++) {
                const curr = movements[i]
                const incY = this.positionYIndex + curr[0];
                const incX = this.positionXIndex + curr[1];
               

                analyzeAndBreak( incY,incX)
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

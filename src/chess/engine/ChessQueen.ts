import { ChessBoard } from "./ChessBoard";
import { ChessPiece } from "./ChessPiece";

export class ChessQueen extends ChessPiece {
    name = 'queen'
    icon = 'fas fa-chess-queen'
    constructor(
        chessBoard:ChessBoard,
        positionYIndex:number,
        positionXIndex:number,
        isPieceWhite:boolean,ghostId?:number
        ) {
        super(chessBoard,positionYIndex, positionXIndex,isPieceWhite,ghostId);
    }

    availableMoves = () => {
        let indexes:{
            positionYIndex:number
            positionXIndex:number


        }[] = [];

        // check up




        const analyzeAndBreak = (incY,incX) => {
            if(incY < 0 || incY > 7 || incX < 0 || incX >7) return true;
            const possiblePiece = this.chessBoard.board[incY][incX]
            if (!possiblePiece) {
                indexes.push({ positionYIndex: incY, positionXIndex: incX })

            } else if (possiblePiece.isPieceWhite === this.isPieceWhite) {
                // if its same color
                return true

            } else {
                indexes.push({ positionYIndex: incY, positionXIndex: incX })

                return true

            }
        }



            for (let i = this.positionYIndex + 1; i < 8; i++) {
                const incY = i;
                const incX = this.positionXIndex
               

                if (analyzeAndBreak( incY,incX)) {
                    break;
                }
            }
            for (let i = this.positionYIndex - 1; i >= 0; i--) {
                const incY = i;
                const incX = this.positionXIndex
               

                if (analyzeAndBreak( incY,incX)) {
                    break;
                }
            }
            for (let i = this.positionXIndex + 1; i < 8; i++) {
                const incX = i;
                const incY = this.positionYIndex
               

                if (analyzeAndBreak( incY,incX)) {
                    break;
                }
            }
            for (let i = this.positionXIndex - 1; i >= 0; i--) {
                const incX = i;
                const incY = this.positionYIndex
               

                if (analyzeAndBreak( incY,incX)) {
                    break;
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
            for (let i = 1; i < Math.max(this.positionYIndex, this.positionXIndex); i++) {
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
            for (let i = 1; i <= this.positionYIndex; i++) {
                const incY = this.positionYIndex - i;
                const incX = this.positionXIndex + i
               

                if (analyzeAndBreak( incY,incX)) {
                    break;
                }
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

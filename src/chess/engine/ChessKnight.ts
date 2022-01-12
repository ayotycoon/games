import { ChessBoard } from "./ChessBoard";
import { ChessPiece } from "./ChessPiece";

export class ChessKnight extends ChessPiece {
    name = 'knight'
    icon = 'fas fa-chess-knight'
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
             //   return true

            } else {
                indexes.push({ positionYIndex: incY, positionXIndex: incX })

                return true

            }
        }



       
        const movements = [
            [2,1],
            [2,-1],
            [-2,1],
            [-2,-1],
            [1,2],
            [1,-2],
            [-1,2],
            [-1,-2],
      



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
                positionY: ChessPiece.availableYMovements[index.positionYIndex],
                positionXIndex: index.positionXIndex,
                positionX: ChessPiece.availableXMovements[index.positionYIndex]
            }
        })
    }



}

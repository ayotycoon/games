import { threadId } from "worker_threads";
import { HashIndex } from "../../misc/data";
import { CheckerBoard } from "./CheckerBoard";
import { CheckerPiece } from "./CheckerPiece";



export class CheckerQueen extends CheckerPiece {
    name = 'queen'
    icon = 'fas fa-chess-queen'
    constructor(
        chessBoard: CheckerBoard,
        positionYIndex: number,
        positionXIndex: number,
        isPieceWhite: boolean, ghostId?: number
    ) {
        super(chessBoard, positionYIndex, positionXIndex, isPieceWhite, ghostId);
    }

    availableMoves = (indexes: HashIndex = {}, id = 0, positionYIndex = this.positionYIndex, positionXIndex = this.positionXIndex, preArr = []) => {

        if (id == 1) {
            console.log({ positionYIndex, positionXIndex })
        }


        const inBound = (i) => i >= 0 && i <= 7
        const addToHash = (hash, preventDFS?) => {
            hash.id = id;
            const key = hash.positionYIndex + ',' + hash.positionXIndex;
            const val = indexes[key];
            if ((val && id !== val.id) || key == this.positionYIndex + ',' + this.positionXIndex) return;
            if (!val) {
                indexes[key] = hash;

            } else if (!val.jumpPosition || (hash.jumpPosition || []).length > val.jumpPosition.length) {
                indexes[key] = hash;
            } else {
                //console.error(key,indexes)


            }
            if(preventDFS) return;
            this.availableMoves(indexes, id + 1, hash.positionYIndex, hash.positionXIndex, hash.jumpPosition || [])

        }

        const analyzeAndBreak = (incY: number, incX: number, i: number, j: number, value: number[][] = []) => {


            if (!inBound(incY) || !inBound(incX)) return true;

            const possiblePiece = this.chessBoard.board[incY][incX]
            if (!possiblePiece) {
                if (id != 0) return true;
                addToHash({ positionYIndex: incY, positionXIndex: incX },true)




            } else if (possiblePiece.isPieceWhite === this.isPieceWhite) {
                // if its same color
                return true

            } else if (possiblePiece.isPieceWhite !== this.isPieceWhite && inBound(incY + i) && inBound(incX + j) && this.chessBoard.board[incY + i][incX + j] != null && this.chessBoard.board[incY + i][incX + j]?.isPieceWhite != this.isPieceWhite) {

                return true;

            }
            else if (possiblePiece.isPieceWhite !== this.isPieceWhite && inBound(incY + i) && inBound(incX + j) && this.chessBoard.board[incY + i][incX + j] == null) {
                // its not the same color and its possible to jump

                value.push([incY, incX]);
                addToHash({
                    positionYIndex: incY + i,
                    positionXIndex: incX + j,
                    jumpPosition: [...value]
                })



            }

            return false;
        }


        // do diagonal 
        const n1: number[][] = [...preArr];
        for (let i = 1; i < (8 - positionYIndex); i++) {
            const incY = positionYIndex + i;
            const incX = positionXIndex + i;

            if (analyzeAndBreak(incY, incX, 1, 1, n1)) {
                break;
            }

        }
        const n2: number[][] = [...preArr];
        for (let i = 1; i < Math.max(positionYIndex, positionXIndex); i++) {
            const incY = positionYIndex - i;
            const incX = positionXIndex - i;


            if (analyzeAndBreak(incY, incX, -1, -1, n2)) {
                break;
            }

        }
        const n3: number[][] = [...preArr];
        for (let i = 1; i < (8 - positionYIndex); i++) {
            const incY = positionYIndex + i;
            const incX = positionXIndex - i;

            if (analyzeAndBreak(incY, incX, 1, -1, n3)) {
                break;
            }
        }
        const n4: number[][] = [...preArr];
        for (let i = 1; i <= positionYIndex; i++) {
            const incY = positionYIndex - i;
            const incX = positionXIndex + i


            if (analyzeAndBreak(incY, incX, -1, 1, n4)) {
                break;
            }
        }

        return (Object.values(indexes)).map(index => {
            return {

                positionYIndex: index.positionYIndex,
                positionY: CheckerPiece.availableYMovements[index.positionYIndex],
                positionXIndex: index.positionXIndex,
                positionX: CheckerPiece.availableXMovements[index.positionYIndex],
                jumpPosition: index.jumpPosition

            }
        })
    }

    clone = () => {
        return new CheckerQueen(this.chessBoard, this.positionYIndex,this.positionXIndex, this.isPieceWhite,this.id)
    }


}

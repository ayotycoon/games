import { CheckerQueen } from "./CheckerQueen";
import { CheckerPiece } from "./CheckerPiece";
import { CheckerBoard } from "./CheckerBoard";
import { HashIndex } from "../../misc/data";

export class CheckerPawn extends CheckerPiece {
    name = 'pawn'
    icon = 'fas fa-circle'
    private _parent = CheckerPiece.prototype
    constructor(
        chessBoard: CheckerBoard,
        positionYIndex: number,
        positionXIndex: number,
        isPieceWhite: boolean, ghostId?: number
    ) {
        super(chessBoard, positionYIndex, positionXIndex, isPieceWhite, ghostId);
    }

    move = (yIndex: number, xIndex: number) => {

        return this._parent.move.apply(this, [yIndex, xIndex, () => {
            // check if its promotable
            if (this.isPieceWhite && yIndex === 0 || !this.isPieceWhite && yIndex === 7) {
                // promote
                const queen = new CheckerQueen(this.chessBoard, yIndex, this.positionXIndex, this.isPieceWhite, this.id);

                this.chessBoard.board[this.positionYIndex][this.positionXIndex] = queen;
            }


        }])
    }

    availableMoves = (indexes: HashIndex = {}, id = 0, positionYIndex = this.positionYIndex, positionXIndex = this.positionXIndex, preArr = []) => {

        const movements = [
            [1, 1],
            [-1, -1],
            [1, -1],
            [-1, 1],
        ]

        const inBound = (i) => i >= 0 && i <= 7
        const addToHash = (hash, preventDFS?) => {
            hash.id = id;
            const key = hash.positionYIndex + ',' + hash.positionXIndex;
            const val = indexes[key];
            if ( (val && id !== val.id) || key == this.positionYIndex + ',' + this.positionXIndex) return;
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
                if (id != 0 || 
                    (this.isPieceWhite && positionYIndex < incY) || // avoid white pawns from going back
                    (!this.isPieceWhite && positionYIndex > incY // avoid black bawns from going back
                        )) return true;
                addToHash({ positionYIndex: incY, positionXIndex: incX },true)


            } else if (possiblePiece.isPieceWhite === this.isPieceWhite) {
                // if its same color
                //   return true

            } else if (possiblePiece.isPieceWhite !== this.isPieceWhite && inBound(incY + i) && inBound(incX + j) && this.chessBoard.board[incY + i][incX + j] == null) {
                // its not the same color and its possible to jump
                value.push([incY, incX]);

                addToHash({
                    positionYIndex: incY + i,
                    positionXIndex: incX + j,
                    jumpPosition: value
                })



            }
            return false;
        }

        const n1: number[][] = [...preArr];
        movements.forEach(curr => {
            const incY = positionYIndex + curr[0];
            const incX = positionXIndex + curr[1];

            // check if it can move a step in y axes and if its own piece isnt on its moves
            analyzeAndBreak(incY, incX, curr[0], curr[1], n1)
        })

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
        return new CheckerPawn(this.chessBoard, this.positionYIndex,this.positionXIndex, this.isPieceWhite,this.id)
    }


}

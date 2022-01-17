import { ChessPawn } from "./ChessPawn";
import { ChessQueen } from "./ChessQueen";
import { ChessBishop } from "./ChessBishop";
import { ChessRook } from "./ChessRook";
import { ChessKing } from "./ChessKing";
import { ChessKnight } from "./ChessKnight";
import { ChessPiece } from "./ChessPiece";
import { PieceMovement } from "./PieceMovement";



export class ChessBoard {
    board: ChessKing[][] | null[][] = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ]
    isWhiteTurnToPlay = false
    pieceHash: { [id: number]: ChessPiece } = {}
    killedHash: { [str: string]: ChessPiece | null } = {}
    private movements: PieceMovement[] = []
    movementIndex = 0
    private initiated = false;
    constructor(dummy = false) {
        if (this.initiated || dummy) return

        this.init()
        this.initiated = true;

    }
    init() {

        const blackKing = new ChessKing(this, 0, 3, false);
        this.board[0][3] = blackKing

        this.board[0][0] = new ChessRook(this, 0, 0, false);
        this.board[0][7] = new ChessRook(this, 0, 7, false);

        this.board[0][1] = new ChessKnight(this, 0, 1, false);
        this.board[0][6] = new ChessKnight(this, 0, 6, false);

        this.board[0][4] = new ChessQueen(this, 0, 4, false);
        this.board[0][2] = new ChessBishop(this, 0, 2, false);
        this.board[0][5] = new ChessBishop(this, 0, 5, false);

        this.board[1][0] = new ChessPawn(this, 1, 0, false);
        this.board[1][1] = new ChessPawn(this, 1, 1, false);
        this.board[1][2] = new ChessPawn(this, 1, 2, false);
        this.board[1][3] = new ChessPawn(this, 1, 3, false);
        this.board[1][4] = new ChessPawn(this, 1, 4, false);
        this.board[1][5] = new ChessPawn(this, 1, 5, false);
        this.board[1][6] = new ChessPawn(this, 1, 6, false);
        this.board[1][7] = new ChessPawn(this, 1, 7, false)




        const whiteKing = new ChessKing(this, 7, 3, true);
        this.board[7][3] = whiteKing
        this.board[7][0] = new ChessRook(this, 7, 0, true);
        this.board[7][7] = new ChessRook(this, 7, 7, true);
        this.board[7][1] = new ChessKnight(this, 7, 1, true);
        this.board[7][6] = new ChessKnight(this, 7, 6, true);
        this.board[7][4] = new ChessQueen(this, 7, 4, true);
        this.board[7][2] = new ChessBishop(this, 7, 2, true);
        this.board[7][5] = new ChessBishop(this, 7, 5, true);

        this.board[6][0] = new ChessPawn(this, 6, 0, true);
        this.board[6][1] = new ChessPawn(this, 6, 1, true);
        this.board[6][2] = new ChessPawn(this, 6, 2, true);
        this.board[6][3] = new ChessPawn(this, 6, 3, true);
        this.board[6][4] = new ChessPawn(this, 6, 4, true);
        this.board[6][5] = new ChessPawn(this, 6, 5, true);
        this.board[6][6] = new ChessPawn(this, 6, 6, true);
        this.board[6][7] = new ChessPawn(this, 6, 7, true);





        // set the aims for all pieces, whom they should protect and whom they should all attack
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                const cell = this.board[i][j];
                if (cell) {
                    this.pieceHash[cell.id] = cell;
                    if (cell.isPieceWhite) { // if its my piece

                        cell.king = whiteKing;
                        cell.oppKing = blackKing;
                    } else {
                        cell.oppKing = whiteKing;
                        cell.king = blackKing;
                    }

                }

            }
        }


    }

    toString() {
        return JSON.stringify(this.board.map(r => r.map(_ => _ ? `${_.id}-${_.name}` : 'null')));
    }
    canUndo() {
        return (this.movementIndex < this.movements.length)
    }
    canRedo() {
        return (this.movementIndex - 1 >= 0)
    }
    performUndo() {

        const movement = this.movements[this.movementIndex]
        const piece = this.board[movement.positionYIndex][movement.positionXIndex];

        if (!piece) return;

        piece.positionYIndex = movement.prevPositionYIndex;
        piece.positionXIndex = movement.prevPositionXIndex;


        this.board[movement.prevPositionYIndex][movement.prevPositionXIndex] = piece;

        this.board[movement.positionYIndex][movement.positionXIndex] = this.killedHash[movement.positionYIndex + ',' + movement.positionXIndex];

        this.movementIndex++;
    }

    performRedo() {
        this.movementIndex--;

        const movement = this.movements[this.movementIndex]
        const piece = this.board[movement.prevPositionYIndex][movement.prevPositionXIndex];
        if (!piece) return;


        piece.positionYIndex = movement.positionYIndex;
        piece.positionXIndex = movement.positionXIndex;

        this.board[movement.positionYIndex][movement.positionXIndex] = piece;

        this.board[movement.prevPositionYIndex][movement.prevPositionXIndex] = null;

    }
    addToMovement(movement: PieceMovement) {
        const n = this.getMovements();
        n.unshift(movement);
        this.movements = n;
        this.movementIndex = 0;

    }
    getMovements() {
        return this.movements.slice(this.movementIndex);
    }

}





import { CheckerPiece } from "./CheckerPiece";
import { CheckerPawn } from "./CheckerPawn";
import { CheckerQueen } from "./CheckerQueen";

import { PieceMovement } from "./PieceMovement";
import { checkerPieceDeSerialize } from "../misc";



export class CheckerBoard {
    board: CheckerPiece[][] | null[][] = CheckerBoard.newBoard();
    isWhiteTurnToPlay = false
    pieceHash: { [id: number]: CheckerPiece } = {}
    killedHash: { [str: string]: CheckerPiece | null } = {}
    private movements: PieceMovement[] = [];
    movementIndex = 0;
    private initiated = false;
    constructor(dummy = false) {
        if (this.initiated || dummy) return

        this.init()
        this.initiated = true;

    }
    init() {
        this.board[0][0] = new CheckerPawn(this, 0, 0, false);
        this.board[0][2] = new CheckerPawn(this, 0, 2, false);
        this.board[0][4] = new CheckerPawn(this, 0, 4, false);
        this.board[0][6] = new CheckerPawn(this, 0, 6, false);
        this.board[1][1] = new CheckerPawn(this, 1, 1, false);
        this.board[1][3] = new CheckerPawn(this, 1, 3, false);
        this.board[1][5] = new CheckerPawn(this, 1, 5, false);
        this.board[1][7] = new CheckerPawn(this, 1, 7, false)
        this.board[2][0] = new CheckerPawn(this, 2, 0, false);
        this.board[2][2] = new CheckerPawn(this, 2, 2, false);
        this.board[2][4] = new CheckerPawn(this, 2, 4, false);
        this.board[2][6] = new CheckerPawn(this, 2, 6, false);




        this.board[5][1] = new CheckerPawn(this, 5, 1, true);
        this.board[5][3] = new CheckerPawn(this, 5, 3, true);
        this.board[5][5] = new CheckerPawn(this, 5, 5, true);
        this.board[5][7] = new CheckerPawn(this, 5, 7, true);
        this.board[6][0] = new CheckerPawn(this, 6, 0, true);
        this.board[6][2] = new CheckerPawn(this, 6, 2, true);
        this.board[6][4] = new CheckerPawn(this, 6, 4, true);
        this.board[6][6] = new CheckerPawn(this, 6, 6, true);
        this.board[7][1] = new CheckerPawn(this, 7, 1, true);
        this.board[7][3] = new CheckerPawn(this, 7, 3, true);
        this.board[7][5] = new CheckerPawn(this, 7, 5, true);
        this.board[7][7] = new CheckerPawn(this, 7, 7, true);



        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                const cell = this.board[i][j];
                if (cell) {
                    this.pieceHash[cell.id] = cell;


                }

            }
        }


    }
    static newBoard() {
        return [
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
        ]
    }

    toString() {
        return JSON.stringify(this.board.map(r => r.map(_ => _ ? `${_.id}-${_.name}` : 'null')));
    }
    clone = () => {
        const newCheckerBoard = new CheckerBoard(true);
        newCheckerBoard.isWhiteTurnToPlay = this.isWhiteTurnToPlay
        newCheckerBoard.pieceHash = this.pieceHash
        newCheckerBoard.movements = this.movements

        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                const cell = this.board[i][j];
                if (cell) {
                    newCheckerBoard.board[i][j] = cell.clone();


                }

            }
        }
        return newCheckerBoard;

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

        this.board[movement.positionYIndex][movement.positionXIndex] = null;
        this.board[movement.prevPositionYIndex][movement.prevPositionXIndex] = piece;
        movement.jumpPosition.forEach(pos => {
            this.board[pos[0]][pos[1]] = this.killedHash[pos[0] + ',' + pos[1]];
        })
        this.movementIndex++;
    }
    performRedo() {
        this.movementIndex--;

        const movement = this.movements[this.movementIndex]
        const piece = this.board[movement.prevPositionYIndex][movement.prevPositionXIndex];
        if (!piece) return;
        this.board[movement.prevPositionYIndex][movement.prevPositionXIndex] = null;

        piece.positionYIndex = movement.positionYIndex;
        piece.positionXIndex = movement.positionXIndex;

        this.board[movement.positionYIndex][movement.positionXIndex] = piece;
        movement.jumpPosition.forEach(pos => {
            this.board[pos[0]][pos[1]] = null;
        })
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

    serialize = (toString = false) => {
        const board = this.board.map((row: CheckerPiece[] | null[]) => row.map((piece: CheckerPiece | null) => piece == null ? null : piece.serialize()))
        const movements = this.movements.map(m => m.serialize());
        const movementIndex = this.movementIndex;
        const isWhiteTurnToPlay = this.isWhiteTurnToPlay;
        const killedHash = Object.values(this.killedHash).map((piece: CheckerPiece | null) => piece ? piece.serialize() : null)

        const data = [board, movements, movementIndex, isWhiteTurnToPlay, killedHash]


        return toString ? JSON.stringify(data) : data;
    }
    static deSerialize = (str: string) => {
        const checkerBoard = new CheckerBoard(true);
        const data: (number | boolean | PieceMovement[] | (string | (string | number | boolean)[])[] | (string | (string | number | boolean)[])[][])[] = JSON.parse(str);

        const [_board, _movements, _movementIndex, _isWhiteTurnToPlay, _killedHash] = data;
        const board = (_board as (string | (string | number | boolean)[] | null)[][]).map((row) => row.map((_piece) => {


            if (_piece == null) return null;

            const piece = checkerPieceDeSerialize(_piece as any, checkerBoard);
            if (piece == null) return null;
            checkerBoard.pieceHash[piece.id] = piece

            return piece;

        }))
        const movements = (_movements as any[][]).map(m => new PieceMovement(m[0], m[1], m[2], m[3], m[4], m[5], m[6], m[7], m[8]));
        const movementIndex = _movementIndex as number;
        const isWhiteTurnToPlay = _isWhiteTurnToPlay as boolean;
        const killedHash: { [str: string]: CheckerPiece | null } = {};

        (_killedHash as (string | (string | number | boolean)[] | null)[])
            .forEach((_piece) => {


                if (_piece != null) {

                    const piece = checkerPieceDeSerialize(_piece as any, checkerBoard)
                    if (piece == null) return;
                    killedHash[piece?.positionYIndex + ',' + piece?.positionXIndex] = piece

                }
            })


        checkerBoard.board = board as any;
        checkerBoard.movements = movements
        checkerBoard.movementIndex = movementIndex
        checkerBoard.isWhiteTurnToPlay = isWhiteTurnToPlay
        checkerBoard.killedHash = killedHash

        return checkerBoard;
    }
}





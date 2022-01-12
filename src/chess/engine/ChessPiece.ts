import { devLog } from "../../env";
import { ChessBoard } from "./ChessBoard";
import { ChessKing } from "./ChessKing";
import { PieceMovement } from "./PieceMovement";

export abstract class ChessPiece {
    name = 'piece'
    icon = 'chess'
    static availableXMovements = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    static availableYMovements = ['8', '7', '6', '5', '4', '3', '2', '1'];

    positionXIndex = 0;
    positionYIndex = 0;
    isPieceWhite = true;
    successfulMovements = 0;

    chessBoard: ChessBoard = new ChessBoard(true);
    static globalId = 0
    id = 0

    king: ChessKing | null = null;
    oppKing: ChessKing | null = null;

    constructor(
        chessBoard: ChessBoard,
        positionYIndex: number,
        positionXIndex: number,
        isPieceWhite: boolean,
        ghostId?: number
    ) {
        if (ghostId == undefined) {
            ChessPiece.globalId++;
            this.id = ChessPiece.globalId;
        } else {
            this.id = ghostId
        }



        this.chessBoard = chessBoard;
        this.isPieceWhite = isPieceWhite;
        this.positionYIndex = positionYIndex;
        this.positionXIndex = positionXIndex;

    }

    anticipateOppMoves = () => {
        const _: { [id: string]: boolean } = {}
        for (let i = 0; i < this.chessBoard.board.length; i++) {
            for (let j = 0; j < this.chessBoard.board[i].length; j++) {
                const cellPiece = this.chessBoard.board[i][j];
                if (cellPiece && cellPiece.isPieceWhite !== this.isPieceWhite) {
                    cellPiece.availableMoves()
                        .forEach(m => {
                            _[m.positionYIndex + "," + m.positionXIndex] = true
                        })
                }

            }
        }
        return _;
    }
    anticipateMyMoves = () => {
        const _ = {}
        for (let i = 0; i < this.chessBoard.board.length; i++) {
            for (let j = 0; j < this.chessBoard.board[i].length; j++) {
                const cell = this.chessBoard.board[i][j];
                if (cell && cell.isPieceWhite === this.isPieceWhite) {
                    cell.availableMoves()
                        .forEach(m => {
                            _[m.positionYIndex + "," + m.positionXIndex] = true
                        })
                }

            }
        }
        return _;
    }

    move(yIndex: number, xIndex: number, cb?: () => void) {
        const movement = new PieceMovement(this.id, this.positionYIndex, this.positionXIndex, yIndex, xIndex);
        const availableMoves = this.availableMoves();
        let canmove = false;
        availableMoves.forEach(movements => {

            if (movements.positionYIndex === yIndex && movements.positionXIndex === xIndex) {
                canmove = true;
            }
        })

        if (!canmove) {
            return false;
        }
        // swap pos in board;
        const temp = this.chessBoard.board[this.positionYIndex][this.positionXIndex]



        this.chessBoard.board[this.positionYIndex][this.positionXIndex] = null;

        const previousPositionYIndex = this.positionYIndex;
        const previousPositionXIndex = this.positionXIndex;
        this.positionYIndex = yIndex;
        this.positionXIndex = xIndex;

        // assign new pos
        this.chessBoard.board[this.positionYIndex][this.positionXIndex] = temp;
        // test to see if the move puts the king at risk
        const oppMoves = this.anticipateOppMoves();
        if (oppMoves[this.king?.positionYIndex + ',' + this.king?.positionXIndex]) {
            // king is at risk
            // revert move
            alert('king at risk')

            this.chessBoard.board[this.positionYIndex][this.positionXIndex] = null;

            this.positionYIndex = previousPositionYIndex;
            this.positionXIndex = previousPositionXIndex;

            this.chessBoard.board[previousPositionYIndex][previousPositionXIndex] = temp;


            return false;
        }
        const myMoves = this.anticipateMyMoves();
        if (myMoves[this.oppKing?.positionYIndex + ',' + this.oppKing?.positionXIndex]) {
            // king is at risk
            // revert move
            alert('check')



        }

        if (cb) {
            cb()
        }

        this.successfulMovements++;
        this.chessBoard.history.push(movement);
        devLog(movement)
        return true;


    }
    availableMoves = () => {
        return [] as {
            positionYIndex: number;
            positionY: string;
            positionXIndex: number;
            positionX: string;
        }[]

    }

    toString() {
        return {
            id: this.id,
            name: this.name,
            type: this.isPieceWhite ? 'White' : 'Black',
            position: `${ChessPiece.availableXMovements[this.positionXIndex]}${ChessPiece.availableYMovements[this.positionYIndex]}`
        }
            ;
    }
    currentPosition() {
        return `Y = ${this.positionYIndex}, X = ${this.positionXIndex}`
    }


}

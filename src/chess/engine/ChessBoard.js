import { ChessPawn } from "./ChessPawn";
import { ChessQueen } from "./ChessQueen";
import { ChessBishop } from "./ChessBishop";
import { ChessCastle } from "./ChessCastle";
import { ChessKing } from "./ChessKing";



export class ChessBoard {
    board = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ]

    constructor() {
        this.board[0][0] = new ChessCastle(this.board, 0, 0);
        this.board[0][7] = new ChessCastle(this.board, 0, 7);

        this.board[0][3] = new ChessKing(this.board, 0, 3);
        this.board[0][4] = new ChessQueen(this.board, 0, 4);
        this.board[0][2] = new ChessBishop(this.board, 0, 2);
        this.board[0][5] = new ChessBishop(this.board, 0, 5);

        this.board[1][0] = new ChessPawn(this.board, 1, 0);
        this.board[1][1] = new ChessPawn(this.board, 1, 1);
        this.board[1][2] = new ChessPawn(this.board, 1, 2);
        this.board[1][3] = new ChessPawn(this.board, 1, 3);
        this.board[1][4] = new ChessPawn(this.board, 1, 4);
        this.board[1][5] = new ChessPawn(this.board, 1, 5);
        this.board[1][6] = new ChessPawn(this.board, 1, 6);
        this.board[1][7] = new ChessPawn(this.board, 1, 7)



        this.board[7][0] = new ChessCastle(this.board, 7, 0);
        this.board[7][7] = new ChessCastle(this.board, 7, 7);
        this.board[7][3] = new ChessKing(this.board, 7, 3);
        this.board[7][4] = new ChessQueen(this.board, 7, 4);
        this.board[7][2] = new ChessBishop(this.board, 7, 2);
        this.board[7][5] = new ChessBishop(this.board, 7, 5);

        this.board[6][0] = new ChessPawn(this.board, 6, 0);
        this.board[6][1] = new ChessPawn(this.board, 6, 1);
        this.board[6][2] = new ChessPawn(this.board, 6, 2);
        this.board[6][3] = new ChessPawn(this.board, 6, 3);
        this.board[6][4] = new ChessPawn(this.board, 6, 4);
        this.board[6][5] = new ChessPawn(this.board, 6, 5);
        this.board[6][6] = new ChessPawn(this.board, 6, 6);
        this.board[6][7] = new ChessPawn(this.board, 6, 7)

    }

    toString() {
        return JSON.stringify(this.board.map(r => r.map(_ => _ ? `${_.name}` : 'null')));
    }

}





import { ChessPawn } from "./ChessPawn";
import { ChessQueen } from "./ChessQueen";
import { ChessBishop } from "./ChessBishop";
import { ChessRook } from "./ChessRook";
import { ChessKing } from "./ChessKing";
import { ChessKnight } from "./ChessKnight";



export class ChessBoard {
    board:ChessKing[][] | null[][] = [
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
        const blackKing = new ChessKing(this.board, 0, 3,false);
        this.board[0][3] = blackKing

        this.board[0][0] = new ChessRook(this.board, 0, 0,false);
        this.board[0][7] = new ChessRook(this.board, 0, 7,false);

        this.board[0][1] = new ChessKnight(this.board, 0, 1,false);
        this.board[0][6] = new ChessKnight(this.board, 0, 6,false);

        this.board[0][4] = new ChessQueen(this.board, 0, 4,false);
        this.board[0][2] = new ChessBishop(this.board, 0, 2,false);
        this.board[0][5] = new ChessBishop(this.board, 0, 5,false);

        this.board[1][0] = new ChessPawn(this.board, 1, 0,false);
        this.board[1][1] = new ChessPawn(this.board, 1, 1,false);
        this.board[1][2] = new ChessPawn(this.board, 1, 2,false);
        this.board[1][3] = new ChessPawn(this.board, 1, 3,false);
        this.board[1][4] = new ChessPawn(this.board, 1, 4,false);
        this.board[1][5] = new ChessPawn(this.board, 1, 5,false);
        this.board[1][6] = new ChessPawn(this.board, 1, 6,false);
        this.board[1][7] = new ChessPawn(this.board, 1, 7,false)




        const whiteKing = new ChessKing(this.board, 7, 3,true);
        this.board[7][3] = whiteKing
        this.board[7][0] = new ChessRook(this.board, 7, 0,true);
        this.board[7][7] = new ChessRook(this.board, 7, 7,true);
        this.board[7][1] = new ChessKnight(this.board, 7, 1,true);
        this.board[7][6] = new ChessKnight(this.board, 7, 6,true);
        this.board[7][4] = new ChessQueen(this.board, 7, 4,true);
        this.board[7][2] = new ChessBishop(this.board, 7, 2,true);
        this.board[7][5] = new ChessBishop(this.board, 7, 5,true);

        this.board[6][0] = new ChessPawn(this.board, 6, 0,true);
        this.board[6][1] = new ChessPawn(this.board, 6, 1,true);
        this.board[6][2] = new ChessPawn(this.board, 6, 2,true);
        this.board[6][3] = new ChessPawn(this.board, 6, 3,true);
        this.board[6][4] = new ChessPawn(this.board, 6, 4,true);
        this.board[6][5] = new ChessPawn(this.board, 6, 5,true);
        this.board[6][6] = new ChessPawn(this.board, 6, 6,true);
        this.board[6][7] = new ChessPawn(this.board, 6, 7,true);



       
        
        // set the aims for all pieces, whom they should protect and whom they should all attack
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                const cell = this.board[i][j];
                if (cell) {
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
        return JSON.stringify(this.board.map(r => r.map(_ => _ ? `${_.name}` : 'null')));
    }

}





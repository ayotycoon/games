import { ChessKing } from "./ChessKing";

export abstract class ChessPiece {
    name = 'piece'
    icon = 'chess'
    static availableXMovements = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    static availableYMovements = ['8', '7', '6', '5', '4', '3', '2', '1'];

    positionXIndex = 0;
    positionYIndex = 0;
    isPieceWhite = true;
    successfulMovements = 0;

    board: ChessPiece[][] |  null[][] = [[]]
    id = (1 + Math.random()) * 100000000;

    king:ChessKing | null = null;
    oppKing:ChessKing | null = null;

    constructor(
        board: ChessPiece[][] |  null[][],
        positionYIndex: number,
        positionXIndex: number,
        isPieceWhite: boolean
    ) {
        this.board = board;
        this.isPieceWhite = isPieceWhite === undefined ? positionYIndex > 2 : isPieceWhite;
        this.positionYIndex = positionYIndex;
        this.positionXIndex = positionXIndex;

    }

    anticipateOppMoves = () => {
        const _:{[id:string]:boolean} = {}
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                const cellPiece = this.board[i][j];
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
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                const cell = this.board[i][j];
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

    move(yIndex:number, xIndex:number, cb?: () => void) {
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
        const temp = this.board[this.positionYIndex][this.positionXIndex]



        this.board[this.positionYIndex][this.positionXIndex] = null;

        const previousPositionYIndex = this.positionYIndex;
        const previousPositionXIndex = this.positionXIndex;
        this.positionYIndex = yIndex;
        this.positionXIndex = xIndex;

        // assign new pos
        this.board[this.positionYIndex][this.positionXIndex] = temp;
        // test to see if the move puts the king at risk
        const oppMoves = this.anticipateOppMoves();
        if (oppMoves[this.king?.positionYIndex + ',' + this.king?.positionXIndex]) {
            // king is at risk
            // revert move
            alert('king at risk')

            this.board[this.positionYIndex][this.positionXIndex] = null;

            this.positionYIndex = previousPositionYIndex;
            this.positionXIndex = previousPositionXIndex;

            this.board[previousPositionYIndex][previousPositionXIndex] = temp;


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
            name:this.name,
            type :this.isPieceWhite ? 'White' : 'Black',
            position:`${ChessPiece.availableXMovements[this.positionXIndex]}${ChessPiece.availableYMovements[this.positionYIndex]}`
        }
;
    }
    currentPosition() {
        return `Y = ${this.positionYIndex}, X = ${this.positionXIndex}`
    }


}

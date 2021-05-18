
export class ChessPiece {
    name = 'piece'
    icon = 'chess'
    availableXMovements = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    availableYMovements = ['1', '2', '3', '4', '5', '6', '7', '8'];

    positionXIndex = 0;
    positionYIndex = 0;
    isPieceWhite = true;
    successfulMovements = 0;

    board = [[]]
    id = (1 + Math.random()) * 100000000;

    king = null;

    constructor(board, king, positionYIndex, positionXIndex, isPieceWhite) {
        this.board = board;
        this.isPieceWhite = isPieceWhite == undefined ? positionYIndex > 2 : isPieceWhite;
        this.positionYIndex = positionYIndex;
        this.positionXIndex = positionXIndex;
        this.king = king || this
    }

    anticipateOppMoves = () => {
        const _ = {}
        for (let i = 0; i < this.board.length; i++) {
            for (let j = 0; j < this.board[i].length; j++) {
                const cell = this.board[i][j];
                if (cell && cell.isPieceWhite != this.isPieceWhite) {
                    cell.availableMoves()
                        .forEach(m => {
                            _[m.positionYIndex + "," + m.positionXIndex] = true
                        })
                }

            }
        }
        return _;
    }

    move(yIndex, xIndex, cb) {
        const availableMoves = this.availableMoves();
        let canmove = false;
        availableMoves.forEach(movements => {

            if (movements.positionYIndex == yIndex && movements.positionXIndex == xIndex) {
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

        console.log(oppMoves)
        if(oppMoves[this.king.positionYIndex+','+this.king.positionXIndex]){
            // king is at risk
            // revert move
            alert('king at risk')

            this.board[this.positionYIndex][this.positionXIndex] = null;
            
            this.positionYIndex = previousPositionYIndex;
            this.positionXIndex = previousPositionXIndex;

            this.board[previousPositionYIndex][previousPositionXIndex] = temp;
            
            
            return false;
        }


        if (cb) {
            cb()
        }

        this.successfulMovements++;
        return true;


    }
    availableMoves = (maxY, maxX) => {
        return [];
    }

    toString() {
        return `name = ${this.name} \ntype = ${this.isPieceWhite ? 'White' : 'Black'} \nposition = ${this.availableXMovements[this.positionXIndex]}${this.availableYMovements[this.positionYIndex]}`;
    }
    currentPosition() {
        return `Y = ${this.positionYIndex}, X = ${this.positionXIndex}`
    }

}

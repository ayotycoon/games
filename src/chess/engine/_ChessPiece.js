
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

    constructor(board, positionYIndex, positionXIndex,isPieceWhite) {
        this.board = board;
        this.isPieceWhite = isPieceWhite == undefined ? positionYIndex > 2 : isPieceWhite;
        this.positionYIndex = positionYIndex;
        this.positionXIndex = positionXIndex;
    }



    move = async (yIndex, xIndex) => {
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


        this.positionYIndex = yIndex;
        this.positionXIndex = xIndex;

        // assign new pos
        this.board[this.positionYIndex][this.positionXIndex] = temp
        if(this.name == 'pawn'){ // check if its promotable
            
   

            if(this.isPieceWhite && yIndex  == 0 || !this.isPieceWhite && yIndex == 7){
                const { ChessQueen } = await import('./ChessQueen')
               
               
                          // promote
                this.board[this.positionYIndex][this.positionXIndex] = new ChessQueen(this.board, yIndex, this.positionXIndex, this.isPieceWhite);
           
                 
          }

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

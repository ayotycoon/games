import { CheckerBoard } from "../engine/CheckerBoard";
import { CheckerPawn } from "../engine/CheckerPawn";
import { CheckerQueen } from "../engine/CheckerQueen";

export const checkerPieceDeSerialize = (data:  (string | number | boolean)[], board: CheckerBoard) => {
     
    const [
        id,
        name,
        icon,
        positionYIndex,
        positionXIndex,
        isPieceWhite,
        successfulMovements,
    ] = data;
    let piece: CheckerPawn | CheckerQueen | null = null;

    switch (name) {
        case 'queen':

            piece = new CheckerQueen(board, positionYIndex as number, positionXIndex as number, isPieceWhite as boolean, id as number)
            break;
        case 'pawn':
            piece = new CheckerPawn(board, positionYIndex as number, positionXIndex as number, isPieceWhite as boolean, id as number)
            break;

        default:
            return null

    }

    piece.successfulMovements = successfulMovements as number;
    piece.icon = icon as string;

    return piece;
}
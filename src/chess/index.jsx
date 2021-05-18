import { useEffect, useRef, useState } from "react";
import { ChessBoard } from "./engine/ChessBoard";
import './Chess.css';

const boardWidth = Math.min(window.innerHeight, window.innerWidth) - 50
const pieceWidth = boardWidth / 8;

function ChessGame() {

    const [board, setBoard] = useState([])
    const [availableMoves, setAvailableMoves] = useState({})
    const [selectedPiece, setSelectedPiece] = useState(null)

    const chessBoardRef = useRef(new ChessBoard());
    const chessBoard = chessBoardRef.current;
    const [isWhiteTurnToPlay, setIsWhiteTurnToPlay] = useState(true);


    function refreshBoard() {
        setBoard(chessBoard.board)

        setAvailableMoves({});
        setSelectedPiece(null);
    }


    useEffect(() => {

        refreshBoard()


    }, [])

    function onPieceClick(piece, y, x) {
        if (availableMoves[y + "," + x]) {
            selectedPiece.move(y, x)
            refreshBoard()


            setIsWhiteTurnToPlay(!isWhiteTurnToPlay)


        } else if (piece) {
            if (isWhiteTurnToPlay != piece.isPieceWhite) return;


            // show available moves
            const a = piece.availableMoves();

            const _ = {}
            a.forEach(m => {

                _[m.positionYIndex + "," + m.positionXIndex] = true
            });

            setAvailableMoves(_);
            setSelectedPiece(piece);

        } else {
            setAvailableMoves({});
            setSelectedPiece(null);
        }

    }

    return (
        <div className="Chess">
            <div className='Board' style={{ width: boardWidth + 'px', height: boardWidth + 'px' }} >
                {board.map((row, y) => {

                    return (<div key={y} className='Board-Y' style={{ display: 'flex' }}>



                        {row.map((piece, x) => {

                            const shouldHighlight = availableMoves[y + "," + x];
                            return (<div onClick={() => onPieceClick(piece, y, x)} key={x} className='Board-X' style={{ width: pieceWidth + 'px', height: pieceWidth + 'px', backgroundColor: (x % 2 == 0) == (y % 2 == 0) ? 'rgba(245, 222, 179, 0.596)' : '' }}>
                                <div className={!piece ? '' : (isWhiteTurnToPlay != piece.isPieceWhite) ? 'Piece-inner-invalid' : 'Piece-inner-valid'} style={{ width: '70%', height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: !(shouldHighlight || piece && piece == selectedPiece) ? '' : 'rgba(255, 255, 0, 0.5)' }}>
                                    {piece ? <i className={piece.icon} style={{ color: (piece.isPieceWhite ? "white" : "black") }} ></i> : ''}

                                </div>
                            </div>


                            )
                        })}



                    </div>


                    )
                })}
            </div>
            <div className='Side' style={{ padding: '20px' }} >
                Piece To Play
<br />
                <i className={'fa fa-chess '} style={{ color: isWhiteTurnToPlay ? 'white' : 'black' }} ></i>
            </div>
        </div>
    );
}

export default ChessGame;

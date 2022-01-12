import { useEffect, useRef, useState } from "react";
import { ChessBoard } from "./engine/ChessBoard";
import './Chess.css';
import { ChessPiece } from "./engine/ChessPiece";
import Bar from "./misc/Bar";
import { devLog } from '../env'


const boardWidth = Math.min(window.innerHeight, window.innerWidth) - 200
const pieceWidth = boardWidth / 8;

function ChessGame() {

    const [board, setBoard] = useState([] as ChessPiece[][] | null[][])
    const [availableMoves, setAvailableMoves] = useState({} as { [id: string]: boolean })
    const [selectedPiece, setSelectedPiece] = useState(null as ChessPiece | null)

    const chessBoardRef = useRef(null as any as ChessBoard);
   
    const [isWhiteTurnToPlay, setIsWhiteTurnToPlay] = useState(true);


    function reloadBoard() {
        setBoard(chessBoardRef.current.board)
        setAvailableMoves({});
        setSelectedPiece(null);
    }
    function init() {
        chessBoardRef.current = new ChessBoard();
        reloadBoard()
    }


    useEffect(() => {
        init()



    }, [])

    function onPieceClick(piece: ChessPiece | null, y: number, x: number) {
        if (availableMoves[y + "," + x]) {
            if (!selectedPiece?.move(y, x)) {
                // invalid move
                return;
            }

            reloadBoard()

            setIsWhiteTurnToPlay(!isWhiteTurnToPlay)


        } else if (piece) {
            devLog(piece.toString())
            if (isWhiteTurnToPlay !== piece.isPieceWhite) {
                setAvailableMoves({});
                setSelectedPiece(null);
                return;
            }


            // show available moves
            const a = piece.availableMoves();

            const _: { [id: string]: boolean } = {}
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
        <div className="Whole-Body">
            <input type='range' />
            <div className="Chess-Field">
                <div className="Chess-Pre-Playable">
                    <Bar pieceWidth={pieceWidth} horizontal />
                    <div className="Chess-Playable">
                        <Bar pieceWidth={pieceWidth} horizontal={false} />
                        <div className='Board' style={{ width: boardWidth + 'px', height: boardWidth + 'px' }} >

                            {board.map((row: ChessPiece[] | null[], y: number) => {

                                return (<div key={y} className='Board-Y' style={{ display: 'flex' }}>



                                    {row.map((piece: ChessPiece | null, x: number) => {

                                        const shouldHighlight = availableMoves[y + "," + x];
                                        return (<div onClick={() => onPieceClick(piece, y, x)} key={x} className='Board-X' style={{ width: pieceWidth + 'px', height: pieceWidth + 'px', backgroundColor: (x % 2 === 0) === (y % 2 === 0) ? 'rgba(245, 222, 179, 0.596)' : '' }}>
                                            <div className={!piece ? '' : (isWhiteTurnToPlay !== piece.isPieceWhite) ? 'Piece-inner-invalid' : 'Piece-inner-valid'} style={{ width: '70%', height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: !(shouldHighlight || piece && piece === selectedPiece) ? '' : 'rgba(255, 255, 0, 0.5)' }}>
                                                {piece ? <i className={piece.icon} style={{ color: (piece.isPieceWhite ? "white" : "black") }} ></i> : ''}

                                            </div>
                                        </div>


                                        )
                                    })}



                                </div>


                                )
                            })}
                        </div>
                        <Bar pieceWidth={pieceWidth} horizontal={false} />
                    </div>
                    <Bar pieceWidth={pieceWidth} horizontal />

                </div>
                <div className='Side' style={{ padding: '20px' }} >
                    Piece To Play
                    <br />
                    <i className={'fa fa-chess '} style={{ color: isWhiteTurnToPlay ? 'white' : 'black' }} ></i>
                </div>
            </div>
        </div>
    );
}

export default ChessGame;

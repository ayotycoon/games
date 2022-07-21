import { useEffect, useRef, useState } from "react";
import { ChessBoard } from "./engine/ChessBoard";
import './Chess.css';
import { ChessPiece } from "./engine/ChessPiece";
import Bar from "./misc/Bar";
import { devLog } from '../env'
import { PieceMovement } from "./engine/PieceMovement";
import { csvGenerator } from "../misc/functions";
import { f } from "../misc/data";



function ChessGame() {
    const [size, setSize] = useState({
        boardWidth: f(),
        pieceWidth: (f()) / 8
    })
    const [board, setBoard] = useState([] as ChessPiece[][] | null[][])
    const [movementHistory, setMovementHistory] = useState([] as PieceMovement[])
    const [availableMoves, setAvailableMoves] = useState({} as { [id: string]: boolean })
    const [selectedPiece, setSelectedPiece] = useState(null as ChessPiece | null)

    const chessBoardRef = useRef(null as any as ChessBoard);

    const [isWhiteTurnToPlay, setIsWhiteTurnToPlay] = useState(true);
    const [{ canUndo, canRedo }, setUndoAndRedo] = useState({ canUndo: false, canRedo: false });


    function reloadBoard() {
        chessBoardRef.current.isWhiteTurnToPlay = !chessBoardRef.current.isWhiteTurnToPlay
        setBoard(chessBoardRef.current.board)
        setMovementHistory(chessBoardRef.current.getMovements())
        setAvailableMoves({});
        setSelectedPiece(null);
        setIsWhiteTurnToPlay(chessBoardRef.current.isWhiteTurnToPlay)
        setUndoAndRedo({ canRedo: chessBoardRef.current.canRedo(), canUndo: chessBoardRef.current.canUndo() })
    }
    function init() {
        chessBoardRef.current = new ChessBoard();

        reloadBoard()
    }


    useEffect(() => {
        init()
        const cb = () => {
            const boardWidth = f()
            const pieceWidth = boardWidth / 8;

            setSize(
                {
                    boardWidth,
                    pieceWidth
                }
            )

        }
        window.addEventListener('resize', cb)
        return () => {
            window.removeEventListener('resize', cb)
        }


    }, [])

    function onPieceClick(piece: ChessPiece | null, y: number, x: number) {
        if (availableMoves[y + "," + x]) {
            if (!selectedPiece?.move(y, x)) {
                // invalid move
                return;
            }

            reloadBoard()




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
    function performRedo() {
        chessBoardRef.current.performRedo();
        reloadBoard()
    }
    function performUndo() {
        chessBoardRef.current.performUndo();
        reloadBoard()
    }

    return (
        <div className="Whole-Body">

            <div className="Chess-Field">
                <div className="Chess-Pre-Playable">
                    <Bar pieceWidth={size.pieceWidth} horizontal />
                    <div className="Chess-Playable">
                        <Bar pieceWidth={size.pieceWidth} horizontal={false} />
                        <div className='Board' style={{ width: size.boardWidth + 'px', height: size.boardWidth + 'px' }} >

                            {board.map((row: ChessPiece[] | null[], y: number) => {

                                return (<div key={y} className='Board-Y' style={{ display: 'flex' }}>



                                    {row.map((piece: ChessPiece | null, x: number) => {

                                        const shouldHighlight = availableMoves[y + "," + x];
                                        return (<div onClick={() => onPieceClick(piece, y, x)} key={x} className='Board-X' style={{ width: size.pieceWidth + 'px', height: size.pieceWidth + 'px', backgroundColor: (x % 2 === 0) === (y % 2 === 0) ? 'rgba(245, 222, 179, 0.596)' : '' }}>
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
                        <Bar pieceWidth={size.pieceWidth} horizontal={false} />
                    </div>
                    <Bar pieceWidth={size.pieceWidth} horizontal />
                    <div className="text-center">
                        {canUndo && <button onClick={performUndo} className="m-2">  <i className="fa fa-undo" /></button>}
                        {canRedo && <button onClick={performRedo} className="m-2">  <i className="fa fa-redo" /></button>}


                    </div>
                </div>
              
                <div className='Side' style={{ padding: '10px' }} >
                    <div className='' style={{ padding: '0 30px' }} >
                        Piece To Play
                        <br />
                        <i className={'fa fa-chess '} style={{ color: isWhiteTurnToPlay ? 'white' : 'black' }} ></i>
                        <hr />
                        <div style={{ textAlign: 'center' }}>
                            {movementHistory.length != 0 && <>
                                <button onClick={() => { csvGenerator(movementHistory) }}><i className="fa fa-file-download" /></button>
                                <br />
                            </>}
                            {movementHistory.map((movement, key) => {

                                return (
                                    <div style={{ fontSize: '13px', marginBottom: '5px', display: 'flex', justifyContent: 'center' }} key={key}>
                                        <div style={{ marginRight: '5px' }}>
                                            <i className={movement.icon} style={{ color: movement.isPieceWhite ? 'white' : 'black' }} />
                                        </div>
                                        <div>
                                            {movement.prevPosition} <i className="fa fa-arrow-right" /> {movement.position}
                                        </div>
                                    </div>
                                )

                            })}
                        </div>
                    </div> </div>
            </div>
        </div>
    );
}

export default ChessGame;

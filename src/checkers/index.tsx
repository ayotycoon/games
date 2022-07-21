import { useEffect, useRef, useState } from "react";
import { CheckerBoard } from "./engine/CheckerBoard";
import './Checkers.css';
import { CheckerPiece } from "./engine/CheckerPiece";

import { devLog } from '../env'
import { PieceMovement } from "./engine/PieceMovement";
import { csvGenerator } from "../misc/functions";
import { f } from "../misc/data";




function CheckersGame() {
    const [size, setSize] = useState({
        boardWidth: f(),
        pieceWidth: (f()) / 8
    })
    const [board, setBoard] = useState([] as CheckerPiece[][] | null[][])
    const [movementHistory, setMovementHistory] = useState([] as PieceMovement[])
    const [availableMoves, setAvailableMoves] = useState({} as { [id: string]: number[][] })
    const [selectedPiece, setSelectedPiece] = useState(null as CheckerPiece | null)

    const checkerBoardRef = useRef(null as any as CheckerBoard);

    const [isWhiteTurnToPlay, setIsWhiteTurnToPlay] = useState(true);
    const [{ canUndo, canRedo }, setUndoAndRedo] = useState({ canUndo: false, canRedo: false });


    function reloadBoard() {
        checkerBoardRef.current.isWhiteTurnToPlay = !checkerBoardRef.current.isWhiteTurnToPlay
        setBoard(checkerBoardRef.current.board)
        setMovementHistory(checkerBoardRef.current.getMovements())
        setAvailableMoves({});
        setSelectedPiece(null);
        setIsWhiteTurnToPlay(checkerBoardRef.current.isWhiteTurnToPlay)
        setUndoAndRedo({ canRedo: checkerBoardRef.current.canRedo(), canUndo: checkerBoardRef.current.canUndo() })
    }
    function init() {
        checkerBoardRef.current = new CheckerBoard();

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

    function onPieceClick(piece: CheckerPiece | null, y: number, x: number) {

        if (availableMoves[y + "," + x]) {
            if (!selectedPiece?.move(y, x)) {
                // invalid move
                return;
            }

            const possibleJump = availableMoves[y + "," + x];


            possibleJump.forEach(([y, x]) => {
                checkerBoardRef.current.killedHash[y + ',' + x] = checkerBoardRef.current.board[y][x];
                checkerBoardRef.current.board[y][x] = null;
            })




            reloadBoard()




        } else if (piece) {
            //devLog(piece.toString())
            if (isWhiteTurnToPlay !== piece.isPieceWhite) {
                setAvailableMoves({});
                setSelectedPiece(null);
                return;
            }


            // show available moves
            const a = piece.availableMoves();
            //console.log(a)

            const _: { [id: string]: number[][] } = {}
            a.forEach(m => {
                const val = m.jumpPosition == undefined ? [] : m.jumpPosition;

                _[m.positionYIndex + "," + m.positionXIndex] = val
            });

            setAvailableMoves(_);
            setSelectedPiece(piece);

        } else {
            setAvailableMoves({});
            setSelectedPiece(null);
        }

    }
    function performRedo() {
        checkerBoardRef.current.performRedo();
        reloadBoard()
    }
    function performUndo() {
        checkerBoardRef.current.performUndo();
        reloadBoard()
    }
    function save(){
        const data = checkerBoardRef.current.serialize(true);
        // @ts-ignore
        localStorage.setItem("checkers",data);
    }
    function restore(){
        const data = localStorage.getItem("checkers");
        if(!data) return;
        const board = CheckerBoard.deSerialize(data)
        board.isWhiteTurnToPlay = !board.isWhiteTurnToPlay

        checkerBoardRef.current = board;
        reloadBoard()

    }

    return (
        <div className="Whole-Body">

            <div className="Chess-Field">
                <div className="Chess-Pre-Playable">

                    <div className="Chess-Playable">

                        <div className='Board' style={{ width: size.boardWidth + 'px', height: size.boardWidth + 'px' }} >

                            {board.map((row: CheckerPiece[] | null[], y: number) => {

                                return (<div key={y} className='Board-Y' style={{ display: 'flex' }}>



                                    {row.map((piece: CheckerPiece | null, x: number) => {

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

                    </div>

                    <div className="text-center">
                        {canUndo && <button onClick={performUndo} className="m-2">  <i className="fa fa-undo" /></button>}
                        {canRedo && <button onClick={performRedo} className="m-2">  <i className="fa fa-redo" /></button>}


                    </div>
                </div>
                <div className='Side' style={{ padding: '10px' }} >
                    <div className='' style={{ padding: '0 30px' }} >
                        Piece To Play
                        <br />
                        <i className={'fa fa-circle '} style={{ color: isWhiteTurnToPlay ? 'white' : 'black' }} ></i>
                        <hr />
                        <div style={{ textAlign: 'center' }}>
                        <button onClick={save}><i className="fa fa-save" /></button>
                        <button onClick={restore}><i className="fa fa-upload" /></button>
                            {movementHistory.length != 0 && <>
                                <button onClick={() => { csvGenerator(movementHistory as any) }}><i className="fa fa-file-download" /></button>
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

export default CheckersGame;

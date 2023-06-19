export function gridToPosition(gridX: number, gridY: number) {
    return {x: gridX * 20, y: gridY * 20};
}

export function positionToGrid(x: number, y: number) {
    return {x: x / 20, y: y / 20};
}

export function clear(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}


export const windowUtils = {
    x: window.innerWidth,
    y: window.innerHeight + 46,

}

const globalKeyboardEventEmitter = (type: string) => {
    globalKeyboardEvent.cb(null,type)

}

export const globalKeyboardEvent = {
    cb: null as any,
    emit: globalKeyboardEventEmitter
}

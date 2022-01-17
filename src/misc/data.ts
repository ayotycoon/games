
export const NAVS = [
    {
        to:'/chess',
        name:'Chess',
        img:'/assets/chess-banner.png'
    },
    {
        to:'/checkers',
        name:'Checkers',
        img:'/assets/checkers-banner.png'
    }
]

export interface HashIndex {
    [id: string]: {
        positionYIndex: number
        positionXIndex: number
        jumpPosition?: number[][]
        id: 0


    }
}
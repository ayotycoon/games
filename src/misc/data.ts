
export const NAVS = [
    {
        to:'/chess',
        name:'Chess',
        img:process.env.PUBLIC_URL + '/assets/chess-banner.png'
    },
    {
        to:'/checkers',
        name:'Checkers',
        img:process.env.PUBLIC_URL + '/assets/checkers-banner.png'
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
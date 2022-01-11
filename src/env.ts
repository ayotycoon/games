export const LOGGING = !process.env.production;
export const devLog = (o)=> {
    if(!LOGGING) return;
    console.error(o)

}
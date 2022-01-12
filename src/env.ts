export const LOGGING = true && !process.env.production;
export const devLog = (o)=> {
    if(!LOGGING) return;
    console.error(o)

}
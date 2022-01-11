export const LOGGING = true;
export const devLog = (o)=> {
    if(!LOGGING) return;
    console.error(o)

}
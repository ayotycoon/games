export const safeObjectAssessor = (...args) => {
    let base = args[0];

    for(let i =1; i < args.length;i++){
        if(!base) return false;
        base = base[args[i]];
    }

    return true;

}
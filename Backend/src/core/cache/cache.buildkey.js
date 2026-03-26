
export const buildkey=(req,prefix)=>{
    return `${prefix}:${req.originalUrl}`
}
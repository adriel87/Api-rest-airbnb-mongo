export const bearer = (token:string) => {
    if (typeof token !== "string") {
        throw `You must provide a valid string value`
    }
    return `Bearer ${token}`
} 
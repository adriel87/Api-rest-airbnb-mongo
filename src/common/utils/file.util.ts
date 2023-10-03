import fs from 'fs'

export async function getFilesFromDirectory(path:string, avoidIndex:boolean=false) {
    if (path === null || path === undefined || path.length === 0) return []
    let files = await fs.readdirSync(path)
    if(avoidIndex) {
        files = files.filter(file => file !== 'index.ts') 
    }
    return files
}

export const removeExtension = (file :string) => {
    if (typeof file !== 'string') {
        return null
    }

    return file ? file.split('.')[0] : null

}


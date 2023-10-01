import fs from 'fs'

export async function getFilesFromDirectory(path:string, avoidIndex:boolean=false) {
    let files = await fs.readdirSync(path)
    if(avoidIndex) {
        files = files.filter(file => file !== 'index.ts') 
    }
    console.log(files);
    
    // TODO: match index whit regex
    return files
}

export const removeExtension = (file :string) => file.split('.')[0]


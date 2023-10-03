
import fs from 'fs'
import * as fileUtil from './file.util.js'

describe('UTILS --- FILE', ()=>{

    afterEach(()=>{
        jest.clearAllMocks()
    })
  
    describe('getFileFromDirectory', ()=>{

        test('Should return all files if boolean flag is false or not provided',async()=>{
            //ARRANGE
            const filesExpected = ['index.ts','test.ts']
            const avoidIndex = false
            //ACT
            const spy = jest.spyOn(fs, 'readdirSync')
            // @ts-ignore
            spy.mockReturnValue(['index.ts','test.ts'])
            const resultNoFlag = await fileUtil.getFilesFromDirectory('/test')
            const resultwhitFlag = await fileUtil.getFilesFromDirectory('/test', avoidIndex)
            
            
            //ASSERT
            expect(resultNoFlag).toEqual(filesExpected)
            expect(resultwhitFlag).toEqual(filesExpected)
            
        })
    
        test('Should return all files less index if boolean flag is true',async()=>{
            //ARRANGE
            const filesExpected = ['test.ts']
            const avoidIndex = true
            //ACT
            const spy = jest.spyOn(fs, 'readdirSync')
            // @ts-ignore
            spy.mockReturnValue(['index.ts','test.ts'])
            const result = await fileUtil.getFilesFromDirectory('/test', avoidIndex)        
            
            //ASSERT
            expect(result).toEqual(filesExpected)
    
            
        })
    
        test('Should return empty array [] whit null or undefined path', async ()=>{
            //ARRANGE
            const files = []
            //ACT
            const resultNull = await fileUtil.getFilesFromDirectory(null)
            const resultUndefined = await fileUtil.getFilesFromDirectory(undefined)
            const resultEmptyString = await fileUtil.getFilesFromDirectory('')
            
            //ASSERT
            expect(resultNull).toEqual(files)
            expect(resultUndefined).toEqual(files)
            expect(resultEmptyString).toEqual(files)
            
        })
      
    })

    describe('removeExtension', ()=>{
        test('should return index from index.ts', ()=>{
            //ARRANGE
            const fileName = 'index.ts'
            const fileWhitoutExt = 'index'
            //ACT
            const result = fileUtil.removeExtension(fileName)
            //ASSERT
            expect(result).toEqual(fileWhitoutExt)
        })

        test('should return null if we have some value distinct from string', ()=>{
            //ARRANGE
            const expected = null
            //ACT
            const resultNull = fileUtil.removeExtension(null)
            const resultUndefined = fileUtil.removeExtension(undefined)
            const resultObject = fileUtil.removeExtension({} as string)
            //ASSERT
            expect(resultNull).toEqual(expected)
            expect(resultUndefined).toEqual(expected)
            expect(resultObject).toEqual(expected)
            
        })
    })
})
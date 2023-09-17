import colors from 'colors'
import { allowedMethods } from "#common-app/index.js"

describe(colors.bgBlue.bold('  UTILS -- allowedMethods'),()=>{

    test('From string of valid HTTP method separated by colon, we get a array of valid methods', ()=>{
        // arrange
        const methods = 'GET,POST,PUT,DELETE'
        // act
        const ArrayOfMethods = allowedMethods(methods)
        // assert
        expect(ArrayOfMethods).not.toBeNull()
        expect(ArrayOfMethods.length).toBe(4)
        expect(ArrayOfMethods).toMatchObject(['GET','POST','PUT','DELETE'])

    })

    // TODO: IMPLEMENTS MORE TEST FOR UTIL


})
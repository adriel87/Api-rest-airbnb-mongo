import { bearer } from "./bearer.util.js"


describe('UTILS -- bearer', ()=>{
    test('whit string whit value hello world return Bearer hello world', ()=>{
        //ARRANGE
        const expectedBearerToken = 'Bearer hello world'
        //ACT
        const token = 'hello world'
        const result = bearer(token)
        //ASSERT
        expect(result).toStrictEqual(expectedBearerToken)
    })
    test('throw error whit value distinct of string', ()=>{
        //ARRANGE
        
        //ACT
        try{
            bearer(null)

        }catch (error){
            //ASSERT
            expect(error).toStrictEqual('You must provide a valid string value')
        }

        
    })
})
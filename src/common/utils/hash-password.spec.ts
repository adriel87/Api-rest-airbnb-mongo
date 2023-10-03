
import { envConstant } from '#core/index.js'
import * as hashPassword from './hash-password.util.js'

describe('UTILS --- HASH PASSWORD', ()=>{
    describe('generate salt', ()=>{
        test('should return a salt whit size 32', async ()=>{
            console.log(process.env.NODE_ENV);
            
            //ARRANGE
            const saltLength = 32
            //ACT
            // const spy = jest.spyOn(envConstant.SALT_LENGTH, 'toString')
            // @ts-ignore
            // spy.mockReturnValue('16')
            const result = await hashPassword.generateSalt()
            // console.log(result);
            
            //ASSERT
            expect(result).toHaveLength(saltLength)
        })
    })
})
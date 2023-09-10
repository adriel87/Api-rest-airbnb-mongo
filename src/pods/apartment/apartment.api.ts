import { apartmentRepositoryImp } from "#dals/apartment/repositories/index.ts";
import { Router } from "express";



export const apartmentApi = Router()

apartmentApi
.get('/',(_, res)=>{
    throw new Error('a onde vas muchacho')
    res.send('hola')
})
.get('/apartments', async (req, res, next)=>{
    try {
        const page = Number(req.query.page);
        const pageSize = Number(req.query.pageSize);
        const apartments = await apartmentRepositoryImp.getApartmentList(page,pageSize)
        res.send(apartments);
    } catch (error) {
        next(error)
    }
})
.get('/apartment/:id', async (req, res, next)=>{
    try {
        const { id } = req.params
        const apartment = await apartmentRepositoryImp.getApartment(id);
        res.send(apartment);
    } catch (error) {
        next(error)
    }
})
.put('/apartment/:id/addNewReview', async (req, res, next)=>{
    try {
        const { id } = req.params
        const { review } = req.body
        const isReviewAdded = await apartmentRepositoryImp.addNewReview(id, review)
        if (isReviewAdded) {
            res.sendStatus(204)
        } else {
            res.sendStatus(500)
        }
    } catch (error) {
        next(error)
    }
})

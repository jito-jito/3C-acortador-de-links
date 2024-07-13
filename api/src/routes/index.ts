import express from 'express'
import urlRouter from './url.router'
const router = express.Router()

router.use('/api/v1/url', urlRouter)

router.use((err: any, req: any, res: any, next: any) => {
    res.status(499).send('algo ocurrio :(')
})

export default router

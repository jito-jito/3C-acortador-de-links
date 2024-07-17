import express from 'express'
import urlRouter from './url.router'
import redirectRouter from './redirect.router'
const router = express.Router()

export interface errorRequest {
    statusCode: number,
    message: string
}

router.use('/api/v1/url', urlRouter)
router.use('', redirectRouter)

router.use((err: errorRequest, req: any, res: any, next: any) => {
    res.status(err.statusCode ?? 500)
    .send(err.message ?? 'algo ocurrio :(')
})

export default router

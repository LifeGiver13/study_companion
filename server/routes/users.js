import express from 'express'
import { setStatus } from '../../src/handlers/adminPannel/status.js'

const router = express.Router()

router.put('/users/:username/status', setStatus)
 export default router
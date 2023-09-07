import { Router } from "express"
import * as uc from "./contoller/product.js"
const router = Router()

router.post('/addProduct', uc.addProduct)
router.post('/searchProduct', uc.searchProduct)








export default router
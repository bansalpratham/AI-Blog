import express from 'express'
import { addBlog } from '../controllers/BlogController'

const blogRouter = express.Router()

blogRouter.post("/add",addBlog)
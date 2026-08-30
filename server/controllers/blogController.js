import Blog from "../models/Blog"

export const addBlog = async (req,res)=>{
    try {
        const {title,subTitle,description,category,isPublished} = JSON.parse(req.body.blog)
        const imageFile = req.file

        if (!title || !description || !category || !imageFile)
        {
            return res.json({success:fasle , missing:"Missing reuired fields"})
        }

        const blog = Blog.create({
            
        })

    } catch (error) {
        
    }
}
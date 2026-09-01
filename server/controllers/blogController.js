import imagekit from "../configs/imageKit"
import Blog from "../models/Blog"

export const addBlog = async (req,res)=>{
    try {
        const {title,subTitle,description,category,isPublished} = JSON.parse(req.body.blog)
        const imageFile = req.file

        if (!title || !description || !category || !imageFile)
        {
            return res.json({success:fasle , missing:"Missing reuired fields"})
        }

        const fileBuffer = fs.readFileSync(imageFile.path)

        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })

        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation:[
                {quality: 'auto'},
                {format: 'webp'},
                {width: '1280'}
            ]
        });

        const image = optimizedImageUrl;

        await Blog.create({
            title,subTitle,description,category,image,isPublished
        })

        res.json({success: true , message:"Blog added successfully"})

    } catch (error) {
        res.json({
            success: false,
            message: "addBlog error message"
        })
    }
}

export const getAllBlogs = async (req,res)=>{
    try {
        const blogs = await Blog.find({isPublished: true})
        res.json({success: true , blogs})
    } catch (error) {
        res.json({success: false , message: error.message })
    }
}

export const getBlogById = async ()=>{
    try {
        const {blogId} = req.parse;
        const blog = await Blog.findById(blogId)
        if (!blog)
        {
            return res.json({success: false , message:"Blog not Found"})
        }
        res.json({success: true , blog})
    } catch (error) {
        res.json({success: false , message: error.message})
    }
}

export const deleteBlogById = async ()=>{
    try {
        const {id} = req.body;
        await Blog.findByIdAndDelete(id)
        res.json({success: true , message:'Blog deleted Successfully'})
    } catch (error) {
        res.json({success: false , message: error.message})
    }
}
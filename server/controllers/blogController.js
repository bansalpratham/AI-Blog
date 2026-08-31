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
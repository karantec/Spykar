const { cloudinary } = require("../config/cloudinary");
const Home = require("../models/HomeImage.Model");

//create a new blog post with the provided data

const createKitchen = async (req, res) => {
  try {
    const { title, content, category, image } = req.body;
    /// validation process
    if (!title || !content || !category || !image) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    // check   if the blog is already exists
    const existingData=await Home.findOne({title})

    if(existingData){
      return res.status(400).json({message:"This blog already exists"})
    }

    
    const newHome = new Home({
      title,
      content,
      category,
      image,
    });
    await newHome.save();

    res.status(201).json({
      message: "Home Page is successfully created",
      
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// get all blog posts
const getallHomeImage = async (req, res) => {
  try {
    const Homes = await Home.find();

    if (!Homes.length) {
      return res.status(404).json({ message: "No Home posts found" });
    }
    
    res.status(200).json(Homes); // Corrected from "blog" to "blogs"
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


//getting a single blog
const getHomeById = async (req, res) => {
  try {
    const { id } = req.params;

    const Homes= await Home.findById(id); // Changed "blogs" to "blog"

    if (!Homes) {
      return res.status(404).json({ message: "Homes not found" });
    }
    res.status(200).json(Homes); // Now correctly returning "blog"
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


// update all blogs
const updateHomePage = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category, image } = req.body;
    let imageUrl = "";
    //image uploading process
    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: "blogs",
      });
      imageUrl = result.secure_url;
    }
    const updatedhome = await Home.findByIdAndUpdate(
      id,
      {
        title,
        content,
        category,
        image: imageUrl,
      },
      { new: true }
    );

    if (!updatedhome) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "homePage  is successfully updated successfully",
      updatedhome,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

// delete a blog post by id

const deletehomePage = async (req, res) => {
  try {
    const { id } = req.params;
 

    // Validate if ID is a valid MongoDB ObjectId
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid blog ID format" });
    }

    // Check if the blog exists before deletion
    const existingHome = await Home.findById(id);
    if (!existingHome) {
      return res.status(404).json({ message: "Home not found" });
    }

    // Delete the blog
    const deletedHome = await Home.findByIdAndDelete(id);

    res.status(200).json({
      message: "Home successfully deleted",
      deletedHome,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};



module.exports={
    createKitchen,
    getallHomeImage,
    getHomeById,
    updateHomePage,
    deletehomePage
};
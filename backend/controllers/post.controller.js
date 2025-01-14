import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { Notification } from "../models/notification.model.js";
// import { Reply } from "../models/replies.model.js";

export const addNewPost = async (req, res) => {
    try {
        const { caption,location } = req.body;
        const image = req.file;
        const authorId = req.id;

        if (!image) return res.status(400).json({ message: 'Image required' });

        // image upload 
        const optimizedImageBuffer = await sharp(image.buffer)
            .resize({ width: 800, height: 800, fit: 'inside' })
            .toFormat('jpeg', { quality: 80 })
            .toBuffer();

        // buffer to data uri
        const fileUri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
        const cloudResponse = await cloudinary.uploader.upload(fileUri);
        const post = await Post.create({
            caption,
            location,
            image: cloudResponse.secure_url,
            author: authorId
        });
        const user = await User.findById(authorId);
        if (user) {
            user.posts.push(post._id);
            await user.save();
        }

        await post.populate({ path: 'author', select: '-password' });

        return res.status(201).json({
            message: 'New post added',
            post,
            success: true,
        })

    } catch (error) {
        console.log(error);
    }
}

export const getAllPost = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })
            .populate({ path: 'author', select: 'username profilePicture' })
            .populate({
                path: 'comments',
                sort: { createdAt: -1 },
                populate: {
                    path: 'author',
                    select: 'username profilePicture'
                }
            });
        return res.status(200).json({
            posts,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};

export const getUserPost = async (req, res) => {
    try {
        const authorId = req.id;
        const posts = await Post.find({ author: authorId }).sort({ createdAt: -1 }).populate({
            path: 'author',
            select: 'username, profilePicture'
        }).populate({
            path: 'comments',
            sort: { createdAt: -1 },
            populate: {
                path: 'author',
                select: 'username, profilePicture'
            }
        });
        return res.status(200).json({
            posts,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}


export const likePost = async (req, res) => {
    try {
        const likeKrneWalaUserKiId = req.id;
        const postId = req.params.id; 
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found', success: false });

        // like logic started
        await post.updateOne({ $addToSet: { likes: likeKrneWalaUserKiId } });
        await post.save();

        // implement socket io for real time notification
        const user = await User.findById(likeKrneWalaUserKiId).select('username profilePicture');
         
        const postOwnerId = post.author.toString();
        if(postOwnerId !== likeKrneWalaUserKiId){
            // emit a notification event
            const notification = {
                type:'like',
                userId:likeKrneWalaUserKiId,
                userDetails:user,
                postId,
                message:'Your post was liked'
            }
            const postOwnerSocketId = getReceiverSocketId(postOwnerId);
            io.to(postOwnerSocketId).emit('notification', notification);

            // Save the notification to the database
            await Notification.create({
                reciver: postOwnerId,
                sender: likeKrneWalaUserKiId,
                message: 'Your post was liked',
                link: `/post/${postId}`,
                type: 'like',
            });

        }

        return res.status(200).json({message:'Post liked', success:true});
    } catch (error) {

    }
}
export const dislikePost = async (req, res) => {
    try {
        const likeKrneWalaUserKiId = req.id;
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found', success: false });

        // like logic started
        await post.updateOne({ $pull: { likes: likeKrneWalaUserKiId } });
        await post.save();

        // implement socket io for real time notification
        const user = await User.findById(likeKrneWalaUserKiId).select('username profilePicture');
        const postOwnerId = post.author.toString();
        if(postOwnerId !== likeKrneWalaUserKiId){
            // emit a notification event
            const notification = {
                type:'dislike',
                userId:likeKrneWalaUserKiId,
                userDetails:user,
                postId,
                message:'Your post was liked'
            }
            const postOwnerSocketId = getReceiverSocketId(postOwnerId);
            io.to(postOwnerSocketId).emit('notification', notification);

            // Save the notification to the database
            await Notification.create({
                reciver: postOwnerId,
                sender: likeKrneWalaUserKiId,
                message: 'Your post was disliked',
                link: `/post/${postId}`,
                type: 'dislike',
            });


        }



        return res.status(200).json({message:'Post disliked', success:true});
    } catch (error) {

    }
}

export const addComment = async (req,res) =>{
    try {
        const postId = req.params.id;
        const commentKrneWalaUserKiId = req.id;

        const {text} = req.body;

        const post = await Post.findById(postId);

        if(!text) return res.status(400).json({message:'text is required', success:false});

        const comment = await Comment.create({
            text,
            author:commentKrneWalaUserKiId,
            post:postId
        })

        await comment.populate({
            path:'author',
            select:"username profilePicture"
        });
        
        // Add the comment to the post's comments array
        post.comments.push(comment._id);
        await post.save();

        // Real-time Notification for the post author using Socket.IO
        const postOwnerId = post.author.toString(); // Get the ID of the post author
        if (postOwnerId !== commentKrneWalaUserKiId) {
            // Find the details of the user who commented
            const user = await User.findById(commentKrneWalaUserKiId).select('username profilePicture');
            
            // Create a notification object
            const notification = {
                type: 'comment',
                userId: commentKrneWalaUserKiId,
                userDetails: user, // Details of the user who commented
                postId,
                message: 'A new comment was added to your post'
            };

            // Get the socket ID of the post's owner (recipient of the notification)
            const postOwnerSocketId = getReceiverSocketId(postOwnerId);
            
            // Emit the notification event to the post owner in real time
            io.to(postOwnerSocketId).emit('notification', notification);

            // Save the notification to the database
            await Notification.create({
                reciver: postOwnerId,
                sender: commentKrneWalaUserKiId,
                message: 'A new comment was added to your post',
                link: `/post/${postId}`,
                type: 'comment',
            });
        }


        return res.status(201).json({
            message:'Comment Added',
            comment,
            success:true
        })

    } catch (error) {
        console.log(error);
    }
};

// Add reply to a comment
// export const addReply = async (req, res) => {
//     try {
//         const commentId = req.params.commentId;
//         const userId = req.id; // User who is replying
//         const { text } = req.body;

//         if (!text) return res.status(400).json({ message: 'Reply text is required', success: false });

//         // Find the comment for which the reply is being added
//         const comment = await Comment.findById(commentId);
//         if (!comment) return res.status(404).json({ message: 'Comment not found', success: false });

//         // Create a new reply
//         const reply = await Reply.create({
//             text,
//             author: userId,
//             post: comment.post,
//             comment: commentId
//         });

//         await reply.populate({
//             path: 'author',
//             select: 'username profilePicture'
//         });

//         // Add the reply to the comment's replies array (if necessary)
//         comment.replies.push(reply._id);
//         await comment.save();

//         // // Send notification to the author of the comment
//         // const commentAuthorId = comment.author.toString();
//         // if (commentAuthorId !== userId) {
//         //     const user = await User.findById(userId).select('username profilePicture');

//         //     const notification = new Notification({
//         //         reciver: commentAuthorId,
//         //         sender: userId,
//         //         message: `You have a new reply on your comment`,
//         //         link: `/post/${comment.post}/comment/${commentId}`,
//         //         type: 'comment',
//         //     });
//         //     await notification.save();

//         //     // Emit real-time notification to comment author
//         //     const commentAuthorSocketId = getReceiverSocketId(commentAuthorId);
//         //     io.to(commentAuthorSocketId).emit('notification', notification);
//         // }

//         return res.status(201).json({
//             message: 'Reply added',
//             reply,
//             success: true
//         });
//     } catch (error) {
//         return res.status(500).json({ message: 'Server error', success: false });
//     }
// };

export const getCommentsOfPost = async (req,res) => {
    try {
        const postId = req.params.id;

        const comments = await Comment.find({post:postId}).populate('author', 'username profilePicture');

        if(!comments) return res.status(404).json({message:'No comments found for this post', success:false});

        return res.status(200).json({success:true,comments});

    } catch (error) {
        console.log(error);
    }
}

export const deletePost = async (req,res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;

        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message:'Post not found', success:false});

        // check if the logged-in user is the owner of the post
        if(post.author.toString() !== authorId) return res.status(403).json({message:'Unauthorized'});

        // delete post
        await Post.findByIdAndDelete(postId);

        // remove the post id from the user's post
        let user = await User.findById(authorId);
        user.posts = user.posts.filter(id => id.toString() !== postId);
        await user.save();

        // delete associated comments
        await Comment.deleteMany({post:postId});

        return res.status(200).json({
            success:true,
            message:'Post deleted'
        })

    } catch (error) {
        console.log(error);
    }
}

export const bookmarkPost = async (req,res) => {
    try {
        const postId = req.params.id;
        const authorId = req.id;
        const post = await Post.findById(postId);
        if(!post) return res.status(404).json({message:'Post not found', success:false});
        
        const user = await User.findById(authorId);
        if(user.bookmarks.includes(post._id)){
            // already bookmarked -> remove from the bookmark
            await user.updateOne({$pull:{bookmarks:post._id}});
            await user.save();
            return res.status(200).json({type:'unsaved', message:'Post removed from bookmark', success:true});

        }else{
            // bookmark krna pdega
            await user.updateOne({$addToSet:{bookmarks:post._id}});
            await user.save();
            return res.status(200).json({type:'saved', message:'Post bookmarked', success:true});
        }

    } catch (error) {
        console.log(error);
    }
}
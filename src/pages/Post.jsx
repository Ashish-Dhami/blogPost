import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import postService from "../appwrite/postBackend.js";
import {Link} from "react-router-dom";
import {Button} from "../components/index.js";
import {useSelector} from "react-redux";
import parse from "html-react-parser";

function Post() {
    const [post, setPost] = useState(null)
    const {postId} = useParams()
    const userId = useSelector((state)=>state.auth.userData?.$id)
    const isAuthor = post && userId ? post.userId === userId : false
    const navigate = useNavigate()
    const deletePost = () => {
        postService.deleteFileFromBucket({featuredImage : post.featuredImage}).then(()=>{
            postService.deletePost({postId}).then(()=>navigate("/posts"))
        })
    }
    useEffect(() => {
        postService.getPost({postId}).then((postData)=> setPost(postData))
    }, [postId]);
    return post ? (
        <div className="py-8">
            <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                <img
                    src={postService.getFilePreview({featuredImage : post.featuredImage})}
                    alt={post.title}
                    className="rounded-xl"
                />

                {isAuthor && (
                    <div className="absolute right-6 top-6">
                        <Link to={`/edit-post/${postId}`}>
                            <Button className="mr-3 bg-green-500">
                                Edit
                            </Button>
                        </Link>
                        <Button className="bg-red-500" onClick={deletePost}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>
            <div className="w-full mb-6">
                <h1 className="text-2xl font-bold">{post.title}</h1>
            </div>
            <div className="browser-css">
                {parse(post.content)}
            </div>
        </div>
    ) : null
}

export default Post;
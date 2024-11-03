import React from 'react';
import {useNavigate} from "react-router-dom";
import postService from "../appwrite/postBackend.js";

function PostCard({title,content,featuredImage,postId}) {
    const navigate = useNavigate()
    return (
        <div className="max-w-xs p-6 rounded-md shadow-md bg-black">
            <img
                src={postService.getFilePreview({featuredImage})}
                alt={title}
                className="object-cover object-center w-full rounded-md h-72 bg-gray-500"
                onClick={()=>navigate(`/post/${postId}`)}
            />
            <div className="mt-6 mb-2">
                <span className="block text-sm font-medium font-mono tracking-widest uppercase text-indigo-400">
                  Title
                </span>
                <h2 className="text-xl font-semibold tracking-wide text-white">{title}</h2>
            </div>
        </div>
    );
}

export default PostCard;
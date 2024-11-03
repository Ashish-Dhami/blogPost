import React, {useEffect, useState} from 'react';
import {PostCard} from "../components/index.js";
import postService from "../appwrite/postBackend.js";
import {useSelector} from "react-redux";

function AllPosts({my=false}) {
    const [allPostsList, setAllPostsList] = useState([])
    const userId = useSelector((state)=> state.auth.userData?.$id)
    useEffect(() => {
        !my ? postService.listAllPosts().then((allPosts)=>setAllPostsList(allPosts.documents))
            : postService.listMyPosts({userId}).then((allPosts)=>setAllPostsList(allPosts.documents))
    }, [my]);

    return (
        <ul className="items-stretch hidden space-x-2 my-2 lg:flex">
            {allPostsList.map((postData) => (
                <li key={postData.$id}>
                    <PostCard title={postData.title}
                              content={postData.content}
                              featuredImage={postData.featuredImage}
                              postId={postData.$id}
                    />
                </li>
            ))}
        </ul>
    );
}

export default AllPosts;
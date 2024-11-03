import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {Button, Input, Select, TinyEditor} from "../components/index.js";
import {useNavigate, useParams} from "react-router-dom";
import postService from "../appwrite/postBackend.js";
import {useSelector} from "react-redux";

function AddEditPost() {
    const {postId}=useParams()
    const userId = useSelector((state) => state.auth.userData?.$id)
    const [post, setPost] = useState(null)
    /*console.log("postId ", postId)
    console.log("post ",post)*/
    const {register,handleSubmit,setValue,control,getValues}=useForm({
        values : post
    })
    const navigate= useNavigate()

    useEffect(() => {
        if(postId !== undefined){
            postService.getPost({postId}).then((postData)=> {
                if(postData && (postData.userId!==userId)){          //check if the user editing the post is its author otherwise navigate him
                    navigate("/posts")                              //can display dialog also
                }else{
                    setPost(postData)
                }
            })
        }else{
            setPost(null)
            setValue("title","")
            setValue("content","")
            setValue("status","active")
        }
    },[postId]);

    const submit = (formData)=>{
        if(formData.image[0]) {
            postService.uploadFile({file : formData.image[0]}).then((uploadedFile)=>{
                const dirtyPostData = {
                    postId,
                    title:formData.title,
                    content:formData.content,
                    featuredImage:uploadedFile.$id,
                    status:formData.status,
                    userId
                }
                if(post) {
                    postService.deleteFileFromBucket({featuredImage:post.featuredImage}).then(()=>{
                        postService.updatePost(dirtyPostData).then(()=>navigate(`/post/${postId}`))
                    })
                }else{
                    postService.createPost(dirtyPostData).then((postData)=>navigate(`/post/${postData.$id}`))
                }
            })
        }
    }
    return (postId===undefined || post) ? (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", {required: "title is required"})}
                />
                {/*<Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", {required: true})}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true});
                    }}
                />*/}
                <TinyEditor label="Content :" name="content" control={control} defaultValue={getValues("content")}/>
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", {required: true})}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={postService.getFilePreview({featuredImage:post.featuredImage})}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", {required: true})}
                />
                <Button type="submit" className={`${post ? "bg-green-500" : ""} w-full`}>
                    {post ? "Update" : "Create"}
                </Button>
            </div>
        </form>
    ) : <h1>loading........</h1>
}

export default AddEditPost;
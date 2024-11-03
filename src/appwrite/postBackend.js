import {Client, Databases, ID, Query, Storage} from "appwrite";
import {conf} from "../conf/conf.js";

class PostService{
    client = new Client()
    databases
    storage
    constructor() {
        this.client.setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createPost({title,content,featuredImage,status,userId}){
        try {
            return await this.databases.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,ID.unique(),{
                title,
                content,
                featuredImage,
                status,
                userId
            })
        }catch (e) {
            throw e
        }
    }
    async updatePost({postId,title,content,featuredImage,status,userId}){
        try {
            return await this.databases.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,postId,{
                title,
                content,
                featuredImage,
                status,
                userId
            })
        }catch (e) {
            throw e
        }
    }
    async getPost({postId}){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,postId)
        }catch (e) {
            throw e
        }
    }
    async listAllPosts(){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,[
                Query.equal("status","active")
            ])
        }catch (e) {
            throw e
        }
    }
    async listMyPosts({userId}){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,[
                Query.equal("userId",userId),
                Query.equal("status","active")
            ])
        }catch (e) {
            throw e
        }
    }
    async deletePost({postId}){
        try {
            return await this.databases.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,postId)
        }catch (e) {
            throw e
        }
    }
    async uploadFile({file}){
        try{
            return await this.storage.createFile(conf.appwriteBucketId,ID.unique(),file)
        }catch (e) {
            throw e
        }
    }

    getFilePreview({featuredImage}){
        try{
            return this.storage.getFilePreview(conf.appwriteBucketId,featuredImage)
        }catch (e) {
            throw e
        }
    }

    async deleteFileFromBucket({featuredImage}){
        try{
            return await this.storage.deleteFile(conf.appwriteBucketId,featuredImage)
        }catch (e) {
            throw e
        }
    }
}


const postService = new PostService()
export default postService
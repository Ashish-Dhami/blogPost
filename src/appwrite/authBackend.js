import {Client, Account, ID} from "appwrite";
import {conf} from "../conf/conf.js";

class AuthBackend{
    client = new Client()
    account
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({name,email,password}){
        try{
            const newAccount = await this.account.create(ID.unique(), email, password, name);
            if(newAccount){
                return this.login({email,password})
            }else{
                return newAccount
            }
        }catch (e){
            throw e
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }catch (e){
            throw e
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get();
        }catch (e){
            throw e
        }
        return null
    }

    async logout(){
        try{
            return await this.account.deleteSessions();
        }catch (e){
            throw e
        }
    }
}

const authService = new AuthBackend()
export default authService
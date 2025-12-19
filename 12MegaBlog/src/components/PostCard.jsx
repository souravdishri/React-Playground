import React from 'react'

//to be changed by service
import appwriteService from "../appwrite/config.js"
import { Link } from 'react-router-dom'

//here we use ($id) because appwrite provide like this
function PostCard({ $id, title, featuredImage }) {

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    {/* <img src={appwriteService.getFilePreview(featuredImage)} alt={title} */}
                    <img src={appwriteService.getFileView(featuredImage)} alt={title}
                        className='rounded-xl'/>

                </div>
                <h2
                    className='text-xl font-bold'
                >{title}</h2>
            </div>
        </Link>
    )
}


export default PostCard
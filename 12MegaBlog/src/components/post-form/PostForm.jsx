import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config.js";            //todo change
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    console.log("UserData:", userData);


    const submit = async (data) => {
        console.log("Data:", data);
        if (!userData) {
            alert("You must be logged in to create a post.");
            return;
        }
        if (post) {
            console.log("Post:", post);
            // what is data and what is `.image` here?
            // data is the form data, and `.image` refers to the 'name of the input field' for the image file in the form
            // we are checking if there is a new image uploaded, if yes then we are uploading it and deleting the old one
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            console.log("File:", file);

            if (file) {
                // what is post and `.featuredImage` here?
                // post is the existing post object which is being edited, and `.featuredImage` is the id of the existing featured image file
                // we are deleting the old featured image file from appwrite storage
                await appwriteService.deleteFile(post.featuredImage);
            }
            // what is .$id here?
            // .$id is the unique identifier of the post document in the database 
            const dbPost = await appwriteService.updatePost(post.$id, {
                ...data,
                featuredImage: file ? file.$id : undefined,
            });
            console.log("DBPost:", dbPost);

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`);
            }

        } else {
            // const file = await appwriteService.uploadFile(data.image[0]);
            //improved is the below one
            const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
            console.log("File:", file);

            if (file) {
                const fileId = file.$id;
                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData.$id,
                });
                console.log("DBPost", dbPost);


                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    };
    // we use useCallback to memoize the slugTransform function, so that it doesn't get recreated on every render
    // and values are trimmed, lowercased, special characters replaced with hyphens, spaces replaced with hyphens
    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        // watch is a function provided by react-hook-form to watch the changes in the form fields
        // here we are watching the 'title' field, and whenever it changes, we are updating the 'slug' field accordingly
        // `value` is the entire form data object, and `name` is the name of the field which triggered the change
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                // `slug` is the name of the input field for slug
                // we are setting the value of 'slug input field' based on the 'title input field'
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });
        //
        return () => subscription.unsubscribe();        //used for optimization
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {   // when user manually changes slug, we update it accordingly
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                {/*here we use the RTE component to render a rich text editor for the content and this 'control' is passed to the RTE component which helps in managing the content */}
                <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
                {/* here this control means the 'control prop' is used to pass the form control object to the RTE component */}
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                // if post exists, image is not required
                />
                {/* here we are checking if post exists, and if it does, we are displaying the featured image */}
                {post && (
                    <div className="w-full mb-4">
                        <img
                            // src={appwriteService.getFilePreview(post.featuredImage)}
                            src={appwriteService.getFileView(post.featuredImage)}
                            alt={post.title ||  "Featured image"}
                            className="rounded-lg"
                        />
                    </div>
                )}
                {/* here we use the Select component to render a dropdown for selecting the status */}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                {/* here we use the Button component to render a submit button */}
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}
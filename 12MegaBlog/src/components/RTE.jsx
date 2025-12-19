import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import conf from '../conf/conf.js';

//This "control" is responsible to take state to that another form where we are using
export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                //what is this 'render' here?
                //'render' is a function which takes an object as an argument, and from that object we are destructuring 'field' and from that 'field' we are destructuring 'onChange' function
                //'onChange' is a function which is provided by 'react-hook-form' to handle the change in the input field
                //'Editor' is the actual rich text editor component from 'tinymce'
                render={({ field: { onChange } }) => (
                    <Editor
                    apiKey={conf.tinymceapikey}  //api key from tinymce
                        initialValue={defaultValue}
                        init={{
                            initialValue: defaultValue,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                        }}
                        //' onEditorChange' is the event provided by 'tinymce' which is triggered when the content of the editor changes
                        onEditorChange={onChange}   
                    />
                )}
            />

        </div>
    )
}

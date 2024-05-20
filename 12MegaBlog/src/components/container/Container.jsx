import React from 'react'

//Container accepts the props as a children(it's a name), and it contains the styling properties
function Container({ children }) {
    return <div className='w-full max-w-7xl mx-auto px-4'>{children}</div>;

}

export default Container
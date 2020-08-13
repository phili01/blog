import React from 'react';
import arraySort from 'array-sort';

import BlogContent from './BlogContent/BlogContent';

const blogContents = props => {
    let content = arraySort(props.content, 'created', {reverse: true})
    const blog = content.map((cnt, index) => (
        <BlogContent 
             key={index} 
             cnt={cnt} />
    ));

    return blog;
}

export default blogContents;
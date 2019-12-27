import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'

const PostCard = ({ post }) => {
    const url = `/${post.slug}/`
    const readingTime = readingTimeHelper(post)

    return (
        <Link to={url}>
            <div className="card">
                <div className="card-image">
                    {post.feature_image &&
                        <div className="post-card-image" style={{
                            backgroundImage: `url(${post.feature_image})`,
                        }}></div>}
                </div>
                <div className="card-content">
                    <div className="media">
                        <div className="media-content">
                            <p className="title is-4">{post.title}</p>
                            <p className="subtitle is-6">{readingTime}</p>
                        </div>
                    </div>
                    <div className="content">
                        {post.excerpt}
                    </div>
                </div>
            </div>
        </Link>
    )
}

PostCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        feature_image: PropTypes.string,
        featured: PropTypes.bool,
        excerpt: PropTypes.string.isRequired,
    }).isRequired,
}

export default PostCard

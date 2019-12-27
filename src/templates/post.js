import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Layout } from '../components/common'
import { MetaData } from '../components/common/meta'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/
const Post = ({ data, location }) => {
    const post = data.ghostPost
    const readingTime = readingTimeHelper(post)

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="article"
            />
            <Helmet>
                <style type="text/css">{`${post.codeinjection_styles}`}</style>
            </Helmet>
            <Layout>
                <div className="container">
                    <article className="content">
                        <section className="hero">
                            <div className="hero-body">
                                <div className="container">
                                    <h1 className="title">
                                        {post.title}
                                    </h1>
                                    <div className="media">
                                        <figure className="media-left image is-48x48">
                                            {post.primary_author.profile_image ?
                                                <img className="author-profile-image is-rounded" src={post.primary_author.profile_image} alt={post.primary_author.name} /> :
                                                <img className="default-avatar is-rounded" src="/images/icons/avatar.svg" alt={post.primary_author.name} />
                                            }
                                        </figure>
                                        <div className="media-content">
                                            <div className="content">
                                                <p>{post.primary_author.name}</p>
                                                <p>{readingTime}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        {post.feature_image ?
                            <figure className="post-feature-image">
                                <img src={post.feature_image} alt={post.title} />
                            </figure> : null}
                        <section className="post-full-content">
                            {/* The main post content */}
                            <section
                                className="content-body load-external-scripts"
                                dangerouslySetInnerHTML={{ __html: post.html }}
                            />
                        </section>
                    </article>
                    <div id="commento"></div>
                    <script src="https://cdn.commento.io/js/commento.js"></script>
                </div>
            </Layout>
        </>
    )
}

Post.propTypes = {
    data: PropTypes.shape({
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            html: PropTypes.string.isRequired,
            feature_image: PropTypes.string,
        }).isRequired,
    }).isRequired,
    location: PropTypes.object.isRequired,
}

export default Post

export const postQuery = graphql`
    query($slug: String!) {
                    ghostPost(slug: {eq: $slug }) {
                    ...GhostPostFields
                }
                }
            `

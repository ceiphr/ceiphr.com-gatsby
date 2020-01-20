import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import { Tags } from '@tryghost/helpers-gatsby'
import { readingTime as readingTimeHelper } from '@tryghost/helpers'
import Prism from 'prismjs'

import { Layout, PostCard, CarbonAds, Commento } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Single post view (/:slug)
*
* This file renders a single post and loads all the content.
*
*/

class Post extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        Prism.highlightAll()
    }

    render() {
        const { data, location } = this.props
        const post = data.ghostPost
        const nextPost = data.allGhostPost.edges
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
                                                    <div className="is-pulled-left">
                                                        <p>{post.primary_author.name}</p>
                                                        <a target="_blank" rel="noopener noreferrer" href="https://github.com/ceiphr/">GitHub</a>
                                                    </div>
                                                    <div className="is-pulled-right">
                                                        <p className="has-text-right">{readingTime}</p>
                                                        {post.tags && <div className="tag"> <Tags post={post} visibility="public" permalink="/tag/:slug/" autolink={true} /></div>}
                                                    </div>
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
                            <div className="post-columns">
                                <section className="post-full-content">
                                    {/* The main post content */}
                                    <div
                                        className="content-body load-external-scripts"
                                        dangerouslySetInnerHTML={{ __html: post.html }}
                                    />
                                </section>
                                <section className="post-sidebar">
                                    <div className="post-sidebar-widgets">
                                        <div className="card referral">
                                            <a href="https://m.do.co/c/b95c2a8a5568" aria-label="DigitalOcean" rel="noopener">
                                                <div className="referral__logo">
                                                    <img src={`/images/icons/do.svg`} alt="DigitalOcean" />
                                                </div>
                                                <p>
                                                    This website is hosted on DigitalOcean. Use my referral link for a discount.
                                                </p>
                                            </a>
                                        </div>
                                        <CarbonAds/>
                                    </div>
                                </section>
                            </div>
                        </article>
                        <div className="post-recommendations">
                            {nextPost.map(({ node }) => (
                                <PostCard key={node.id} post={node} />
                            ))}
                        </div>
                        {/* <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} /> */}
                        <Commento id={post.slug}/>
                    </div>
                </Layout>
            </>
        )
    }
}

Post.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
        ghostPost: PropTypes.shape({
            codeinjection_styles: PropTypes.object,
            title: PropTypes.string.isRequired,
            primary_author: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
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
        },
        allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            limit: 2,
            filter: {slug: {ne: $slug}}
        ) {
          edges {
            node {
              ...GhostPostFields
            }
          }
        }
    }
`

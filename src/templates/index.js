import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Lottie from 'react-lottie'

import banner from '../../static/images/logo.svg'
import animationData from '../../static/glyph.json'

import { Layout, PostCard, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Main index page (home page)
*
* Loads all posts from Ghost and uses pagination to navigate through them.
* The number of posts that should appear per page can be setup
* in /utils/siteConfig.js under `postsPerPage`.
*
*/

class Index extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { data, location, pageContext } = this.props
        const posts = data.allGhostPost.edges
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: `xMidYMid slice`,
            },
        }

        return (
            <>
                <MetaData location={location} />
                <section className="hero hero-homepage is-halfheight section">
                    <div className="hero-body">
                        <div className="container">
                            <div className="hero-banner">
                                <img src={banner} alt="Ceiphr" />
                            </div>
                        </div>
                        <div className="hero-glyph__wrapper">
                            <div className="hero-glyph">
                                <Lottie options={defaultOptions} />
                            </div>
                        </div>
                    </div>
                </section>
                <Layout isHome={true}>
                    <div className="container">
                        <section className="post-feed">
                            {posts.map(({ node }) => (
                                // The tag below includes the markup for each post - components/common/PostCard.js
                                <PostCard key={node.id} post={node} />
                            ))}
                        </section>
                        <Pagination pageContext={pageContext} />
                    </div>
                </Layout>
            </>
        )
    }
}

Index.propTypes = {
    data: PropTypes.shape({
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Index

// This page query loads all posts sorted descending by published date
// The `limit` and `skip` values are used for pagination
export const pageQuery = graphql`
  query GhostPostQuery($limit: Int!, $skip: Int!) {
    allGhostPost(
        sort: { order: DESC, fields: [published_at] },
        limit: $limit,
        skip: $skip
    ) {
      edges {
        node {
          ...GhostPostFields
        }
      }
    }
  }
`

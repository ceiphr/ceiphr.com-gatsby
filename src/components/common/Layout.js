import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Navigation } from '.'
import config from '../../utils/siteConfig'

// Styles
import '../../styles/app.scss'

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/
class DefaultLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = { navVisibility: true };
    }

    ToggleNav = () => {
        this.setState({ navVisibility: !this.state.navVisibility })
    }

    render() {
        const { data, children, bodyClass, isHome } = this.props;
        const site = data.allGhostSettings.edges[0].node;

        return (
            <>
                <Helmet>
                    <html lang={site.lang} />
                    <style type="text/css">{`${site.codeinjection_styles}`}</style>
                    <body className={bodyClass} />
                </Helmet>

                <div className="viewport">
                    <div className="viewport-top section">
                        {/* The main header section on top of the screen */}
                        <nav className="navbar is-fixed-top">
                            <div className="container">
                                <div className="navbar-brand">
                                    <a className="navbar-item" href="https://bulma.io">
                                        <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28" />
                                    </a>
                                    <div className="navbar-burger burger" onClick={this.ToggleNav}>
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </div>
                                <div className={this.state.navVisibility ? "navbar-menu" : "navbar-menu is-active"}>
                                    <div className="navbar-end">
                                        <Navigation data={site.navigation} navClass="navbar-item" />
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <main className="site-main section">
                        {/* All the main content gets inserted here, index.js, post.js */}
                        {children}
                    </main>
                    <div className="viewport-bottom section">
                        {/* The footer at the very bottom of the screen */}
                        <footer className="footer">
                            <div className="container">
                                <div className="has-text-centered">
                                    <p>2016 &mdash; 2019 Ari Birnbaum ({site.title}). This website's source code is licensed under MIT.</p>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>

            </>
        )
    }
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery

import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Navigation } from '.'
import config from '../../utils/siteConfig'
import logo from '../../../static/images/icons/ceiphr.svg'

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
                    <div className="viewport-top">
                        {/* The main header section on top of the screen */}
                        <nav id="navbar" className={"navbar " + (this.props.isHome ? "is-transparent" : "is-black")}>
                            <div className="container">
                                <div className="navbar-brand">
                                    <a className="navbar-item" href="/">
                                        <img src={logo} alt="Ceiphr" width="32" height="48" />
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
                                    <p className="footer-links">
                                        <a target="_blank" href="https://github.com/ceiphr">GitHub</a>
                                        <a target="_blank" href="https://dribbble.com/ceiphr">Dribbble</a>
                                        <a target="_blank" href="https://www.linkedin.com/in/ceiphr/">LinkedIn</a>
                                        <a target="_blank" href="https://www.instagram.com/ceiphr/">Instagram</a>
                                        <a target="_blank" href="https://twitter.com/ceiphr/">Twitter</a>
                                    </p>
                                    <p>2016 &mdash; 2020 Ari Birnbaum ({site.title}). This website's source code is licensed under <a href="https://github.com/ceiphr/ceiphr.com-gatsby/blob/master/LICENSE">GNU GPL v3.0</a>.</p>
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

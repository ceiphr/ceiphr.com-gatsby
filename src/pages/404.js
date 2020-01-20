import React from 'react'
import { Link } from 'gatsby'
import { Layout } from '../components/common'

const NotFoundPage = () => (
    <div class="hero hero-fullpage is-fullheight">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    404
                        </h1>
                <h2 class="subtitle has-text-white">
                    The page you're looking for could not be found.
                    <br/>
                    <a href="/" class="button is-dark button-fullpage has-text-white">Return Home</a>
                </h2>
            </div>
        </div>
    </div>
)

export default NotFoundPage

import React, { Component } from 'react';

class CarbonAds extends Component {
    render() {
        const { placement } = this.props

        return (
            <div className="carbon-ads-wrapper">
                <script
                    async
                    type='text/javascript'
                    src={`//cdn.carbonads.com/carbon.js?zoneid=1696&serve=CVYD42T&placement=${this.props.placement}`}
                    id='_carbonads_js' />
            </div>
        );
    }
}

CarbonAds.defaultProps = {
    placement: 'ceiphrcom'
}

export default CarbonAds
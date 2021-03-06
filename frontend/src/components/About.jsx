import React, { Component } from 'react'

export default class About extends Component {

    innerHTML = React.createRef();

    componentDidMount(){
        this.props.setPosition("about", this.innerHTML);
    }

    render() {
        return (
            <div id="about-section" ref={ this.innerHTML }>
                <div id="about-holder">
                    <h1>about <span>us</span></h1>
                    
                    <sub id="about-motto">most flexible cryptocurrency investment company</sub>
                    
                    <div className="about-body">
                        <p>
                            Bitmax is a distinctive investment company offering investors
                            access to investment opportunities in bitcoin markets and other services.
                            We implement best practices of trading &amp; tracking of live Bitcoin prices through
                            our operations whole offering flexibility in our investment plans. Our company
                            benefits from an extensive network of global clients.
                        </p>
                        <h3>our mission</h3>
                        <p>
                            Our aim is to utilize our expertise &amp; knowledge to benefit our clients and the 
                            users of our services across the globe.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
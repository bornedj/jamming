import React from 'react';
import './Track.css'

export class Track extends React.Component {
    renderAction() {
        return (
            <button className="Track-action">
                {this.props.isRemoval ? "-" : "+"}
            </button>
        )
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.name}</h3>
                    <p>{this.artist} | {this.album}</p>
                </div>
                {/* <button className="Track-action"><!-- + or - will go here --></button> */}
            </div>
        )
    }
} 
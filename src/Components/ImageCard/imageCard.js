import React from 'react';
import { cartoon, profile } from "../../images";
import './imageCard.css';


class ImageCardWithFlip extends React.Component {
    state = { clickCount: 0 };

    handleClick = () => {
        if (this.state.clickCount === 3) {
            this.setState({ clickCount: 0 });
        } else {
            console.log(this.state.clickCount);
            this.setState(prev => ({ clickCount: prev.clickCount + 1 }));
        }
    };

    render() {
        let cardContainer = (
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <img src={cartoon} alt='cartoon_max'></img>
                </div>
                <div className="flip-card-back">
                    <img src={profile} alt='profile_pic'></img>
                </div>
            </div>
        );
        if (this.state.clickCount === 3) {
            cardContainer = (
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img src={profile} alt='profile_pic'></img>
                    </div>
                    <div className="flip-card-back">
                        <img src={cartoon} alt='cartoon_max'></img>
                    </div>
                </div>
            );
        }
        return (
            <div className='image-card'>
                <div className="flip-card" onClick={this.handleClick}>
                    {cardContainer}
                </div>
            </div>
        );
    }
}

export default ImageCardWithFlip;
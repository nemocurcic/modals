import React, { Component } from 'react';
import { Motion, spring } from 'react-motion';
import classnames from 'classnames';
import './style.css';

const SWIPE_LENGTH = 200; // user has to swipe in order to be consider as a swipe

class Modal extends Component {
    constructor(props) {
        super(props);
        console.log(this.props.data);
        this.state = {
            data: this.props.data,
            isPressed: false,
            pageX: 0,
            pageY: 0,
        }
    }

  render() {
    return (
    <Motion style={{x: spring(this.state.pageX, {stiffness: 500, precision: 1, damping: 17}), y: spring(this.state.pageY, { stiffness: 500, precision: 1, damping: 17}) }}>
         {({x, y}) =>
             <div className="modalitem" style={{
               WebkitTransform: `translate3d(${x}px, ${y}px, 0), scale(${1-this.props.index*0.1 })`,
               transform: `translate3d(${x}px, ${y}px, 0) scale(${1-this.props.index*0.1 })`,
               zIndex: 100-this.props.index,
               marginTop: -(this.props.index)*28,
           }}
           onMouseDown={(e) => this.handleMouseDown(e)}
           onTouchStart={(e) => this.handleTouchStart(e)}
           >
           <div className="modalitem__header">
                <span className="modalitem__header__label">{this.state.data.header}</span>
           </div>
           <div className="modalitem__avatar">
               <img src={ this.state.data.avatar } alt="" />
           </div>
           <div className="modalitem__name">{this.state.data.name}</div>
           <div className="modalitem__title">{this.state.data.title}</div>
           <div className="modalitem__description">
                <div className="modalitem__description__text">{this.state.data.description}</div>
           </div>
           <div className="modalitem__buttons">
                <div className={classnames('modalitem__buttons__button', 'modalitem__buttons__button--focused')}>confirm</div>
                <div className="modalitem__buttons__button">cancel</div>
           </div>
           </div>
         }
       </Motion>
    )
  }

  handleTouchStart(key, pressLocation, e) {
   this.handleMouseDown(key, pressLocation, e.touches[0]);
 }

 handleTouchMove(e) {
   e.preventDefault();
   this.handleMouseMove(e.touches[0]);
 }

 handleMouseMove(e) {

   const distanceSwipedX = e.pageX- this.state.startX;
   const distanceSwipedY = e.pageY- this.state.startY;

   if(this.state.isPressed) {
       if(Math.abs(distanceSwipedX) < SWIPE_LENGTH) {
           this.setState({
               pageX: distanceSwipedX,
               pageY: distanceSwipedY,
           });
       } else {
           this.handleMouseUp(e);
           this.props.swipeCallback();

       }
   }
  }

  handleMouseDown(e) {
      e.preventDefault();
      this.setState({
         isPressed: true,
         startX: e.pageX,
         startY: e.pageY,
      });

      this.mouseMoveHandler = this.handleMouseMove.bind(this);
      this.mouseUpHandler = this.handleMouseUp.bind(this);
      this.touchMoveHandler = this.handleTouchMove.bind(this);

      window.addEventListener('mousemove', this.mouseMoveHandler);
      window.addEventListener('touchmove', this.touchMoveHandler);
      window.addEventListener('touchend', this.mouseUpHandler);
      window.addEventListener('mouseup', this.mouseUpHandler);
  }

  handleMouseUp(e) {
    e.preventDefault();
    console.log(this.state.startX, this.state.pageX);
    this.setState({
       isPressed: false,
    });

    window.removeEventListener('mousemove', this.mouseMoveHandler);
    window.removeEventListener('touchmove', this.touchMoveHandler);
    window.removeEventListener('touchend', this.mouseUpHandler);
    window.removeEventListener('mouseup', this.mouseUpHandler);

    //snap back
    this.setState({
       pageX: 0,
       pageY: 0,
       isPressed: false,
    });
  }
}

export default Modal;

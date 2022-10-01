import React from "react";

export default function Dice(props) {
    const diceValue = parseInt(props.value);
    let diceElement;

    if (diceValue === 1) {
        diceElement = (
            <div className="one">
                <span className="dot"></span>
            </div>
        );

    } else if (diceValue === 2) {
        diceElement = (
            <div className="two">
                <div className="dotsContainer">
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
        );

    } else if (diceValue === 3) {
        diceElement = (
            <div className="three">
                <div className="dotsContainer">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
        );

    } else if (diceValue === 4) {
        diceElement = (
            <div className="four">
                <div className="dotsContainer">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
        );

    } else if (diceValue === 5) {
        diceElement = (
            <div className="five">
                <div className="dotsContainer">
                    <span className="dot dot1"></span>
                    <span className="dot dot2"></span>
                    <span className="dot dot3"></span>
                    <span className="dot dot4"></span>
                    <span className="dot dot5"></span>
                </div>
            </div>
        );

    } else if (diceValue === 6) {
        diceElement = (
            <div className="six">
                <div className="dotsContainer">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            </div>
        );
    } else {
        diceElement = (
            <div>T</div>
        )
    }
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    return (
        <div className='dice' onClick={props.holdDice} style={styles}>
            {diceElement}
        </div>
    )
}
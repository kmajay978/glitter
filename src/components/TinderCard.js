import React from 'react';
const TinderCardTest = () => {

    return (

        <div className="tinder">
            <div className="tinder--status">
                <i className="fa fa-remove" />
                <i className="fa fa-heart" />
            </div>
            <div className="tinder--cards">
                <div className="tinder--card">
                    <img src="https://picsum.photos/seed/picsum/200/300" />
                    <div className="profile__info">
                        <h3>Demo card 1</h3>
                        <p>This is a demo for Tinder like swipe cards</p>
                    </div>
                </div>
                <div className="tinder--card">
                    <img src="https://picsum.photos/seed/picsum/200/300" />
                    <div className="profile__info">
                        <h3>Demo card 2</h3>
                        <p>This is a demo for Tinder like swipe cards</p>
                    </div>
                </div>
                <div className="tinder--card">
                    <img src="https://picsum.photos/seed/picsum/200/300" />
                    <div className="profile__info">
                        <h3>Demo card 3</h3>
                        <p>This is a demo for Tinder like swipe cards</p>
                    </div>
                </div>
                <div className="tinder--card">
                    <img src="https://picsum.photos/seed/picsum/200/300" />
                    <div className="profile__info">
                        <h3>Demo card 4</h3>
                        <p>This is a demo for Tinder like swipe cards</p>
                    </div>
                </div>
                <div className="tinder--card">
                    <img src="https://picsum.photos/seed/picsum/200/300" />
                    <div className="profile__info">
                        <h3>Demo card 5</h3>
                        <p>This is a demo for Tinder like swipe cards</p>
                    </div>
                </div>
            </div>

            <div className="tinder--buttons">
                <button id="nope"><i className="fa fa-remove" /></button>
                <button id="love"><i className="fa fa-heart" /></button>

                {/* <button id="nope"><i className="fas fa-remove"/></button>
         <button id="nope"><i className="fas fa-comment"/></button>
         <button id="nope"><i className="fas fa-video"/></button>
         <button id="love"><i className="fas fa-heart"/></button> */}
            </div>



        </div>
    )

};
export default TinderCardTest;


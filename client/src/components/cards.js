import React, { Component } from "react";

class Cards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cards: [
                {
                    card: "2c",
                    flipped: "no"
                },
                {
                    card: "3c",
                    flipped: "no"
                },
                {
                    card: "4c",
                    flipped: "no"
                },
                {
                    card: "5c",
                    flipped: "no"
                },
                {
                    card: "6c",
                    flipped: "no"
                },
                {
                    card: "7c",
                    flipped: "no"
                },
                {
                    card: "8c",
                    flipped: "no"
                },
                {
                    card: "9c",
                    flipped: "no"
                },
                {
                    card: "Tc",
                    flipped: "no"
                },
                {
                    card: "Jc",
                    flipped: "no"
                },
                {
                    card: "Qc",
                    flipped: "no"
                },
                {
                    card: "Kc",
                    flipped: "no"
                },
                {
                    card: "Ac",
                    flipped: "no"
                },
                {
                    card: "2s",
                    flipped: "no"
                },
                {
                    card: "3s",
                    flipped: "no"
                },
                {
                    card: "4s",
                    flipped: "no"
                },
                {
                    card: "5s",
                    flipped: "no"
                },
                {
                    card: "6s",
                    flipped: "no"
                },
                {
                    card: "7s",
                    flipped: "no"
                },
                {
                    card: "8s",
                    flipped: "no"
                },
                {
                    card: "9s",
                    flipped: "no"
                },
                {
                    card: "Ts",
                    flipped: "no"
                },
                {
                    card: "Js",
                    flipped: "no"
                },
                {
                    card: "Qs",
                    flipped: "no"
                },
                {
                    card: "Ks",
                    flipped: "no"
                },
                {
                    card: "As",
                    flipped: "no"
                },
                {
                    card: "2h",
                    flipped: "no"
                },
                {
                    card: "3h",
                    flipped: "no"
                },
                {
                    card: "4h",
                    flipped: "no"
                },
                {
                    card: "5h",
                    flipped: "no"
                },
                {
                    card: "6h",
                    flipped: "no"
                },
                {
                    card: "7h",
                    flipped: "no"
                },
                {
                    card: "8h",
                    flipped: "no"
                },
                {
                    card: "9h",
                    flipped: "no"
                },
                {
                    card: "Th",
                    flipped: "no"
                },
                {
                    card: "Jh",
                    flipped: "no"
                },
                {
                    card: "Qh",
                    flipped: "no"
                },
                {
                    card: "Kh",
                    flipped: "no"
                },
                {
                    card: "Ah",
                    flipped: "no"
                },
                {
                    card: "2d",
                    flipped: "no"
                },
                {
                    card: "3d",
                    flipped: "no"
                },
                {
                    card: "4d",
                    flipped: "no"
                },
                {
                    card: "5d",
                    flipped: "no"
                },
                {
                    card: "6d",
                    flipped: "no"
                },
                {
                    card: "7d",
                    flipped: "no"
                },
                {
                    card: "8d",
                    flipped: "no"
                },
                {
                    card: "9d",
                    flipped: "no"
                },
                {
                    card: "Td",
                    flipped: "no"
                },
                {
                    card: "Jd",
                    flipped: "no"
                },
                {
                    card: "Qd",
                    flipped: "no"
                },
                {
                    card: "Kd",
                    flipped: "no"
                },
                {
                    card: "Ad",
                    flipped: "no"
                },
            ],
        };
    };

    toggleFlipCard = () => {
        if (!this.state.flipped) {
            this.setState({ flipped: "yes" })
        } else {
            this.setState({ flipped: "" })
        }
     };

    render() {
        return (
            <div className="cards jumbotron">
                    {this.state.cards.map(card => {
                        return (
                            <div key={card.card} onClick={this.toggleFlipCard} card={card.card} flipped={card.flipped} id={"card" + card.card} className={this.state.flipped ? `flip${card.card}  jumbotron` : `card${card.card}  jumbotron`}>
                            </div>
                        )
                    })}
                </div>
        );
    };
};

export default Cards;
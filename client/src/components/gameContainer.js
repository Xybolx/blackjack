import React, { useEffect, useContext, useState } from "react";
import { Container, Row, Col } from "reactstrap";
import UserContext from "./userContext";
import DealerDeckContext from "./dealerDeckContext";
import PlayerDeckContext from "./playerDeckContext";
import shuffledCards from "./cards";
import PlayerContainer from "./playerContainer";
import DealerContainer from "./dealerContainer";
import GameAlert from "./gameAlert";
import Btn from "./btn";
import BtnLogOut from "./btnLogOut";
import "./gameContainer.css";

const GameContainer = () => {

    // context
    const { dealerDeck, setDealerDeck } = useContext(DealerDeckContext);
    const { playerDeck, setPlayerDeck } = useContext(PlayerDeckContext);
    const { user } = useContext(UserContext);

    // state
    const [dealerHand, setDealerHand] = useState([]);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerScore, setDealerScore] = useState(0);
    const [playerScore, setPlayerScore] = useState(0);
    const [isOpenWin, setIsOpenWin] = useState(false);
    const [isOpenLose, setIsOpenLose] = useState(false);
    const [isOpenHello, setIsOpenHello] = useState(false);
    const [dealerWins, setDealerWins] = useState(0);
    const [playerWins, setPlayerWins] = useState(0);

    const shuffle = cards => cards
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);

    // shuffle card decks
    useEffect(() => {

        setPlayerDeck(shuffledCards);
        setDealerDeck(shuffledCards);
    }, [setDealerDeck, setPlayerDeck])

    useEffect(() => {
        setIsOpenHello(true);
        const helloTimer = setTimeout(() => setIsOpenHello(false), 8000)
        return () => clearTimeout(helloTimer);
    }, [])

    // draw functions
    const playerDraw = () => {
        setPlayerHand([...playerHand, playerDeck[0]]);
        setPlayerDeck(playerDeck.slice(1, 51));
    };

    const dealerDraw = () => {
        setDealerHand([...dealerHand, dealerDeck[0]]);
        setDealerDeck(dealerDeck.slice(1, 51));
    };

    const initialDraw = () => {
        dealerDraw();
        playerDraw();
        setIsOpenWin(false);
        setIsOpenLose(false);
    }

    const playerHit = () => {
        playerDraw();

        if (dealerScore <= 16) {
            dealerDraw();
        }
    }

    const playerStand = () => {
        if (dealerScore <= 16) {
            dealerDraw();
        } else if (playerScore > dealerScore) {
            setIsOpenLose(false);
            setIsOpenWin(true);
            setPlayerWins(playerWins => playerWins + 1);
            setPlayerHand([]);
            setDealerHand([]);
        } else if (dealerScore > playerScore) {
            setIsOpenWin(false);
            setIsOpenLose(true);
            setDealerWins(dealerWins => dealerWins + 1);
            setPlayerHand([]);
            setDealerHand([]);
        }
    }

    // get and set state
    useEffect(() => {
        const getDealerScore = () => {
            let sum = 0;
            dealerHand.map(card => {
                sum = sum += card.numValue;
                return setDealerScore(sum);
            });
        }
        getDealerScore();
    }, [dealerHand])

    useEffect(() => {
        const getPlayerScore = () => {
            let sum = 0;
            playerHand.map(card => {
                sum = sum += card.numValue;
                return setPlayerScore(sum);
            });
        }
        getPlayerScore();
    }, [playerHand])

    useEffect(() => {
        if (playerScore === 21) {
            setIsOpenLose(false);
            setIsOpenWin(true);
            setPlayerWins(playerWins => playerWins + 1);
            setPlayerHand([]);
            setDealerHand([]);
        }
    }, [playerScore])

    useEffect(() => {
        if (dealerScore === 21) {
            setIsOpenWin(false);
            setIsOpenLose(true);
            setDealerWins(dealerWins => dealerWins + 1);
            setPlayerHand([]);
            setDealerHand([]);
        }
    }, [dealerScore])

    useEffect(() => {
        if (playerScore > 21) {
            setIsOpenWin(false);
            setIsOpenLose(true);
            setDealerWins(dealerWins => dealerWins + 1);
            setPlayerHand([]);
            setDealerHand([]);
        }
    }, [playerScore])

    useEffect(() => {
        if (dealerScore > 21) {
            setIsOpenLose(false);
            setIsOpenWin(true);
            setPlayerWins(playerWins => playerWins + 1);
            setPlayerHand([]);
            setDealerHand([]);
        }
    }, [dealerScore])

    useEffect(() => {
        if (playerDeck.length === 10) {
            setPlayerDeck(shuffledCards);
        }
    }, [playerDeck.length, setPlayerDeck])

    useEffect(() => {
        if (dealerDeck.length === 10) {
            setDealerDeck(shuffledCards);
        }
    }, [dealerDeck.length, setDealerDeck])

    return (
        <Container className="game-container">
            <div className="alerts">
                <GameAlert
                    isOpen={isOpenWin}
                    color="success"
                    text="You Win!"
                />
                <GameAlert
                    isOpen={isOpenLose}
                    color="danger"
                    text="You Lose!"
                />
                <GameAlert
                    isOpen={isOpenHello}
                    color="warning"
                    text={user ? `Hello ${user.username}!` : ""}
                />
            </div>
            <Row>
                <Col
                    className="jumbotron jumbotron-fluid dealer"
                    md="6"
                    style={{ display: "inline-block" }}
                >
                    <DealerContainer
                        dealerHand={dealerHand}
                        playerHand={playerHand}
                        setDealerHand={setDealerHand}
                        dealerScore={dealerScore}
                        dealerWins={dealerWins}
                    />
                </Col>
                <Col
                    className="jumbotron jumbotron-fluid player"
                    md="6"
                    style={{ display: "inline-block" }}
                >
                    <PlayerContainer
                        dealerHand={dealerHand}
                        playerHand={playerHand}
                        setPlayerHand={setPlayerHand}
                        playerScore={playerScore}
                        playerWins={playerWins}
                    />
                </Col>
            </Row>
            <Container className="button-container">
                <Btn
                    color="link"
                    size="sm"
                    onClick={initialDraw}
                    disabled={playerHand.length !== 0 || dealerHand.length !== 0}
                    img={<img className="img-fluid btn-img" alt="" src="card-hand.png" />}
                    name="Draw!"
                />
                <Btn
                    color="link"
                    size="sm"
                    onClick={playerHit}
                    disabled={playerHand.length === 0 || dealerHand.length === 0}
                    img={<img className="img-fluid btn-img" alt="" src="card-hand.png" />}
                    name="Hit!"
                />
                <Btn
                    color="link"
                    size="sm"
                    onClick={playerStand}
                    disabled={playerHand.length === 0 || dealerHand.length === 0}
                    img={<img className="img-fluid btn-img" alt="" src="card-hand.png" />}
                    name="Stand!"
                />
                <BtnLogOut
                    color="link"
                    size="sm"
                    img={<img className="img-fluid btn-img" alt="" src="card-hand.png" />}
                    name="Log Out!"
                />
            </Container>
        </Container>
    );
}

export default GameContainer;
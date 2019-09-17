import React, { useContext, useEffect, useState, useRef } from 'react';
import { Container, Row, Col } from "reactstrap";
import PlayerDeckContext from "./playerDeckContext";
import useArray from "../utils/useArray";
import { cards } from "./cards";
import PlayerDropArea from "./playerDropArea";
import DealerDropArea from "./dealerDropArea";
import BetForm from "./betForm";
import GameStats from "./gameStats";
import Btn from "./btn";
import GameAlert from "./gameAlert";

const Drag = () => {

    const element = useRef();

    // context
    const { playerDeck, setPlayerDeck, removeFromPlayerDeck } = useContext(PlayerDeckContext);
    const [playerPurse, setPlayerPurse] = useState(500);
    const [playerBet, setPlayerBet] = useState(0);
    const [playerScore, setPlayerScore] = useState(0);
    const [playerWins, setPlayerWins] = useState(0);
    const [dealerScore, setDealerScore] = useState(0);
    const [dealerWins, setDealerWins] = useState(0);
    const [playerHand, setPlayerHand, addToPlayerHand] = useArray([]);
    const [dealerHand, setDealerHand, addToDealerHand] = useArray([]);
    const [isOpenWin, setIsOpenWin] = useState(false);
    const [isOpenLose, setIsOpenLose] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const clearBoard = () => {
        setDealerHand([]);
        setPlayerHand([]);
        setDealerScore(0);
        setPlayerScore(0);
        setPlayerBet(0);
        setIsOpenWin(false);
        setIsOpenLose(false);
        setIsGameOver(false);
        setPlayerDeck(shuffle(cards));
    };

    const playerWin = () => {
        setPlayerWins(playerWins => playerWins + 1);
        setIsGameOver(true);
        setIsOpenWin(true);
        setPlayerPurse(playerPurse => playerPurse + playerBet * 2);
    };

    const dealerWin = () => {
        setDealerWins(dealerWins => dealerWins + 1);
        setIsGameOver(true);
        setIsOpenLose(true);
    };

    const dealerDraw = () => {
        addToDealerHand(playerDeck[1]);
        removeFromPlayerDeck(playerDeck[1].id);
    };

    const playerDraw = () => {
        addToPlayerHand(playerDeck[0]);
        removeFromPlayerDeck(playerDeck[0].id);
        if (dealerScore <= 16) {
            dealerDraw();
        }
    };

    const initialDraw = () => {
        addToPlayerHand(playerDeck[0]);
        addToPlayerHand(playerDeck[2]);
        removeFromPlayerDeck(playerDeck[0].id);
        removeFromPlayerDeck(playerDeck[2].id);
        addToDealerHand(playerDeck[1]);
        addToDealerHand(playerDeck[3]);
        removeFromPlayerDeck(playerDeck[1].id);
        removeFromPlayerDeck(playerDeck[3].id);
    };

    const playerStand = () => {
        if (dealerScore <= 16) {
            addToDealerHand(playerDeck[0]);
            removeFromPlayerDeck(playerDeck[0].id);
        }
        if (dealerScore >= 17 && playerScore <= 21 && playerScore > dealerScore) {
            playerWin();
        }
        if (dealerScore >= 17 && dealerScore <= 21 && dealerScore > playerScore) {
            dealerWin();
        }
    };

    const shuffle = cards => cards
        .map(a => [Math.random(), a])
        .sort((a, b) => a[0] - b[0])
        .map(a => a[1]);

    useEffect(() =>
        setPlayerDeck(shuffle(cards)
        ), [setPlayerDeck]);

    useEffect(() => {
        const getDealerScore = () => {
            let sum = 0;
            dealerHand.map(card => {
                sum = sum += card.numValue;
                return setDealerScore(sum);
            });
        }
        getDealerScore();
    }, [dealerHand, setDealerScore]);

    useEffect(() => {
        const getPlayerScore = () => {
            let sum = 0;
            playerHand.map(card => {
                sum = sum += card.numValue;
                return setPlayerScore(sum);
            });
        }
        getPlayerScore();
    }, [playerHand, setPlayerScore]);

    useEffect(() => {
        const playerWin = () => {
            setPlayerWins(playerWins => playerWins + 1);
            setIsGameOver(true);
            setIsOpenWin(true);
            setPlayerPurse(playerPurse => playerPurse + playerBet * 2);
        };
        if (playerScore === 21) {
            playerWin();
        }
        if (dealerScore === 21) {
            dealerWin();
        }
    }, [dealerScore, playerScore, playerBet]);

    useEffect(() => {
        const playerWin = () => {
            setPlayerWins(playerWins => playerWins + 1);
            setIsGameOver(true);
            setIsOpenWin(true);
            setPlayerPurse(playerPurse => playerPurse + playerBet * 2);
        };
        const dealerWin = () => {
            setDealerWins(dealerWins => dealerWins + 1);
            setIsGameOver(true);
            setIsOpenLose(true);
        };
        if (dealerScore >= 22) {
            playerWin();
        }
        if (playerScore >= 22) {
            dealerWin();
        }
    }, [dealerScore, playerScore, playerBet]);

    return (
        <div>
            <GameStats
                playerBet={playerBet}
                playerPurse={playerPurse}
                playerWins={playerWins}
                dealerWins={dealerWins}
                playerScore={playerScore}
            />
            <Container>
                <div>
                    <BetForm
                        playerBet={playerBet}
                        setPlayerBet={setPlayerBet}
                        playerPurse={playerPurse}
                        setPlayerPurse={setPlayerPurse}
                    />
                    <Btn
                        color="link"
                        size="sm"
                        onClick={initialDraw}
                        disabled={playerHand.length >= 1 || dealerHand.length >= 1 || playerBet === 0}
                        img={<img className="img-fluid btn-img" alt="" src="card-hand.png" />}
                        name="Draw!"
                    />
                    <Btn
                        color="link"
                        size="sm"
                        onClick={playerDraw}
                        disabled={playerHand.length === 0 || dealerHand.length === 0 || isGameOver}
                        img={<img className="img-fluid btn-img" alt="" src="card-hand.png" />}
                        name="PlayerHit!"
                    />
                    <Btn
                        color="link"
                        size="sm"
                        onClick={playerStand}
                        disabled={
                            playerHand.length === 0
                            || dealerHand.length === 0
                            || isGameOver
                            || playerScore === dealerScore
                        }
                        img={<img className="img-fluid btn-img" alt="" src="card-hand.png" />}
                        name="PlayerStand!"
                    />
                </div>
                {!isGameOver ? (
                    <Row>
                        <Col style={{ display: "inline-block" }} className="jumbotron jumbotron-fluid" md="6">
                            <PlayerDropArea
                                playerScore={playerScore}
                                setPlayerScore={setPlayerScore}
                                playerWins={playerWins}
                                setPlayerWins={setPlayerWins}
                                playerHand={playerHand}
                                setPlayerHand={setPlayerHand}
                                addToPlayerHand={addToPlayerHand}
                                dealerScore={dealerScore}
                                setDealerScore={setDealerScore}
                                dealerWins={dealerWins}
                                setDealerWins={setDealerWins}
                                dealerHand={dealerHand}
                                setDealerHand={setDealerHand}
                                addToDealerHand={addToDealerHand}
                                isOpenWin={isOpenWin}
                                setIsOpenWin={setIsOpenWin}
                                isOpenLose={isOpenLose}
                                setIsOpenLose={setIsOpenLose}
                                isGameOver={isGameOver}
                                setIsGameOver={setIsGameOver}
                                playerBet={playerBet}
                                setPlayerBet={setPlayerBet}
                                setPlayerPurse={setPlayerPurse}
                            />
                        </Col>
                        <Col style={{ display: "inline-block" }} className="jumbotron jumbotron-fluid" md="6">
                            <DealerDropArea
                                playerScore={playerScore}
                                setPlayerScore={setPlayerScore}
                                playerWins={playerWins}
                                setPlayerWins={setPlayerWins}
                                playerHand={playerHand}
                                setPlayerHand={setPlayerHand}
                                addToPlayerHand={addToPlayerHand}
                                dealerScore={dealerScore}
                                setDealerScore={setDealerScore}
                                dealerWins={dealerWins}
                                setDealerWins={setDealerWins}
                                dealerHand={dealerHand}
                                setDealerHand={setDealerHand}
                                addToDealerHand={addToDealerHand}
                            />
                        </Col>
                    </Row>
                ) : (
                        <div style={{ height: 500 }}>
                            <Btn
                                color="link"
                                size="sm"
                                onClick={clearBoard}
                                disabled={!isGameOver}
                                img={<img className="img-fluid btn-img" alt="" src="card-hand.png" />}
                                name="Clear!"
                            />
                            <div>
                                <GameAlert
                                    isOpen={isOpenWin}
                                    color="success"
                                    text={`YOU WIN $${playerBet}!`}
                                />
                                <GameAlert
                                    isOpen={isOpenLose}
                                    color="danger"
                                    text={`YOU LOSE $${playerBet}!`}
                                />
                            </div>
                        </div>
                    )}
            </Container>
        </div>
    );
}

export default Drag;
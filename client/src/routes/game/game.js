import React, {
  useEffect,
  useState,
} from "react";
import { Outlet } from "react-router-dom";
import GameCard from "../../commonComponents/GameCard";
import styles from "./styles.module.css";
import axiosInstance from "../../commonComponents/axiosInstance";
import AddButton from "../../commonComponents/AddButton";

export default function Home() {
  const [gamesData, setGamesData] = useState([]);
  async function getData() {
    const response = await axiosInstance
      .get("/games")
      .then((res) => {
        setGamesData(res.data);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className={styles.MainDiv}>
        <div className={styles.AddGameDiv}>
          <AddButton
            link="new"
            variant="primary"
            content="Add Game!"
          />
        </div>
        <div className={styles.GamesCard}>
          <Outlet />
          {gamesData !== {} ? (
            gamesData.map((val, key) => {
              return (
                <div
                  className={
                    styles.GameCardIndivDiv
                  }
                  key={key}
                >
                  <GameCard
                    title={val.venue}
                    date={val.date}
                    players={val.players}
                    time={val.time}
                    level={val.levelOfPlay}
                    format={val.formatOfPlay}
                    fees={val.fees}
                    key={key}
                  />
                </div>
              );
            })
          ) : (
            <div>start adding games</div>
          )}
        </div>
      </div>
    </>
  );
}
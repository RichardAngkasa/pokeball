import { fromJSON } from "postcss";
import React, { useEffect, useState } from "react";
import loadingGif from "../assets/loading.gif";
import mysi from "../assets/mysi.png";

const initCard = {
  image: "",
  name: "???",
  hp: "???",
  attack: "???",
  defense: "???",
  special_attack: "???",
  special_defense: "???",
  speed: "???",
};

function HomeBase() {
  const [pokeData, setPokeData] = useState(initCard);
  const [loading, setLoading] = useState(false);
  const [backpack, setBackpack] = useState([]);

  async function getRandomPokemon() {
    setLoading(true);
    try {
      const resp = await fetch(
        "https://pokeapi.co/api/v2/pokemon/" +
          Math.floor(Math.random() * 120).toString()
      );
      const jsonData = await resp.json();
      setPokeData({
        image: jsonData["sprites"]["front_default"],
        name: jsonData["species"]["name"],
        hp: jsonData["stats"][0]["base_stat"],
        attack: jsonData["stats"][1]["base_stat"],
        defense: jsonData["stats"][2]["base_stat"],
        special_attack: jsonData["stats"][3]["base_stat"],
        special_defense: jsonData["stats"][4]["base_stat"],
        speed: jsonData["stats"][5]["base_stat"],
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const releasePokemon = () => {
    setPokeData(initCard);
  };

  const catchPokemon = () => {
    if (pokeData !== initCard) {
      let old = JSON.parse(localStorage.getItem("backpack"));
      if (old !== null) {
        if (old.length > 0 && old[old.length - 1].image !== pokeData.image) {
          old.push(pokeData);
          localStorage.setItem("backpack", JSON.stringify(old));
        }
      } else {
        localStorage.setItem("backpack", JSON.stringify([pokeData]));
      }
    }
    setBackpack(JSON.parse(localStorage.getItem("backpack")));
  };

  const deleteAll = () => {
    localStorage.removeItem("backpack");
    setBackpack([]);
  };

  useEffect(() => {
    setBackpack(JSON.parse(localStorage.getItem("backpack")));
  }, [pokeData]);

  return (
    <div className="flex justify-center items-center h-screen p-4">
      {/* card */}
      <div className="flex-col md:flex md:flex-row gap-2">
        {" "}
        <div>
          <div className="w-72 h-96 border-4 border-stroke rounded-lg bg-secondary px-4">
            {!loading ? (
              <div>
                {" "}
                <h1 className="font-bold text-center text-xl my-2">
                  {pokeData.name}
                </h1>
                <div className="w-full h-40 border-4 border-stroke rounded-lg flex justify-center">
                  {pokeData.image == "" ? (
                    <img src={mysi.src} alt="" className="h-full" />
                  ) : (
                    <img src={pokeData["image"]} alt={pokeData["name"]} />
                  )}
                </div>
                <div className="font-medium text-base py-2 px-1">
                  <h1>HP : {pokeData["hp"]}</h1>
                  <h1>ATTACK : {pokeData["attack"]}</h1>
                  <h1>DEFENSE : {pokeData["defense"]}</h1>
                  <h1>SPECIAL ATTACK : {pokeData["special_attack"]}</h1>
                  <h1>SPECIAL DEFENSE : {pokeData["special_defense"]}</h1>
                  <h1>SPEED : {pokeData["speed"]}</h1>
                </div>
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <img src={loadingGif.src} alt="" className="h-32 w-32" />
              </div>
            )}
          </div>
          <div className="w-72">
            <button
              className="w-full mt-2 h-20 border-4 border-black rounded-lg text-xl font-bold bg-highlight"
              onClick={getRandomPokemon}
            >
              RANDOM
            </button>

            <div className="flex gap-2 h-14 mt-2">
              {" "}
              <button
                className="w-1/2 border-4 border-black rounded-lg text-xl font-bold bg-tertiary"
                onClick={releasePokemon}
              >
                RELEASE
              </button>
              <button
                className="w-1/2 border-4 border-black rounded-lg text-xl font-bold bg-highlight"
                onClick={catchPokemon}
              >
                CATCH
              </button>
            </div>
          </div>
        </div>
        {/* backpack */}
        <div className="w-72 h-[33.5rem] border-4 border-stroke rounded-lg bg-secondary p-4">
          <h1 className="font-bold text-2xl text-center border-b-4 border-stroke pb-2">
            Backpack
          </h1>
          <div className="overflow-auto h-[25em] my-4">
            {backpack?.map((unit, i) => (
              <div
                key={i}
                onClick={() => {
                  setPokeData(unit);
                }}
              >
                <div className="flex items-center space-x-4">
                  <img src={unit.image} alt={unit.name} />
                  <h1 className="font-bold text-xl">{unit.name}</h1>
                </div>
              </div>
            ))}
          </div>
          <h1 className="text-right" onClick={deleteAll}>
            delete all
          </h1>
        </div>
      </div>
    </div>
  );
}

export default HomeBase;

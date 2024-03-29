import { transformRegion } from "./helper"


const apiKey = "RGAPI-7e0c5c57-57a3-4a68-90da-81f65fa6aaf8"

export async function getSummoner(region, name) {

  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${apiKey}`
  );
  const data = await response.json();
  return data;
}

export async function getRankPoints(region, id) {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${apiKey}`
  );
  const data = await response.json();
  return data;
}

export async function getMasteryPoints(region, id) {
  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${apiKey}`
  );
  const data = await response.json();
  return data;
}

export async function getAllMatches(region, puuid, page = 19) {
    // https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/L4CDp7eEeEuPGlg0KbB7agu67QVeCA9SiLydMxd599uWS11Q-R52gCllp84F4TbbwFC9t2Nz2xmklQ/ids?start=0&count=20&api_key=RGAPI-43ffc260-cd1e-4cc5-8532-cfdddd454d98
    // https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/L4CDp7eEeEuPGlg0KbB7agu67QVeCA9SiLydMxd599uWS11Q-R52gCllp84F4TbbwFC9t2Nz2xmklQ/ids?start=0&count=20&?api_key=RGAPI-43ffc260-cd1e-4cc5-8532-cfdddd454d98

  const region_ = transformRegion(region)
  const h12ago = Math.round(new Date().getTime() / 1000) - (24 * 3600 / 2);//&count=${page}
  const response = await fetch(
    `https://${region_}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&startTime=${h12ago}&type=${'ranked'}&api_key=${apiKey}`
  );
  const data = await response.json();
  return data;
}

export async function getMatch(region, matchId) {

  const response = await fetch(
    `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${apiKey}`
  );
  const data = await response.json();
  return data.info;
}

// export async function getTopPlayers(region, queue = "RANKED_SOLO_5x5") {
//   const response = await fetch(
//     `https://${region}.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/${queue}?api_key=${apiKey}`
//   );
//   const data = await response.json();
//   return data.entries;
// }

// export async function getFreeChampions() {
//   const response = await fetch(
//     `https://euw1.api.riotgames.com/lol/platform/v3/champion-rotations?api_key=${apiKey}`
//   );
//   const data = await response.json();
//   return data.freeChampionIds;
// }

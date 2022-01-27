import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`${data.error} ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const getWindDirection = (d) => {
  let directions = [
    "cеверный",
    "cеверо-восточный",
    "восточный",
    "южно-восточный",
    "южный",
    "южно-западный",
    "западный",
    "северо-западный",
  ];

  d += 22.5;

  if (d < 0) d = 360 - (Math.abs(d) % 360);
  else d = d % 360;

  let w = parseInt(d / 45);
  return `${directions[w]}`;
};

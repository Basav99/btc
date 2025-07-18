export function getEpochCountdown(epochEndTimestamp) {
  const now = Date.now(); // in ms
  const end = Number(epochEndTimestamp) / 1_000_000; // convert from nanoseconds to ms
  const timeLeft = Math.max(end - now, 0);

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  return { days, hours, minutes, seconds };
}

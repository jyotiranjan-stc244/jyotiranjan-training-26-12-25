document.addEventListener("DOMContentLoaded", () => {
  const timer = document.querySelector(".countdown");
  if (!timer) return;

  const endTime = new Date(timer.dataset.end).getTime();

  const interval = setInterval(() => {
    const currentTime = new Date().getTime();
    const diff = endTime - currentTime;

    if (diff <= 0) {
      timer.innerHTML = "Ended";
      clearInterval(interval);
      return;
    }

    const hrs = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    timer.innerHTML = `<b>${hrs}</b>hrs : <b>${mins}</b>mins : <b>${secs}</b>sec`;
  }, 1000);
});

import { useEffect, useState } from "react";

// The special ends today at 10:00 pm. It is set once, when the file loads.
const END_TIME = new Date().setHours(22, 0, 0, 0);

function getSecondsLeft() {
  return Math.max(0, Math.floor((END_TIME - Date.now()) / 1000));
}

function DailySpecial({ item, onAdd }) {
  const [secondsLeft, setSecondsLeft] = useState(getSecondsLeft);

  useEffect(() => {
    const id = setInterval(() => {
      setSecondsLeft(getSecondsLeft());
    }, 1000);

    return () => clearInterval(id); // cleanup: stop the timer when the component disappears
  }, []);

  // work out hours, minutes and seconds from secondsLeft
  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;
  // pad each number to 2 digits, e.g. String(n).padStart(2, '0')
  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  const ended = secondsLeft === 0;

  return (
    <section className="card special">
      <h2 className="section-title">Daily special</h2>
      <p className="cart-name">{item.name}</p>
      <p className="muted">RM {item.price.toFixed(2)}</p>
      {ended ? (
        <p className="muted">Special ended</p>
      ) : (
        <p className="muted">
          Ends in {formattedHours}:{formattedMinutes}:{formattedSeconds}
        </p>
      )}
      <button
        className="btn"
        disabled={ended || !item.available}
        onClick={() => onAdd(item)}
      >
        {ended ? "Special ended" : "Add to cart"}
      </button>
    </section>
  );
}

export default DailySpecial;

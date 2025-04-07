import "./style.css";

const app = document.querySelector("#app");

const round = (value: number, decimals: number) =>
  Math.round(value * 10 ** decimals) / 10 ** decimals;

const main = () => {
  if (!app) return;

  app.innerHTML = `
    <h1>Tachometer</h1>

    <p>
      For physics experiments, records the timing of when you press spacebar to track the frequency of a spinning object.
    </p>

    <p>
      <ol>
        <li>Attach tape or another clear marking onto a part of the outside of the spinning object</li>
        <li>Spin the object. You can make it speed up or slow down.</li>
        <li>Press the spacebar every time the marking reaches a specific location in its rotation.</li>
        <li>The data recording begins when you press "Start" and ends when you press "Stop"</li>
        <li>Then you can copy-paste the data from the table into a spreadsheet or Desmos</li>
      </ol>
    </p>

    <button id="start">Start</button>
    <button id="stop">Stop</button>

    <span id="timer"></span>

    <table id="data-table">
      <thead>
        <tr>
          <td>Time (s)</td>
          <td>Rotations</td>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  `;

  const startButton = document.querySelector<HTMLButtonElement>("#start")!;
  const stopButton = document.querySelector<HTMLButtonElement>("#stop")!;
  const timer = document.querySelector<HTMLSpanElement>("#timer")!;
  const table = document.querySelector<HTMLTableElement>("#data-table")!;

  stopButton.hidden = true;
  timer.hidden = true;
  table.hidden = true;

  let timerInterval: number | undefined = undefined;
  let startTime = 0;
  let running = false;

  let data: number[] = [];

  startButton.addEventListener("click", () => {
    running = true;
    startButton.hidden = true;
    stopButton.hidden = false;
    timer.hidden = false;
    table.hidden = true;
    startTime = new Date().getTime();

    timerInterval = setInterval(() => {
      const elapsed = (new Date().getTime() - startTime) / 1000;
      timer.textContent = String(round(elapsed, 2));
    }, 1);

    table.querySelector("tbody")!.innerHTML = "";
    data = [];
  });

  stopButton.addEventListener("click", () => {
    if (!running) return;
    if (timerInterval !== undefined) {
      clearInterval(timerInterval);
      timerInterval = undefined;
    }
    running = false;
    stopButton.hidden = true;
    startButton.hidden = false;
    timer.hidden = true;
  });

  window.addEventListener("keydown", (e) => {
    if (!running) return;
    if (e.key !== " ") return;

    table.hidden = false;

    const now = new Date().getTime();
    if (data.length === 0) {
      // Actually start counting the time the first time the space bar is pressed
      // So basically the timing of the "start" button doesn't actually matter
      startTime = now;
    }

    const elapsed = (now - startTime) / 1000;
    data.push(elapsed);
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${elapsed}</td>
      <td>${data.length - 1}</td>
    `;
    table.querySelector("tbody")!.append(row);
  });
};

main();

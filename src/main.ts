import "./style.css";

const app = document.querySelector("#app");

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
        <li>Press the spacebar (or the "Record Timestamp" button) every time the marking reaches a specific location in its rotation.</li>
        <li>Then you can copy-paste the data from the table into a spreadsheet or Desmos</li>
      </ol>
    </p>

    <button id="record">Record Timestamp</button>

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

  const recordButton = document.querySelector<HTMLButtonElement>("#record")!;
  const timer = document.querySelector<HTMLSpanElement>("#timer")!;
  const table = document.querySelector<HTMLTableElement>("#data-table")!;

  timer.hidden = true;
  table.hidden = true;

  let startTime = 0;

  let data: number[] = [];

  const handlePress = () => {
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
      <td>${elapsed.toFixed(3)}</td>
      <td>${data.length - 1}</td>
    `;
    table.querySelector("tbody")!.append(row);
  };

  window.addEventListener("keydown", (e) => {
    if (
      document.activeElement != null &&
      document.activeElement !== document.body
    )
      return;
    if (e.key !== " ") return;

    handlePress();
  });

  recordButton.addEventListener("click", () => {
    handlePress();
  });
};

main();

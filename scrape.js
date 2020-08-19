const fetch = require("node-fetch");
const JSDOM = require("jsdom").JSDOM;

const campaign = process.env.DONORBOX_CAMPAIGN;

fetch(`https://donorbox.org/${campaign}`)
  .then((res) => res.text())
  .then((page) => {
    const jsdom = new JSDOM(page);
    const { window } = jsdom;
    const totalRaised = window.document.getElementById("total-raised");
    const panel1 = window.document.getElementById("panel-1");
    const goal = panel1.getElementsByClassName("description")[0].children[2]
      .children[0];
    process.stdout.write(
      JSON.stringify({
        totalRaised: parseInt(totalRaised.textContent.replace(/[^0-9]/g, "")),
        goal: parseInt(goal.textContent.replace(/[^0-9]/g, "")),
      })
    );
  });

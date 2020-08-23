const fetch = require("node-fetch");
const JSDOM = require("jsdom").JSDOM;

const campaign = process.env.DONORBOX_CAMPAIGN;

fetch(`https://donorbox.org/embed/${campaign}?only_donation_meter=true`)
  .then((res) => res.text())
  .then((page) => {
    const jsdom = new JSDOM(page);
    const { window } = jsdom;
    const totalRaised = window.document.getElementById("total-raised");
    const numDonations = window.document.getElementById("paid-count");
    const panel1 = window.document.getElementById("panel-1");
    const goal = panel1.getElementsByClassName("description")[0].children[2]
      .children[0];
    process.stdout.write(
      JSON.stringify({
        raised: parseInt(totalRaised.textContent.replace(/[^0-9]/g, "")),
        goal: parseInt(goal.textContent.replace(/[^0-9]/g, "")),
        donations: parseInt(numDonations.textContent),
      })
    );
  });

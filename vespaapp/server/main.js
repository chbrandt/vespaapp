import { Meteor } from "meteor/meteor";
import { onPageLoad } from "meteor/server-render";

import '../imports/api/notes.js';
import '../imports/api/data.js';
import '../imports/api/datang.js';

Meteor.startup(() => {
  // Code to run on server startup.
  console.log(`Greetings from ${module.id}!`);
});

onPageLoad(sink => {
  // Code to run on every request.
  sink.renderIntoElementById(
    "server-render-target",
    `Server time: ${new Date}`
  );
});

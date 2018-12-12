# The docker sandbox

First of all, `docker-compose` definitely sucks; I see a good and convenient
use for production and micro-services infrastructure, but for interactive and
development, it sucks.

Well, anyhow, I put in place basic scripts to handle the MongoDB and Meteor
containers.
Basically, if the `meteor` image has to be created, run `build.sh`.

To run the containers, run `run.sh` from the repo's rootdir.
That's it.
You'll be placed inside the `meteor` container, as _root_ with the steps
to follow printed to the terminal.

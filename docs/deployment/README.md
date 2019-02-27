# Deploying the App

_Deployment_ is going to be used here in a broad sense: the steps necessary to
bring the App up and running, either in a development/test environment,
staging or production.

In short, _development_ and _production_ deployments distinguish in the following
aspects:
* development: App is run by Meteor, live from the repository,
reading from a `test` database providing a sub-sample of the full data base.
MongoDB runs from a container;
* production: App runs straight from Node, in a dedicated server,
from a bundle built by Meteor. MongoDB also runs from a dedicated server/vm.
* _staging_ and _test_ go hand-in-hand here as I am *not* implementing dedicated
(unit) tests: before going public, test the App bundle in a nearby server with
a copy of the full database either in a container, or _e.g._ Atlas MongoDB.


## Development

Steps:
* `git`: clone/pull from https://github.com/epn-vespa/vespaapp;
* `mongodb`: run "test" database and define `$MONGO_URL`;
* `meteor`: run the app from "$repo/vespaapp" pointing to `$MONGO_URL`.

To make life simple, I run everything on my host, either Linux or Mac, using
MongoDB from inside a Docker container and Meteor straight from my userspace.

### MongoDB

[MongoDB provide their own Docker images][mongo-docker], from which I am currently
using the version/tag [mongo:4] (`525bd2016729`).

The container goes live by:
```bash
$ docker run -d -p 27017:27017 --name db -v $PWD/data:/mnt/data mongo:4
```
, where I'm considering `$PWD/data` the place where data to be ingested are;
change it accordingly.

The container should run without complains, but we don't have its shell right
at our disposal because it is running as a _daemon_ (`-d`).
We then open another terminal and go inside by:
```bash
$ docker exec -it db bash
```

We are now inside `mongo:4` container, as `root`, and we can run MongoDB shell
as usual
```bash
$ mongo
```

### Meteor

Meteor is a very educated package, relying entirely on userspace its setup is
as esay as executing a couple of commands -- without superuser priviledges.
Instructions can be "followed" here: https://www.meteor.com/install; as of now
it is simply:
```bash
$ curl https://install.meteor.com/ | sh
```

Once Meteor is installed, we go to our App's source code (`$REPO/vespaapp`) and
run it defining the address to our MongoDB previously setup:
```bash
$ MONGO_URL='mongodb://localhost:27017/test' meteor run
```
, to which Meteor should respond with a success messaging informing us that the
App is running at `http://localhost:3000`.

[mongo-docker]: https://hub.docker.com/_/mongo
[mongo:4]: https://github.com/docker-library/mongo/blob/6e4f9aebd519141a0f8dffbdb2a9502e668c3bd7/4.0/Dockerfile

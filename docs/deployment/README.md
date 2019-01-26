# Deploying the App

I will put here together -- and use the term _deployment_ in a broad sense --
the steps to deploy the App either in a development/test environment up to
staging and production.
It should be clear enough when we go from development to production.

## Development

The development environment is done entirely on my host: Meteor runs on my host
operating system (Linux or Mac) and MongoDB runs on a Docker container.

### MongoDB

[MongoDB provide their own Docker images][mongo-docker], from which I am currently
using the version/tag [mongo:4] (`525bd2016729`).

The container goes live by:
```bash
$ docker run -d -p 27017:27017 --name db -v $PWD/data:/work/data mongo:4.0
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
$ MONGO_URL='mongodb://localhost:27017/vespa' meteor run
```
, to which Meteor should respond with a success messaging informing us that the
App is running at `http://localhost:3000`.

[mongo-docker]: https://hub.docker.com/_/mongo
[mongo:4]: https://github.com/docker-library/mongo/blob/6e4f9aebd519141a0f8dffbdb2a9502e668c3bd7/4.0/Dockerfile

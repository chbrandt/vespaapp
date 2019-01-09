# MongoDB: ingesting data

To ingest data into MongoDB I use JSON files. In particular, I format the
documents in an array and use the option `--jsonArray` of `mongoimport`.
The documents in this datasets have the following structure:
```
"id": <string>,
"name": <string>,
"geometry": {
  "coordinates": <array>,
  "type": <string>
},
"properties": {
}
```

The `geometry/coordinates` and `geometry/type` are essencial fields to which we
will create a "`2dsphere`" (MongoDB) index after ingestion.
The fields `name` and `id` will be used by our app, `properties` is just a
placeholder so far, its contents is not being used.

```bash
$ mongoimport -d meteor -c mars --jsonArray mars_points.json
$ mongoimport -d meteor -c mars --jsonArray mars_linestrings.json
$ mongoimport -d meteor -c mars --jsonArray mars_polygons.json
```

## Spatial index

Once data has been imported into to MongoDB, we want to create the index at the
coordinates for spatial queries by the App.
To do so, from inside the `mongo` interpreter we call the `createIndex` method:
```
$ mongo
> use meteor
> db.mars.createIndex({"geometry" : "2dsphere"})
```

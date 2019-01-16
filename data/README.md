# The data base

## Database management system

To manage the data sets used by the app we are using MongoDB.


## Data sets

From the point-of-view of user interaction -- and so the way data is presented --
there are two major groups of our data sets:

* those with geolocated information (EPN-Core's `s_region`)
* those without geolocated information (empty `s_region` field)


### The `s_region` field

The `s_region` field in EPN/TAP services provide geometric information about a
data record (measurement, topography), tipically over a planet, in ground
coordinates -- Longitude, Latitude -- of the respective body.
In general, `s_region` is an array of coordinates (`lon`,`lat`) representing
a polygon (may as well be any other geometry -- line, point).

The difference from the database point-of-view is in the index.
For efficiency and consistency in operating geometric queries (_e.g_, "intersect"),
the geometric figures are indexed accordingly in the database.

[MongoDB knows about geometric objects and provide support for geometric queries.](https://docs.mongodb.com/manual/geospatial-queries/)
Collections of object with geometric information may be indexed with a `2dsphere`
index -- given the documents provide a `type` field next to `coordinates`.

Documents suitable to geometric queries will have the following fields ("location" may be substituted by any other string, _e.g_ "loc"):
```json
{
  ...
  "location": {
    "coordinates": <array>,
    "type": <string>
  },
  ...
}
```

Where `coordinates` is an array of `[lon,lat]` coordinates as explained in the
[GeoJSON] reference page, and `type` must be one of [GeoJSON] types:
* Point
* LineString
* Polygon
* MultiPoint
* MultiLineString
* MultiPolygon

[GeoJSON]: (https://docs.mongodb.com/manual/reference/geojson/)


## Ingesting data

To ingest data in a MongoDB system we may use the `mongoimport` tool.
By default it expects a JSON file with the documents to be ingested,
and the name of the `db/collection` of destination.

If the documents in the JSON file (`mydata.json`) are disposed in an array:
```
[
  {... document A ...},
  {... document B ...},
  ...
]
```
we should call `mongoimport` with the `--jsonArray`:
```bash
$ mongoimport -d mydb -c mycollection --jsonArray mydata.json
```

### Spatial index

Once data has been imported into to MongoDB, we want to create the index at the
coordinates for spatial queries by the App.
To do so, from inside the `mongo` interpreter we call the `createIndex` method:
```bash
$ mongo
> use mydb
> db.mycollection.createIndex({"location" : "2dsphere"})
```

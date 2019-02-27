# The data base

In this directory you should find everything about App's database: management
system, structure and sources of data.
This document gives an overview of the structure, more information on each
component will be addressed in the respective README in each sub-directory.

## Database management system

[MongoDB] is the DBMS we use. MongoDB can have many databases; each database, many
collections; each collection many documents.
Documents are like rows in a table, a set of `key:value` pairs.
In MongoDB, documents do not have to follow a schema, which means each document
is free to provide any set of `key:value` pairs, independent of the other
documents in the collection.

[mongodb]: https://www.mongodb.com/

### Collections

Our database is composed by three collections:
* `data_index`
* `data_geo`
* `data_all`

Collections `data_geo` and `data_all` host the data sets with and without
geolocated data, respectively.
The `data_index` is the top-level list of _targets_: the front-page list of
items which the user will choose and then further explore in following pages.

#### `data_index` schema
```
data_index
  - name
  - thumbnail
  - keywords
```

#### `data_any` schema
```
data_any
  - target_name
  - target_class
  - granule_uid
  - granule_gid
```

#### `data_geo` schema
```
data_geo
  - target_name
  - target_class
  - granule_uid
  - granule_gid
  - geometry
    - coordinates
    - type
```

## Data sets

From the point-of-view of user interaction -- the way data is presented --
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

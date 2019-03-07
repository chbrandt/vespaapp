# VESPA data download

Here you will find the list of services suitable for the app,
and the files (script, config, schema, etc) to download data.

* The selected services with data suitable to our app are in:
  * `services.json`.
* Those services are a selection (of suitable _schemas_) from:
  * `virtualRegistry.json`
* The columns (_i.e_, data) we want to download are defined in:
  * `service_columns.json`
* The (python) script responsible for downloading data is:
  * `download_data.py`
    * Besides the columns in `service_columns.json`, an extra field `schema_epn_core` is added by the script to the output (JSON) file
* If using Anaconda Python distro, an environment ("vo") is in:
  * `conda_environment.yml`
  * In any case, all we need to use the download script is:
    * python (current at 3.7.1)
    * pyvo (current at 0.9.2)
    * pandas (current at 0.23.4)

```diff
- TODO: command to 'list' the available services (services in `services.json`)
- TODO: parameter (-c) for "download" script with the set of fields to download
- TODO: option 'random' for "download" script to retrieve (N) random records
```

## Examples

**Obs**: make sure to have `pyvo` and `pandas` installed.

If we want to download all craters from Mars (from the `mars_craters` service):
```bash
$ ./download_data.py fetch mars_craters
```

If we want to download the first `1000` entries of `crism.epn_core` service:
```bash
$ ./download_data.py fetch crism --limit 1000
```

To know the options and arguments of the `download_data` script, just type:
```bash
$ ./download_data.py --help
```

# Comments on services

## BDIP

* EPN-Core schema: `bdip`

Provides planetary digitalized images in either `JPG` or `TIF` formats.
No `s_region` (geometry) field is provided, which means this service; no s_region/geometry.

Currently (Jan/2019), there are 16906 records in the table providing pictures
from:
* Mercury
* Venus
* Mars
* Jupiter
* Saturn

Each image is **duplicated** (*i.e*, two records in the table): one `image/tiff`
and one `image/jpeg`.

It follows the first ten entries of the table as *output from* `download_data.py`:
```bash
$ ./download_data.py bdip 10
```
```json
[
   {
      "obs_id" : "bdip0001",
      "ra" : 20.9945850372,
      "time_min" : 2411488.5,
      "publisher" : "LESIA - Observatoire de Paris",
      "dec" : -17.5548057556,
      "target_class" : "planet",
      "schema.epn_core" : "bdip",
      "spatial_frame_type_" : "body",
      "spectral_range_max" : null,
      "c1min" : null,
      "c1max" : null,
      "time_max" : 2411488.5,
      "spectral_range_min" : null,
      "target_name" : "Jupiter",
      "service_title" : "BDIP",
      "c2max" : null,
      "granule_gid" : "preview",
      "thumbnail_url" : "http://www.lesia.obspm.fr/BDIP/bdip_icone/bdip0001.jpg",
      "access_format" : "image/jpeg",
      "c2min" : null,
      "granule_uid" : "bdip0001",
      "spatial_frame_type" : "body",
      "dataproduct_type" : "im",
      "access_url" : "http://www.lesia.obspm.fr/BDIP/bdip_jpeg/bdip0001.jpg"
   },
   {
      "dec" : -17.5548057556,
      "target_class" : "planet",
      "obs_id" : "bdip0001",
      "ra" : 20.9945850372,
      "publisher" : "LESIA - Observatoire de Paris",
      "time_min" : 2411488.5,
      "spatial_frame_type_" : "body",
      "spectral_range_max" : null,
      "c1min" : null,
      "schema.epn_core" : "bdip",
      "time_max" : 2411488.5,
      "spectral_range_min" : null,
      "c1max" : null,
      "service_title" : "BDIP",
      "target_name" : "Jupiter",
      "granule_gid" : "full_resolution",
      "access_format" : "image/tiff",
      "thumbnail_url" : "http://www.lesia.obspm.fr/BDIP/bdip_icone/bdip0001.jpg",
      "c2max" : null,
      "c2min" : null,
      "granule_uid" : "BDIP0001_tif",
      "access_url" : "http://www.lesia.obspm.fr/BDIP/bdip_tif/BDIP0001.TIF",
      "dataproduct_type" : "im",
      "spatial_frame_type" : "body"
   },
   {
      "c2min" : null,
      "access_format" : "image/jpeg",
      "thumbnail_url" : "http://www.lesia.obspm.fr/BDIP/bdip_icone/bdip0002.jpg",
      "granule_gid" : "preview",
      "c2max" : null,
      "dataproduct_type" : "im",
      "access_url" : "http://www.lesia.obspm.fr/BDIP/bdip_jpeg/bdip0002.jpg",
      "spatial_frame_type" : "body",
      "granule_uid" : "bdip0002",
      "spectral_range_max" : null,
      "spatial_frame_type_" : "body",
      "c1min" : null,
      "schema.epn_core" : "bdip",
      "target_class" : "planet",
      "dec" : -18.0593090057,
      "time_min" : 2411557.8784722,
      "publisher" : "LESIA - Observatoire de Paris",
      "ra" : 20.9356842041,
      "obs_id" : "bdip0002",
      "service_title" : "BDIP",
      "target_name" : "Jupiter",
      "time_max" : 2411557.8784722,
      "spectral_range_min" : null,
      "c1max" : null
   },
   {
      "granule_gid" : "full_resolution",
      "thumbnail_url" : "http://www.lesia.obspm.fr/BDIP/bdip_icone/bdip0002.jpg",
      "access_format" : "image/tiff",
      "c2max" : null,
      "c2min" : null,
      "granule_uid" : "BDIP0002_tif",
      "dataproduct_type" : "im",
      "access_url" : "http://www.lesia.obspm.fr/BDIP/bdip_tif/BDIP0002.TIF",
      "spatial_frame_type" : "body",
      "dec" : -18.0593090057,
      "target_class" : "planet",
      "ra" : 20.9356842041,
      "obs_id" : "bdip0002",
      "time_min" : 2411557.8784722,
      "publisher" : "LESIA - Observatoire de Paris",
      "c1min" : null,
      "spatial_frame_type_" : "body",
      "spectral_range_max" : null,
      "schema.epn_core" : "bdip",
      "spectral_range_min" : null,
      "time_max" : 2411557.8784722,
      "c1max" : null,
      "service_title" : "BDIP",
      "target_name" : "Jupiter"
   },
   {
      "spectral_range_min" : null,
      "time_max" : 2411557.8798611,
      "c1max" : null,
      "service_title" : "BDIP",
      "target_name" : "Jupiter",
      "target_class" : "planet",
      "dec" : -18.0593566895,
      "publisher" : "LESIA - Observatoire de Paris",
      "time_min" : 2411557.8798611,
      "obs_id" : "bdip0003",
      "ra" : 20.93567276,
      "c1min" : null,
      "spatial_frame_type_" : "body",
      "spectral_range_max" : null,
      "schema.epn_core" : "bdip",
      "granule_uid" : "bdip0003",
      "dataproduct_type" : "im",
      "access_url" : "http://www.lesia.obspm.fr/BDIP/bdip_jpeg/bdip0003.jpg",
      "spatial_frame_type" : "body",
      "access_format" : "image/jpeg",
      "thumbnail_url" : "http://www.lesia.obspm.fr/BDIP/bdip_icone/bdip0003.jpg",
      "granule_gid" : "preview",
      "c2max" : null,
      "c2min" : null
   },
   {
      "ra" : 20.93567276,
      "obs_id" : "bdip0003",
      "publisher" : "LESIA - Observatoire de Paris",
      "time_min" : 2411557.8798611,
      "dec" : -18.0593566895,
      "target_class" : "planet",
      "schema.epn_core" : "bdip",
      "spatial_frame_type_" : "body",
      "spectral_range_max" : null,
      "c1min" : null,
      "c1max" : null,
      "time_max" : 2411557.8798611,
      "spectral_range_min" : null,
      "target_name" : "Jupiter",
      "service_title" : "BDIP",
      "c2max" : null,
      "granule_gid" : "full_resolution",
      "access_format" : "image/tiff",
      "thumbnail_url" : "http://www.lesia.obspm.fr/BDIP/bdip_icone/bdip0003.jpg",
      "c2min" : null,
      "granule_uid" : "BDIP0003_tif",
      "spatial_frame_type" : "body",
      "access_url" : "http://www.lesia.obspm.fr/BDIP/bdip_tif/BDIP0003.TIF",
      "dataproduct_type" : "im"
   },
   {
      "time_max" : 2411557.8770833,
      "spectral_range_min" : null,
      "c1max" : null,
      "service_title" : "BDIP",
      "target_name" : "Jupiter",
      "dec" : -18.0592632294,
      "target_class" : "planet",
      "ra" : 20.9356937408,
      "obs_id" : "bdip0004",
      "time_min" : 2411557.8770833,
      "publisher" : "LESIA - Observatoire de Paris",
      "spatial_frame_type_" : "body",
      "c1min" : null,
      "spectral_range_max" : null,
      "schema.epn_core" : "bdip",
      "granule_uid" : "bdip0004",
      "access_url" : "http://www.lesia.obspm.fr/BDIP/bdip_jpeg/bdip0004.jpg",
      "dataproduct_type" : "im",
      "spatial_frame_type" : "body",
      "granule_gid" : "preview",
      "thumbnail_url" : "http://www.lesia.obspm.fr/BDIP/bdip_icone/bdip0004.jpg",
      "access_format" : "image/jpeg",
      "c2max" : null,
      "c2min" : null
   },
   {
      "ra" : 20.9356937408,
      "obs_id" : "bdip0004",
      "publisher" : "LESIA - Observatoire de Paris",
      "time_min" : 2411557.8770833,
      "dec" : -18.0592632294,
      "target_class" : "planet",
      "schema.epn_core" : "bdip",
      "c1min" : null,
      "spatial_frame_type_" : "body",
      "spectral_range_max" : null,
      "c1max" : null,
      "spectral_range_min" : null,
      "time_max" : 2411557.8770833,
      "target_name" : "Jupiter",
      "service_title" : "BDIP",
      "c2max" : null,
      "granule_gid" : "full_resolution",
      "access_format" : "image/tiff",
      "thumbnail_url" : "http://www.lesia.obspm.fr/BDIP/bdip_icone/bdip0004.jpg",
      "c2min" : null,
      "granule_uid" : "BDIP0004_tif",
      "spatial_frame_type" : "body",
      "dataproduct_type" : "im",
      "access_url" : "http://www.lesia.obspm.fr/BDIP/bdip_tif/BDIP0004.TIF"
   },
   {
      "schema.epn_core" : "bdip",
      "c1min" : null,
      "spatial_frame_type_" : "body",
      "spectral_range_max" : null,
      "ra" : 20.9356422424,
      "obs_id" : "bdip0005",
      "time_min" : 2411557.8840278,
      "publisher" : "LESIA - Observatoire de Paris",
      "dec" : -18.0594959259,
      "target_class" : "planet",
      "target_name" : "Jupiter",
      "service_title" : "BDIP",
      "c1max" : null,
      "spectral_range_min" : null,
      "time_max" : 2411557.8840278,
      "c2min" : null,
      "c2max" : null,
      "granule_gid" : "preview",
      "access_format" : "image/jpeg",
      "thumbnail_url" : "http://www.lesia.obspm.fr/BDIP/bdip_icone/bdip0005.jpg",
      "spatial_frame_type" : "body",
      "dataproduct_type" : "im",
      "access_url" : "http://www.lesia.obspm.fr/BDIP/bdip_jpeg/bdip0005.jpg",
      "granule_uid" : "bdip0005"
   },
   {
      "service_title" : "BDIP",
      "target_name" : "Jupiter",
      "time_max" : 2411557.8840278,
      "spectral_range_min" : null,
      "c1max" : null,
      "spatial_frame_type_" : "body",
      "spectral_range_max" : null,
      "c1min" : null,
      "schema.epn_core" : "bdip",
      "target_class" : "planet",
      "dec" : -18.0594959259,
      "publisher" : "LESIA - Observatoire de Paris",
      "time_min" : 2411557.8840278,
      "obs_id" : "bdip0005",
      "ra" : 20.9356422424,
      "access_url" : "http://www.lesia.obspm.fr/BDIP/bdip_tif/BDIP0005.TIF",
      "dataproduct_type" : "im",
      "spatial_frame_type" : "body",
      "granule_uid" : "BDIP0005_tif",
      "c2min" : null,
      "access_format" : "image/tiff",
      "thumbnail_url" : "http://www.lesia.obspm.fr/BDIP/bdip_icone/bdip0005.jpg",
      "granule_gid" : "full_resolution",
      "c2max" : null
   }
]
```

/.\

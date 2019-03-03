# Download data from VESPA services

#### Download data from all available services (max 100 records)
```
[host]$ ./download_data.py list --minimal | xargs -I{} -L1 ./download_data fetch --limit 100 {}
```

#### Adjust all json files
```
[host]$ for sd in *; do [ ! -d $sd ] && continue; f="${sd}/${sd}_*.json"; [ ! -f "$f" ] && continue; ./adjust_fields.py $f ${f%_*}_adjusted.json; done
```

#### Ingest all to a temporary collection (`data_all`) in database `test`
```
[mongodb]$ for sd in *; do [ ! -d "$sd" ] && continue; f="${sd}/${sd}_adjusted.json"; [ ! -f "$f" ] && continue; mongoimport -d test -c data_all --jsonArray $f; done
```

### Ingest the index data
```
[mongodb]$ mongoimport -d test -c data_index --jsonArray data_index.json
```



#### Select all documents with non-empty `s_region` value:
```
[mongodb]$ mongo
> use test
> db.tmp_all.find({"s_region": {$not: {$in: ['',null,[]]}}})
```

##### Select all documents with non-empty *STRING* in `s_region`
```
[mongodb]$ mongo
> use test
> db.tmp_all.find({"s_region": /(.|\s)*\S(.|\s)*/})
```

The non-empty *string* to simply non-empty value examples:
```
> db.tmp_all.aggregate([{$match:{"s_region": /(.|\s)*\S(.|\s)*/}},{$sample:{size:1}}]).pretty()
{
	"_id" : ObjectId("5c73159044148e9a0c18f78b"),
	"granule_uid" : "HRL0000D12D_07_IF182S_TRR3",
	"granule_gid" : "HRL",
	"obs_id" : "0000D12D",
	"dataproduct_type" : "sc",
	"target_name" : "Mars",
	"target_class" : "planet",
	"time_min" : 2454763.72307,
	"time_max" : 2454763.72445,
	"time_sampling_step_min" : null,
	"time_sampling_step_max" : null,
	"time_exp_min" : null,
	"time_exp_max" : null,
	"spectral_range_min" : 283894373106061,
	"spectral_range_max" : 822250296215030,
	"spectral_sampling_step_min" : 1771888268945.31,
	"spectral_sampling_step_max" : 14510950936840.8,
	"spectral_resolution_min" : 2150714947773.19,
	"spectral_resolution_max" : 18041696022271.6,
	"c1min" : 147.178,
	"c1max" : 147.44,
	"c2min" : -8.025,
	"c2max" : -7.604,
	"c3min" : null,
	"c3max" : null,
	"s_region" : "Polygon UNKNOWNFrame 147.44 -7.979 147.386 -7.987 147.332 -8.002 147.279 -8.011 147.226 -8.025 147.228 -7.891 147.226 -7.818 147.211 -7.743 147.178 -7.608 147.233 -7.607 147.289 -7.604 147.346 -7.605 147.401 -7.604 147.402 -7.728 147.406 -7.797 147.417 -7.86",
	"c1_resol_min" : 0.0006150235,
	"c1_resol_max" : 0.0006150235,
	"c2_resol_min" : 0.0006128093,
	"c2_resol_max" : 0.0006128093,
	"c3_resol_min" : null,
	"c3_resol_max" : null,
	"spatial_frame_type" : "body",
	"incidence_min" : 146.590161,
	"incidence_max" : 146.590161,
	"emergence_min" : 9.6122627258,
	"emergence_max" : 9.6122627258,
	"phase_min" : 50.9075088501,
	"phase_max" : 50.9075088501,
	"instrument_host_name" : "MRO",
	"instrument_name" : "CRISM",
	"measurement_type" : "phys.luminosity;phys.angArea;em.wl",
	"processing_level" : 3,
	"creation_date" : "2016-01-01T00:00:00",
	"modification_date" : "2018-02-08T00:00:00",
	"release_date" : "2016-01-01T00:00:00",
	"service_title" : "CRISM",
	"access_url" : "http://access.planetserver.eu/rasdaman/ows?&SERVICE=WCS&VERSION=2.0.1&REQUEST=GetCoverage&COVERAGEID=hrl0000d12d_07_if182s_trr3&FORMAT=image/tiff",
	"access_format" : "application/x-geotiff",
	"access_estsize" : 126429,
	"thumbnail_url" : "http://access.planetserver.eu/rasdaman/ows?service=WCS&version=2.0.1&request=ProcessCoverages&query=for%20data%20in%20%28%20hrl0000d12d_07_if182s_trr3%20%29%20return%20encode(%20%7B%20%0Ared%3A%20(int)((int)(255%20%2F%20(max(%20data.band_38)%20-%20min(data.band_38)))%20*%20(data.band_38%20-%20min(data.band_38)))%3B%20%0Agreen%3A%20(int)((int)(255%20%2F%20(max(%20data.band_27)%20-%20min(data.band_27)))%20*%20(data.band_27%20-%20min(data.band_27)))%3B%20%0Ablue%3A%20(int)((int)(255%20%2F%20(max(%20data.band_13)%20-%20min(data.band_13)))%20*%20(data.band_13%20-%20min(data.band_13)))%20%3B%20%0Aalpha%3A%20(int)((data.band_100%20%3E%200)%20*%20255)%7D%2C%20%22png%22%2C%20%22nodata%3D65535%22)",
	"bib_reference" : "10.1029/2006JE002682",
	"solar_longitude_min" : 146.590161,
	"solar_longitude_max" : 146.590161,
	"sensor_id" : "S",
	"image_width" : 426,
	"image_height" : 687,
	"external_link" : "http://aux1.epn-vespa.jacobs-university.de/subGranule3/index.html?callback=hrl0000d12d_07_if182s_trr3",
	"spatial_coordinate_description" : "+proj=eqc +lat_ts=0 +lat_0=0 +lon_0=0 +x_0=0 +y_0=0 +a=3396190 +b=3396190 +units=m +no_defs ",
	"wavelengths" : "352.313;358.771;365.229;371.687;378.145;384.603;391.061;397.519;403.977;410.435;416.893;423.351;429.809;436.267;442.725;449.183;455.641;462.099;468.557;475.015;481.473;487.931;494.389;500.847;507.305;513.763;520.221;526.679;533.137;539.595;546.053;552.511;558.969;565.427;571.885;578.3430000000001;584.801;591.259;597.717;604.175;610.633;617.091;623.549;630.007;636.465;642.923;649.381;655.839;662.297;668.755;675.213;681.671;688.129;694.587;701.045;707.503;713.961;720.419;726.877;733.335;739.793;746.251;752.709;759.167;765.625;772.083;778.541;784.999;791.457;797.915;804.373;810.831;817.289;823.747;830.205;836.663;843.121;849.579;856.037;862.495;868.953;875.411;881.869;888.327;894.785;901.243;907.701;914.159;920.617;927.075;933.533;939.991;946.449;952.907;959.365;965.823;972.281;978.739;985.197;991.655;998.113;1004.571;1011.029;1017.487;1023.945;1030.403;1036.861",
	"schema_epn_core" : "crism"
}
```
```
> db.tmp_all.aggregate([{$match:{"s_region": {$not: {$in: ['',null,[]]}}}},{$sample:{size:1}}]).pretty()
{
	"_id" : ObjectId("5c73159244148e9a0c1903ab"),
	"granule_uid" : "VI0028_03G",
	"granule_gid" : "geometry",
	"obs_id" : "VI0028_03",
	"dataproduct_type" : "sc",
	"target_name" : "Venus",
	"target_class" : "planet",
	"target_distance_min" : 69288.8,
	"target_distance_max" : 69288.8,
	"time_min" : 2453874.03759691,
	"time_max" : 2453874.05287274,
	"target_time_min" : null,
	"target_time_max" : null,
	"time_scale" : "UTC",
	"time_sampling_step_min" : 5,
	"time_sampling_step_max" : 5,
	"time_exp_min" : 3.3,
	"time_exp_max" : 3.3,
	"spectral_range_min" : 58598994917904.6,
	"spectral_range_max" : 292480446829268,
	"spectral_sampling_step_min" : 108779824997.085,
	"spectral_sampling_step_max" : 2709952612253.56,
	"spectral_resolution_min" : 139555178690.434,
	"spectral_resolution_max" : 3476636601095.73,
	"c1min" : 65.957,
	"c1max" : 140.512,
	"c2min" : -65.281,
	"c2max" : 1.247,
	"c3min" : null,
	"c3max" : null,
	"c1_resol_min" : null,
	"c1_resol_max" : null,
	"c2_resol_min" : null,
	"c2_resol_max" : null,
	"c3_resol_min" : null,
	"c3_resol_max" : null,
	"spatial_frame_type" : "body",
	"s_region" : [
		153.311,
		2.548,
		165.374,
		2.594,
		177.98,
		1.985,
		189.941,
		0.806
	],
	"local_time_min" : 14.6862,
	"local_time_max" : 19.6565,
	"incidence_min" : null,
	"incidence_max" : null,
	"emergence_min" : null,
	"emergence_max" : null,
	"phase_min" : null,
	"phase_max" : null,
	"instrument_mode" : 19,
	"sc_pointing_mode" : "MOSAIC",
	"ra" : -999,
	"dec" : -999,
	"instrument_host_name" : "Venus-Express",
	"instrument_name" : "VIRTIS",
	"measurement_type" : "",
	"access_url" : "ftp://psa.esac.esa.int/pub/mirror/VENUS-EXPRESS/VIRTIS/VEX-V-VIRTIS-2-3-V3.0/DATA/MTP001/VIR0028/GEOMETRY/VI0028_03.GEO",
	"access_format" : "application/x-pds",
	"access_estsize" : 8712,
	"thumbnail_url" : "ftp://psa.esac.esa.int/pub/mirror/VENUS-EXPRESS/VIRTIS/VEX-V-VIRTIS-2-3-V3.0/BROWSE/MTP001/VI0028_03_H.JPG",
	"file_name" : "VI0028_03.GEO",
	"bib_reference" : "ftp://psa.esac.esa.int/pub/mirror/VENUS-EXPRESS/VIRTIS/VEX-V-VIRTIS-2-3-V3.0/DOCUMENT/VIRTIS_EAICD.PDF",
	"creation_date" : "2012-04-15",
	"modification_date" : "2012-04-15",
	"release_date" : "2012-04-15",
	"service_title" : "VVEX",
	"processing_level" : 6,
	"schema_epn_core" : "vvex"
}
```

#### Select all documents with non-empty *STRING* in `s_region` to a new collection
```
[mongodb]$ mongo
> use test
> db.tmp_all.aggregate([{$match: {"s_region": /(.|\s)*\S(.|\s)*/}}, {$out: "tmp_geo"}])
```

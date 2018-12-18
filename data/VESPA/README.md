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
* If using Anaconda Python distro, an environment ("vo") is in:
  * `conda_environment.yml`
  * In any case, all we need to use the download script is:
    * python (current at 3.7.1)
    * pyvo (current at 0.9.2)
    * pandas (current at 0.23.4)

## Examples

**Obs**: make sure to have `pyvo` and `pandas` installed.

If we want to download all craters from Mars (from the `mars_craters` service):
```bash
$ ./download_data.py mars_craters
```

If we want to download the first `1000` entries of `crism.epn_core` service:
```bash
$ ./download_data.py crism 1000
```

To know the options and arguments of the `download_data` script, just type:
```bash
$ ./download_data.py
```

/.\

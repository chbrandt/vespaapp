# The App

The App basic structure is shown in the following figure, it presents the software agents and there relation in data flow.

<img width=500 align='left' src='assets/diagram_app_components/diagram_app_components.001.jpeg' />


## Overview

The App is meant to present VO data through an interactive interface providing
a _map_ viewer and the respective data items geolocated over the field of view
on the _map_ whenever such information is available (EPN's `s_region` or `c{1,2,3}{min,max}` fields).
When such information is not present -- or for other technical reason a _map_ can not be used --, data products are presented in a list-like interface with the respective information and visualiztion controls suitable to the items at hand.

In VO/EPN jargon, data items are _granules_ (_i.e._, table records) uniquely identified through the `granule_uid` and `granule_gid` fields.
Each item has a `target_name` field where the respective _body_ (planet, asteroid) is informed -- an EPN service may provide information of different _targets_ (planets, for example) in the same table.
Those are the most fundamental information used by the App to organize data throught its pages.
Other EPN fields and how they are used internally are discussed in the `data` docs.

### The database

Contrary to the VESPA portal that queries EPN services in real-time, the VESPA-App caches the services data in a serviced database.
The main reason for doing that is performance, to provide a better user experience.
This decision is supported from the scientific point-of-view since the datasets provided by EPN services are stable enough to consider a daily update of our internal database cache a much reasonable solution.

The database is MongoDB, where each document in the db has a sub-set of the data
provided by the respective VO table, enough to (i) uniquely identify/query in
the original table, (ii) geolocate the data item, (iii) provide a description or
visualization for the user first-inspection.


### Software environment

<img width=500 align='right' src='assets/diagram_app_components/diagram_app_components.002.jpeg' />

At the basis of the App structure there is [Meteor](https://www.meteor.com/), a framework that manages the dependencies, server/client communication and the software lifecycle.
To structure the App components and reactive to data changes we make use of
[React.js](https://reactjs.org/).
Data is managed by [MongoDB](https://www.mongodb.com/).
Interactive maps are provided by [Leaflet](https://leafletjs.com/).
And [Bootstrap](https://getbootstrap.com/) is user to provide an responsive, elegant interface allowing the user to access the App either a mobile device or a desktop computer.

The next figure depicts such environment: language, frameworks and libraries
used.



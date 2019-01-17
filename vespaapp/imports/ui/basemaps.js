const baseMaps = {
  mars: [
    {
      label: "OPM",
      url: "https://cartocdn-gusc.global.ssl.fastly.net/nmanaud/api/v1/map/named/opm-mars-basemap-v0-1/0,1,2,3,4/{z}/{x}/{y}.png",
      options: {
        maxNativeZoom: 9,
        zoom: 3,
        tms: false,
        autoZIndex: true,
        attribution: "<a href='https://github.com/openplanetary/opm/wiki/OPM-Basemaps' target='_blank'>OpenPlanetaryMap</a>"
      }
    },
    {
      label: "Mola (gray)",
      url: "http://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/mola-gray/{z}/{x}/{y}.png",
      options: {
        maxNativeZoom: 9,
        tms:true,
        autoZIndex: true,
        attribution: "NASA/MOLA <a href='https://github.com/openplanetary/opm/wiki/OPM-Basemaps' target='_blank'>OpenPlanetaryMap</a>"
      }
    },
    {
      label: "Mola (color)",
      url: "http://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/mola-color/{z}/{x}/{y}.png",
      options: {
        maxNativeZoom: 6,
        tms: true,
        autoZIndex: true,
        attribution: "NASA/MOLA <a href='https://github.com/openplanetary/opm/wiki/OPM-Basemaps' target='_blank'>OpenPlanetaryMap</a>"
      }
    },
    {
      label: "Viking",
      url: "http://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/viking_mdim21_global/{z}/{x}/{y}.png",
      options: {
        maxNativeZoom: 7,
        tms:true,
        autoZIndex: true,
        attribution: "NASA/Viking/USGS <a href='https://github.com/openplanetary/opm/wiki/OPM-Basemaps' target='_blank'>OpenPlanetaryMap</a>"
      }
    },
    {
      label: "Texture",
      url: "http://s3-eu-west-1.amazonaws.com/whereonmars.cartodb.net/celestia_mars-shaded-16k_global/{z}/{x}/{y}.png",
      options: {
        maxNativeZoom: 5,
        zoom: 3,
        tms: true,
        autoZIndex: true,
        attribution: "Celestia/praesepe <a href='https://github.com/openplanetary/opm/wiki/OPM-Basemaps' target='_blank'>OpenPlanetaryMap</a>"
      }
    },
    // {
    //   label: "Hillshade",
    //   url: "https://s3.us-east-2.amazonaws.com/opmmarstiles/hillshade-tiles/{z}/{x}/{y}.png",
    //   options: {
    //     maxNativeZoom: 7,
    //     tms:true,
    //     autoZIndex: true,
    //     attribution: "NASA/MOLA <a href='https://github.com/openplanetary/opm/wiki/OPM-Basemaps' target='_blank'>OpenPlanetaryMap</a>"
    //   }
    // }
  ],
}

const overlayMaps = {
  mars: [
    {
      label: "OPM Labels",
      url: "https://cartocdn-gusc.global.ssl.fastly.net/opmbuilder/api/v1/map/named/opm-mars-basemap-v0-1/5/{z}/{x}/{y}.png",
      options: {
        tms: false,
        autoZIndex: true,
        opacity: 1,
        attribution: "USGS"
      }
    }
  ]
}

export { baseMaps, overlayMaps};

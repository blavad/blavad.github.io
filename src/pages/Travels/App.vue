<template>
  <NavBar active_item_id="3" />
  <!-- <video
    class="img-fluid"
    playsinline="playsinline"
    autoplay=""
    muted=""
    loop="loop"
  >
    <source :src="require(`@/assets/videos/lac_gelee.mp4`)" type="video/mp4" />
  </video> -->
  <div id="map"></div>

  <div class="container-fluid travelBox">
    <div class="row">
      <div class="col-6 col-lg-4 travelInfo">
        <div><strong>Location:</strong>&nbsp;<span id="loc"></span></div>
        <div>
          <strong>Num roadtrips:</strong>&nbsp;<span id="roadtrips"></span>
        </div>
        <div><strong>Num steps:</strong>&nbsp;<span id="steps"></span></div>
        <!-- <div><strong>Click:</strong>&nbsp;<span id="log"></span></div> -->
      </div>
    </div>
  </div>

  <div>
    <span id="log"></span>
  </div>
</template>

<script>
import NavBar from "@/components/nav/NavBar.vue";
// import ProjectCard from "@/components/basic/ProjectCard.vue";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted } from "vue";

export default {
  name: "App",
  components: {
    NavBar,
    // ProjectCard,
  },
  data() {
    return {
      log: "Blabla",
    };
  },
  setup() {
    onMounted(() => {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiYmxhdmFkIiwiYSI6ImNraDEwYnF6bDAzZW4ycnJyYThqejNpMXIifQ.st7UkDCI0vF2NotwVfbTfQ";

      let travels = {
        MEX: {
          roadtrips: [{ title: "Mexique en famille", num_steps: 5 }],
        },
        KOR: {
          roadtrips: [{ title: "Semestre d'échange à KAIST", num_steps: 10 }],
        },
        MYS: {
          roadtrips: [{ title: "Roadtrip Malaisie/Singapore", num_steps: 8 }],
        },
        SGP: {
          roadtrips: [{ title: "Roadtrip Malaisie/Singapore", num_steps: 8 }],
        },
        EGY: {
          roadtrips: [{ title: "1 semaine le long di Nil", num_steps: 5 }],
        },
        ITA: {
          roadtrips: [
            { title: "Heisenberg en Italie !", num_steps: 12 },
            { title: "Week-end Rome", num_steps: 1 },
          ],
        },
        GBR: {
          roadtrips: [{ title: "Stage Dundee !", num_steps: 4 }],
        },
        PRT: {
          roadtrips: [{ title: "Porto !", num_steps: 1 }],
        },
        GRC: {
          roadtrips: [{ title: "Colo Grèce 2014 !", num_steps: 7 }],
        },
        BEL: {
          roadtrips: [{ title: "Brussels & Bruges !", num_steps: 2 }],
        },
        ESP: {
          roadtrips: [{ title: "Vacances Espagne !", num_steps: 2 }],
        },
        DEU: {
          roadtrips: [
            { title: "Berlin avec l'INSA !", num_steps: 6 },
            { title: "Visite Berlin !", num_steps: 3 },
          ],
        },
        FRA: {
          roadtrips: [],
        },
        MAR: {
          roadtrips: [{ title: "Voyage Maroc !", num_steps: 6 }],
        },
      };

      let zoom_thresold = 3;

      var nt_travels = 0;
      var nt_steps = 0;
      var list_countries = [];
      for (let key in travels) {
        list_countries.push(key);
        let roadtrips = travels[key]["roadtrips"];
        nt_travels += roadtrips.length;
        for (let key_road in roadtrips) {
          nt_steps += roadtrips[key_road]["num_steps"];
        }
      }

      const map = new mapboxgl.Map({
        container: "map",
        style: "mapbox://styles/mapbox/streets-v11",
        // style: "mapbox://styles/mapbox/outdoors-v11",
        // style: "mapbox://styles/mapbox/light-v10",
        // style: "mapbox://styles/mapbox/dark-v10",
        // style: "mapbox://styles/mapbox/satellite-v9",
        // style: "mapbox://styles/mapbox/satellite-streets-v11",
        // style: "mapbox://styles/mapbox/navigation-preview-day-v4",
        center: [0, 20], // starting position [lng, lat]
        zoom: 1.5, // starting zoom
      });

      var hoveredStateId = null;
      var logDisplay = document.getElementById("log");
      var locationDisplay = document.getElementById("loc");
      var roadtripsDisplay = document.getElementById("roadtrips");
      var stepsDisplay = document.getElementById("steps");

      map.on("load", () => {
        map.addSource("countries", {
          type: "vector",
          url: "mapbox://mapbox.country-boundaries-v1",
        });

        map.addLayer(
          {
            id: "country-bounds",
            source: "countries",
            "source-layer": "country_boundaries",
            maxzoom: zoom_thresold,
            type: "fill",
            paint: {
              "fill-color": "#0e76a8",
              "fill-opacity": [
                "case",
                ["boolean", ["feature-state", "hover"], false],
                0.8,
                0.6,
              ],
            },
          },
          "country-label"
        );

        map.setFilter(
          "country-bounds",
          ["in", "iso_3166_1_alpha_3"].concat(list_countries)
        );

        // Initial content in description
        locationDisplay.textContent = "World";
        roadtripsDisplay.textContent = nt_travels;
        stepsDisplay.textContent = nt_steps;

        // map.loadImage(
        // "https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png",
        // (error, image) => {
        // if (error) throw error;
        // map.addImage("custom-marker", image);
        // Add a GeoJSON source with 2 points
        //     map.addSource("mypoints", {
        //       type: "geojson",
        //       data: {
        //         type: "FeatureCollection",
        //         features: [
        //           {
        //             // feature for Mapbox DC
        //             type: "Feature",
        //             geometry: {
        //               type: "Point",
        //               coordinates: [-77.03238901390978, 38.913188059745586],
        //             },
        //             properties: {
        //               title: "Mapbox DC",
        //             },
        //           },
        //           {
        //             // feature for Mapbox SF
        //             type: "Feature",
        //             geometry: {
        //               type: "Point",
        //               coordinates: [-122.414, 37.776],
        //             },
        //             properties: {
        //               title: "Mapbox SF",
        //             },
        //           },
        //         ],
        //       },
        //     });

        //     // Layer with icons that should always be visible
        //     map.addLayer({
        //       id: "layer-mypoints",
        //       type: "symbol",
        //       source: "mypoints",
        //       minzoom: 4, // Set zoom level to whatever suits your needs
        //       layout: {
        //         "icon-image": "custom-marker",
        //         "icon-allow-overlap": true,
        //         "text-field": ["get", "title"],
        //         "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        //         "text-offset": [0, 1.25],
        //       },
        //     });

        //     // Layer with just labels that are only visible from a certain zoom level
        //     map.addLayer({
        //       id: "layer-mypoints-label",
        //       type: "symbol",
        //       source: "mypoints",
        //       minzoom: 12, // Set zoom level to whatever suits your needs
        //       layout: {
        //         "text-field": ["get", "title"],
        //         "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        //         "text-offset": [0, 1.25],
        //       },
        //     });
        //   }
        // );
        // Add a new source from our GeoJSON data and
        // set the 'cluster' option to true. GL-JS will
        // add the point_count property to your source data.
        map.addSource("steps", {
          type: "geojson",
          // Point to GeoJSON data. This example visualizes all M1.0+ steps
          // from 12/22/15 to 1/21/16 as logged by USGS' Earthquake hazards program.
          data: "/json/steps.geojson",
          cluster: true,
          clusterMaxZoom: 10, // Max zoom to cluster points on
          clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
        });

        let size1 = 10,
          size2 = 30;

        map.addLayer({
          id: "clusters",
          type: "circle",
          source: "steps",
          minzoom: zoom_thresold,
          filter: ["has", "point_count"],
          paint: {
            // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            "circle-color": [
              "step",
              ["get", "point_count"],
              "#51bbd6",
              size1,
              "#f1f075",
              size2,
              "#f28cb1",
            ],
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              size1,
              25,
              size2,
              30,
            ],
          },
        });

        map.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "steps",
          minzoom: zoom_thresold,
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-color": "#11b4da",
            "circle-radius": 20,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          },
        });

        map.addLayer({
          id: "cluster-count",
          type: "symbol",
          source: "steps",
          minzoom: zoom_thresold,
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
            "text-size": 12,
          },
        });

        // inspect a cluster on click
        map.on("click", "clusters", (e) => {
          const features = map.queryRenderedFeatures(e.point, {
            layers: ["clusters"],
          });
          const clusterId = features[0].properties.cluster_id;
          map
            .getSource("steps")
            .getClusterExpansionZoom(clusterId, (err, zoom) => {
              if (err) return;

              map.easeTo({
                center: features[0].geometry.coordinates,
                zoom: zoom,
              });
            });
        });

        map.on("mouseenter", "unclustered-point", () => {
          map.getCanvas().style.cursor = "pointer";
        });
        map.on("mouseleave", "unclustered-point", () => {
          map.getCanvas().style.cursor = "";
        });

        // When the user moves their mouse over the state-fill layer, we'll update the
        // feature state for the feature under the mouse.
        map.on("mousemove", "country-bounds", function (e) {
          map.getCanvas().style.cursor = "pointer";
          if (e.features.length > 0) {
            if (hoveredStateId) {
              map.setFeatureState(
                {
                  source: "countries",
                  sourceLayer: "country_boundaries",
                  id: hoveredStateId,
                },
                {
                  hover: false,
                }
              );
            }
            hoveredStateId = e.features[0].id;
            let country_code = e.features[0].properties.iso_3166_1_alpha_3;
            locationDisplay.textContent = e.features[0].properties.name_en;
            logDisplay.textContent = JSON.stringify(travels, null, 4);
            roadtripsDisplay.textContent =
              travels[country_code]["roadtrips"].length;
            let n_steps = 0;
            travels[country_code]["roadtrips"].forEach((element) => {
              n_steps += element["num_steps"];
            });
            stepsDisplay.textContent = n_steps;

            map.setFeatureState(
              {
                source: "countries",
                sourceLayer: "country_boundaries",
                id: hoveredStateId,
              },
              {
                hover: true,
              }
            );
          }
        });

        // When the mouse leaves the state-fill layer, update the feature state of the
        // previously hovered feature.
        map.on("mouseleave", "country-bounds", function () {
          if (hoveredStateId) {
            map.setFeatureState(
              {
                source: "countries",
                sourceLayer: "country_boundaries",
                id: hoveredStateId,
              },
              {
                hover: false,
              }
            );
          }
          hoveredStateId = null;
          map.getCanvas().style.cursor = "";

          locationDisplay.textContent = "World";
          roadtripsDisplay.textContent = nt_travels;
          stepsDisplay.textContent = nt_steps;
        });

        map.on("click", "country-bounds", function (e) {
          if (e.features.length > 0) {
            map.flyTo({ center: e.lngLat.wrap(), zoom: 4.5 });
          }
        });
        // add markers to map
        // geojson.features.forEach(function (marker) {
        //   // create a DOM element for the marker
        //   var el = document.createElement("div");
        //   el.className = "marker";
        //   el.style.backgroundImage =
        //     "url(https://placekitten.com/g/" +
        //     marker.properties.iconSize.join("/") +
        //     "/)";
        //   el.style.width = marker.properties.iconSize[0] + "px";
        //   el.style.height = marker.properties.iconSize[1] + "px";

        //   el.addEventListener("click", function () {
        //     window.alert(marker.properties.message);
        //   });

        //   // add marker to map
        //   new mapboxgl.Marker(el)
        //     .setLngLat(marker.geometry.coordinates)
        //     .addTo(map);
        // });
        // TODO: Here we want to load a layer
        // TODO: Here we want to load/setup the popup
      });
    });
    return {};
  },
  computed: {
    slow_down_video: function () {
      const video = document.querySelector("video");
      video.playbackRate = 0.5;
      return true;
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: "Lucida Console", Courier, monospace;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.container,
.container-fluid {
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.see-more {
  color: black;
}

/* Other styles */

.parallax {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.arrondie {
  -moz-border-radius: 5rem;
  -webkit-border-radius: 5rem;
  border-radius: 5rem;
}

.scroll {
  overflow: scroll;
  max-height: 40vh;
}

video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  // background: url("../../assets/images/malaisie2.jpg") no-repeat;
  background-color: rgb(218, 218, 218);
  background-size: cover;
}

#map {
  height: 100vh;
  // height: 63vh;
}

.marker {
  display: block;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
}

.travelBox {
  position: absolute;
  font-family: sans-serif;
  top: 40px;
  text-align: left;
}

.travelInfo {
  margin-top: 5px;
  margin-left: 5px;
  padding: 5px;
  border: 2px solid black;
  font-size: 14px;
  color: #222;
  background-color: rgba($color: #ffffff, $alpha: 0.8);
  border-radius: 3px;
}
</style>

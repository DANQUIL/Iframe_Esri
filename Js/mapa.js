/* librerias de Arcgis*/

require([
        "esri/Map",
        "esri/views/MapView",
        "esri/layers/FeatureLayer",
        "esri/layers/VectorTileLayer",
    ],
    function(Map, MapView, FeatureLayer, VectorTileLayer) {
        // Code to create the map and view will go here
        var map = new Map({
            ground: "world-elevation"
        });
        var view = new MapView({
            container: "viewMap", // Reference to the DOM node that will contain the view
            map: map, // References the map object created in step 3
            center: [-73.266667, 5.533333, ],
            /* Coordenadas del lugar */
            zoom: 8 /* Zoom  */
        });

        var tileLayer = new VectorTileLayer({
            portalItem: { id: "7be93239c57a405c8208562a52acf012" } /* ID de base mapa*/
        });

        map.add(tileLayer);
        const fondo = new FeatureLayer({
            url: "https://basemaps.arcgis.com/arcgis/rest/services/World_Basemap_v2/VectorTileServer",
            /* link de base mapa */
            title: "AvistamientoFauna"
        });
        map.add(fondo)


        const layer = new FeatureLayer({
            portalItem: { id: "3e031836f03e431a9548aa8c7405e064" } /* ID del featureLayer donde se llama los puntos  */

        });
        map.add(layer)


        var template = {

            // autocasts as new PopupTemplate()

            title: "{NOMBRE}",
            content: [{
                    type: "text",
                },

                {
                    type: "fields",
                    fieldInfos: [

                        {

                            fieldName: "Año",
                            /* Nombre del campo que tiene en la base "Show Table" */
                            label: "Nació" /* Nombre que aparecera en el popa del mapa */
                        },
                        {
                            fieldName: "Descripcio",
                            label: "Descripción"
                        },
                        {
                            fieldName: "Refencia",
                            label: "Referencia",
                            format: {
                                digitSeparator: true,
                                places: 0
                            }
                        },
                    ]
                },
                {
                    type: "media",
                    mediaInfos: [{
                        type: "image",
                        caption: "",
                        value: {
                            sourceURL: "{imagen}"
                        }
                    }, ]
                }

            ]
        }

        layer.popupTemplate = template;

    });
import DeckGL, { GeoJsonLayer } from "deck.gl";
import { EditableGeoJsonLayer, ViewMode } from "nebula.gl";
import { StaticMap, _MapContext as MapContext } from "react-map-gl";
import {DATA, mapStyle, POLYGON_DATA, CITY_DATA, getPolygonColor} from './map.const';

export const INITIAL_VIEW_STATE = {
    width: "100%",
    height: "100%",
    latitude: 48.8566969,
    longitude: 2.3514616,
    zoom: 14,
    pitch: 0,
    bearing: 0,
};
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export const Map = () => {
    const onEditLayer = ()=>{}
    const editableLayer = new EditableGeoJsonLayer(
        // @ts-ignore
        {
            id: "geojson",
            // @ts-ignore
            data: DATA,
            mode: ViewMode,
            onEdit: onEditLayer,
        },
    );

    const polygonLayer = new GeoJsonLayer({
        id: "polygon-layer",
        data: POLYGON_DATA,
        stroked: true,
        getFillColor: (feature: any) => getPolygonColor(feature, "fillColor"),
        getLineColor: (feature: any) => getPolygonColor(feature, "borderColor"),
        lineWidthMaxPixels: 1,
    });

    const currentCityLayer = new GeoJsonLayer({
        id: "current-city",
        // @ts-ignore
        data: CITY_DATA.boundaries,
        filled: false,
        lineWidthMinPixels: 1,
        lineWidthMaxPixels: 4,
    });


    const getLayers = () => {
        return [editableLayer, polygonLayer, currentCityLayer];
    };

    return (
        <div className="relative h-full">
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                getCursor={({ isDragging }: { isDragging: boolean }) => (isDragging ? "grabbing" : "grab")}
                layers={getLayers()}
                pickingRadius={12}
                ContextProvider={MapContext.Provider}
                height="100%"
                width="100%"
            >
                <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} mapStyle={mapStyle} width="100%" height="100%" />
            </DeckGL>
        </div>
    )
}
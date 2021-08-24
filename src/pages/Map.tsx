import DeckGL, { GeoJsonLayer } from "deck.gl";
import { EditableGeoJsonLayer, ViewMode } from "nebula.gl";
import { StaticMap, _MapContext as MapContext } from "react-map-gl";
import {DATA, POLYGON_DATA} from './map.const';

export const INITIAL_VIEW_STATE = {
    width: "100%",
    height: "100%",
    latitude: 48.8967,
    longitude: 2.2567,
    zoom: 14,
    pitch: 0,
    bearing: 0,
};
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiYW5kcmV3LWJ1aSIsImEiOiJja3NwcTNubTIwNWFtMnZtYjA0N3R4MG5yIn0.cYrAWUsItM3w1Hui9fpOfg';

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
        getFillColor: [70, 127, 233, 56],
        getLineColor: [70, 127, 233, 255],
        lineWidthMaxPixels: 1,
    });

    return (
        <div className="relative h-full">
            <DeckGL
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                getCursor={({ isDragging }: { isDragging: boolean }) => (isDragging ? "grabbing" : "grab")}
                layers={[editableLayer, polygonLayer]}
                pickingRadius={12}
                ContextProvider={MapContext.Provider}
                height="100%"
                width="100%"
            >
                <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} mapStyle="mapbox://styles/mapbox/light-v10" width="100%" height="100%" />
            </DeckGL>
        </div>
    )
}
import { ProCard } from "@ant-design/pro-components";
import FenceList from "./components/FenceList";
import { BaseMap, MultiLabel, MultiMarker, MultiPolygon } from "tlbs-map-react";
import { useEffect, useRef, useState } from "react";
import { message } from "antd";

const ElectronicFence = () => {
  const mapRef = useRef<any>();
  const [center, setCenter] = useState({ lat: 40.0404, lng: 116.2735 });

  const polygonRef = useRef<any>();
  const markerRef = useRef<any>();
  const labelRef = useRef<any>();

  const [markerKey, setMarkerKey] = useState("marker-");
  const [polygonKey, setPolygonKey] = useState("polygon-");
  const [labelKey, setLabelKey] = useState("label-");
  const [mapKey, setMapKey] = useState("map-");

  //中心点标记
  const [centerMarker, setCenterMarker] = useState<any>(null);
  //多边形围栏
  const [polygons, setPolygons] = useState<any>([]);
  //标签
  const [labels, setLabels] = useState<any>([]);
  useEffect(() => {
    if (mapRef.current) {
      console.log("mapRef.current", mapRef.current);
      mapRef.current.setCenter(center);
    }
  }, [center]);

  const onMapInited = () => {
    console.log("mapInited", mapRef.current);
  };

  const onShowMap = (record: API.ElectronicFence) => {
    setMarkerKey(`marker-${record.id}`);
    setPolygonKey(`polygon-${record.id}`);
    setLabelKey(`label-${record.id}`);
    // 确保旧覆盖物从地图实例上移除
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null as any;
    }
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      polygonRef.current = null as any;
    }

    if (polygonRef.current) {
      polygonRef.current.setGeometries([]);
    }

    setCenterMarker(null);
    setPolygons([]);
    setLabels([]);
    console.log("record", record);

    if (record.area) {
      const areas = record.area.split(";");
      const polygons = [
        {
          paths: areas.map((item: string) => {
            const points = item.split(",").map(Number);
            return { lat: points[1], lng: points[0] };
          }),
        },
      ];
      console.log("polygons", polygons);
      if (polygonKey.length > 0) {
        const onePoint = polygons[0].paths[0];
        const lat = onePoint.lat;
        const lng = onePoint.lng;
        if (lat > 90 || lat < -90 || lng > 180 || lng < -180) {
          message.error("围栏坐标无效");
          return;
        }
      }

      setPolygons(polygons);

      // 计算中心点（简单取平均值）
      if (!record.centerPoint) {
        const centerLng =
          polygons.reduce((sum: number, m: any) => sum + m.position.lng, 0) /
          polygons.length;
        const centerLat =
          polygons.reduce((sum: number, m: any) => sum + m.position.lat, 0) /
          polygons.length;
        record.centerPoint = `${centerLng},${centerLat}`;
      }
    }

    if (!record.centerPoint) {
      message.error("中心点坐标无效");
      return;
    }

    const centerPoint = record.centerPoint.split(",");
    const lat = Number(centerPoint[1]);
    const lng = Number(centerPoint[0]);
    console.log("lat", lat);
    console.log("lng", lng);

    if (lat > 90 || lat < -90 || lng > 180 || lng < -180) {
      message.error("中心点坐标无效");
      return;
    }

    setCenter({ lat, lng });
    setCenterMarker({
      position: {
        lat,
        lng,
      },
    });

    const labels = [
      {
        styleId: "multiLabelStyle",
        position: {
          lat,
          lng,
        },
        content: record.name,
      },
    ];
    console.log("labels", labels);
    setLabels(labels);
  };

  const onClearDrawing = () => {
    // 主动从地图上移除已有覆盖物，避免库内部缓存导致的残留
    if (markerRef.current) {
      markerRef.current.setMap(null);
      markerRef.current = null as any;
    }
    if (polygonRef.current) {
      polygonRef.current.setMap(null);
      polygonRef.current = null as any;
    }

    setCenterMarker(null);
    setPolygons([]);
    setLabels([]);
    setMapKey(`map-${Date.now()}`);
  };

  const onScaleChange = (scale: number) => {
    console.log("scale", scale);
  };

  return (
    <ProCard
      gutter={8}
      style={{ height: "calc(100vh - 64px)", display: "flex" }}
      bodyStyle={{ height: "100%", display: "flex", padding: 8 }}
    >
      <ProCard
        colSpan={8}
        bordered
        style={{ height: "100%", display: "flex", flexDirection: "column" }}
        bodyStyle={{
          height: "100%",
          padding: 16,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FenceList onShowMap={onShowMap} onClearDrawing={onClearDrawing} />
      </ProCard>

      <ProCard
        colSpan={16}
        bordered
        style={{ height: "100%" }}
        bodyStyle={{ height: "100%", padding: 0 }}
      >
        <BaseMap
          key={mapKey}
          ref={mapRef}
          apiKey="OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"
          control={{
            zoom: {
              position: "topRight",
              className: "tmap-zoom-control-box",
              numVisible: true,
            },
          }}
          options={{
            center,
            showControl: true,
          }}
          onMapInited={onMapInited}
          onScaleChange={onScaleChange}
        >
          {centerMarker && (
            <MultiMarker
              key={markerKey}
              ref={markerRef}
              geometries={[centerMarker]}
            />
          )}
          {polygons.length > 0 && (
            <MultiPolygon
              key={polygonKey}
              ref={polygonRef}
              geometries={polygons}
            />
          )}

          <MultiLabel
            key={labelKey}
            ref={labelRef}
            geometries={labels}
            styles={{
              multiLabelStyle: {
                color: "#4433FF",
              },
            }}
          />
        </BaseMap>
      </ProCard>
    </ProCard>
  );
};

export default ElectronicFence;

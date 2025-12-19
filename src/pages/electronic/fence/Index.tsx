import { ProCard } from "@ant-design/pro-components";
import FenceList from "./components/FenceList";
import { BaseMap, MultiLabel, MultiMarker, MultiPolygon } from "tlbs-map-react";
import { useEffect, useRef, useState } from "react";
import { Input, message } from "antd";
import { fenceUpdate } from "@/api/electronicFenceController";

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
  const [manualCoord, setManualCoord] = useState<string>("");
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
      debugger;
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
          polygons[0].paths.reduce((sum: number, m: any) => sum + m.lng, 0) /
          polygons[0].paths.length;
        const centerLat =
          polygons[0].paths.reduce((sum: number, m: any) => sum + m.lat, 0) /
          polygons[0].paths.length;
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

    //更新中心点坐标
    fenceUpdate({
      id: record.id,
      centerPoint: `${lng},${lat}`,
    });
    setCenter({ lat, lng });
    setCenterMarker({
      styleId: "multiMarkerStyle",
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

  const handleManualMark = () => {
    if (!manualCoord) {
      message.warning("请输入经纬度，例如：116.38,39.90");
      return;
    }

    const normalized = manualCoord.replace("，", ",");
    const parts = normalized.split(",").map((item) => item.trim());
    if (parts.length !== 2 || !parts[0] || !parts[1]) {
      message.error("格式错误，应为：经度,纬度");
      return;
    }

    const lng = Number(parts[0]);
    const lat = Number(parts[1]);

    if (Number.isNaN(lng) || Number.isNaN(lat)) {
      message.error("坐标必须是数字");
      return;
    }

    if (lat > 90 || lat < -90 || lng > 180 || lng < -180) {
      message.error("坐标范围无效");
      return;
    }

    setMarkerKey(`marker-manual-1`);
    setLabelKey(`label-manual-1`);
    setCenter({ lat, lng });
    setCenterMarker({
      styleId: "multiMarkerStyle",
      position: {
        lat,
        lng,
      },
    });
    setLabels([
      {
        styleId: "multiLabelStyle",
        position: {
          lat,
          lng,
        },
        content: "手动标记",
      },
    ]);

    if (mapRef.current) {
      mapRef.current.setCenter({ lat, lng });
    }
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
    setManualCoord("");
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
        <div style={{ position: "relative", height: "100%" }}>
          <div className="absolute z-9999 top-12 left-12  bg-white rounded-10 box-shadow-10">
            <Input
              className="w-80 h-30px"
              size="middle"
              allowClear
              placeholder="请输入经纬度，格式：经度,纬度"
              value={manualCoord}
              onChange={(e) => setManualCoord(e.target.value)}
              onPressEnter={handleManualMark}
            />
          </div>

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
            style={{ width: "100%", height: "100%" }}
            onMapInited={onMapInited}
            onScaleChange={onScaleChange}
          >
            {centerMarker && (
              <MultiMarker
                key={markerKey}
                ref={markerRef}
                geometries={[centerMarker]}
                styles={{
                  multiMarkerStyle: {
                    width: 20,
                    height: 30,
                    anchor: { x: 10, y: 30 },
                  },
                }}
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
                  color: "#E94335",
                },
              }}
            />
          </BaseMap>
        </div>
      </ProCard>
    </ProCard>
  );
};

export default ElectronicFence;

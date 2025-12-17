import { ProCard } from "@ant-design/pro-components";
import FenceList from "./components/FenceList";
import { BaseMap, MultiMarker, MultiPolygon } from "tlbs-map-react";
import { useEffect, useRef, useState } from "react";
import { message } from "antd";

const ElectronicFence = () => {
  const mapRef = useRef<any>();
  const [center, setCenter] = useState({ lat: 40.0404, lng: 116.2735 });

  const polygonRef = useRef<any>();

  //中心点标记
  const [centerMarker, setCenterMarker] = useState<any>(null);
  //多边形围栏
  const [geometries, setGeometries] = useState<any>([]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setCenter(center);
    }
  }, [center]);

  const onMapInited = () => {
    console.log("mapInited", mapRef.current);
  };

  const onShowMap = (record: API.ElectronicFence) => {
    if (polygonRef.current) {
      polygonRef.current.setGeometries([]);
    }

    setCenterMarker(null);
    setGeometries([]);
    console.log("record", record);

    if (record.centerPoint) {
      const centerPoint = record.centerPoint.split(",");
      const lat = Number(centerPoint[1]);
      const lng = Number(centerPoint[0]);

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
    }

    if (record.area) {
      const areas = record.area.split(";");
      const geometries = [
        {
          paths: areas.map((item: string) => {
            const points = item.split(",").map(Number);
            return { lat: points[1], lng: points[0] };
          }),
        },
      ];
      console.log("geometries", geometries);
      setGeometries(geometries);
    }
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
        <FenceList onShowMap={onShowMap} />
      </ProCard>

      <ProCard
        colSpan={16}
        bordered
        style={{ height: "100%" }}
        bodyStyle={{ height: "100%", padding: 0 }}
      >
        <BaseMap
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
            zoom: 17,
            showControl: true,
          }}
          onMapInited={onMapInited}
        >
          {centerMarker && <MultiMarker geometries={[centerMarker]} />}
          {geometries.length > 0 && (
            <MultiPolygon ref={polygonRef} geometries={geometries} />
          )}
        </BaseMap>
      </ProCard>
    </ProCard>
  );
};

export default ElectronicFence;

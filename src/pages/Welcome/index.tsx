import { useCallback, useEffect, useRef, useState } from "react";
import { BaseMap, MultiMarker } from "tlbs-map-react";
import { Card, Statistic, Row, Col, Spin, Descriptions, Tag } from "antd";
import {
  EnvironmentOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { deviceList } from "@/api/lockDeviceController";
import onlineIcon from "@/assets/icons/location-online.svg";
import offlineIcon from "@/assets/icons/location-offline.svg";

const styles = {
  offlineMarker: {
    width: 30,
    height: 30,
    anchor: { x: 10, y: 30 },
    src: offlineIcon,
  },
  onlineMarker: {
    width: 30,
    height: 30,
    anchor: { x: 10, y: 30 },
    // src: "https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerDefault.png",
    src: onlineIcon,
  },
};

const Welcome = () => {
  const mapRef = useRef<any>();
  const markerRef = useRef<any>();
  const [loading, setLoading] = useState(true);
  const [devices, setDevices] = useState<API.LockDevice[]>([]);
  const [center, setCenter] = useState({ lat: 40.0404, lng: 116.2735 });
  const [selectedDevice, setSelectedDevice] = useState<API.LockDevice | null>(
    null
  );
  const [mapInited, setMapInited] = useState(false);

  // 标记点击事件处理函数
  const onMarkerClick = useCallback((evt: any) => {
    console.log("Marker clicked:", evt);
    const geometry = evt?.geometry;
    if (geometry?.deviceId) {
      // 直接从最新 devices 中查找
      setDevices((latestDevices) => {
        const device = latestDevices.find((d) => d.id === geometry.deviceId);
        console.log("点击的设备:", device);
        if (device) {
          setSelectedDevice(device);
        }
        return latestDevices;
      });
    }
  }, []);

  // 绑定标记点击事件
  const bindMarkerClick = useCallback(() => {
    if (markerRef.current) {
      markerRef.current.off("click", onMarkerClick);
      markerRef.current.on("click", onMarkerClick);
      console.log("绑定标记点击事件");
    }
  }, [onMarkerClick]);

  // 获取所有设备
  const fetchDevices = async () => {
    try {
      setLoading(true);
      const res = await deviceList();
      if (res.data) {
        setDevices(res.data);
        // 如果有设备，计算中心点
        const validDevices = res.data.filter((d) => d.longitude && d.latitude);
        if (validDevices.length > 0) {
          const avgLng =
            validDevices.reduce((sum, d) => sum + (d.longitude || 0), 0) /
            validDevices.length;
          const avgLat =
            validDevices.reduce((sum, d) => sum + (d.latitude || 0), 0) /
            validDevices.length;
          setCenter({ lat: avgLat, lng: avgLng });
        }
      }
    } catch (error) {
      console.error("获取设备列表失败:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();

    // 定时获取设备信息（每3秒）
    const timer = setInterval(() => {
      console.log("定时获取设备信息...");
      deviceList().then((res) => {
        if (res.data) {
          setDevices(res.data);
        }
      });
    }, 3000);

    // 组件卸载时清除定时器
    return () => {
      clearInterval(timer);
    };
  }, []);

  // 监听地图中心变化
  useEffect(() => {
    console.log("center:", center, "mapInited:", mapInited);
    if (mapInited && mapRef.current) {
      mapRef.current.setCenter(center);
      console.log("重置地图中心:", center);
      bindMarkerClick();
    }
  }, [center, mapInited]);

  // 地图初始化完成回调
  const onMapInited = () => {
    console.log("地图初始化完成");
    setMapInited(true);
  };

  // 判断设备是否离线（根据最后在线时间超过5分钟）
  const isDeviceOffline = (device: API.LockDevice): boolean => {
    if (!device.onlineUpdateTime) return true;
    const updateTime = new Date(device.onlineUpdateTime).getTime();
    const now = Date.now();
    // 离线判定时间 毫秒
    return now - updateTime > 10 * 1000;
  };

  // 统计在线/离线数量
  const onlineCount = devices.filter((d) => !isDeviceOffline(d)).length;
  const offlineCount = devices.filter((d) => isDeviceOffline(d)).length;
  const totalCount = devices.length;

  // 构建标记点
  const markers = devices
    .filter((d) => d.longitude && d.latitude)
    .map((d) => ({
      styleId: isDeviceOffline(d) ? "offlineMarker" : "onlineMarker",
      position: {
        lat: d.latitude!,
        lng: d.longitude!,
      },
      deviceId: d.id,
    }));

  // console.log("markers:", markers);

  // 当设备数据变化时强制刷新标记
  const markerKey = `marker-${devices.map((d) => d.id).join("-")}`;

  // 获取车辆类型标签
  const getBicycleTypeLabel = (type?: number) => {
    switch (type) {
      case 1:
        return <Tag color="blue">自行车</Tag>;
      case 2:
        return <Tag color="green">电动车</Tag>;
      case 3:
        return <Tag color="purple">蓝牙车</Tag>;
      default:
        return <Tag>未知</Tag>;
    }
  };

  return (
    <div
      style={{
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 统计卡片 */}
      <Card style={{ margin: 16, marginBottom: 0 }}>
        <Row gutter={16}>
          <Col span={6}>
            <Statistic
              title="设备总数"
              value={totalCount}
              prefix={<EnvironmentOutlined />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="在线设备"
              value={onlineCount}
              valueStyle={{ color: "#52c41a" }}
              prefix={<CheckCircleOutlined />}
            />
          </Col>
          <Col span={6}>
            <Statistic
              title="离线设备"
              value={offlineCount}
              valueStyle={{ color: "#ff4d4f" }}
              prefix={<CloseCircleOutlined />}
            />
          </Col>
          <Col span={6}>
            <div style={{ fontSize: 14, color: "#999" }}>
              <span
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 12,
                  background: "#52c41a",
                  borderRadius: "50%",
                  marginRight: 8,
                }}
              ></span>
              在线
              <span
                style={{
                  display: "inline-block",
                  width: 12,
                  height: 12,
                  background: "#ff4d4f",
                  borderRadius: "50%",
                  marginLeft: 16,
                  marginRight: 8,
                }}
              ></span>
              离线
            </div>
          </Col>
        </Row>
      </Card>

      {/* 地图和详情 */}
      <div
        style={{ flex: 1, display: "flex", margin: 16, marginTop: 0, gap: 16 }}
      >
        {/* 地图 */}
        <Card style={{ flex: 1 }}>
          <Spin spinning={loading} tip="加载设备中...">
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
                zoom: 14,
                showControl: true,
              }}
              style={{ width: "100%", height: "100%" }}
              onMapInited={onMapInited}
            >
              <MultiMarker
                key={markerKey}
                ref={markerRef}
                geometries={markers}
                styles={styles}
              />
            </BaseMap>
          </Spin>
        </Card>

        {/* 设备详情 */}
        <Card title="设备详情" style={{ width: 320 }}>
          {selectedDevice ? (
            <Descriptions column={1} size="small">
              <Descriptions.Item label="设备编号">
                {selectedDevice.qrNumber || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="IMEI">
                {selectedDevice.imei || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="车辆类型">
                {getBicycleTypeLabel(selectedDevice.bicycleType)}
              </Descriptions.Item>
              <Descriptions.Item label="运营商">
                {selectedDevice.distributorName || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="电量">
                {selectedDevice.mainElectricity !== undefined
                  ? `${selectedDevice.mainElectricity}%`
                  : "-"}
              </Descriptions.Item>
              <Descriptions.Item label="状态">
                <Tag
                  color={isDeviceOffline(selectedDevice) ? "error" : "success"}
                >
                  {isDeviceOffline(selectedDevice) ? "离线" : "在线"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="经度">
                {selectedDevice.longitude || "-"}
              </Descriptions.Item>
              <Descriptions.Item label="纬度">
                {selectedDevice.latitude || "-"}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <div style={{ textAlign: "center", color: "#999", marginTop: 100 }}>
              点击地图上的标记查看设备详情
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Welcome;

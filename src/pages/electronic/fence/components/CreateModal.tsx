import React, { useState, useRef, useCallback, useEffect } from "react";
import { Modal, Form, Input, message, Button, Space, Divider } from "antd";
import { BaseMap, MultiMarker, MultiPolygon } from "tlbs-map-react";
import { add } from "@/api/electronicFenceController";

interface CreateModalProps {
  visible: boolean;
  onCancel: () => void;
  onSuccess: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({
  visible,
  onCancel,
  onSuccess,
}) => {
  const styles = {
    markerStyle: {
      width: 20,
      height: 30,
      anchor: { x: 10, y: 30 },
    },
    polygonStyle: {
      strokeColor: "#3777FF",
      fillColor: "#3777FF30",
      strokeWidth: 2,
    },
  };

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const mapRef = useRef<any>(); // 地图组件引用
  const polygonRef = useRef<any>(); // 多边形围栏引用
  const markerRef = useRef<any>(); //地图标记引用

  const [drawingMode, setDrawingMode] = useState(false);
  const drawingModeRef = useRef(false);

  const [polygon, setPolygon] = useState<any>(null);
  const [markers, setMarkers] = useState<any>([]);
  const [geometries, setGeometries] = useState<any>([]);

  useEffect(() => {
    drawingModeRef.current = drawingMode;
    const geometries = [
      {
        styleId: "polygonStyle",
        paths: [polygon?.map((m: any) => m.position) || []],
      },
    ];
    console.log("geometries", geometries);
    setGeometries(geometries);
  }, [drawingMode, polygon]);

  // 地图初始化完成
  const onMapInited = useCallback(() => {
    if (mapRef.current) {
    }
  }, []);

  // 清除绘制内容
  const clearDrawing = () => {
    setMarkers([]);
    setPolygon(null);
    setGeometries([]);
    console.log("清除绘制内容", polygonRef.current);
  };

  // 开始绘制
  const startDrawing = () => {
    setDrawingMode(true);
    clearDrawing();
    message.info("请在地图上点击以添加围栏顶点，至少需要3个点");
  };

  // 完成绘制
  const finishDrawing = () => {
    if (markers.length < 3) {
      message.warning("至少需要3个点才能形成围栏");
      return;
    }
    setDrawingMode(false);
    setPolygon(markers);
    message.success("围栏绘制完成");
  };

  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (markers.length < 3) {
        message.warning("请先在地图上绘制围栏，至少需要3个点");
        return;
      }

      setLoading(true);

      // 将坐标点转换为字符串格式
      const areaString = markers
        .map((m: any) => `${m.position.lng},${m.position.lat}`)
        .join(";");

      // 计算中心点（简单取平均值）
      const centerLng =
        markers.reduce((sum: number, m: any) => sum + m.position.lng, 0) /
        markers.length;
      const centerLat =
        markers.reduce((sum: number, m: any) => sum + m.position.lat, 0) /
        markers.length;
      const centerPoint = `${centerLng},${centerLat}`;

      await add({
        name: values.name,
        description: values.description,
        area: areaString,
        centerPoint: centerPoint,
        status: 1,
      });

      message.success("创建成功");
      clearDrawing();
      form.resetFields();
      onSuccess();
      onCancel();
    } catch (error) {
      message.error("创建失败");
    } finally {
      setLoading(false);
    }
  };

  // 取消
  const handleCancel = () => {
    form.resetFields();
    clearDrawing();
    onCancel();
  };

  const clickHandler = (event: any) => {
    // 添加调试日志
    console.log("🚀🚀🚀 图层点击事件", event);
    console.log("当前 drawingMode:", drawingModeRef.current);

    if (!drawingModeRef.current) {
      console.log("不在绘制模式，忽略点击");
      return;
    }

    const marker = {
      position: { lat: event.latLng.lat, lng: event.latLng.lng },
      style: "markerStyle",
    };

    console.log("添加标记:", marker);

    // 使用函数式更新，确保获取最新的状态
    setMarkers((prevMarkers: any) => {
      console.log("当前标记数:", prevMarkers.length);
      return [...prevMarkers, marker];
    });
  };

  return (
    <Modal
      title="新建电子围栏"
      open={visible}
      onCancel={handleCancel}
      width="80%"
      style={{ top: 20 }}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          确定
        </Button>,
      ]}
    >
      <div style={{ height: "80vh", display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: 16, flexShrink: 0 }}>
          <Form form={form} layout="inline">
            <Form.Item
              name="name"
              label="围栏名称"
              rules={[{ required: true, message: "请输入围栏名称" }]}
            >
              <Input placeholder="请输入围栏名称" style={{ width: 200 }} />
            </Form.Item>
            <Form.Item name="description" label="描述">
              <Input placeholder="请输入描述" style={{ width: 300 }} />
            </Form.Item>
          </Form>
        </div>

        <Divider />

        <div style={{ marginBottom: 16, flexShrink: 0 }}>
          <Space>
            <Button
              type="primary"
              disabled={drawingMode}
              onClick={startDrawing}
            >
              {drawingMode ? "绘制中..." : "开始绘制"}
            </Button>
            <Button
              onClick={finishDrawing}
              disabled={!drawingMode || markers.length < 3}
            >
              完成绘制
            </Button>
            <Button onClick={clearDrawing}>清除</Button>
            <span style={{ color: "#666" }}>
              已绘制 {markers.length} 个点
              {drawingMode && " - 请在地图上点击添加顶点"}
            </span>
          </Space>
        </div>

        <div className="flex-1 h-[80%]">
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
              center: { lat: 40.0404, lng: 116.2735 },
              zoom: 15,
              showControl: true,
            }}
            onMapInited={onMapInited}
            styles={styles}
            onClick={clickHandler}
          >
            <MultiMarker
              ref={markerRef}
              styles={styles}
              geometries={markers}
              // onClick={clickHandler}
            />
            {/* 绘制多边形围栏 */}
            {polygon && polygon.length >= 3 && geometries.length >= 1 && (
              <MultiPolygon
                styles={styles}
                ref={polygonRef}
                geometries={geometries}
              />
            )}
          </BaseMap>
        </div>
      </div>
    </Modal>
  );
};

export default CreateModal;

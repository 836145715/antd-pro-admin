// 判断设备是否离线（根据最后在线时间超过5分钟）
export const isOffline = (onlineUpdateTime?: string): boolean => {
    if (!onlineUpdateTime) return true;
    const updateTime = new Date(onlineUpdateTime).getTime();
    const now = Date.now();
    // 离线判定时间 毫秒
    return now - updateTime > 10 * 1000;
};





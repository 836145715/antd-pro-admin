declare namespace API {
  type areaDelParams = {
    id: number;
  };

  type areaGetParams = {
    id: number;
  };

  type AssignUserRoleReqDto = {
    /** 用户ID */
    userId?: number;
    /** 角色ID列表 */
    roleIds?: number[];
  };

  type AuthorizeRoleReqDto = {
    /** 角色ID */
    roleId?: number;
    /** 路由ID列表 */
    menuIds?: string[];
  };

  type bindDistributorParams = {
    memberId: number;
    distributorId: number;
  };

  type Coupon = {
    /** 主键ID */
    id?: number;
    /** 优惠券名称 */
    name?: string;
    /** 运营商ID */
    distributorId?: number;
    /** 运营商名称 */
    distributorName?: string;
    /** 创建时间 */
    insertTime?: string;
    /** 优惠券类型 1抵扣时长券 2时长卡 */
    type?: string;
    /** 说明 */
    description?: string;
    /** 价格 */
    price?: number;
    /** 单次抵扣时长(分钟) */
    freeDuration?: number;
    /** 抵扣价格(元) */
    freeAmount?: number;
    /** 有效时长(天) */
    effectiveDuration?: number;
  };

  type couponDelParams = {
    id: number;
  };

  type couponGetParams = {
    id: number;
  };

  type CouponQueryDto = {
    /** 页码 */
    pageNum?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 优惠券名称 */
    name?: string;
    /** 运营商ID */
    distributorId?: number;
    /** 优惠券类型 1抵扣时长券 2时长卡 */
    type?: string;
  };

  type Datadict = {
    id?: string;
    /** 分类 */
    category?: string;
    name?: string;
    remarks?: string;
    createUser?: string;
    createTime?: string;
    items?: DatadictItem[];
  };

  type DatadictItem = {
    id?: string;
    did?: string;
    k?: string;
    v?: string;
    location?: number;
    createUser?: string;
    createTime?: string;
    /** 备注 */
    remark?: string;
  };

  type DatadictItemQueryDto = {
    /** 页码 */
    pageNum?: number;
    /** 每页数量 */
    pageSize?: number;
    /** ID */
    id?: string;
    /** 字典ID */
    did?: string;
    /** 键 */
    k?: string;
    /** 值 */
    v?: string;
  };

  type DatadictQueryDto = {
    /** 页码 */
    pageNum?: number;
    /** 每页数量 */
    pageSize?: number;
    /** ID */
    id?: string;
    /** 分类 */
    category?: string;
    /** 名称 */
    name?: string;
  };

  type deviceDelParams = {
    id: number;
  };

  type deviceGetByImeiParams = {
    imei: string;
  };

  type deviceGetLocationParams = {
    imei: string;
  };

  type deviceGetParams = {
    id: number;
  };

  type deviceUpdateStatusParams = {
    id: number;
    status: number;
  };

  type dictDelParams = {
    id: string;
  };

  type dictGetByCategoryParams = {
    category: string;
  };

  type dictGetParams = {
    id: string;
  };

  type dictGetWithItemsParams = {
    id: string;
  };

  type dictItemDelParams = {
    id: string;
  };

  type dictItemGetParams = {
    id: string;
  };

  type dictItemListByDictIdParams = {
    dictId: string;
  };

  type Distributor = {
    /** id */
    id?: number;
    /** 运营商名字 */
    name?: string;
    /** 地址 */
    address?: string;
    /** 负责人 */
    chargePerson?: string;
    /** 手机号 */
    mobile?: string;
    /** 注册时间 */
    insertTime?: string;
    /** 类型 */
    type?: number;
    /** 运营商状态 */
    status?: number;
    /** 审核人 */
    approver?: string;
    /** 审核时间 */
    approveTime?: string;
    /** 用户id */
    userId?: number;
    /** 用户名 */
    userName?: string;
    /** 上级经销商id */
    parentId?: number;
    /** 上级经销商名称 */
    parentName?: string;
    /** 收益比例 */
    earningsRatio?: number;
    /** 分红比例 */
    dividendRatio?: number;
    /** 登陆名 */
    loginName?: string;
    /** 运营商类型：1自行车，2电动车，3蓝牙车 */
    bicycleType?: number;
    /** 是否运营 0 否 1 是 */
    isoperation?: number;
    /** 是否开启免密 0 否 1 是 */
    issecretfree?: number;
  };

  type DistributorAccount = {
    /** id */
    id?: number;
    /** 支付宝账户 */
    aliPay?: string;
    /** 微信账户 */
    weixinPay?: string;
    /** 手机号 */
    mobile?: string;
    /** 银行卡号 */
    bankAccount?: string;
    /** 银行类别 */
    bankType?: string;
    /** 账户描述 */
    accountDescription?: string;
    /** 邮件 */
    email?: string;
    /** 收益 */
    income?: number;
    /** 是否可用 */
    isValid?: number;
    /** 运营商id */
    distributorId?: number;
    /** 运营商 */
    distributor?: string;
    /** 微信商户id */
    wxMchAppid?: string;
    /** 微信openid */
    openid?: string;
    /** 真实姓名 */
    realName?: string;
    /** 备注 */
    notes?: string;
    /** 支付宝转款名称 */
    payName?: string;
    /** 支付宝转款账户 */
    payAccount?: string;
    /** 支付转转款备注 */
    payRemark?: string;
  };

  type distributorAccountParams = {
    distributorId: number;
  };

  type distributorGetParams = {
    id: number;
  };

  type DistributorQueryDto = {
    /** 页码 */
    pageNum?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 关键词（名称/负责人/手机号/登录名） */
    keyword?: string;
    /** 运营商状态 */
    status?: number;
    /** 类型 */
    type?: number;
    /** 运营商类型：1自行车，2电动车，3蓝牙车 */
    bicycleType?: number;
    /** 父级运营商ID */
    parentId?: number;
    /** 是否运营 0否 1是 */
    isoperation?: number;
  };

  type DistributorSetting = {
    /** id */
    id?: number;
    /** 扫码提示状态 */
    sweepCodeStatus?: number;
    /** 扫码提示说明 */
    sweepCodeTip?: string;
    /** 预充值 */
    precharge?: number;
    /** 运营商id */
    distributorId?: number;
    /** 运营商 */
    distributor?: string;
    /** 分钟数 */
    minute?: number;
    /** 每分钟金额 */
    minuteFee?: number;
    /** 超出的分钟段 */
    overMinute?: number;
    /** 超出指定分钟金额 */
    overminuteFee?: number;
    /** 最后每增加 */
    lastMinute?: number;
    /** 最后每增加费用 */
    lastMinuteFee?: number;
    /** 允许调度 */
    allowDispatch?: number;
    /** 调度费 */
    dispatchingFee?: number;
    /** 是否开启通知 0关闭 1开启 */
    isannounce?: number;
    /** 通知标题 */
    announceTitle?: string;
    /** 通知内容 */
    announceContent?: string;
    /** 手机号 */
    mobile?: string;
    /** 易宝支付开关 0-关闭 1-开启 */
    ebpayStatus?: number;
    /** 银联支付开关 0-关闭 1-开启 */
    umspayStatus?: number;
  };

  type distributorSettingParams = {
    distributorId: number;
  };

  type DistributorStatusReqDto = {
    /** 运营商ID */
    id?: number;
    /** 目标状态 */
    status?: number;
    /** 审批人 */
    approver?: string;
  };

  type DistributorWithdrawal = {
    /** id */
    id?: number;
    /** 账户id */
    accountId?: number;
    /** 申请提现时间 */
    applyTime?: string;
    /** 提现金额 */
    applyNum?: number;
    /** 账户类型 1平台 2二级运营商 3三级运营商 */
    accountType?: number;
    /** 账号 */
    account?: string;
    /**  手机号 */
    mobile?: string;
    /** 0为申请，1为同意，2为不同意,3为到账成功，4为到账失败 */
    status?: number;
    /** 审批时间 */
    approveTime?: string;
    /** 订单号 */
    flowNumber?: string;
    /** 确认时间，为支付系统确认支付的时间 */
    confirmTime?: string;
    /** 账户实名 */
    payeeRealName?: string;
    /** 运营商id */
    distributorId?: number;
    /** 运营商 */
    distributor?: string;
    /** 上级运营商id */
    parentId?: number;
    /** 上级运营商 */
    parentName?: string;
    /** 支付类型 */
    payType?: number;
    /** 备注 */
    remark?: string;
  };

  type DistributorWithdrawalAuditReqDto = {
    /** 提现记录ID */
    id?: number;
    /** 审核状态 1同意 2不同意 */
    status?: number;
    /** 审核备注 */
    remark?: string;
  };

  type DistributorWithdrawalConfirmReqDto = {
    /** 提现记录ID */
    id?: number;
    /** 是否打款成功 */
    success?: boolean;
    /** 流水号 */
    flowNumber?: string;
    /** 备注 */
    remark?: string;
  };

  type DistributorWithdrawalQueryDto = {
    /** 页码 */
    pageNum?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 运营商ID */
    distributorId?: number;
    /** 上级运营商ID */
    parentId?: number;
    /** 账户类型 */
    accountType?: number;
    /** 提现状态 */
    status?: number;
    /** 手机号 */
    mobile?: string;
    /** 开始时间 */
    startTime?: string;
    /** 结束时间 */
    endTime?: string;
  };

  type ElectronicFence = {
    id?: number;
    /** 名称 */
    name?: string;
    /** 描述 */
    description?: string;
    /** 插入时间 */
    insertTime?: string;
    /** 区域，含多组数据，以分号(;)分割,经纬度以逗号(,)分割 */
    area?: string;
    /** 运营商id */
    distributorId?: number;
    /** 运营商名称 */
    distributorName?: string;
    /** 电子围栏中心点 */
    centerPoint?: string;
    /** 状态 0失效  1有效 */
    status?: number;
  };

  type ElectronicFenceQueryDto = {
    /** 页码 */
    pageNum?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 围栏名称 */
    name?: string;
    /** 运营商ID */
    distributorId?: number;
    /** 状态 0失效 1有效 */
    status?: number;
  };

  type fenceActivateParams = {
    id: number;
  };

  type fenceCheckPointParams = {
    fenceId: number;
    longitude: number;
    latitude: number;
  };

  type fenceDeactivateParams = {
    id: number;
  };

  type fenceDelParams = {
    id: number;
  };

  type fenceGetParams = {
    id: number;
  };

  type handleRepairParams = {
    id: number;
  };

  type LockDevice = {
    id?: number;
    /** imei号 */
    imei?: string;
    /** sim卡号 */
    sim?: string;
    /** 经度 */
    longitude?: number;
    /** 纬度 */
    latitude?: number;
    /** 电量 */
    mainElectricity?: number;
    /** 锁编号 */
    qrNumber?: string;
    /** 设备状态 1 开锁 2 关锁 */
    status?: number;
    /** 定位模式,1 基站定位 2 GPS定位 3 手机定位 */
    positionMode?: number;
    /** 最后开锁时间 */
    latestUnlockTime?: string;
    /** 最后关锁时间 */
    latestLockTime?: string;
    /** gsm数据更新时间 */
    gsmUpdateTime?: string;
    /** 最后在线时间 */
    onlineUpdateTime?: string;
    /** 端口 */
    port?: string;
    /** 运营商 */
    distributorId?: number;
    /** 运营商名称 */
    distributorName?: string;
    /** 硬件版本 */
    contractVersion?: string;
    /** 车类型：1.自行车，2.电动车3.蓝牙车 */
    bicycleType?: number;
    lockStatus?: number;
  };

  type LockDeviceQueryDto = {
    /** 页码 */
    pageNum?: number;
    /** 每页数量 */
    pageSize?: number;
    /** IMEI号 */
    imei?: string;
    /** SIM卡号 */
    sim?: string;
    /** 锁编号 */
    qrNumber?: string;
    /** 设备状态 1 开锁 2 关锁 */
    status?: number;
    /** 运营商ID */
    distributorId?: number;
    /** 车类型 1自行车 2电动车 3蓝牙车 */
    bicycleType?: number;
    /** 锁状态 */
    lockStatus?: number;
  };

  type LoginInfoDto = {
    /** 用户ID */
    userId?: number;
    /** 用户名称 */
    username?: string;
    /** 昵称 */
    nickName?: string;
    /** 手机号 */
    phone?: string;
    /** 角色ID列表 */
    roleIds?: number[];
    /** 角色名称列表 */
    roleNames?: string[];
    /** 权限列表 */
    perms?: string[];
    /** 登录token */
    loginToken?: string;
  };

  type LoginRecord = {
    /** 主键ID */
    id?: number;
    /** 用户ID */
    userId?: number;
    /** 操作系统 */
    osName?: string;
    /** 设备名 */
    device?: string;
    /** 浏览器类型 */
    browserType?: string;
    /** IP地址 */
    ipAddress?: string;
    /** 登录时间 */
    createTime?: string;
    /** 用户账号 */
    username?: string;
    /** 用户昵称 */
    nickName?: string;
  };

  type loginRecordGetParams = {
    id: number;
  };

  type LoginRecordQueryDto = {
    /** 页码 */
    pageNum?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 用户账号 */
    account?: string;
    /** 开始日期 (yyyy-MM-dd) */
    startDate?: string;
    /** 结束日期 (yyyy-MM-dd) */
    endDate?: string;
  };

  type LoginReqDto = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
  };

  type MemberCoupon = {
    /** 主键ID */
    id?: number;
    /** 会员ID */
    memberId?: number;
    /** 状态 0失效 1有效 */
    status?: number;
    /** 购买日期 */
    insertTime?: string;
    /** 优惠券ID */
    couponId?: number;
    /** 运营商ID */
    distributorId?: number;
    /** 运营商名称 */
    distributorName?: string;
    /** 优惠券名称 */
    couponName?: string;
    /** 优惠券类型 1抵扣时长券 2时长卡 */
    couponType?: string;
    /** 说明 */
    couponDesc?: string;
    /** 价格 */
    couponPrice?: number;
    /** 单次抵扣时长(分钟) */
    freeDuration?: number;
    /** 抵扣价格(元) */
    freeAmount?: number;
    /** 有效时长(天) */
    effectiveDuration?: number;
    /** 手机号 */
    mobile?: string;
    /** 交易号 */
    tradeNo?: string;
  };

  type memberCouponGetParams = {
    id: number;
  };

  type MemberCouponQueryDto = {
    /** 页码 */
    pageNum?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 会员ID */
    memberId?: number;
    /** 状态 0失效 1有效 */
    status?: number;
    /** 运营商ID */
    distributorId?: number;
    /** 手机号 */
    mobile?: string;
  };

  type memberGetParams = {
    id: number;
  };

  type MemberInfo = {
    /** 主键ID */
    id?: number;
    /** 姓名 */
    name?: string;
    /** 手机号 */
    mobile?: string;
    /** 余额 */
    balance?: number;
    /** 状态 1正常 2骑行中 0已拉黑 */
    status?: number;
    /** 登录标识 1:微信登录 2:支付宝登录 */
    loginFlag?: number;
    /** 支付宝openid */
    aliOpenId?: string;
    /** 骑乘次数 */
    tripCount?: number;
    /** 总消费 */
    totalFee?: number;
    /** 微信缓存key */
    sessionkey?: string;
    /** 运维标识 0否 1是 */
    isMaintain?: number;
    /** 运营商ID */
    distributorId?: number;
    /** 运营商名称 */
    distributorName?: string;
    /** 支付后想开的锁 */
    lastWantLock?: string;
    /** 免密参数 */
    authorizationCode?: string;
    /** 微信openid */
    wxOpenId?: string;
    /** 公众号openid */
    gzhOpenId?: string;
    /** 微信unionId */
    unionId?: string;
    /** 是否关注公众号 0否 1是 */
    isSubscribe?: number;
    /** 注册时间 */
    insertTime?: string;
  };

  type MemberInfoQueryDto = {
    /** 页码 */
    pageNum?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 姓名 */
    name?: string;
    /** 手机号 */
    mobile?: string;
    /** 状态 1正常 2骑行中 0已拉黑 */
    status?: number;
    /** 运营商ID */
    distributorId?: number;
    /** 运维标识 0否 1是 */
    isMaintain?: number;
  };

  type MemberRidingOrder = {
    id?: number;
    /** 会员Id */
    memberId?: number;
    /** 预充值金额 */
    preMoney?: number;
    /** 消费金额 */
    costAmount?: number;
    /** 需支付金额 */
    needAmount?: number;
    /** 添加时间 */
    insertTime?: string;
    /** 备注 */
    remark?: string;
    /** 商户订单号 */
    tradeNo?: string;
    /** 商户返回交易单号 */
    transactionId?: string;
    /** 通知时间 */
    notifyTime?: string;
    /** 是否付款 */
    hasPaid?: number;
    /** 1 预充值 2 免密支付 3 超额主动支付 */
    rechargeType?: number;
    /** 手机号 */
    mobile?: string;
    /** 运营商id */
    distributorId?: number;
    /** 运营商名称 */
    distributor?: string;
    /** 行程开始时间 */
    startTime?: string;
    /** 行程结束时间 */
    endTime?: string;
    /** 骑行时长 */
    tripTimespan?: number;
    /** 1 自行车 2 电动车 */
    lockType?: number;
    /** 锁编号 */
    qrNumber?: string;
    /** 行程id */
    tripId?: number;
    /** 免密扣款次数 */
    count?: number;
    bicycleNumber?: string;
  };

  type MemberRidingOrderQueryDto = {
    /** 页码 */
    pageNum?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 会员ID */
    memberId?: number;
    /** 是否付款 0未付款 1已付款 */
    hasPaid?: number;
    /** 支付类型 1 预充值 2 免密支付 3 超额主动支付 */
    rechargeType?: number;
    /** 运营商ID */
    distributorId?: number;
    /** 锁编号 */
    qrNumber?: string;
    /** 行程ID */
    tripId?: number;
    /** 手机号 */
    mobile?: string;
    /** 商户订单号 */
    tradeNo?: string;
    /** 商户返回交易单号 */
    transactionId?: string;
    /** 1 自行车 2 电动车 */
    lockType?: number;
    /** 添加时间起 */
    insertTimeStart?: string;
    /** 添加时间止 */
    insertTimeEnd?: string;
    /** 行程开始时间起 */
    startTimeStart?: string;
    /** 行程开始时间止 */
    startTimeEnd?: string;
    /** 行程结束时间起 */
    endTimeStart?: string;
    /** 行程结束时间止 */
    endTimeEnd?: string;
  };

  type Menu = {
    id?: string;
    /** 路由名称 */
    name?: string;
    /** 路径 */
    path?: string;
    /** 路由权限 */
    per?: string;
    /** 排序 */
    orderNum?: number;
    /** 图标 */
    icon?: string;
    /** 父路由ID */
    parentid?: string;
    /** 路由类型 0:目录 1:菜单 2:按钮 3:隐藏菜单 */
    type?: number;
    /** 子路由，数据库不存在 */
    children?: Menu[];
  };

  type menuDelParams = {
    id: string;
  };

  type NearbyBikeQueryDto = {
    /** 经度 */
    longitude: number;
    /** 纬度 */
    latitude: number;
    /** 搜索距离，单位：公里，默认1km */
    distance?: number;
    /** 车类型 1自行车 2电动车 3蓝牙车 */
    bicycleType?: number;
    /** 设备状态 1开锁 2关锁 */
    status?: number;
  };

  type OperatingArea = {
    /** 主键ID */
    id?: number;
    /** 名称 */
    name?: string;
    /** 描述 */
    description?: string;
    /** 插入时间 */
    insertTime?: string;
    /** 区域坐标，多组数据以分号(;)分隔，经纬度以逗号(,)分隔 */
    area?: string;
    /** 运营商ID */
    distributorId?: number;
    /** 运营商名称 */
    distributorName?: string;
    /** 区域中心点 */
    centerPoint?: string;
    /** 状态 */
    status?: number;
  };

  type OperatingAreaQueryDto = {
    /** 页码 */
    pageNum?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 名称 */
    name?: string;
    /** 运营商ID */
    distributorId?: number;
    /** 状态 */
    status?: number;
  };

  type PageInfoCoupon = {
    list?: Coupon[];
    total?: string;
    current?: string;
    size?: string;
    pages?: string;
    timestamp?: string;
    first?: boolean;
    last?: boolean;
  };

  type PageInfoDatadict = {
    list?: Datadict[];
    total?: string;
    current?: string;
    size?: string;
    pages?: string;
    timestamp?: string;
    first?: boolean;
    last?: boolean;
  };

  type PageInfoDatadictItem = {
    list?: DatadictItem[];
    total?: string;
    current?: string;
    size?: string;
    pages?: string;
    timestamp?: string;
    first?: boolean;
    last?: boolean;
  };

  type PageInfoDistributor = {
    list?: Distributor[];
    total?: string;
    current?: string;
    size?: string;
    pages?: string;
    timestamp?: string;
    first?: boolean;
    last?: boolean;
  };

  type PageInfoDistributorWithdrawal = {
    list?: DistributorWithdrawal[];
    total?: string;
    current?: string;
    size?: string;
    pages?: string;
    timestamp?: string;
    first?: boolean;
    last?: boolean;
  };

  type PageInfoElectronicFence = {
    list?: ElectronicFence[];
    total?: string;
    current?: string;
    size?: string;
    pages?: string;
    timestamp?: string;
    first?: boolean;
    last?: boolean;
  };

  type PageInfoLockDevice = {
    list?: LockDevice[];
    total?: string;
    current?: string;
    size?: string;
    pages?: string;
    timestamp?: string;
    first?: boolean;
    last?: boolean;
  };

  type PageInfoLoginRecord = {
    list?: LoginRecord[];
    total?: string;
    current?: string;
    size?: string;
    pages?: string;
    timestamp?: string;
    first?: boolean;
    last?: boolean;
  };

  type PageInfoMemberCoupon = {
    list?: MemberCoupon[];
    total?: string;
    current?: string;
    size?: string;
    pages?: string;
    timestamp?: string;
    first?: boolean;
    last?: boolean;
  };

  type PageInfoMemberInfo = {
    list?: MemberInfo[];
    total?: string;
    current?: string;
    size?: string;
    pages?: string;
    timestamp?: string;
    first?: boolean;
    last?: boolean;
  };

  type PageInfoMemberRidingOrder = {
    list?: MemberRidingOrder[];
    total?: string;
    current?: string;
    size?: string;
    pages?: string;
    timestamp?: string;
    first?: boolean;
    last?: boolean;
  };

  type PageInfoOperatingArea = {
    list?: OperatingArea[];
    total?: string;
    current?: string;
    size?: string;
    pages?: string;
    timestamp?: string;
    first?: boolean;
    last?: boolean;
  };

  type PageInfoRepairRecord = {
    list?: RepairRecord[];
    total?: string;
    current?: string;
    size?: string;
    pages?: string;
    timestamp?: string;
    first?: boolean;
    last?: boolean;
  };

  type PageInfoTrip = {
    list?: Trip[];
    total?: string;
    current?: string;
    size?: string;
    pages?: string;
    timestamp?: string;
    first?: boolean;
    last?: boolean;
  };

  type PageInfoTripCommand = {
    list?: TripCommand[];
    total?: string;
    current?: string;
    size?: string;
    pages?: string;
    timestamp?: string;
    first?: boolean;
    last?: boolean;
  };

  type PageInfoUser = {
    list?: User[];
    total?: string;
    current?: string;
    size?: string;
    pages?: string;
    timestamp?: string;
    first?: boolean;
    last?: boolean;
  };

  type RBoolean = {
    code?: number;
    message?: string;
    data?: boolean;
    timestamp?: string;
    success?: boolean;
  };

  type RCoupon = {
    code?: number;
    message?: string;
    data?: Coupon;
    timestamp?: string;
    success?: boolean;
  };

  type RDatadict = {
    code?: number;
    message?: string;
    data?: Datadict;
    timestamp?: string;
    success?: boolean;
  };

  type RDatadictItem = {
    code?: number;
    message?: string;
    data?: DatadictItem;
    timestamp?: string;
    success?: boolean;
  };

  type RDistributor = {
    code?: number;
    message?: string;
    data?: Distributor;
    timestamp?: string;
    success?: boolean;
  };

  type RDistributorAccount = {
    code?: number;
    message?: string;
    data?: DistributorAccount;
    timestamp?: string;
    success?: boolean;
  };

  type RDistributorSetting = {
    code?: number;
    message?: string;
    data?: DistributorSetting;
    timestamp?: string;
    success?: boolean;
  };

  type RElectronicFence = {
    code?: number;
    message?: string;
    data?: ElectronicFence;
    timestamp?: string;
    success?: boolean;
  };

  type repairGetParams = {
    id: number;
  };

  type RepairRecord = {
    /** 主键ID */
    id?: number;
    /** 用户ID */
    memberId?: number;
    /** 用户名称 */
    memberName?: string;
    /** 图片地址 */
    picUrl?: string;
    /** 反馈信息 */
    feedback?: string;
    /** 添加时间 */
    insertTime?: string;
    /** 状态 0未解决 1已解决 */
    status?: number;
    /** 解决时间 */
    solveTime?: string;
    /** 是否有效 */
    isValid?: number;
    /** 车牌编号 */
    qrNumber?: string;
    /** 客服备注 */
    csRemark?: string;
    /** 姓名 */
    realName?: string;
    /** 手机号 */
    mobile?: string;
    /** 运营商ID */
    distributorId?: number;
    /** 运营商名称 */
    distributorName?: string;
    /** 报修部位 */
    repairParts?: string;
  };

  type RepairRecordQueryDto = {
    /** 页码 */
    pageNum?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 状态 0未解决 1已解决 */
    status?: number;
    /** 车牌编号 */
    qrNumber?: string;
    /** 运营商ID */
    distributorId?: number;
    /** 手机号 */
    mobile?: string;
  };

  type ridingOrderDelParams = {
    id: number;
  };

  type ridingOrderGetByTripIdParams = {
    tripId: number;
  };

  type ridingOrderGetParams = {
    id: number;
  };

  type ridingOrderListByMemberIdParams = {
    memberId: number;
  };

  type ridingOrderListUnpaidByMemberIdParams = {
    memberId: number;
  };

  type RListDatadictItem = {
    code?: number;
    message?: string;
    data?: DatadictItem[];
    timestamp?: string;
    success?: boolean;
  };

  type RListElectronicFence = {
    code?: number;
    message?: string;
    data?: ElectronicFence[];
    timestamp?: string;
    success?: boolean;
  };

  type RListInteger = {
    code?: number;
    message?: string;
    data?: number[];
    timestamp?: string;
    success?: boolean;
  };

  type RListLockDevice = {
    code?: number;
    message?: string;
    data?: LockDevice[];
    timestamp?: string;
    success?: boolean;
  };

  type RListMemberRidingOrder = {
    code?: number;
    message?: string;
    data?: MemberRidingOrder[];
    timestamp?: string;
    success?: boolean;
  };

  type RListMenu = {
    code?: number;
    message?: string;
    data?: Menu[];
    timestamp?: string;
    success?: boolean;
  };

  type RListOperatingArea = {
    code?: number;
    message?: string;
    data?: OperatingArea[];
    timestamp?: string;
    success?: boolean;
  };

  type RListRole = {
    code?: number;
    message?: string;
    data?: Role[];
    timestamp?: string;
    success?: boolean;
  };

  type RListString = {
    code?: number;
    message?: string;
    data?: string[];
    timestamp?: string;
    success?: boolean;
  };

  type RListTrip = {
    code?: number;
    message?: string;
    data?: Trip[];
    timestamp?: string;
    success?: boolean;
  };

  type RListTripCommand = {
    code?: number;
    message?: string;
    data?: TripCommand[];
    timestamp?: string;
    success?: boolean;
  };

  type RLockDevice = {
    code?: number;
    message?: string;
    data?: LockDevice;
    timestamp?: string;
    success?: boolean;
  };

  type RLoginInfoDto = {
    code?: number;
    message?: string;
    data?: LoginInfoDto;
    timestamp?: string;
    success?: boolean;
  };

  type RLoginRecord = {
    code?: number;
    message?: string;
    data?: LoginRecord;
    timestamp?: string;
    success?: boolean;
  };

  type RMemberCoupon = {
    code?: number;
    message?: string;
    data?: MemberCoupon;
    timestamp?: string;
    success?: boolean;
  };

  type RMemberInfo = {
    code?: number;
    message?: string;
    data?: MemberInfo;
    timestamp?: string;
    success?: boolean;
  };

  type RMemberRidingOrder = {
    code?: number;
    message?: string;
    data?: MemberRidingOrder;
    timestamp?: string;
    success?: boolean;
  };

  type Role = {
    /** 角色id */
    roleId?: number;
    /** 角色名称 */
    roleName?: string;
    /** 备注 */
    comments?: string;
    /** 是否删除，0否，1是 */
    isDelete?: number;
    /** 创建时间 */
    createTime?: string;
    /** 修改时间 */
    updateTime?: string;
  };

  type roleDelParams = {
    id: number;
  };

  type roleGetMenusParams = {
    roleId: number;
  };

  type ROperatingArea = {
    code?: number;
    message?: string;
    data?: OperatingArea;
    timestamp?: string;
    success?: boolean;
  };

  type RPageInfoCoupon = {
    code?: number;
    message?: string;
    data?: PageInfoCoupon;
    timestamp?: string;
    success?: boolean;
  };

  type RPageInfoDatadict = {
    code?: number;
    message?: string;
    data?: PageInfoDatadict;
    timestamp?: string;
    success?: boolean;
  };

  type RPageInfoDatadictItem = {
    code?: number;
    message?: string;
    data?: PageInfoDatadictItem;
    timestamp?: string;
    success?: boolean;
  };

  type RPageInfoDistributor = {
    code?: number;
    message?: string;
    data?: PageInfoDistributor;
    timestamp?: string;
    success?: boolean;
  };

  type RPageInfoDistributorWithdrawal = {
    code?: number;
    message?: string;
    data?: PageInfoDistributorWithdrawal;
    timestamp?: string;
    success?: boolean;
  };

  type RPageInfoElectronicFence = {
    code?: number;
    message?: string;
    data?: PageInfoElectronicFence;
    timestamp?: string;
    success?: boolean;
  };

  type RPageInfoLockDevice = {
    code?: number;
    message?: string;
    data?: PageInfoLockDevice;
    timestamp?: string;
    success?: boolean;
  };

  type RPageInfoLoginRecord = {
    code?: number;
    message?: string;
    data?: PageInfoLoginRecord;
    timestamp?: string;
    success?: boolean;
  };

  type RPageInfoMemberCoupon = {
    code?: number;
    message?: string;
    data?: PageInfoMemberCoupon;
    timestamp?: string;
    success?: boolean;
  };

  type RPageInfoMemberInfo = {
    code?: number;
    message?: string;
    data?: PageInfoMemberInfo;
    timestamp?: string;
    success?: boolean;
  };

  type RPageInfoMemberRidingOrder = {
    code?: number;
    message?: string;
    data?: PageInfoMemberRidingOrder;
    timestamp?: string;
    success?: boolean;
  };

  type RPageInfoOperatingArea = {
    code?: number;
    message?: string;
    data?: PageInfoOperatingArea;
    timestamp?: string;
    success?: boolean;
  };

  type RPageInfoRepairRecord = {
    code?: number;
    message?: string;
    data?: PageInfoRepairRecord;
    timestamp?: string;
    success?: boolean;
  };

  type RPageInfoTrip = {
    code?: number;
    message?: string;
    data?: PageInfoTrip;
    timestamp?: string;
    success?: boolean;
  };

  type RPageInfoTripCommand = {
    code?: number;
    message?: string;
    data?: PageInfoTripCommand;
    timestamp?: string;
    success?: boolean;
  };

  type RPageInfoUser = {
    code?: number;
    message?: string;
    data?: PageInfoUser;
    timestamp?: string;
    success?: boolean;
  };

  type RRepairRecord = {
    code?: number;
    message?: string;
    data?: RepairRecord;
    timestamp?: string;
    success?: boolean;
  };

  type RTrip = {
    code?: number;
    message?: string;
    data?: Trip;
    timestamp?: string;
    success?: boolean;
  };

  type RTripCommand = {
    code?: number;
    message?: string;
    data?: TripCommand;
    timestamp?: string;
    success?: boolean;
  };

  type RUser = {
    code?: number;
    message?: string;
    data?: User;
    timestamp?: string;
    success?: boolean;
  };

  type RVoid = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
    timestamp?: string;
    success?: boolean;
  };

  type toBlackParams = {
    id: number;
    type: number;
  };

  type toOperationsParams = {
    id: number;
    type: number;
  };

  type Trip = {
    id?: number;
    /**  设备Id */
    deviceId?: number;
    /** 自行车编号 */
    qrNumber?: string;
    /** 开始时间 */
    startTime?: string;
    /** 结束时间 */
    endTime?: string;
    /** 用户Id */
    memberId?: number;
    /**  骑行时长 */
    tripTimespan?: number;
    /** 开锁地址 */
    openAddress?: string;
    /** 关锁地址 */
    lockAddress?: string;
    /**  骑行状态 1. 进行中 2. 已结束 */
    tripStatus?: number;
    /** 骑行费用 */
    tripFee?: number;
    /** 用户手机号 */
    mobile?: string;
    /** 是否是强制结束 */
    isCoercion?: number;
    /** 运营商id */
    distributorId?: number;
    /** 运营商名称 */
    distributorName?: string;
    /** 车类型:1.自行车2.电动车3.蓝牙车 */
    bicycleType?: number;
    /** 调度费 */
    dispatchingFee?: number;
  };

  type TripCommand = {
    id?: number;
    /** 用户id */
    memberId?: number;
    /** 锁编号 */
    qrNumber?: string;
    /** 锁imei */
    imei?: string;
    /** 处理时间 */
    executeTime?: string;
    /** 是否处理 */
    hasExecuted?: number;
    /** 备注 */
    remark?: string;
    /** 1开锁2关锁3重启4升级5ip设置6定位信息获取7找车 */
    type?: number;
    /** 设置ip0、IP
1、域名
设置语音
1、设置开锁成功时的语音
2、设置开锁失败时的语音
3、设置关锁成功时的语音
4、设置关锁失败时的语音
5、设置震动报警时的语音 */
    paramType?: number;
    /** 参数 */
    param?: string;
    /** 端口 */
    port?: number;
    /** 定位时间 */
    time?: number;
    /** 定位激活模式 
1 一直激活，根据设定开锁上传频率上传
0 激活时间内 上传3次，然后自动关闭（默认模式） */
    mode?: number;
    /** 车类型：1.自行车2.电动车3.蓝牙车 */
    bicycleType?: number;
    /** 是否为管理员开锁：1.是2.不是 */
    isMaintain?: number;
  };

  type tripCommandDelParams = {
    id: number;
  };

  type tripCommandGetParams = {
    id: number;
  };

  type TripCommandQueryDto = {
    /** 页码 */
    pageNum?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 用户id */
    memberId?: number;
    /** 锁编号 */
    qrNumber?: string;
    /** 锁imei */
    imei?: string;
    /** 是否处理 0未处理 1已处理 */
    hasExecuted?: number;
    /** 命令类型 1开锁 2关锁 3重启 4升级 5ip设置 6定位信息获取 7找车 */
    type?: number;
    /** 车类型：1.自行车 2.电动车 3.蓝牙车 */
    bicycleType?: number;
  };

  type tripDelParams = {
    id: number;
  };

  type tripGetParams = {
    id: number;
  };

  type tripListByMemberIdParams = {
    memberId: number;
  };

  type tripListByQrNumberParams = {
    qrNumber: string;
  };

  type TripQueryDto = {
    /** 页码 */
    pageNum?: number;
    /** 每页数量 */
    pageSize?: number;
    /** 设备ID */
    deviceId?: number;
    /** 自行车编号 */
    qrNumber?: string;
    /** 用户ID */
    memberId?: number;
    /** 骑行状态 1.进行中 2.已结束 */
    tripStatus?: number;
    /** 运营商ID */
    distributorId?: number;
    /** 车类型:1.自行车2.电动车3.蓝牙车 */
    bicycleType?: number;
    /** 开始时间起 */
    startTimeStart?: string;
    /** 开始时间止 */
    startTimeEnd?: string;
    /** 结束时间起 */
    endTimeStart?: string;
    /** 结束时间止 */
    endTimeEnd?: string;
    /** 用户手机号 */
    mobile?: string;
  };

  type unbindDistributorParams = {
    id: number;
  };

  type User = {
    /** 用户id */
    userId?: number;
    /** 账号 */
    username?: string;
    /** 密码 */
    password?: string;
    /** 昵称 */
    nickName?: string;
    /** 头像 */
    avatar?: string;
    /** 性别 */
    sex?: string;
    /** 手机号 */
    phone?: string;
    /** 邮箱 */
    email?: string;
    /** 邮箱是否验证,0未验证,1已验证 */
    emailVerified?: number;
    /** 真实姓名 */
    trueName?: string;
    /** 身份证号 */
    idCard?: string;
    /** 出生日期 */
    birthday?: string;
    /** 部门id */
    departmentId?: number;
    /** 状态，0正常，1冻结 */
    state?: number;
    /** 注册时间 */
    createTime?: string;
    /** 修改时间 */
    updateTime?: string;
    /** 角色ID组 */
    roleIds?: number[];
  };

  type userDelParams = {
    id: string;
  };

  type userGetParams = {
    id: string;
  };

  type userGetRolesParams = {
    userId: number;
  };

  type userLogoutParams = {
    userId: number;
  };

  type UserQueryDto = {
    /** 页码 */
    pageNum?: number;
    /** 每页数量 */
    pageSize?: number;
    /** Id */
    id?: number;
    /** 用户名 */
    username?: string;
    /** 手机号 */
    phone?: string;
  };

  type userResetPwdParams = {
    id: string;
  };
}

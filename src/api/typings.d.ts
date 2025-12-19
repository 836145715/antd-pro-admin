declare namespace API {
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
    name1?: string;
    account1?: string;
    ratio1?: number;
    remark1?: string;
    name2?: string;
    account2?: string;
    ratio2?: number;
    remark2?: string;
    name3?: string;
    account3?: string;
    ratio3?: number;
    remark3?: string;
    priName?: string;
    priMid?: string;
    priRatio?: number;
    thidrName1?: string;
    thidrMid1?: string;
    thirdRatio1?: number;
    thirdName2?: string;
    thirdMid2?: string;
    thirdRatio2?: number;
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

  type LoginReqDto = {
    /** 用户名 */
    username: string;
    /** 密码 */
    password: string;
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
    /** 路由类型 0:目录 1:菜单 2:按钮 */
    type?: number;
    /** 子路由，数据库不存在 */
    children?: Menu[];
  };

  type menuDelParams = {
    id: string;
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

  type RListMenu = {
    code?: number;
    message?: string;
    data?: Menu[];
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

  type RPageInfoUser = {
    code?: number;
    message?: string;
    data?: PageInfoUser;
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

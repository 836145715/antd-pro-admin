declare namespace API {
  type activateParams = {
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

  type checkPointInFenceParams = {
    fenceId: number;
    longitude: number;
    latitude: number;
  };

  type deactivateParams = {
    id: number;
  };

  type deleteMenuParams = {
    id: string;
  };

  type deleteRoleParams = {
    id: number;
  };

  type deleteUserParams = {
    id: string;
  };

  type deleteUsingGETParams = {
    id: number;
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

  type getByIdParams = {
    id: number;
  };

  type getRoleMenusParams = {
    roleId: number;
  };

  type getUserParams = {
    id: string;
  };

  type getUserRolesParams = {
    userId: number;
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

  type logoutParams = {
    userId: number;
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

  type PageInfoElectronicFence = {
    list?: ElectronicFence[];
    total?: string;
    current?: string;
    size?: string;
    pages?: string;
    timestamp?: string;
    last?: boolean;
    first?: boolean;
  };

  type PageInfoUser = {
    list?: User[];
    total?: string;
    current?: string;
    size?: string;
    pages?: string;
    timestamp?: string;
    last?: boolean;
    first?: boolean;
  };

  type RBoolean = {
    code?: number;
    message?: string;
    data?: boolean;
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

  type resetPwdParams = {
    id: string;
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

  type RPageInfoElectronicFence = {
    code?: number;
    message?: string;
    data?: PageInfoElectronicFence;
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
}

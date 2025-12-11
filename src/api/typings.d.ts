declare namespace API {
  type getParams = {
    key: string;
  };

  type MemberInfo = {
    id?: number;
    name?: string;
    mobile?: string;
    balance?: number;
    insertTime?: string;
    status?: number;
    loginFlag?: number;
    aliOpenId?: string;
    tripCount?: number;
    totalFee?: number;
    sessionkey?: string;
    isMaintain?: number;
    distributorId?: number;
    distributorName?: string;
    lastWantLock?: string;
    authorizationCode?: string;
    wxOpenId?: string;
    gzhOpenId?: string;
    unionId?: string;
    isSubscribe?: number;
  };

  type PageInfoMemberInfo = {
    list?: MemberInfo[];
    total?: string;
    current?: string;
    size?: string;
    pages?: string;
    timestamp?: string;
    last?: boolean;
    first?: boolean;
  };

  type pageMemberParams = {
    pageNum?: number;
    pageSize?: number;
  };

  type RBoolean = {
    code?: number;
    message?: string;
    data?: boolean;
    timestamp?: string;
  };

  type RListMemberInfo = {
    code?: number;
    message?: string;
    data?: MemberInfo[];
    timestamp?: string;
  };

  type RObject = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
    timestamp?: string;
  };

  type RPageInfoMemberInfo = {
    code?: number;
    message?: string;
    data?: PageInfoMemberInfo;
    timestamp?: string;
  };

  type RVoid = {
    code?: number;
    message?: string;
    data?: Record<string, any>;
    timestamp?: string;
  };

  type setParams = {
    key: string;
    value: string;
  };

  type test2Params = {
    name: string;
    age: number;
  };

  type TestReqDto = {
    name: string;
    age?: number;
  };
}

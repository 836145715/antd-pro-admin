// @ts-ignore
/* eslint-disable */
import request from "@/utils/request";

/** 查询运营商账户 GET /distributor/manage/account/get */
export async function distributorAccount(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.distributorAccountParams,
  options?: { [key: string]: any }
) {
  return request<API.RDistributorAccount>("/distributor/manage/account/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 保存运营商账户 POST /distributor/manage/account/save */
export async function distributorAccountSave(
  body: API.DistributorAccount,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/distributor/manage/account/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 根据ID查询运营商 GET /distributor/manage/get */
export async function distributorGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.distributorGetParams,
  options?: { [key: string]: any }
) {
  return request<API.RDistributor>("/distributor/manage/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 分页查询运营商 POST /distributor/manage/page */
export async function distributorPage(
  body: API.DistributorQueryDto,
  options?: { [key: string]: any }
) {
  return request<API.RPageInfoDistributor>("/distributor/manage/page", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 新增或编辑运营商 POST /distributor/manage/save */
export async function distributorSave(
  body: API.Distributor,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/distributor/manage/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 查询运营参数 GET /distributor/manage/setting/get */
export async function distributorSetting(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.distributorSettingParams,
  options?: { [key: string]: any }
) {
  return request<API.RDistributorSetting>("/distributor/manage/setting/get", {
    method: "GET",
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 保存运营参数 POST /distributor/manage/setting/save */
export async function distributorSettingSave(
  body: API.DistributorSetting,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/distributor/manage/setting/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 调整运营商状态 POST /distributor/manage/status */
export async function distributorStatus(
  body: API.DistributorStatusReqDto,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/distributor/manage/status", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 审核提现申请 POST /distributor/manage/withdrawal/audit */
export async function withdrawalAudit(
  body: API.DistributorWithdrawalAuditReqDto,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/distributor/manage/withdrawal/audit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 确认提现打款 POST /distributor/manage/withdrawal/confirm */
export async function withdrawalConfirm(
  body: API.DistributorWithdrawalConfirmReqDto,
  options?: { [key: string]: any }
) {
  return request<API.RVoid>("/distributor/manage/withdrawal/confirm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: body,
    ...(options || {}),
  });
}

/** 分页查询提现记录 POST /distributor/manage/withdrawal/page */
export async function withdrawalPage(
  body: API.DistributorWithdrawalQueryDto,
  options?: { [key: string]: any }
) {
  return request<API.RPageInfoDistributorWithdrawal>(
    "/distributor/manage/withdrawal/page",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

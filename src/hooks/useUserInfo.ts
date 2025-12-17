const loadUserInfo = (): API.LoginRspDto => {
    const userInfo = localStorage.getItem("userInfo");
    if(userInfo) {
        return JSON.parse(userInfo);
    }
    return {};
}

const saveUserInfo = (userInfo: API.LoginRspDto) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
}   

//清除所有cookies
const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");
  
    for (const cookie of cookies) {
      const eqPos = cookie.indexOf("=");
      const name = (eqPos > -1 ? cookie.substr(0, eqPos) : cookie).trim();
      document.cookie =
        name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;";
    }
  };

const clearUserInfo = () => {
    localStorage.removeItem("userInfo");
    deleteAllCookies();
}


export {loadUserInfo,saveUserInfo,clearUserInfo} ;
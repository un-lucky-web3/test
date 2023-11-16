
var languages = {
    rechargeTipLang: "最低充值0.01以太幣",
    youLang: "你",
    rechargeAmountValidationLang: "充值的數量至少為0.01以太幣",
    rechargeSuccessLang: "充值成功",
    rechargeFailureLang: "充值失敗",
    userNotExistLang: "用戶不存在",
    withdrawalSuccessLang: "提現成功",
    withdrawalFailureLang: "提現失敗",
    donateSuccessLang: "捐贈成功",
    donateFailureLang: "捐贈失敗",
    continueSuccessLang: "成功投入遊戲，並獲得了獎勵",
    continueFailureLang: "操作失敗",
    airdropSuccessLang: "領取成功",
    airdropFailureLang: "領取失敗",
    getUserInfoFailureLang: "獲得用戶信息失敗",
    dividendSuccessLang: "分紅成功",
    dividendFailureLang: "暫不符合分紅條件，請檢查股份或分紅時間",
    connectWalletLang: "請先連接錢包",
    installWalletLang: "請先安裝MetaMask或其他兼容的錢包",
    copySuccessLang: "複製成功",

    insufficientWalletBalanceLang: "錢包餘額不足",
    insufficientWithdrawalBalanceLang: "餘額不足以提現",
    insufficientGameBalanceLang: "餘額不足以繼續參與遊戲",
    dividendConditionsNotMetLang: "不滿足分紅條件",
    cannotInviteWithoutJoiningGameLang: "未加入遊戲無法邀請他人"
}

function getWord(key) {
    if (languages && languages[key]) {
        return languages[key];
    }

    return languages[key];
}
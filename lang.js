
var languages = {
    rechargeTipLang: "{{最低充值0.01以太坊}}",
    youLang: "{{你}}",
    rechargeAmountValidationLang: "{{充值的数量至少为0.01以太坊}}",
    rechargeSuccessLang: "{{充值成功}}",
    rechargeFailureLang: "{{充值失败}}",
    userNotExistLang: "{{用戶不存在}}",
    withdrawalSuccessLang: "{{提现成功}}",
    withdrawalFailureLang: "{{提现失败}}",
    donateSuccessLang: "{{捐赠成功}}",
    donateFailureLang: "{{捐赠失败}}",
    continueSuccessLang: "{{成功投入游戏，并获得了奖励}}",
    continueFailureLang: "{{操作失败}}",
    airdropSuccessLang: "{{领取成功}}",
    airdropFailureLang: "{{领取失败}}",
    getUserInfoFailureLang: "{{获得用户信息失败}}",
    dividendSuccessLang: "{{分红成功}}",
    dividendFailureLang: "{{暂不符合分红条件，请检查股份或分红时间}}",
    connectWalletLang: "{{请先连接钱包}}",
    installWalletLang: "{{请先安裝MetaMask或其他兼容的钱包}}",
    copySuccessLang: "{{复制成功}}",

    insufficientWalletBalanceLang: "{{钱包余额不足0.01以太坊}}",
    insufficientWithdrawalBalanceLang: "{{余额不足以提现}}",
    insufficientGameBalanceLang: "{{余额不足以继续参与游戏}}",
    dividendConditionsNotMetLang: "{{不满足分红条件}}",
    cannotInviteWithoutJoiningGameLang: "{{未加入游戏无法邀请他人}}"
}

function getWord(key) {
    if (languages && languages[key]) {
        return languages[key];
    }

    return languages[key];
}
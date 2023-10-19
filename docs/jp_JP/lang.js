
var languages = {
    rechargeTipLang: "最低チャージ0.01イーサリアム",
    youLang: "あなた",
    rechargeAmountValidationLang: "チャージ金額は少なくとも0.01イーサリアムである必要があります。",
    rechargeSuccessLang: "チャージ成功",
    rechargeFailureLang: "チャージ失敗",
    userNotExistLang: "ユーザーが存在しません",
    withdrawalSuccessLang: "引き出し成功",
    withdrawalFailureLang: "引き出し失敗",
    donateSuccessLang: "寄付成功",
    donateFailureLang: "寄付失敗",
    continueSuccessLang: "ゲームに正常に参加し、報酬を受け取りました",
    continueFailureLang: "操作に失敗しました",
    airdropSuccessLang: "受け取り成功",
    airdropFailureLang: "受け取り失敗",
    getUserInfoFailureLang: "ユーザー情報の取得に失敗しました",
    dividendSuccessLang: "配当成功",
    dividendFailureLang: "まだ配当条件を満たしていません。株式や配当の時間を確認してください。",
    connectWalletLang: "まずウォレットに接続してください",
    installWalletLang: "まずMetaMaskまたは他の互換性のあるウォレットをインストールしてください",
    copySuccessLang: "コピー成功",

    insufficientWalletBalanceLang: "ウォレットの残高は0.01イーサリアム以下です",
    insufficientWithdrawalBalanceLang: "引き出しに必要な残高が足りません",
    insufficientGameBalanceLang: "ゲームを続けるには残高が足りません",
    dividendConditionsNotMetLang: "配当条件に適合していません",
    cannotInviteWithoutJoiningGameLang: "ゲームに参加していないと他の人を招待できません"
}

function getWord(key) {
    if (languages && languages[key]) {
        return languages[key];
    }

    return languages[key];
}
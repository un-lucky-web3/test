
var languages = {
        rechargeTipLang: "Minimum Recharge of 0.01 Ethereum",
        youLang: "You",
        rechargeAmountValidationLang: "The recharge amount must be at least 0.01 Ethereum.",
        rechargeSuccessLang: "Recharge Successful",
        rechargeFailureLang: "Recharge Failed",
        userNotExistLang: "User Does Not Exist",
        withdrawalSuccessLang: "Withdrawal Successful",
        withdrawalFailureLang: "Withdrawal Failed",
        donateSuccessLang: "Donation Successful",
        donateFailureLang: "Donation Failed",
        continueSuccessLang: "Successfully entered the game and received rewards",
        continueFailureLang: "Operation Failed",
        airdropSuccessLang: "Claim Successful",
        airdropFailureLang: "Claim Failed",
        getUserInfoFailureLang: "Failed to Retrieve User Information",
        dividendSuccessLang: "Dividend Successful",
        dividendFailureLang: "Does not currently meet the dividend conditions, please check shares or dividend time",
        connectWalletLang: "Please Connect a Wallet First",
        installWalletLang: "Please Install MetaMask or Other Compatible Wallet First",
        copySuccessLang: "Copy Successful"

}

function getWord(key) {
    if (languages && languages[key]) {
        return languages[key];
    }

    return languages[key];
}
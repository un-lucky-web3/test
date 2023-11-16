
var languages = {
    rechargeTipLang: "Минимальное пополнение 0.01 Ethereum",
    youLang: "Вы",
    rechargeAmountValidationLang: "Минимальная сумма пополнения составляет не менее 0.01 Ethereum",
    rechargeSuccessLang: "Пополнение успешно",
    rechargeFailureLang: "Ошибка при пополнении",
    userNotExistLang: "Пользователь не существует",
    withdrawalSuccessLang: "Вывод средств успешен",
    withdrawalFailureLang: "Ошибка при выводе средств",
    donateSuccessLang: "Пожертвование успешно",
    donateFailureLang: "Ошибка при пожертвовании",
    continueSuccessLang: "Успешно зашёл в игру и получил награды",
    continueFailureLang: "операция не удалась",
    airdropSuccessLang: "Получение успешно",
    airdropFailureLang: "Ошибка при получении",
    getUserInfoFailureLang: "Ошибка получения информации о пользователе",
    dividendSuccessLang: "Дивиденды успешно выплачены",
    dividendFailureLang: "В данный момент вы не соответствуете условиям для получения дивидендов. Проверьте свою долю или время выплаты дивидендов.",
    connectWalletLang: "Пожалуйста, сначала подключитесь к кошельку",
    installWalletLang: "Пожалуйста, установите MetaMask или другой совместимый кошелек",
    copySuccessLang: "Копирование успешно",

    insufficientWalletBalanceLang: "Недостаточно средств на балансе кошелька",
    insufficientWithdrawalBalanceLang: "Недостаточно средств для вывода",
    insufficientGameBalanceLang: "Недостаточно средств для продолжения игры",
    dividendConditionsNotMetLang: "Не удовлетворяют условиям дивидендов",
    cannotInviteWithoutJoiningGameLang: "Невозможно пригласить других, не присоединившись к игре"
}

function getWord(key) {
    if (languages && languages[key]) {
        return languages[key];
    }

    return languages[key];
}
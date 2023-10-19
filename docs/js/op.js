// 全局变量
let contract;
const minRechargeAmount = new BigNumber(1e16);
const zeroAmount = new BigNumber(0);

global = {
    user: {}
};

async function checkBalance(account) {
    const balanceWei = await web3.eth.getBalance(account);
    const balance = new BigNumber(balanceWei);

    console.log(balance.toString());

    if (balance.comparedTo(minRechargeAmount) < 0) {
        disableButton("rechargeButton", getWord("insufficientWalletBalanceLang"));
    } else {
        enableButton("rechargeButton", recharge);
    }
}

function checkBalanceLoop() {
    web3.eth.getAccounts().then(accounts => {
        checkBalance(accounts[0]);
    });
}

function displayText(id, text) {
    if (text.then) {
        text.then(
            (t) => document.getElementById(id).innerText = t
        )
    } else document.getElementById(id).innerText = text
}

// 初始化应用
function initializeApp() {
    contract = new web3.eth.Contract(contractABI, contractAddress);
    getInfo();
    checkBalanceLoop();
    setInterval(() => {
        getInfo();
        checkBalanceLoop();
    }, 10000);
}

// 充值函数
function recharge() {
    const rechargeButton = document.getElementById("rechargeButton"); // 获取充值按钮
    let inviter = document.getElementById("inviter").value;
    const amountInEther = document.getElementById("rechargeAmount").value;

    if (!amountInEther || parseFloat(amountInEther) < 0.01) {
        alert(getWord('rechargeAmountValidationLang'));
        return;
    }
    const amountInWei = web3.utils.toWei(amountInEther, 'ether');
    if (!inviter) {
        inviter = '0x0000000000000000000000000000000000000000';
    }

    // 禁用充值按钮
    rechargeButton.style.visibility = 'hidden';

    web3.eth.getAccounts().then(accounts => {
        contract.methods.recharge(inviter).send({ from: accounts[0], value: amountInWei })
            .then(() => {
                alert(getWord('rechargeSuccessLang'));
            })
            .catch((error) => {
                alert(getWord('rechargeFailureLang') + ':' + error.message);
            })
            .finally(() => {
                // 充值完成后重新启用充值按钮
                rechargeButton.style.visibility = 'visible';
                rechargeButton.title = "";
                getInfo();
            });
    });
}

// 提现函数
function withdraw() {
    const withdrawButtons = document.getElementById("withdrawButton");
    withdrawButtons.style.visibility = 'hidden';
    web3.eth.getAccounts().then(accounts => {
        const fromAddress = accounts[0];

        // 先查询用户信息
        contract.methods.getUserInfo().call({ from: fromAddress })
            .then((user) => {
                // 检查用户是否存在
                if (!user.exist) {
                    return Promise.reject(new Error(getWord('userNotExistLang'))); // 拒绝Promise以终止链
                }

                return contract.methods.withdraw().send({ from: fromAddress });
            })
            .then(() => {
                alert(getWord('withdrawalSuccessLang'));
            })
            .catch((error) => {
                if (error.message !== getWord('userNotExistLang')) {
                    alert(getWord('withdrawalFailureLang') + error.message);
                }
            })
            .finally(() => {
                // 提现完成后重新启用提现按钮并移除工具提示
                withdrawButtons.style.visibility = 'visible';
                getInfo();
            });
    });
}

// 申请分红
function claimDividend() {
    dividendButton = document.getElementById('dividendButton')
    dividendButton.style.visibility = 'hidden';
    web3.eth.getAccounts().then(accounts => {
        contract.methods.claimDividend().send({ from: accounts[0] }).then(() => {
            alert(getWord('dividendSuccessLang'));
        }).catch((error) => {
            alert(getWord('dividendFailureLang') + ':' + error);
        }).finally(() => {
            dividendButton.style.visibility = 'visible';
            getInfo();
        })
    })
}

// 继续游戏
function continueGame() {
    continueButton = document.getElementById('continueButton')
    continueButton.style.visibility = 'hidden';
    web3.eth.getAccounts().then(accounts => {
        contract.methods.continueGame().send({ from: accounts[0] }).then(() => {
            alert(getWord('continueSuccessLang'));
        }).catch((error) => {
            alert(getWord('continueFailureLang') + ':' + error);
        }).finally(() => {
            continueButton.style.visibility = 'visible';
            getInfo();
        })
    })
}

function donate() {
    const amountInEther = document.getElementById("donateAmount").value;
    if (!amountInEther) return;
    donateButton = document.getElementById('donateButton');
    donateButton.style.visibility = 'hidden';
    web3.eth.getAccounts().then(accounts => {
        contract.methods.sponsor().send({ from: accounts[0], value: web3.utils.toWei(amountInEther, 'ether') }).then(() => {
            alert(getWord('donateSuccessLang'));
        }).catch((error) => {
            alert(getWord('donateFailureLang'));
        }).finally(() => {
            donateButton.style.visibility = 'visible';
        })
    })
}

function airdrop() {
    const airdropCode = document.getElementById("airdropCode").value;
    if (!airdropCode) return;
    airdropButton = document.getElementById('airdropButton');
    airdropButton.style.visibility = 'hidden';
    web3.eth.getAccounts().then(accounts => {
        contract.methods.airdrop(airdropCode).send({ from: accounts[0] }).then(() => {
            alert(getWord('airdropSuccessLang'));
        }).catch((error) => {
            alert(getWord('airdropFailureLang') + ':' + error);
        }).finally(() => {
            airdropButton.style.visibility = 'visible';
            getInfo();
        })
    })
}

function copyInviteUrl() {
    var copyText = document.getElementById("inviteURL");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    setTimeout(() => { alert(getWord('copySuccessLang')); }, 150);
}

function disableButton(name, txt) {
    const button = document.getElementById(name);
    button.onclick = null;
    button.classList.add("disabled");
    button.title = txt === undefined ? "" : txt;
}

function enableButton(name, func) {
    const button = document.getElementById(name);
    button.onclick = func;
    button.classList.remove("disabled");
    button.title = "";
}

// 获取用户信息
function getInfo() {
    web3.eth.getAccounts().then(accounts => {
        contract.methods.getUserInfo().call({ from: accounts[0] })
            .then((user) => {
                console.log(user);
                global.user = user
                displayText("address", accounts[0].substr(0, 6) + '***' + accounts[0].substr(39, 3))
                if (user.exist) {
                    var balance = new BigNumber(user.balance);
                    var shares = new BigNumber(user.shares);
                    displayText("balance", web3.utils.fromWei(user.balance, 'ether'))
                    displayText("userShare", web3.utils.fromWei(user.shares, 'ether'))
                    var currentURLWithoutParams = window.location.origin + window.location.pathname;
                    document.getElementById('inviteURL').value = currentURLWithoutParams + '?inviter=' + accounts[0];

                    // 用户余额为0禁止提现
                    if (balance.comparedTo(zeroAmount) === 0) {
                        disableButton("withdrawButton", getWord("insufficientWithdrawalBalanceLang"));
                    } else {
                        enableButton("withdrawButton", withdraw);
                    }

                    // 用户余额小于0.01禁止继续游戏
                    if (balance.comparedTo(minRechargeAmount) < 0) {
                        disableButton("continueButton", getWord("insufficientGameBalanceLang"));
                    } else {
                        enableButton("continueButton", continueGame);
                    }

                    // 距离上一次分红超过30天才能再次申请分红
                    var currentTime = Math.floor(Date.now() / 1000);
                    var daysDifference = (currentTime - user.lastDividendTime) / (60 * 60 * 24);
                    if (daysDifference < 30 || shares.comparedTo(zeroAmount) === 0) {
                        disableButton("dividendButton", getWord("dividendConditionsNotMetLang"));
                    } else {
                        enableButton("dividendButton", claimDividend);
                    }

                    // 允许邀请
                    enableButton("inviteButton", copyInviteUrl);
                } else {
                    displayText("balance", '-')
                    displayText("userShare", '-')

                    // 用户不存在禁止提现/继续游戏
                    disableButton("withdrawButton", getWord("insufficientWithdrawalBalanceLang"));
                    disableButton("continueButton", getWord("insufficientGameBalanceLang"));

                    // 用户不存在禁止分红
                    disableButton("dividendButton", getWord("dividendConditionsNotMetLang"));

                    // 用户不存在禁止邀请
                    disableButton("inviteButton", getWord("cannotInviteWithoutJoiningGameLang"));
                    document.getElementById('inviteURL').value = "";
                }
            })
            .catch((error) => {
                console.error(getWord('getUserInfoFailureLang'), error);
            })
            .finally(() => {

                contract.methods.totalDividendAmount().call().then((totalBalance) => {
                    displayText("totalDividendAmount", web3.utils.fromWei(totalBalance, 'ether'));
                });

                displayText("totalPlays", contract.methods.userTotalCount().call());
                contract.methods.totalShares().call().then((totalShares) => {
                    displayText("totalShares", web3.utils.fromWei(totalShares, 'ether'));
                    console.log(123, totalShares)
                    if (totalShares)
                        displayText("shareRatio", (global.user.shares / parseInt(totalShares) * 100).toFixed(6));
                })

                contract.methods.currentGameInfo().call().then((info) => {
                    if (info) {
                        displayText("startTime", new Date(info.startTimestamp * 1000).toLocaleString());
                        displayText("currentRound", parseInt(info.currentRound));
                    }
                })

                contract.methods.getPlayerInfoInRound().call().then((info) => {
                    playersDOM = document.getElementById('players');
                    playersDOM.innerHTML = '';
                    info.forEach(player => {
                        childDOM = document.createElement('div');
                        amountDOM = document.createElement('div');
                        amountDOM.className = 'amount';
                        amountDOM.textContent = web3.utils.fromWei(player.balance, 'ether');
                        nameDOM = document.createElement('div');
                        nameDOM.className = 'name';
                        nameDOM.textContent = player.addr.slice(0, 6) + "**";
                        console.log(player.addr, global.user.addr)
                        if (player.addr == global.user.addr) {
                            childDOM.className = "me";
                            nameDOM.innerHTML = getWord('youLang');
                        }
                        childDOM.appendChild(amountDOM);
                        childDOM.appendChild(nameDOM);
                        playersDOM.appendChild(childDOM);
                    });
                })
            });
    });
}

function getUrl(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}
window.addEventListener('load', () => {
    document.getElementById("inviter").value = getUrl('inviter') || '';

})

async function switchNetwork() {
    try {
        await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0x66EED' }], // 0x3 is the chain ID for Ropsten
        });
    } catch (switchError) {
        if (switchError.code === 4902) {
            try {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [
                        {
                            chainId: '0x66EED',
                            chainName: 'Arbitrum Goerli',
                            nativeCurrency: {
                                name: 'ETH',
                                symbol: 'ETH',
                                decimals: 18,
                            },
                            rpcUrls: ['https://goerli-rollup.arbitrum.io/rpc'],
                            blockExplorerUrls: ['https://goerli.arbiscan.io/'],
                        },
                    ],
                });
            } catch (addError) {
                console.error(addError);
            }
        } else {
            console.error(switchError);
        }
    }
}

// 检查window.ethereum并连接钱包
if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(() => {
            initializeApp();
            switchNetwork();
        })
        .catch((error) => {
            console.log(error)
            alert(getWord('connectWalletLang'));
        });

    window.ethereum.on("accountsChanged", function (accounts) {
        enableButton("withdrawButton");
        enableButton("continueButton");
        enableButton("dividendButton");
        enableButton("inviteButton");

        getInfo();
        checkBalanceLoop();
    });
} else {
    alert(getWord('installWalletLang'));
}
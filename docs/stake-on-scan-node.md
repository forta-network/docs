# Staking on Scan Nodes

To be a part of the Forta Network, a Scan Node should have at least 500 Fort of active stake staked on it's behalf (this value is subject to change, and may have different values by chain in the future).

The property of the stake is signaled by the ownership of ERC1155 shares emitted by the staking contract. There are 2 kinds of shares:

- **Active shares:** represent active stake, which is counted for security. Minted when depositing stake. These shares are transferrable
- **Inactive shares:** represent inactive stake, not counted for security. Minted when `init withdrawal` is executed. These shares are non transferrable. After `staking delay`, these shares can be burned to get the staked FORT back:

## Depositing stake

Deposit FORT to get active shares.

<p align="center">
    <img width="500px" alt="Stake Deposit Diagram" src="../stake-images/staking-deposit.png">
</p>

### Staking using Polyscan

**Approve FORT**

1. Go to Forta's contract page, [section "write as proxy"](https://polygonscan.com/address/0x9ff62d1FC52A907B6DCbA8077c2DDCA6E6a9d3e1#writeProxyContract)

2. Connect your wallet (make sure it is the correct wallet, and that you are on Polygon network)
<p align="center">
    <img width="500px" alt="Fort Approve Polyscan" src="../stake-images/1-token-connect.png">
</p>
3- Approve at least the amount you want to stake.

**Spender:** Input `FortaStaking` contract's address: `0xd2863157539b1D11F39ce23fC4834B62082F6874`

**Amount:** FORT amount, in wei. FORT has 18 decimals like Ether, so input the amount followed by 18 zeroes, if unsure use a converter like https://eth-converter.com/

<p align="center">
    <img width="500px" alt="Fort Approve Polyscan" src="../stake-images/2-token-approve.png">
</p>

4- Click "write" and approve the transaction in your wallet.

## Stake FORT

1. Go to Staking contract page, [section "write as proxy"](https://polygonscan.com/address/0xd2863157539b1D11F39ce23fC4834B62082F6874#writeProxyContract)

2. Connect your wallet (make sure it is the correct wallet, and that you are on Polygon network)
<p align="center">
    <img width="500px" alt="Fort Approve Polyscan" src="../stake-images/1-connect.png">
</p>

3- Go to `1. deposit` to stake and input the folowing:
**subjectType:** 0

**subject:** Your scanner address (NOT the scanner owner address).

**stakeValue:** Amount of FORT to stake. For a new node, input  `500000000000000000000` (500 FORT in wei)
if unsure use a converter like https://eth-converter.com/

<p align="center">
    <img width="500px" alt="Staking Approve Polyscan" src="../stake-images/3-stake.png">
</p>

4- Click "write" and approve the transaction in your wallet.


## Init withdrawal

Init the withdrawal process. Active stake becomes inactive, active shares are burned and inactive shares minted.

After `stake delay`, you will be able to withdraw los FORT.

Current `stake delay` is 10 days (subject to change).

<p align="center">
    <img width="500px" alt="Stake Init Withdrawal Diagram" src="../stake-images/staking-init-withdrawal.png">
</p>


### Init withdrawal using Polyscan

1. Go to Staking contract page, [section "write as proxy"](https://polygonscan.com/address/0xd2863157539b1D11F39ce23fC4834B62082F6874#writeProxyContract)

2. Connect your wallet (make sure it is the correct wallet, and that you are on Polygon network)
<p align="center">
    <img width="500px" alt="Staking Connect Polyscan" src="../stake-images/1-connect.png">
</p>

3 Go to `4. initiateWithdrawal` and input the folowing:
**subjectType:** 0

**subject:** Your scanner address (NOT the scanner owner address).

**stakeValue:** Amount of shares to unstake, in wei. If the node has not been slashed, the proportion is 1 Share : 1 Fort

if unsure use a converter like https://eth-converter.com/
<p align="center">
    <img width="500px" alt="Fort Approve Polyscan" src="../stake-images/4-initiate-withdrawal.png">
</p>

4 Click "write" and approve the transaction in your wallet.

5 After confirmation, the 10 day delay starts. If the current active shares are < minimum required stake, the node is not enabled.

## Withdrawal

Burn inactive shares after `staking delay` to get staked FORT.

<p align="center">
    <img width="500px" alt="Staking Withdrawal Diagram" src="../stake-images/staking-withdrawal.png">
</p>

### Withdrawal using Polyscan

1. After delay, go to Staking contract page, [section "write as proxy"](https://polygonscan.com/address/0xd2863157539b1D11F39ce23fC4834B62082F6874#writeProxyContract)

2. Connect your wallet (make sure it is the correct wallet, and that you are on Polygon network)
<p align="center">
    <img width="500px" alt="Staking Connect Polyscan" src="../stake-images/1-connect.png">
</p>

3 Go to `4. initiateWithdrawal` and input the folowing:
**subjectType:** 0

**subject:** Your scanner address (NOT the scanner owner address).

<p align="center">
    <img width="500px" alt="Staking Withdraw Polyscan" src="../stake-images/5-withdraw.png">
</p>

4 Click "write" and approve the transaction in your wallet.

5 When confirmed, you will receive the FORT

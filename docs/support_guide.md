# Forta Firewall - Support Guide

## Overview
Forta Firewall is a security product that screens past blockchain transactions, assesses them using an AI model, and calculates a risk score to help users determine whether a transaction may be malicious. The system is designed to protect protocols from potential attacks by blocking or delaying suspicious transactions.

### Supported Blockchains

Forta Firewall currently supports the following blockchains:

- Ethereum
- Optimism
- BSC (Binance Smart Chain)
- Fantom
- Mantle
- Base
- Arbitrum
- Polygon
- Avalanche
- Linea

## How to Use Forta Firewall

### Step 1: Input a Transaction Hash
To screen a past transaction:

- Select the appropriate blockchain from the dropdown menu.
- Enter the transaction hash into the search bar.
- Click the "Scan" button.
  ![Scan](fortress_scan.png)

### Step 2: Review Screening Results
Once the transaction is scanned, Forta Firewall will provide the following details:

1. Risk Score (0-100): This score is generated by an AI model that has been trained on past attack data and malicious blockchain activity. The higher the score, the more likely it is that the transaction is an attack. A score of:
   
- Above 80: The transaction is flagged as Critical and blocked for review.
- Below 80: The transaction is allowed to go through to the protocol but may still be saved for review.
   
2. Loss Protected: This value represents the potential financial loss that was avoided by blocking or delaying the transaction.

3. Firewall Action (Blocked/Allowed): Indicates whether the transaction has been blocked or delayed. A delayed transaction means the system has flagged it as suspicious but not automatically blocked it, allowing for further review.

4. Transaction Link: A link to the BlockSec blockchain explorer for further investigation into the transaction.

5. Risk Indicator: 

- Critical: High likelihood of attack, the transaction is blocked.
- Low: The transaction proceeds as normal, with minimal risk detected.

### Step 3: Understanding the Explanation
The AI model provides a detailed explanation of why the transaction was flagged. The explanation includes:
- AI Risk Analyzer Results: An analysis of the transaction’s behavior compared to known attack patterns.
- Transaction Financial Impact: A summary of the potential or actual financial loss the transaction would have caused.

### Step 4: Taking Action (For Integrated Protocols)
If your protocol is integrated with Forta, you can take action directly from the Forta Dashboard, including:
- Blocking suspicious transactions.
- Reviewing delayed transactions.
- Monitoring ongoing activity for malicious patterns.

## Feedback and Support
- Telegram Channel (FortaChannel): Users can provide feedback on false positives, suspicious activity, or other product issues.
- Slack Alerts: Users can configure alerts on Slack to monitor suspicious transactions in real-time.

## FAQs

### 1. What happens if the transaction is blocked?
If the transaction's risk score is high (above 80), it may be blocked for review. Depending on further investigation, the protocol can decide whether to revert or allow the transaction to proceed. If the transaction is not reviewed, user can send the transaction again and it will go through.

### 2. What is "Loss Protected"?
Loss protected refers to the amount of potential financial loss that has been avoided by blocking a transaction flagged as malicious by Forta Firewall.

### 3. How does Forta Firewall calculate the Risk Score?
The risk score is calculated by an AI model that has been trained on data from past attacks and malicious on-chain activity. The model compares new transactions to known malicious patterns and assigns a risk score from 0-100.

### 4. Can I receive alerts about risky transactions?
Yes, you can configure Forta Firewall to send real-time alerts via Slack.

### 5. What are the risk levels?
- Critical: The transaction is highly likely to be an attack and is blocked.
- Low: The transaction is considered safe and proceeds as normal.

### 6. Can I provide feedback on false positives or incorrect classifications?
Yes, users can provide feedback on the Forta Telegram Channel (FortaChannel) if a transaction is flagged incorrectly.

### 7. How is the financial impact calculated (Loss Protected)?
The financial impact is based on the transaction losses that could have occurred had the transaction been allowed to proceed.

### 8. Can I take action directly on the flagged transactions?
If the protocol is integrated with Forta, transactions will get blocked and you can review them through the Forta Dashboard.


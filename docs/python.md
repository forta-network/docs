---
hide:
  - toc
---

# Python SDK

The Forta Agent Python SDK enables developers to write agents using Python. You can get started using the `forta-agent init --python` command.

Instead of exporting functions from your agent as in Javascript, you would simply declare functions called `handle_transaction` or `handle_block` in your agent.py file. Generally speaking, variable names are the same except that they are in snake-case (e.g. `block_number`) instead of camel-case (e.g. `blockNumber`). Although the agent can be written in Python, you would still use the Javascript CLI tool to run the agent. Check out the Python agents in our [examples repo](https://github.com/forta-protocol/forta-agent-examples) to learn more.

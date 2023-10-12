## Security - Maintenance

As mentioned in the overview, security is not static and the Forta development community should periodically assess the change velocity and risk assessment. In the initial period following Permissionless Launch, the Foundation has engaged the original core development team to review/ assess the state of the Forta Network from a security perspective on a monthly basis. 

The Forta Foundation has instituted an initial incident response process. While incidents can be categorized into normal events, incidents, and emergency events, this section focuses on the latter as an extreme case. The processes and structure applied here can selectively flow into the former types of incidents. Of course, all the actions described in the security section of these docs could be described as preventative actions; incidents do occur though and at the start of the incident one requires detective actions, such as operational and security monitoring, as well as community engagement and appropriate communication channels (e.g. [@FortaNetwork](https://twitter.com/FortaNetwork) and [Forta Discord](https://discord.com) or private channels for unremedied vulnerabilities). Further, the Forta Foundation has established a bug bounty program on [Immunefi](https://immunefi.com/bounty/forta/).

When incidents occur, incident readiness and ability to take corrective actions are needed. While the incident process describes roles, responsibilities and actions to take during an incident, incident readiness needs to facilitate the action plan associated with the objectives set out for the incident response process. This includes aspects like defining communication channels, having the right audit trails, and having capabilities to respond to an incident swiftly (e.g. pausing or updating a smart contract).

### Incident Response Framework
The Forta Incident Response process is modeled after the FEMA National Incident Management System (NIMS). It is a standardized approach used by US government agencies for incident management that translates well into the cybersecurity space. It’s been used for over 40 years as an effective framework to effectively handle incidents. NIMS is organized into three key components and gets activated when an incident occurs:

- **Resource Management**
- **Command and Coordination** - including the Incident Command System
- **Communications and Information Management**

The Incident Command System (ICS) is just one part of NIMS. The benefits of ICMs are:

- Clarifying chain of command and supervision responsibilities to improve accountability.
- Leveraging interoperable communications systems and plain language to improve communications.
- Providing an orderly, systematic planning process.
- Implementing a common, flexible, predesigned management structure.
- Fostering cooperation between diverse disciplines and agencies.

NIMS is a simple flexible framework that creates clarity in an incident situation. For more information around NIMS and ICS, the following online training courses provide more details: [IS-100.c](https://training.fema.gov/is/courseoverview.aspx?code=IS-100.c) and [IS-700.b](https://training.fema.gov/is/courseoverview.aspx?code=IS-700.b).

### Incident Response Process
Incident response process holistically follows 4 distinct stages:

- Preparation/ Incident Response Readiness
- Triage and Incident Declaration
- Response
- Post Mortem

While each incident is likely going to be unique, some aspects will be shared across incidents. As such, the below can act as general guidelines on how incidents should be approached in the context of NIMS as opposed to a playbook anticipating certain scenarios.


#### Preparation/ Incident Response Readiness
In order to be able to effectively respond to an incident, the Forta Governance Council has approved the following plan to be carried out for each incident, which tasks have been delegated to the Foundation and Forta community members as appropriate:

- **Training** - each member of the Incident Response Team completed the NIMS/ ICS training courses and familiarized themselves with the incident response process.
- **War Room** - as an incident occurs, proper communication channel and backup channels are defined. The storage location of any artifacts (documents, log files, etc.) has already been defined.
- **External Communication Channels** - the Foundation will designate a Public Communications Officer for each incident as part of the Unified Command structure as defined by NIMS. This person will keep the Forta community abreast of the details and progress of the incident, using discretion as appropriate for unremedied vulnerabilities.
- **Forensic Readiness** - tooling needs, access procedures, and log files acquisition have already been documented. Operational and security alerts (internal/external) are surfaced to corresponding Incident Command Supervisors to triage events (see below).
- **Incident Response Roster** - geo distributed on-call list as well as expertise roster have been established. Note, the Forta Network is managed by multisigs and sufficient signer coverage needs to exist to perform any mitigating actions. This was considered in the on-call list.
- **On-chain Response Capabilities** - defined on-chain response capabilities as implemented through the multisig, OpenZeppelin’s Defender, and on-call roster of the signers as well as upgradability and pausability of certain Forta contracts.
- **Abuse Roster** - created a list of contacts/links to mitigate abuse, such as scams or impersonating accounts.


#### Triage and Incident Declaration
An incident starts with an event. This could be a Forta community member noticing something, a user reaching out on Twitter/ via security@forta.org, or an alert from Forta’s operational and security monitoring. These events need to be brought to the attention of the Incident Response Team via the designated channel (all critical and operational monitoring alerts are sent to this channel today) and should get escalated there with the incident command supervisor being tagged to triage the incident.

Triaging the incident out to lead to the following outcomes:

1. Does the event constitute an incident?
2. What is the severity of the incident?
3. Identify an incident command supervisor as per the on-call schedule.


#### Response
At the beginning of a declared incident, the following steps ought to be executed:

- Create the incident response Slack channel
- Identify initial set of incident responders and public communications officer to be activated; structure according to the NIMS framework
- Articulate the objective of the incident on the Slack channel with ‘Incident Objective:’
- Develop the action plan
- Execute on action plan; iterate given the information obtained. 
- Setup regular calls between team leads and incident command supervisor
- Setup regular calls between incident command supervisor and public communications officer
- If an incident extends the business day, ensure a call with a hand-off between the incident command supervisors and public communications officer. 
- Once objectives are achieved, declare the incident as resolved and move towards the post mortem stage.


#### Post Mortems
Each high severity incident is concluded with a post-mortem that allows the incident response process to improve and strengthen the Forta community’s ability to handle incidents effectively. These post-mortems will be posted in the Forta security documentation as well as Forta’s main community communication channels (Twitter, Discord, Forum). A post-mortem may not be published if such publicity could present further risk to Forta or other protocols.

The post mortems should have a set of prioritized action items assigned and completion dates committed (note, some items will be optional). The action plan should be reviewed on a weekly basis until all committed action items are completed. The closure of the post-mortem will be the responsibility of the primary incident command supervisor.



### Practice
Incident response processes can be stressful events. Similar to how fire drills are practiced in schools, practicing incident response processes will help to surface gaps in the process, get everybody familiar with the process, and help everybody to be more comfortable and effective in a real world incident.

An incident will be simulated every 6 months if no other real world incidents occurred and results of the incidents will be posted in a post-mortem write up. These will be scheduled events.

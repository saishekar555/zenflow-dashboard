# 🚀 Zenflow Dashboard — Full Project Documentation

## 🔗 Live Project

[https://zenflow.azurewebsites.net](https://zenflow.azurewebsites.net)

## 🔗 GitHub Repository

[https://github.com/saishekar555/zenflow-dashboard](https://github.com/saishekar555/zenflow-dashboard)

---

# 📌 Project Title

Zenflow Dashboard — React + Vite Application with Azure DevOps CI/CD Deployment

---

# 📖 Project Overview

Zenflow Dashboard is a modern productivity and task management dashboard application developed using React, TypeScript, and Vite. The project was deployed on Microsoft Azure using Azure App Service with a complete CI/CD implementation using Azure DevOps Classic Build and Release Pipelines.

This project demonstrates real-world DevOps implementation, automated deployment workflows, cloud hosting, and frontend production deployment practices.

---

# 🛠️ Technologies Used

## Frontend

* React.js
* TypeScript
* Vite
* HTML5
* CSS3

## DevOps & Cloud

* Azure DevOps
* Azure Repos
* Azure Classic Build Pipelines
* Azure Classic Release Pipelines
* Azure App Service (Linux)
* PM2

## Tools

* Git
* GitHub
* npm
* VS Code

---

# ✨ Key Features

* Responsive productivity dashboard UI
* Task management interface
* Goals and projects tracking sections
* Automated CI/CD pipeline setup
* Continuous deployment to Azure Web App
* Production-ready cloud deployment
* Static SPA hosting configuration
* Automated build artifact generation
* Git-based deployment workflow

---

# ☁️ Azure Cloud Deployment Architecture

```text
Developer Push
      ↓
Azure Repos / GitHub
      ↓
Azure DevOps Build Pipeline (CI)
      ↓
npm install
npm run build
      ↓
Artifact Generation (app.zip)
      ↓
Azure DevOps Release Pipeline (CD)
      ↓
Azure Linux Web App Deployment
      ↓
Live Production Website
```

---

# 🔄 Complete CI/CD Workflow

## Continuous Integration (CI)

The Build Pipeline automatically:

* Pulls latest code from repository
* Installs Node.js dependencies
* Builds Vite production application
* Creates deployment artifact
* Publishes build artifacts

## Continuous Deployment (CD)

The Release Pipeline automatically:

* Detects new build artifacts
* Downloads deployment package
* Deploys application to Azure Web App
* Updates live production website

---

# 📌 Step-by-Step Project Implementation

# STEP 1 — Project Development

## Created Frontend Application

* Built dashboard UI using React and TypeScript
* Configured Vite for fast frontend development
* Organized reusable components and pages

## Local Development Setup

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

---

# STEP 2 — GitHub Repository Setup

## Initialized Git Repository

```bash
git init
```

## Added Remote Repository

```bash
git remote add origin https://github.com/saishekar555/zenflow-dashboard.git
```

## Pushed Code to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

---

# STEP 3 — Azure App Service Setup

## Created Azure Linux Web App

Configured:

* Publish: Code
* Runtime Stack: Node 22 LTS
* Operating System: Linux
* Hosting: Azure App Service

## Created Resource Group

* zenflow-rg

## Configured Azure Web App URL

* [https://zenflow.azurewebsites.net](https://zenflow.azurewebsites.net)

---

# STEP 4 — Azure DevOps Setup

## Created Azure DevOps Project

* Zenflow

## Connected Azure Repos

* Imported project repository
* Configured main branch

---

# STEP 5 — Service Connection Configuration

## Created Azure Resource Manager Service Connection

Purpose:

* Allows Azure DevOps to deploy resources into Azure Subscription.

Configured:

* Azure Subscription
* Resource Group
* Service Connection Name

Example:

```text
zenflow-service-connection
```

---

# STEP 6 — Classic Build Pipeline (CI)

## Build Pipeline Tasks

### 1. Use Node.js Tool Installer

Configured:

```text
Node 22.x
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build Vite Application

```bash
npm run build
```

### 4. Archive Build Files

Generated:

```text
app.zip
```

### 5. Publish Build Artifacts

Published deployment artifacts for Release Pipeline.

---

# STEP 7 — Classic Release Pipeline (CD)

## Release Pipeline Configuration

### Artifact Source

Connected Build Pipeline artifacts.

### Continuous Deployment Trigger

Enabled automatic deployments on every successful build.

### Azure App Service Deploy Task

Configured:

* Azure Service Connection
* Linux Web App
* Deployment Package
* Artifact Path

Deployment package path:

```text
$(System.DefaultWorkingDirectory)/_Zenflow-CI/drop/app.zip
```

---

# STEP 8 — Production Hosting Fixes

## Problem Faced

Azure Linux App Service initially displayed:

```text
Your web app is running and waiting for your content
```

## Root Cause

React/Vite SPA required static file serving configuration.

## Solution Implemented

Configured Startup Command:

```bash
pm2 serve /home/site/wwwroot --no-daemon --spa
```

## Result

Successfully hosted React SPA application on Azure Linux Web App.

---

# ⚠️ Challenges Faced & Solutions

## 1. Vite Build Deployment Issues

### Problem

Azure deployed default Node page instead of React app.

### Solution

Configured PM2 static SPA hosting.

---

## 2. Artifact Path Errors

### Problem

Release Pipeline unable to locate deployment package.

### Solution

Configured proper artifact publishing and deployment paths.

---

## 3. Azure Web App Deployment Errors

### Problem

Build succeeded but deployment failed.

### Solution

Separated CI and CD pipelines properly using Build + Release Pipelines.

---

## 4. Release Pipeline Trigger Issues

### Problem

Automatic deployment was not triggering.

### Solution

Enabled Continuous Deployment Trigger in Release Pipeline.

---

# 📈 Final Project Outcome

Successfully implemented:

✅ React + Vite frontend application

✅ Azure DevOps Classic Build Pipeline

✅ Azure DevOps Classic Release Pipeline

✅ Continuous Integration (CI)

✅ Continuous Deployment (CD)

✅ Azure Linux Web App Hosting

✅ Automated Production Deployment

✅ Git-based Deployment Workflow

✅ Artifact Management

✅ Production-ready Cloud Hosting

---

# 📌 Resume Points (ATS Friendly)

## Resume Project Title

Zenflow Dashboard — Azure DevOps CI/CD Deployment Project

---

## Resume Description (Short Version)

Developed and deployed a React + Vite productivity dashboard using Azure DevOps CI/CD pipelines and Azure App Service. Implemented automated build, artifact management, and continuous deployment workflows using Classic Build and Release Pipelines.

---

## Resume Bullet Points

* Built and deployed a production-ready React + Vite dashboard application on Microsoft Azure.
* Implemented end-to-end CI/CD pipelines using Azure DevOps Classic Build and Release Pipelines.
* Automated application build, artifact generation, and deployment workflows.
* Configured Azure Linux Web App hosting for React SPA deployment.
* Integrated Azure Repos with automated Continuous Deployment triggers.
* Solved real-world deployment issues related to Vite static hosting on Azure.
* Configured PM2-based SPA hosting for production frontend deployment.
* Managed cloud deployment workflows using Azure App Service and Azure DevOps.

---

# 💼 Recruiter Highlights

This project demonstrates:

* Frontend Development Skills
* Azure Cloud Deployment
* DevOps Fundamentals
* CI/CD Pipeline Implementation
* Production Deployment Experience
* Cloud Troubleshooting Skills
* Azure App Service Knowledge
* Git & Version Control
* Real-world Project Deployment Experience

---

# 📚 Interview Explanation

## Explain Project in Interview

"Zenflow Dashboard is a React + Vite productivity dashboard application that I deployed on Microsoft Azure using Azure DevOps CI/CD pipelines. I implemented Classic Build and Release Pipelines to automate build and deployment processes. The project includes automated artifact generation, Azure Linux Web App deployment, and continuous deployment triggers. I also solved deployment issues related to React SPA hosting by configuring PM2 static server setup in Azure App Service."

---

# 🔥 Technical Learning Outcomes

Through this project learned:

* Azure DevOps CI/CD concepts
* Build vs Release Pipelines
* Azure App Service deployment
* Production frontend hosting
* Artifact management
* Linux Web App configuration
* Continuous Deployment automation
* Git-based DevOps workflows
* Cloud deployment troubleshooting

---

# 📌 Final Status

✅ Full-stack frontend deployment completed

✅ CI/CD automation completed

✅ Azure production hosting completed

✅ Recruiter-ready DevOps project completed

---

# 🌐 Production URL

[https://zenflow.azurewebsites.net](https://zenflow.azurewebsites.net)

# 📂 GitHub Repository

[https://github.com/saishekar555/zenflow-dashboard](https://github.com/saishekar555/zenflow-dashboard)

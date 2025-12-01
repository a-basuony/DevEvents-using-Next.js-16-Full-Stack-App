# Dev Events – Next.js 16 Full Stack Project

> **A platform for discovering, exploring, and attending developer events including hackathons, meetups, and conferences. Built with Next.js 16, MongoDB, and modern full-stack practices.**

## Demo

Check out the live demo: [https://dev-events-next-js-16-six.vercel.app/](https://dev-events-next-js-16-six.vercel.app/)

## Repository

GitHub repository: [https://github.com/a-basuony/DevEvents_Next.js_16](https://github.com/a-basuony/DevEvents_Next.js_16)

---

## Table of Contents

1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Tech Stack](#tech-stack)  
4. [Getting Started](#getting-started)  
5. [Environment Variables](#environment-variables)  
6. [Project Structure](#project-structure)  
7. [API Routes](#api-routes)  
8. [Deployment](#deployment)  
9. [Best Practices & Notes](#best-practices--notes)  
10. [License](#license)  

---

## Project Overview

Dev Events is a **full-stack developer events platform** where users can:

- Browse and explore developer events  
- View event details  
- Filter events by categories like hackathons, meetups, and conferences  
- Add events (admin functionality planned)  

The project uses **Next.js 16 App Router** for server components, **dynamic routing** for event pages, and **MongoDB** for persistent data.

---

## Features

- **Dynamic event pages** using slugs  
- **API routes** for CRUD operations  
- **Server-side data fetching** for live event content  
- **Error handling** for missing events and invalid slugs  
- **Responsive UI** with reusable components  
- **Optimized for Vercel deployment**  

---

## Tech Stack

- **Frontend & Backend:** Next.js 16 (App Router)  
- **Database:** MongoDB / Mongoose  
- **Styling:** Tailwind CSS  
- **Hosting & Deployment:** Vercel  
- **Language:** TypeScript  

---

## Getting Started

### Prerequisites

- Node.js v20+  
- MongoDB Atlas account (or local MongoDB)  
- npm or yarn  

### Install dependencies

```bash
git clone https://github.com/a-basuony/DevEvents_Next.js_16.git
cd DevEvents_Next.js_16
npm install

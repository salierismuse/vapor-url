# Vapor URL

A modern URL shortener built with Express.js and Supabase. Features a clean interface and reliable link management.

LINK: https://vapor-url.vercel.app/

(NOTE: IF SITE DOES NOT WORK, SUPABASE TEMPORARILY DISABLED THE DATABASE FROM LACK OF USE. WILL BE BACK UP AGAIN SHORTLY)
## Overview

Vapor URL is a full-stack web application that shortens long URLs into manageable links. Users can input any URL through the web interface and receive a shortened version that redirects to the original destination. The application handles URL validation, generates unique short codes, and manages redirects efficiently.

## Features

- URL shortening with unique 6-character codes
- Instant redirection to original URLs
- Collision detection for short code generation
- Simple API for URL shortening and redirection
- Database persistence with Supabase

## Technology Stack

**Backend:**
- Node.js with Express.js framework
- Supabase for database management (PostgreSQL)
- nanoid for unique ID generation

**Frontend:**
- Vanilla HTML, CSS, and JavaScript
- Custom CSS 

**Deployment:**
- Vercel for hosting and serverless functions
- Environment-based configuration

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/salierismuse/vapor-url
cd vapor-url
npm install
```

Set up environment variables in a `.env` file:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SITE_NAME=your-domain.com
PORT=3000
```

Create the database table in Supabase:

```sql
CREATE TABLE links (
  id SERIAL PRIMARY KEY,
  code VARCHAR(6) UNIQUE NOT NULL,
  original_url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

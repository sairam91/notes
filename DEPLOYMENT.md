# Deployment Guide - Vercel

This guide will help you deploy your Excalidraw app to `notes.sairam.me` using Vercel.

## Prerequisites

- Git repository (GitHub, GitLab, or Bitbucket)
- Vercel account (free - sign up at vercel.com)
- Access to Squarespace DNS settings

## Step 1: Push Code to Git

If you haven't already, initialize a git repository and push to GitHub:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Excalidraw multi-canvas app"

# Create a repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect the configuration from `vercel.json`
5. Click **"Deploy"**
6. Wait for deployment to complete (2-3 minutes)

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? (Select your account)
# - Link to existing project? No
# - Project name? (Press Enter for default)
# - In which directory is your code? ./
# - Want to override settings? No

# For production deployment:
vercel --prod
```

## Step 3: Configure Custom Domain

### In Vercel Dashboard:

1. Go to your project → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter: `notes.sairam.me`
4. Vercel will show you DNS configuration instructions

### In Squarespace DNS Settings:

1. Log into Squarespace
2. Go to **Settings** → **Domains** → **DNS Settings**
3. Click **"Add Record"**
4. Add CNAME record:
   - **Type:** CNAME
   - **Host:** notes
   - **Data:** cname.vercel-dns.com
   - **TTL:** 3600 (or Auto)
5. Click **"Save"**

### Wait for DNS Propagation

- DNS changes can take 5 minutes to 48 hours (usually 5-30 minutes)
- Check status at: https://www.whatsmydns.net/#CNAME/notes.sairam.me

## Step 4: Verify Deployment

1. Once DNS propagates, visit: `https://notes.sairam.me`
2. You should see your Excalidraw app!
3. Vercel automatically provides HTTPS via Let's Encrypt

## Automatic Deployments

Every time you push to the `main` branch, Vercel will automatically:
- Build your app
- Deploy to production
- Update `notes.sairam.me`

For preview deployments (branches):
- Push to any other branch
- Vercel creates a preview URL
- Test before merging to main

## Troubleshooting

### Build Fails

Check the build logs in Vercel dashboard. Common issues:
- Missing dependencies: Run `npm install` locally first
- Build errors: Run `npm run build` locally to test

### Domain Not Working

- Verify DNS settings in Squarespace
- Wait longer for DNS propagation
- Use `nslookup notes.sairam.me` to check DNS

### App Loads But Blank Screen

- Check browser console for errors
- Verify all files were uploaded
- Check Vercel deployment logs

## Environment Variables (If Needed Later)

If you add environment variables:

1. Go to Vercel → Project → **Settings** → **Environment Variables**
2. Add variables
3. Redeploy

## Useful Commands

```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs

# Deploy to production
vercel --prod

# Remove deployment
vercel remove [deployment-url]
```

## Cost

Vercel is **100% free** for this use case:
- Unlimited deployments
- Automatic HTTPS
- Global CDN
- 100GB bandwidth/month (way more than you need)

## Support

- Vercel Docs: https://vercel.com/docs
- Vercel Discord: https://vercel.com/discord
- GitHub Issues: Create issues in your repo

---

**You're all set!** Your app will be live at `https://notes.sairam.me` 🚀

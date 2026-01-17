# Quick Start - Deploy to notes.sairam.me

## Step 1: Push to GitHub

```bash
# If not already initialized
git init
git add .
git commit -m "Ready for deployment"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

## Step 2: Deploy on Vercel

1. Go to **https://vercel.com** and sign in with GitHub
2. Click **"Add New Project"**
3. Select your repository
4. Click **"Deploy"** (Vercel auto-detects settings from `vercel.json`)
5. Wait ~2 minutes for deployment

## Step 3: Add Custom Domain

**In Vercel:**
1. Go to your project → Settings → Domains
2. Add domain: `notes.sairam.me`

**In Squarespace:**
1. Settings → Domains → DNS Settings
2. Add CNAME record:
   - Host: `notes`
   - Value: `cname.vercel-dns.com`

## Step 4: Done!

Visit **https://notes.sairam.me** (after DNS propagates in 5-30 min)

---

For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

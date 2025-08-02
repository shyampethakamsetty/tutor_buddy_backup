# Scripts Directory

This directory contains utility scripts for the Tutorbuddy project.

## Database Reset Script

### `reset-database.js`

A comprehensive script to completely reset the MongoDB database for development purposes.

**⚠️ WARNING: This script will permanently delete ALL data in your database!**

#### Features:
- Interactive confirmation prompts for safety
- Two reset methods:
  1. **Delete all data** (keeps schema structure)
  2. **Full reset** (drops and recreates everything)
- Optional database seeding after reset
- Colored console output for better UX
- Error handling and graceful termination

#### Usage:

**Option 1: Using npm script (recommended)**
```bash
npm run db:reset
```

**Option 2: Direct execution**
```bash
node scripts/reset-database.js
```

**Option 3: Make executable and run**
```bash
chmod +x scripts/reset-database.js
./scripts/reset-database.js
```

#### What it does:

1. **Safety Checks:**
   - Verifies you're in the project root directory
   - Tests database connection
   - Requires double confirmation before proceeding

2. **Reset Options:**
   - **Method 1:** Deletes all records from all collections while preserving schema
   - **Method 2:** Full database reset using Prisma (drops and recreates everything)

3. **Post-Reset:**
   - Optionally seeds the database with fresh data
   - Regenerates Prisma client
   - Provides success confirmation

#### Safety Features:

- **Double Confirmation:** Requires typing "DELETE ALL DATA" to proceed
- **Directory Check:** Ensures script is run from project root
- **Connection Test:** Verifies database connectivity before proceeding
- **Graceful Error Handling:** Provides clear error messages and cleanup
- **Signal Handling:** Responds to Ctrl+C and termination signals

#### Example Output:

```
🚀 Tutorbuddy Database Reset Script
This script will completely reset your MongoDB database.

WARNING: This will permanently delete ALL data in your database!
Are you absolutely sure you want to continue? (yes/no): yes

FINAL WARNING: This action cannot be undone!
Type "DELETE ALL DATA" to confirm: DELETE ALL DATA

ℹ️  Testing database connection...
✅ Database connection successful!

Choose reset method:
1. Delete all data (keep schema)
2. Full reset (drop and recreate everything)
Enter choice (1 or 2): 1

ℹ️  Starting database reset...
ℹ️  Deleting all Notification records...
✅ Deleted 0 Notification records
ℹ️  Deleting all Message records...
✅ Deleted 0 Message records
...
✅ All data has been deleted from the database!

Would you like to seed the database with fresh data? (yes/no): yes

ℹ️  Seeding database with fresh data...
✅ Database seeded successfully!

ℹ️  Generating Prisma client...
✅ Prisma client generated successfully!

🎉 Database reset completed successfully!
ℹ️  Your database is now clean and ready for development.
```

## Other Scripts

### `generate-mock-courses.js`
Generates mock course data for testing and development.

### `verify-filters.js`
Verifies and tests filtering functionality.

### `deploy.sh`
Deployment script for the application.

## Database Management Commands

```bash
# Reset database (interactive)
npm run db:reset

# Seed database only
npm run db:seed

# Generate Prisma client
npx prisma generate

# Push schema changes to database
npx prisma db push

# Open Prisma Studio (database GUI)
npx prisma studio
```

## Environment Setup

Make sure your `.env` file contains the correct `DATABASE_URL` before running any database scripts:

```env
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/tutorbuddy?retryWrites=true&w=majority"
```

## Troubleshooting

### Common Issues:

1. **"Please run this script from the project root directory"**
   - Make sure you're in the directory containing `prisma/schema.prisma`

2. **Database connection failed**
   - Check your `DATABASE_URL` in `.env`
   - Verify network connectivity to MongoDB

3. **Permission denied**
   - Run `chmod +x scripts/reset-database.js` to make executable

4. **Prisma client not found**
   - Run `npx prisma generate` to generate the client

### Development Tips:

- Always backup important data before running reset scripts
- Use this script only in development environments
- Consider using database snapshots for production environments
- Test the script on a copy of your database first 
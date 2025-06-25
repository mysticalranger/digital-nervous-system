# Digital Nervous System - File Storage Setup

## ✅ No Database Required!

This project has been configured to work **without any database**. All data is stored in local JSON files in the `data/` directory.

## 🚀 Quick Start

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment (Optional)**
   - Edit `.env` file if you want to add API keys
   - The `SESSION_SECRET` should be changed for production

3. **Start Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   - Open your browser to: http://localhost:5000

## 📁 Data Storage

- **Users**: `data/users.json`
- **Projects**: `data/projects.json` 
- **Community Activities**: `data/activities.json`

The `data/` folder will be created automatically when you first run the application.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type checking

## 📝 Features

- ✅ User registration and authentication
- ✅ Project creation and management
- ✅ Community activity tracking
- ✅ Karma system
- ✅ Real-time updates
- ✅ AI integration (requires MISTRAL_API_KEY)
- ✅ File-based storage (no database required)

## 🎯 Benefits of File Storage

- **Simple Setup**: No database installation required
- **Development Friendly**: Easy to inspect and modify data
- **Portable**: Data files can be easily backed up/transferred
- **Zero Configuration**: Works out of the box

## 🔄 Migration to Database (Future)

If you later want to migrate to a database:
1. Configure your database (MongoDB/PostgreSQL)
2. Update the connection strings in `.env`
3. Replace file storage calls with database operations

The current file storage mimics database operations, making migration easier.

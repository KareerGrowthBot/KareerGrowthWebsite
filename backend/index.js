const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
require('dotenv').config();
const sequelize = require('./config/db');
const Blog = require('./models/Blog');
const Story = require('./models/Story');
const ImpactStat = require('./models/ImpactStat');
const BlogStat = require('./models/BlogStat');
const CommunityMember = require('./models/CommunityMember');
const BlogCategory = require('./models/BlogCategory');
const StoryCategory = require('./models/StoryCategory');
const Contact = require('./models/Contact');
const SeoData = require('./models/SeoData');
const Setting = require('./models/Setting');

const app = express();
const PORT = process.env.PORT || 4005;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Routes
app.get('/', (req, res) => {
    res.send('KareerGrowth Backend API is running...');
});

// Public Blog Routes
app.get('/api/blogs', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Blog.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']]
        });

        res.json({
            total: count,
            pages: Math.ceil(count / limit),
            currentPage: page,
            data: rows
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findOne({ where: { customId: req.params.id } });
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin Blog Routes
app.get('/api/admin/blogs', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const { count, rows } = await Blog.findAndCountAll({
            limit, offset, order: [['createdAt', 'DESC']]
        });
        res.json({ total: count, pages: Math.ceil(count / limit), currentPage: page, data: rows });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/admin/blogs', async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/admin/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/admin/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        await blog.update(req.body);
        res.json(blog);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/admin/blogs/:id', async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id);
        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        await blog.destroy();
        res.json({ message: 'Blog deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Category Routes (Public)
app.get('/api/categories', async (req, res) => {
    try {
        const [blogCats, storyCats] = await Promise.all([
            BlogCategory.findAll({ order: [['name', 'ASC']] }),
            StoryCategory.findAll({ order: [['name', 'ASC']] })
        ]);
        res.json({
            blogs: blogCats,
            stories: storyCats
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin Category Routes
app.post('/api/admin/blog-categories', async (req, res) => {
    try {
        const category = await BlogCategory.create(req.body);
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/admin/blog-categories/:id', async (req, res) => {
    try {
        const category = await BlogCategory.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        await category.destroy();
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/admin/story-categories', async (req, res) => {
    try {
        const category = await StoryCategory.create(req.body);
        res.json(category);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/admin/story-categories/:id', async (req, res) => {
    try {
        const category = await StoryCategory.findByPk(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });
        await category.destroy();
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Public Story Routes
app.get('/api/stories', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await Story.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']]
        });

        res.json({
            total: count,
            pages: Math.ceil(count / limit),
            currentPage: page,
            data: rows
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/stories/:id', async (req, res) => {
    try {
        const story = await Story.findOne({ where: { storyId: req.params.id } });
        if (!story) return res.status(404).json({ message: 'Story not found' });
        res.json(story);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin Story Routes
app.get('/api/admin/stories', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        const { count, rows } = await Story.findAndCountAll({
            limit, offset, order: [['createdAt', 'DESC']]
        });
        res.json({ total: count, pages: Math.ceil(count / limit), currentPage: page, data: rows });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/admin/stories', async (req, res) => {
    try {
        const story = await Story.create(req.body);
        res.json(story);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/admin/stories/:id', async (req, res) => {
    try {
        const story = await Story.findByPk(req.params.id);
        if (!story) return res.status(404).json({ message: 'Story not found' });
        res.json(story);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/admin/stories/:id', async (req, res) => {
    try {
        const story = await Story.findByPk(req.params.id);
        if (!story) return res.status(404).json({ message: 'Story not found' });
        await story.update(req.body);
        res.json(story);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/admin/stories/:id', async (req, res) => {
    try {
        const story = await Story.findByPk(req.params.id);
        if (!story) return res.status(404).json({ message: 'Story not found' });
        await story.destroy();
        res.json({ message: 'Story deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Story Highlight Routes
app.get('/api/highlights', async (req, res) => {
    try {
        const highlights = await Story.findAll({
            where: { isHighlight: true }
        });
        res.json(highlights);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Impact Stat Routes
app.get('/api/impact-stats', async (req, res) => {
    try {
        const stats = await ImpactStat.findAll();
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin Impact Stat Routes
app.get('/api/admin/impact-stats', async (req, res) => {
    try {
        const stats = await ImpactStat.findAll();
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/admin/impact-stats', async (req, res) => {
    try {
        const stat = await ImpactStat.create(req.body);
        res.json(stat);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/admin/impact-stats/:id', async (req, res) => {
    try {
        const stat = await ImpactStat.findByPk(req.params.id);
        if (!stat) return res.status(404).json({ message: 'Stat not found' });
        await stat.update(req.body);
        res.json(stat);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/admin/impact-stats/:id', async (req, res) => {
    try {
        const stat = await ImpactStat.findByPk(req.params.id);
        if (!stat) return res.status(404).json({ message: 'Stat not found' });
        await stat.destroy();
        res.json({ message: 'Stat deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Blog Stat Routes
app.get('/api/blog-stats', async (req, res) => {
    try {
        const stats = await BlogStat.findAll();
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin Blog Stat Routes
app.get('/api/admin/blog-stats', async (req, res) => {
    try {
        const stats = await BlogStat.findAll();
        res.json(stats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/admin/blog-stats', async (req, res) => {
    try {
        const stat = await BlogStat.create(req.body);
        res.json(stat);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/admin/blog-stats/:id', async (req, res) => {
    try {
        const stat = await BlogStat.findByPk(req.params.id);
        if (!stat) return res.status(404).json({ message: 'Stat not found' });
        await stat.update(req.body);
        res.json(stat);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/admin/blog-stats/:id', async (req, res) => {
    try {
        const stat = await BlogStat.findByPk(req.params.id);
        if (!stat) return res.status(404).json({ message: 'Stat not found' });
        await stat.destroy();
        res.json({ message: 'Stat deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin Routes
app.get('/api/admin/stats', async (req, res) => {
    try {
        const blogCount = await Blog.count();
        const storyCount = await Story.count();
        const communityCount = await CommunityMember.count();
        res.json({
            blogs: blogCount,
            stories: storyCount,
            users: communityCount
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Community Routes
app.get('/api/admin/community', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await CommunityMember.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['joinedDate', 'DESC']]
        });

        res.json({
            total: count,
            pages: Math.ceil(count / limit),
            currentPage: page,
            data: rows
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/community', async (req, res) => {
    try {
        const member = await CommunityMember.create(req.body);
        res.json(member);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// SEO Routes (Public)
app.get('/api/seo', async (req, res) => {
    try {
        let path = (req.query.path ?? '/').toString().trim();
        if (!path.startsWith('/')) path = '/' + path;

        const seo = await SeoData.findOne({
            where: { page_path: path, is_active: true }
        });
        res.json(seo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin SEO Routes
app.get('/api/admin/seo', async (req, res) => {
    try {
        const seoEntries = await SeoData.findAll({ order: [['page_path', 'ASC']] });
        res.json(seoEntries);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/admin/seo', async (req, res) => {
    try {
        const { page_path } = req.body;
        // Upsert logic: if exists update, else create
        const [seo, created] = await SeoData.findOrCreate({
            where: { page_path },
            defaults: req.body
        });

        if (!created) {
            await seo.update(req.body);
        }

        res.json(seo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/admin/seo/:id', async (req, res) => {
    try {
        const seo = await SeoData.findByPk(req.params.id);
        if (!seo) return res.status(404).json({ message: 'SEO entry not found' });
        await seo.destroy();
        res.json({ message: 'SEO entry deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Admin Settings Routes
app.get('/api/admin/settings', async (req, res) => {
    try {
        const settings = await Setting.findAll();
        res.json(settings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/admin/settings', async (req, res) => {
    try {
        const { key, value } = req.body;
        const [setting, created] = await Setting.findOrCreate({
            where: { key },
            defaults: req.body
        });

        if (!created) {
            await setting.update(req.body);
        }

        res.json(setting);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Contact Us Routes
app.post('/api/contact', async (req, res) => {
    try {
        const contact = await Contact.create(req.body);
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/api/admin/contacts', async (req, res) => {
    try {
        const contacts = await Contact.findAll({ order: [['createdAt', 'DESC']] });
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/api/admin/contacts/:id/read', async (req, res) => {
    try {
        const contact = await Contact.findByPk(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });

        // Only update if not already read
        if (!contact.isRead) {
            await contact.update({ isRead: true });
        }
        res.json(contact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.delete('/api/admin/contacts/:id', async (req, res) => {
    try {
        const contact = await Contact.findByPk(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        await contact.destroy();
        res.json({ message: 'Contact deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Upload Route
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ imageUrl });
});

// Database Sync and Server Start
sequelize.authenticate()
    .then(() => {
        console.log('Database connected...');
        return sequelize.sync();
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

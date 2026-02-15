const API_BASE_URL = 'http://localhost:4005/api';

export const fetchBlogs = async (page = 1, limit = 10) => {
    const response = await fetch(`${API_BASE_URL}/blogs?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch blogs');
    return response.json();
};

export const fetchBlogById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
    if (!response.ok) throw new Error('Failed to fetch blog');
    return response.json();
};

export const fetchStories = async (page = 1, limit = 10) => {
    const response = await fetch(`${API_BASE_URL}/stories?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch stories');
    return response.json();
};

export const fetchStoryById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/stories/${id}`);
    if (!response.ok) throw new Error('Failed to fetch story');
    return response.json();
};

export const fetchHighlights = async () => {
    const response = await fetch(`${API_BASE_URL}/highlights`);
    if (!response.ok) throw new Error('Failed to fetch highlights');
    return response.json();
};

export const fetchImpactStats = async () => {
    const response = await fetch(`${API_BASE_URL}/impact-stats`);
    if (!response.ok) throw new Error('Failed to fetch impact stats');
    return response.json();
};

export const fetchBlogStats = async () => {
    const response = await fetch(`${API_BASE_URL}/blog-stats`);
    if (!response.ok) throw new Error('Failed to fetch blog stats');
    return response.json();
};

export const fetchAdminStats = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/stats`);
    if (!response.ok) throw new Error('Failed to fetch admin stats');
    return response.json();
};

// Admin CRUD for Blogs
export const fetchAdminBlogs = async (page = 1, limit = 10) => {
    const response = await fetch(`${API_BASE_URL}/admin/blogs?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch admin blogs');
    return response.json();
};

export const fetchAdminBlogById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/blogs/${id}`);
    if (!response.ok) throw new Error('Failed to fetch admin blog');
    return response.json();
};

export const createBlog = async (data) => {
    const response = await fetch(`${API_BASE_URL}/admin/blogs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create blog');
    return response.json();
};

export const updateBlog = async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/admin/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update blog');
    return response.json();
};

export const deleteBlog = async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/blogs/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete blog');
    return response.json();
};

// Admin CRUD for Stories
export const fetchAdminStories = async (page = 1, limit = 10) => {
    const response = await fetch(`${API_BASE_URL}/admin/stories?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch admin stories');
    return response.json();
};

export const fetchAdminStoryById = async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/stories/${id}`);
    if (!response.ok) throw new Error('Failed to fetch admin story');
    return response.json();
};

export const createStory = async (data) => {
    const response = await fetch(`${API_BASE_URL}/admin/stories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create story');
    return response.json();
};

export const updateStory = async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/admin/stories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update story');
    return response.json();
};

export const deleteStory = async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/stories/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete story');
    return response.json();
};

// Admin Community
export const fetchAdminCommunity = async (page = 1, limit = 10) => {
    const response = await fetch(`${API_BASE_URL}/admin/community?page=${page}&limit=${limit}`);
    if (!response.ok) throw new Error('Failed to fetch community');
    return response.json();
};

// Categories
export const fetchCategories = async () => {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
};

export const addBlogCategory = async (data) => {
    const response = await fetch(`${API_BASE_URL}/admin/blog-categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to add blog category');
    return response.json();
};

export const deleteBlogCategory = async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/blog-categories/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete blog category');
    return response.json();
};

export const addStoryCategory = async (data) => {
    const response = await fetch(`${API_BASE_URL}/admin/story-categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to add story category');
    return response.json();
};

export const deleteStoryCategory = async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/story-categories/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete story category');
    return response.json();
};

export const fetchSeoData = async (path) => {
    const response = await fetch(`${API_BASE_URL}/seo?path=${encodeURIComponent(path)}`);
    if (!response.ok) throw new Error('Failed to fetch SEO data');
    return response.json();
};

export const fetchAdminSeo = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/seo`);
    if (!response.ok) throw new Error('Failed to fetch admin SEO data');
    return response.json();
};

export const updateAdminSeo = async (data) => {
    const response = await fetch(`${API_BASE_URL}/admin/seo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update SEO data');
    return response.json();
};

export const deleteAdminSeo = async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/seo/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete SEO entry');
    return response.json();
};

export const fetchAdminSettings = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/settings`);
    if (!response.ok) throw new Error('Failed to fetch settings');
    return response.json();
};

export const updateAdminSetting = async (data) => {
    const response = await fetch(`${API_BASE_URL}/admin/settings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update setting');
    return response.json();
};
// Impact Stats (Admin)
export const fetchAdminImpactStats = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/impact-stats`);
    if (!response.ok) throw new Error('Failed to fetch admin impact stats');
    return response.json();
};

export const createImpactStat = async (data) => {
    const response = await fetch(`${API_BASE_URL}/admin/impact-stats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create impact stat');
    return response.json();
};

export const updateImpactStat = async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/admin/impact-stats/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update impact stat');
    return response.json();
};

export const deleteImpactStat = async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/impact-stats/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete impact stat');
    return response.json();
};

// Contact Us
export const submitContactForm = async (data) => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to submit contact form');
    return response.json();
};

export const fetchAdminContacts = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/contacts`);
    if (!response.ok) throw new Error('Failed to fetch contacts');
    return response.json();
};

export const markContactAsRead = async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/contacts/${id}/read`, {
        method: 'PUT'
    });
    if (!response.ok) throw new Error('Failed to mark contact as read');
    return response.json();
};

export const deleteContact = async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/contacts/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete contact');
    return response.json();
};

// Blog Stats (Admin)
export const fetchAdminBlogStats = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/blog-stats`);
    if (!response.ok) throw new Error('Failed to fetch admin blog stats');
    return response.json();
};

export const createBlogStat = async (data) => {
    const response = await fetch(`${API_BASE_URL}/admin/blog-stats`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to create blog stat');
    return response.json();
};

export const updateBlogStat = async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/admin/blog-stats/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Failed to update blog stat');
    return response.json();
};

export const deleteBlogStat = async (id) => {
    const response = await fetch(`${API_BASE_URL}/admin/blog-stats/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete blog stat');
    return response.json();
};

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
    });
    if (!response.ok) throw new Error('Failed to upload image');
    return response.json();
};

export const getImageUrl = (image) => {
    if (!image) return '';
    if (typeof image === 'string' && image.startsWith('http')) return image;
    return `http://localhost:4005${image}`;
};

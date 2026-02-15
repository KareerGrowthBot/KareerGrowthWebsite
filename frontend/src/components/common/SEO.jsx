import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchSeoData } from '../../utils/api';

const SEO = () => {
    const location = useLocation();

    useEffect(() => {
        const updateSeo = async () => {
            try {
                const data = await fetchSeoData(location.pathname);
                if (data) {
                    // Basic Tags
                    if (data.page_title) document.title = data.page_title;

                    updateMetaTag('description', data.meta_description);
                    updateMetaTag('keywords', data.meta_keywords);
                    updateLinkTag('canonical', data.canonical_url);

                    // OG Tags
                    updateMetaTag('og:title', data.og_title || data.page_title, 'property');
                    updateMetaTag('og:description', data.og_description || data.meta_description, 'property');
                    updateMetaTag('og:image', data.og_image, 'property');
                    updateMetaTag('og:type', data.og_type || 'website', 'property');
                    updateMetaTag('og:url', window.location.href, 'property');

                    // Twitter Tags
                    updateMetaTag('twitter:card', data.twitter_card || 'summary_large_image');
                    updateMetaTag('twitter:title', data.og_title || data.page_title);
                    updateMetaTag('twitter:description', data.og_description || data.meta_description);
                    updateMetaTag('twitter:image', data.og_image);
                }
            } catch (err) {
                console.error('Failed to update SEO tags:', err);
            }
        };

        updateSeo();
    }, [location.pathname]);

    const updateMetaTag = (name, content, attr = 'name') => {
        if (!content) return;
        let element = document.querySelector(`meta[${attr}="${name}"]`);
        if (!element) {
            element = document.createElement('meta');
            element.setAttribute(attr, name);
            document.head.appendChild(element);
        }
        element.setAttribute('content', content);
    };

    const updateLinkTag = (rel, href) => {
        if (!href) return;
        let element = document.querySelector(`link[rel="${rel}"]`);
        if (!element) {
            element = document.createElement('link');
            element.setAttribute('rel', rel);
            document.head.appendChild(element);
        }
        element.setAttribute('href', href);
    };

    return null; // This component doesn't render anything
};

export default SEO;

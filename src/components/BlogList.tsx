import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Post } from '../types/database';
import { Calendar, ChevronRight, Tag } from 'lucide-react';

const ORGANIZATION_ID = '4d1b70f4-dd23-48b7-8697-29e9f47cc1de';

export default function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const limit = isHomePage ? 6 : undefined;

  useEffect(() => {
    fetchPosts();
  }, [isHomePage]);

  async function fetchPosts() {
    let query = supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .eq('organization_id', ORGANIZATION_ID)
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching posts:', error);
      return;
    }

    setPosts(data || []);
    setTotalPosts(count || 0);
    setLoading(false);
  }

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  return (
    <section className={`${isHomePage ? '' : 'pt-20'} py-20 bg-white`}>
      <div className="container mx-auto px-4">
        <div className="max-w-[90rem] mx-auto">
          {isHomePage ? (
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Insights</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Stay updated with our latest thoughts on design, technology, and digital transformation
              </p>
            </div>
          ) : (
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">Latest Insights</h1>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#037ffc] border-t-transparent"></div>
            </div>
          ) : (
            <>
              <div 
                className={`
                  ${isHomePage ? 'overflow-x-auto custom-scrollbar-horizontal' : 'grid grid-cols-1 gap-8'}
                  pb-4
                `}
              >
                <div className={`
                  ${isHomePage ? 'flex space-x-6 min-w-max' : ''}
                `}>
                  {posts.map((post) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`
                        group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300
                        ${isHomePage ? 'w-[400px] flex-none' : ''}
                      `}
                    >
                      <Link to={`/blog/${post.slug}`} className="flex flex-col h-full">
                        <div className="aspect-[16/9] overflow-hidden">
                          <img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center gap-4 mb-4">
                            <time className="text-sm text-gray-500 flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {formatDate(post.published_at)}
                            </time>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600">
                              <Tag className="w-4 h-4 mr-1" />
                              Blog
                            </span>
                          </div>

                          <h2 className="text-xl font-bold text-gray-900 group-hover:text-[#037ffc] transition-colors mb-3 line-clamp-2">
                            {post.title}
                          </h2>
                          
                          <p className="text-gray-600 line-clamp-3 mb-4 flex-grow">{post.excerpt}</p>
                          
                          <div className="flex items-center text-[#037ffc] font-medium group-hover:translate-x-2 transition-transform mt-auto">
                            Read More
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              </div>

              {isHomePage && totalPosts > 6 && (
                <div className="text-center mt-12">
                  <Link
                    to="/blog"
                    className="inline-flex items-center px-8 py-4 bg-[#037ffc] text-white rounded-full font-medium hover:bg-blue-600 transition-colors"
                  >
                    View More Posts
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
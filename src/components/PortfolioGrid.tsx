import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ChevronRight } from 'lucide-react';
import type { PortfolioItem } from '../types/database';

const ORGANIZATION_ID = '4d1b70f4-dd23-48b7-8697-29e9f47cc1de';

export default function PortfolioGrid() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['all']);
  const [category, setCategory] = useState('all');
  const [totalItems, setTotalItems] = useState(0);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const limit = isHomePage ? 6 : undefined;

  useEffect(() => {
    fetchCategories();
    fetchPortfolioItems();
  }, [category, isHomePage]);

  async function fetchCategories() {
    const { data, error } = await supabase
      .from('portfolio_items')
      .select('category')
      .eq('organization_id', ORGANIZATION_ID)
      .eq('published', true);

    if (error) {
      console.error('Error fetching categories:', error);
      return;
    }

    const uniqueCategories = ['all', ...new Set(data.map(item => item.category))];
    setCategories(uniqueCategories);
  }

  async function fetchPortfolioItems() {
    let query = supabase
      .from('portfolio_items')
      .select('*', { count: 'exact' })
      .eq('organization_id', ORGANIZATION_ID)
      .eq('published', true);
    
    if (category !== 'all') {
      query = query.eq('category', category);
    }

    query = query.order('created_at', { ascending: false });

    if (limit) {
      query = query.limit(limit);
    }
    
    const { data, error, count } = await query;
    
    if (error) {
      console.error('Error fetching portfolio items:', error);
      return;
    }
    
    setPortfolioItems(data || []);
    setTotalItems(count || 0);
  }

  return (
    <section className={`relative ${isHomePage ? '' : 'pt-20'} py-20 bg-white`}>
      {/* Top gradient transition */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent pointer-events-none" />

      <div className="container mx-auto px-4">
        {isHomePage && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Work</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our latest projects and see how we help businesses transform their digital presence
            </p>
          </div>
        )}

        <div className="flex justify-center mb-12 space-x-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors
                ${category === cat 
                  ? 'bg-[#037ffc] text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <img
                src={item.image_url}
                alt={item.title}
                className="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-sm opacity-80">{item.description}</p>
                  <Link
                    to={`/portfolio/${item.id}`}
                    className="inline-block mt-4 px-6 py-2 bg-white text-gray-900 rounded-full text-sm font-medium hover:bg-[#037ffc] hover:text-white transition-colors"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {isHomePage && totalItems > 6 && (
          <div className="text-center mt-12">
            <Link
              to="/portfolio"
              className="inline-flex items-center px-8 py-4 bg-[#037ffc] text-white rounded-full font-medium hover:bg-blue-600 transition-colors"
            >
              View More Projects
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import type { PortfolioItem } from '../types/database';

const ORGANIZATION_ID = '4d1b70f4-dd23-48b7-8697-29e9f47cc1de';

export default function PortfolioDetail() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolioItem();
  }, [id]);

  async function fetchPortfolioItem() {
    if (!id) return;

    const { data, error } = await supabase
      .from('portfolio_items')
      .select('*')
      .eq('organization_id', ORGANIZATION_ID)
      .eq('id', id)
      .eq('published', true)
      .single();

    if (error) {
      console.error('Error fetching portfolio item:', error);
      return;
    }

    setItem(data);
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#037ffc] border-t-transparent"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Project not found</h1>
          <Link
            to="/portfolio"
            className="inline-flex items-center text-[#037ffc] hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="pt-20 min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <Link
          to="/portfolio"
          className="inline-flex items-center text-gray-600 hover:text-[#037ffc] mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Portfolio
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="aspect-video rounded-2xl overflow-hidden mb-8">
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{item.title}</h1>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="px-4 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-600">
                {item.category}
              </span>
            </div>

            <p className="text-gray-600 whitespace-pre-wrap">{item.description}</p>

            <div className="mt-12 flex items-center gap-4">
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 bg-[#037ffc] text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Live Project
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
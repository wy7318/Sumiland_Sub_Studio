import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, FileText, Cookie } from 'lucide-react';

type Tab = 'privacy' | 'terms' | 'cookies';

export default function LegalPages() {
  const [activeTab, setActiveTab] = useState<Tab>('privacy');

  const tabs = [
    { id: 'privacy', label: 'Privacy Policy', icon: Shield },
    { id: 'terms', label: 'Terms of Service', icon: FileText },
    { id: 'cookies', label: 'Cookie Policy', icon: Cookie }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex overflow-x-auto space-x-4 mb-12 pb-4 custom-scrollbar-horizontal">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`
                  flex items-center px-6 py-3 rounded-lg font-medium min-w-[200px] transition-colors
                  ${activeTab === tab.id 
                    ? 'bg-[#037ffc] text-white' 
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                  }
                `}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 prose prose-lg max-w-none"
          >
            {activeTab === 'privacy' && (
              <>
                <h1>Privacy Policy</h1>
                <p>Last updated: {new Date().toLocaleDateString()}</p>
                
                <h2>1. Information We Collect</h2>
                <p>
                  We collect information that you provide directly to us, including when you:
                </p>
                <ul>
                  <li>Fill out forms on our website</li>
                  <li>Create an account</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Contact us for support</li>
                </ul>

                <h2>2. How We Use Your Information</h2>
                <p>
                  We use the information we collect to:
                </p>
                <ul>
                  <li>Provide and maintain our services</li>
                  <li>Improve our website and user experience</li>
                  <li>Send you updates and marketing communications</li>
                  <li>Respond to your comments and questions</li>
                </ul>

                <h2>3. Information Sharing</h2>
                <p>
                  We do not sell or rent your personal information to third parties. We may share your
                  information in the following circumstances:
                </p>
                <ul>
                  <li>With your consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights and prevent fraud</li>
                </ul>

                <h2>4. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational measures to protect your personal
                  information against unauthorized access, alteration, disclosure, or destruction.
                </p>

                <h2>5. Your Rights</h2>
                <p>
                  You have the right to:
                </p>
                <ul>
                  <li>Access your personal information</li>
                  <li>Correct inaccurate data</li>
                  <li>Request deletion of your data</li>
                  <li>Object to processing of your data</li>
                </ul>
              </>
            )}

            {activeTab === 'terms' && (
              <>
                <h1>Terms of Service</h1>
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing and using this website, you accept and agree to be bound by the terms
                  and provision of this agreement.
                </p>

                <h2>2. Use License</h2>
                <p>
                  Permission is granted to temporarily download one copy of the materials (information
                  or software) on SUMILAND & SUB STUDIO's website for personal, non-commercial
                  transitory viewing only.
                </p>

                <h2>3. Disclaimer</h2>
                <p>
                  The materials on SUMILAND & SUB STUDIO's website are provided on an 'as is' basis.
                  SUMILAND & SUB STUDIO makes no warranties, expressed or implied, and hereby disclaims
                  and negates all other warranties including, without limitation, implied warranties or
                  conditions of merchantability, fitness for a particular purpose, or non-infringement
                  of intellectual property or other violation of rights.
                </p>

                <h2>4. Limitations</h2>
                <p>
                  In no event shall SUMILAND & SUB STUDIO or its suppliers be liable for any damages
                  (including, without limitation, damages for loss of data or profit, or due to
                  business interruption) arising out of the use or inability to use the materials on
                  SUMILAND & SUB STUDIO's website.
                </p>

                <h2>5. Revisions and Errata</h2>
                <p>
                  The materials appearing on SUMILAND & SUB STUDIO's website could include technical,
                  typographical, or photographic errors. SUMILAND & SUB STUDIO does not warrant that
                  any of the materials on its website are accurate, complete or current.
                </p>
              </>
            )}

            {activeTab === 'cookies' && (
              <>
                <h1>Cookie Policy</h1>
                <p>Last updated: {new Date().toLocaleDateString()}</p>

                <h2>1. What Are Cookies</h2>
                <p>
                  Cookies are small text files that are placed on your computer or mobile device when
                  you visit our website. They are widely used to make websites work more efficiently
                  and provide information to the owners of the site.
                </p>

                <h2>2. How We Use Cookies</h2>
                <p>
                  We use cookies for the following purposes:
                </p>
                <ul>
                  <li>Essential cookies: Required for the website to function properly</li>
                  <li>Analytics cookies: To understand how visitors interact with our website</li>
                  <li>Preference cookies: To remember your settings and preferences</li>
                  <li>Marketing cookies: To deliver more relevant advertisements</li>
                </ul>

                <h2>3. Types of Cookies We Use</h2>
                <h3>Essential Cookies</h3>
                <ul>
                  <li>Session cookies</li>
                  <li>Security cookies</li>
                </ul>

                <h3>Analytics Cookies</h3>
                <ul>
                  <li>Google Analytics</li>
                  <li>Page view tracking</li>
                  <li>User behavior analysis</li>
                </ul>

                <h2>4. Managing Cookies</h2>
                <p>
                  You can control and/or delete cookies as you wish. You can delete all cookies that
                  are already on your computer and you can set most browsers to prevent them from
                  being placed. However, if you do this, you may have to manually adjust some
                  preferences every time you visit our website and some services and functionalities
                  may not work.
                </p>

                <h2>5. Contact Us</h2>
                <p>
                  If you have any questions about our use of cookies, please contact us at{' '}
                  <a href="mailto:jessica.lee@sumisubi.com">jessica.lee@sumisubi.com</a>.
                </p>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
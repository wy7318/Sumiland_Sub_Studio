import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Palette, Globe, Megaphone, Package, Lightbulb, Zap } from 'lucide-react';

const services = [
  {
    icon: Palette,
    title: 'Brand Identity Design',
    description: 'Create a distinctive visual identity that sets you apart with our expert logo design, color palette selection, and brand guidelines.',
    features: ['Logo Design', 'Brand Guidelines', 'Visual Identity', 'Color Systems']
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Build SEO-optimized, high-performance websites that drive conversions and provide exceptional user experiences.',
    features: ['Responsive Design', 'SEO Optimization', 'Custom CMS', 'Analytics Integration']
  },
  {
    icon: Package,
    title: 'Package Design',
    description: 'Stand out on shelves with innovative packaging designs that capture attention and communicate your brand value.',
    features: ['Product Packaging', 'Label Design', 'Retail Displays', 'Mockup Creation']
  },
  {
    icon: Megaphone,
    title: 'Brand Strategy',
    description: 'Develop comprehensive branding strategies that position your business for success in your target market.',
    features: ['Market Research', 'Brand Positioning', 'Communication Strategy', 'Brand Architecture']
  },
  {
    icon: Lightbulb,
    title: 'Creative Design',
    description: 'Transform your ideas into compelling visual content that resonates with your audience and drives engagement.',
    features: ['Print Design', 'Digital Assets', 'Social Media Graphics', 'Marketing Collateral']
  },
  {
    icon: Zap,
    title: 'Digital Marketing',
    description: 'Amplify your brand presence with data-driven digital marketing strategies that deliver measurable results.',
    features: ['Social Media', 'Content Strategy', 'Email Marketing', 'Campaign Management']
  }
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.4, 0, 0.2, 1]
    }
  }
};

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="relative py-32 bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Top gradient overlay */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-blue-50/90 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-32 h-32 mx-auto mb-8"
          >
            {/* <div className="absolute inset-0 bg-white/50 rounded-full blur-xl"></div>
            <img
              src="https://jaytpfztifhtzcruxguj.supabase.co/storage/v1/object/public/Sumiland%20Design//SUMIL&SUB%20STUDIO%20LOGO.png"
              alt="Sumiland Studio Logo"
              className="relative w-full h-full object-contain"
            /> */}
          </motion.div>
          
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-4"
          >
            Our Services
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Transforming Visions into
            <span className="text-[#037ffc]"> Digital Reality</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            We combine creativity, strategy, and technology to help brands thrive in the digital age
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative mb-6">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#037ffc] to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative bg-white rounded-lg p-4">
                  <service.icon className="h-8 w-8 text-[#037ffc]" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>

              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <span className="h-1.5 w-1.5 bg-[#037ffc] rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-50 to-white pointer-events-none" />
    </section>
  );
}
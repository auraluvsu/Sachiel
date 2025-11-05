import { motion } from 'motion/react';
import { GoldButton } from './components/GoldButton';
import { FrostedPanel } from './components/FrostedPanel';
import { FeatureCard } from './components/FeatureCard';
import { AppMockup } from './components/AppMockup';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { useRef } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';

const API_BASE = 'http://localhost:8080'

  
const notify = () => {
  toast.success('🦄 Joined!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
}

const toastWarn = () => {
  toast.error('Error: Empty email!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
  });
}

async function handleSubmit(input: HTMLInputElement) {
  if (!input.value.trim()) {
    toastWarn()
    return
  }
  const data = {email: input.value.trim()}
  await api('/emails', {
    method: 'POST', 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (res) input.value = ''
  }).catch(e => console.log(e));
  notify()
}

async function api(path: string, options?: any) {
  const res = await fetch(API_BASE + path, {
    headers: { "content-type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const msg = await res.text().catch(() => res.statusText);
    throw new Error(`API ${res.status} ${res.statusText}: ${msg}`);
  }
  console.log("status:", res.status)
  return res.status
};

export default function App() {
  const betaRef = useRef<HTMLDivElement | null>(null);

  const scrollToBeta = () => {
    betaRef.current!.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      image: 'https://images.unsplash.com/photo-1696595744570-fab47089b3a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXF1aWQlMjBnbGFzcyUyMHJlZmxlY3Rpb258ZW58MXx8fHwxNzYyMjc2MDE4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Zero Clutter',
      description: 'Pure minimalism — just you and your thoughts flowing freely.',
    },
    {
      image: 'https://images.unsplash.com/photo-1558913726-f287d9b92509?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcm9zdGVkJTIwZ2xhc3MlMjBibHVyfGVufDF8fHx8MTc2MjI3Mzk1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Frosted Calm',
      description: 'Serene interface with glassy elegance and ethereal tranquility.',
    },
    {
      image: 'https://images.unsplash.com/photo-1738106562630-fa51558c73f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodG5pbmclMjBib2x0JTIwZmFzdHxlbnwxfHx8fDE3NjIyNzM5NTF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Instant Launch',
      description: 'Open in an instant — your ideas wait for no one.',
    },
    {
      image: 'https://images.unsplash.com/photo-1758983308742-f4ba1f8c8cb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2NrJTIwcHJpdmFjeSUyMHNlY3VyaXR5fGVufDF8fHx8MTc2MjI3Mzk1MXww&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Offline Privacy',
      description: 'Your words live only on your device, sacred and secure.',
    },
    {
      image: 'https://images.unsplash.com/photo-1758453240295-f8817e7e087f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxtJTIwY2F0JTIwcGVhY2VmdWx8ZW58MXx8fHwxNzYyMjczOTUxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Calm Companion',
      description: 'A peaceful presence that keeps you centered while you write.',
    },
    {
      image: 'https://images.unsplash.com/photo-1718803597223-f7beeb310d3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZW4lMjB0aW1lciUyMG1pbmltYWxpc3R8ZW58MXx8fHwxNzYyMjczOTUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      title: 'Gentle Autosave',
      description: 'Silent protection — your work flows safely into memory.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-[#f2f2f2] overflow-x-hidden">
      {/* Hero Section - Component: Sachiel Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Water-Inspired Texture */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1761566530416-15bc2baa6b2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhlcmVhbCUyMG1pc3QlMjBsaWdodHxlbnwxfHx8fDE3NjIyNzYwMTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Ethereal mist background"
            className="w-full h-full object-cover opacity-30"
          />
          {/* Light rays effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#d3af37]/5 via-transparent to-transparent"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(211,175,55,0.08),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e]/50 via-[#0e0e0e]/70 to-[#0e0e0e]"></div>
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          <FrostedPanel className="max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="text-[#f2f2f2] mb-6"
              style={{ fontSize: '5rem', letterSpacing: '0.1em' }}
            >
              Sachiel
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-[#f2f2f2]/80 mb-12 text-xl"
            >
              Write in Flow.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 1 }}
            >
              <GoldButton className="text-lg" onClick={scrollToBeta}>
                Coming Soon
              </GoldButton>
            </motion.div>
          </FrostedPanel>
        </motion.div>
      </section>

      {/* Features Section - Component: Features Grid */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 text-[#f2f2f2]"
          >
            Flow Without Distraction
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <FeatureCard
                  image={feature.image}
                  title={feature.title}
                  description={feature.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Purchase Section - Component: Purchase */}
      <section className="relative py-32 px-6 overflow-hidden">
        {/* Water Ripple Background */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1697388931428-289189f6ab28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHJpcHBsZXMlMjBjYWxtfGVufDF8fHx8MTc2MjI3NjAxN3ww&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Water ripples"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e] via-[#0e0e0e]/80 to-[#0e0e0e]"></div>
          {/* Subtle water shimmer effect */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(211,175,55,0.05),transparent_70%)]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-6xl mx-auto"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* App Mockup */}
            <div className="order-2 lg:order-1">
              <AppMockup />
            </div>

            {/* Purchase Info */}
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <FrostedPanel>
                <h2 className="text-[#f2f2f2] mb-6">
                  Experience Flow
                </h2>
                
                <p className="text-[#f2f2f2]/80 text-xl mb-8">
                  Launching soon. Be among the first to experience pure, distraction-free writing.
                </p>
                
                <p className="text-[#f2f2f2]/60 mb-8">
                  No subscriptions. No tracking. Just a beautiful editor that respects your privacy and workflow.
                </p>

                <GoldButton className="text-lg w-full lg:w-auto">
                  Coming Soon
                </GoldButton>
              </FrostedPanel>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Beta Signup Section */}
      <section className="py-24 px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center"
        >
          <FrostedPanel>
            <h2 ref={betaRef} className="text-[#f2f2f2] mb-4">
              Join the Beta
            </h2>
            <p className="text-[#f2f2f2]/70 mb-8">
              Get early access to Sachiel and help shape the future of mindful writing.
            </p>
            <input type='text' placeholder='Email' className='beta-input' id='input'/>
            <GoldButton className="text-lg" onClick={async() => await handleSubmit(document.getElementById('input') as HTMLInputElement)}>
              Join the Beta
            </GoldButton>
          </FrostedPanel>
          <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
          />
        </motion.div>
      </section>

      {/* Footer - Component: Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-[#f2f2f2]/40">
            © 2025 Sachiel. Built with focus by Nas.
          </p>
        </div>
      </footer>
    </div>
  );
}

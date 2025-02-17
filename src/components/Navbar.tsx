import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

export function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const linkVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (custom: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: custom * 0.1,
        duration: 0.3
      }
    }),
    exit: { opacity: 0, x: -20 }
  };

  return (
    <motion.div 
      className="w-full flex justify-center pt-4 fixed top-0 z-50 px-4 md:px-8 lg:px-12"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <nav className="w-full bg-background/80 backdrop-blur-md border rounded-xl">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold text-foreground">Startups.ad</span>
              </Link>
            </motion.div>
            <div className="hidden md:flex items-center space-x-1">
              {['Startups', 'Boost'].map((item, index) => (
                <motion.div
                  key={item}
                  custom={index}
                  variants={linkVariants}
                  initial="initial"
                  animate="animate"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    to={`/${item.toLowerCase()}`} 
                    className="px-4 py-2 text-foreground rounded-lg transition-colors duration-200 hover:bg-accent/80"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="https://tally.so/r/mV92zJ"
                  className="ml-2 px-4 py-2 text-foreground font-medium rounded-lg border border-foreground transition-colors duration-200 hover:bg-accent/80 rainbow-border-button"
                >
                  + Submit
                </Link>
              </motion.div>
              <ThemeToggle />
            </div>
            <div className="md:hidden flex items-center gap-2">
              <ThemeToggle />
              <motion.button
                className="flex items-center text-foreground focus:outline-none p-2"
                aria-label="Toggle navigation menu"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
              >
                <div 
                  className="hamburger-icon" 
                  data-active={isMobileMenuOpen}
                >
                  <motion.span 
                    className="hamburger-line"
                    initial={false}
                  />
                  <motion.span 
                    className="hamburger-line"
                    initial={false}
                  />
                  <motion.span 
                    className="hamburger-line"
                    initial={false}
                  />
                </div>
              </motion.button>
            </div>
          </div>
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                className="md:hidden"
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
              >
                <div className="py-2 space-y-1">
                  {['Startups', 'Boost', '+ Submit'].map((item, index) => (
                    <motion.div
                      key={item}
                      variants={linkVariants}
                      custom={index}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link 
                        to={item === '+ Submit' ? "https://tally.so/r/mV92zJ" : `/${item.toLowerCase()}`}
                        className={`block px-4 py-2 text-foreground rounded-lg transition-colors duration-200 hover:bg-accent/80 ${
                          item === '+ Submit' ? 'border border-foreground mt-2 rainbow-border-button' : ''
                        }`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </motion.div>
  );
}

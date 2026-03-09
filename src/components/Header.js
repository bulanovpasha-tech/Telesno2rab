import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { BOOKING_URL } from '../data/mockData';
import { Button } from './ui/button';
import { Menu, X, Globe } from 'lucide-react';

const Header = () => {
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: t.home },
    { path: '/services', label: t.services },
    { path: '/masters', label: t.masters },
    { path: '/subscriptions', label: t.subscriptions },
    { path: '/certificates', label: t.certificates },
    { path: '/about', label: t.about }
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F2A24]/95 backdrop-blur-md border-b border-[#C6A75E]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center group">
            <div className="logo-telesno tracking-[6px] leading-none mb-1 transition-opacity group-hover:opacity-80 pl-[6px]">
              ТЕЛЕСНО
            </div>
            <div className="text-[8px] text-[#C6A75E]/70 tracking-[2px] uppercase font-light pl-[2px]">
              СТУДИЯ МАССАЖА
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm tracking-wide transition-colors whitespace-nowrap font-lato ${
                  isActive(link.path)
                    ? 'text-[#C6A75E]'
                    : 'text-white/80 hover:text-[#C6A75E]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 text-white/80 hover:text-[#C6A75E] transition-colors"
              aria-label="Toggle language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm uppercase">{language}</span>
            </button>

            {/* Book Button Desktop */}
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:block"
            >
              <Button className="bg-[#C6A75E] text-[#0F2A24] hover:bg-[#C6A75E]/90 transition-colors">
                {t.book}
              </Button>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white/80 hover:text-[#C6A75E] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#C6A75E]/10">
            <nav className="flex flex-col space-y-4">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm tracking-wide transition-colors font-lato ${
                    isActive(link.path)
                      ? 'text-[#C6A75E]'
                      : 'text-white/80 hover:text-[#C6A75E]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full bg-[#C6A75E] text-[#0F2A24] hover:bg-[#C6A75E]/90 transition-colors">
                  {t.book}
                </Button>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { Phone, Clock, MapPin, Instagram, Send } from 'lucide-react';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const navLinks = [
    { path: '/', label: t.nav.home },
    { path: '/services', label: t.nav.services },
    { path: '/masters', label: t.nav.masters },
    { path: '/subscriptions', label: t.nav.subscriptions },
    { path: '/certificates', label: t.nav.certificates },
    { path: '/about', label: t.nav.about }
  ];

  const socialLinks = [
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/telesno_vlg?igsh=eDFxMHhkZTNrZ3Rw&utm_source=qr',
      icon: <Instagram className="w-7 h-7" />
    },
    {
      name: 'Telegram',
      url: 'https://t.me/telesnovlg',
      icon: <Send className="w-7 h-7" />
    },
    {
      name: 'VK',
      url: 'https://vk.ru/telesno_vlg',
      icon: (
        <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1-1.49-1.135-1.744-1.135-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.44 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.203.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.27.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.491-.085.744-.576.744z"/>
        </svg>
      )
    }
  ];

  return (
    <footer className="bg-[#0F2A24] text-white/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Logo & About */}
          <div>
            <div className="mb-4 text-center">
              <div className="logo-telesno tracking-[6px] leading-none mb-1 pl-[6px]">
                ТЕЛЕСНО
              </div>
              <div className="text-[8px] text-[#C6A75E]/70 tracking-[2px] uppercase font-light pl-[2px]">
                СТУДИЯ МАССАЖА
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              {language === 'ru' 
                ? 'Пространство для глубокого расслабления и восстановления ресурса.'
                : 'A space for deep relaxation and resource recovery.'}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#C6A75E] font-medium mb-4 tracking-wide">
              {language === 'ru' ? 'Навигация' : 'Navigation'}
            </h4>
            <nav className="flex flex-col space-y-3">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-sm hover:text-[#C6A75E] transition-colors"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contacts */}
          <div>
            <h4 className="text-[#C6A75E] font-medium mb-4 tracking-wide">
              {language === 'ru' ? 'Контакты' : 'Contacts'}
            </h4>
            <div className="flex flex-col space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 mt-1 text-[#C6A75E] flex-shrink-0" />
                <a href="https://yandex.ru/maps/-/CPq~N-Ot" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-[#C6A75E] transition-colors">
                  <div>{t.footer.city}</div>
                  <div>{t.footer.address}</div>
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 mt-1 text-[#C6A75E] flex-shrink-0" />
                <a href="tel:+79964835556" className="text-sm hover:text-[#C6A75E] transition-colors">
                  {t.footer.phone}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-4 h-4 mt-1 text-[#C6A75E] flex-shrink-0" />
                <span className="text-sm">{t.footer.schedule}</span>
              </div>
              
              {/* Social Media */}
              <div className="pt-4 mt-2 border-t border-[#C6A75E]/10">
                <p className="text-sm text-white/80 mb-3">
                  {language === 'ru' ? 'Мы в соцсетях:' : 'Follow us:'}
                </p>
                <div className="flex items-center gap-10">
                  {socialLinks.map(social => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-[#C6A75E] transition-all transform hover:scale-110 duration-200"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#C6A75E]/10 text-center">
          <p className="text-sm text-white/60">{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

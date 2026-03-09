import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { settingsApi } from '../services/api';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  // State for settings
  const [bookingUrl, setBookingUrl] = useState('https://dikidi.net/#widget=205592');

  const openDikidi = (url) => {
    const a = document.createElement('a');
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Fetch settings from API
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingsApi.get();
        setBookingUrl(data.bookingUrl);
      } catch (err) {
        console.error('Failed to fetch settings:', err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://customer-assets.emergentagent.com/job_premium-relax-1/artifacts/ouqbqi3q_1772210696829.jpg')`,
          }}
        >
          <div className="absolute inset-0 bg-[#0F2A24]/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-serif text-[#C6A75E] mb-6 tracking-wide">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-4 font-light">
            {t.hero.subtitle}
          </p>
          <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <span onClick={() => openDikidi(bookingUrl)} style={{cursor:"pointer"}}>
              <Button className="bg-[#C6A75E] text-[#0F2A24] hover:bg-[#C6A75E]/90 px-8 py-6 text-lg">
                {t.hero.bookButton}
              </Button>
            </span>
            <Link to="/services">
              <Button variant="outline" className="border-[#C6A75E] text-[#C6A75E] hover:bg-[#C6A75E] hover:text-[#0F2A24] px-8 py-6 text-lg">
                {t.hero.servicesButton}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 px-4 bg-[#F7F5F0]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-[#0F2A24] mb-8">
            {t.home.aboutTitle}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t.home.aboutText}
          </p>
        </div>
      </section>

      {/* Services Block */}
      <section className="py-24 px-4 bg-[#E8E4DC]" data-testid="home-services-block">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-[#0F2A24] mb-12">
            {language === 'ru' ? 'Услуги' : 'Services'}
          </h2>
          <div className="space-y-4 mb-12 max-w-md mx-auto">
            <div className="flex justify-between items-baseline border-b border-[#0F2A24]/10 pb-3">
              <span className="text-lg text-[#0F2A24] font-medium">{language === 'ru' ? 'Классический массаж' : 'Classic Massage'}</span>
              <span className="text-sm text-gray-500 ml-4 whitespace-nowrap">60 / 90 {language === 'ru' ? 'минут' : 'min'}</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-[#0F2A24]/10 pb-3">
              <span className="text-lg text-[#0F2A24] font-medium">{language === 'ru' ? 'Расслабляющий массаж' : 'Relaxation Massage'}</span>
              <span className="text-sm text-gray-500 ml-4 whitespace-nowrap">60 / 90 {language === 'ru' ? 'минут' : 'min'}</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-[#0F2A24]/10 pb-3">
              <span className="text-lg text-[#0F2A24] font-medium">{language === 'ru' ? 'Массаж лица' : 'Facial Massage'}</span>
              <span className="text-sm text-gray-500 ml-4 whitespace-nowrap">60 {language === 'ru' ? 'минут' : 'min'}</span>
            </div>
            <div className="flex justify-between items-baseline border-b border-[#0F2A24]/10 pb-3">
              <span className="text-lg text-[#0F2A24] font-medium">{language === 'ru' ? 'Телесная терапия' : 'Body Therapy'}</span>
              <span className="text-sm text-gray-500 ml-4 whitespace-nowrap">120 {language === 'ru' ? 'минут' : 'min'}</span>
            </div>
            <div className="flex justify-between items-baseline pb-3">
              <span className="text-lg text-[#0F2A24] font-medium">{language === 'ru' ? 'Телесная терапия для двоих' : 'Body Therapy for Two'}</span>
              <span className="text-sm text-gray-500 ml-4 whitespace-nowrap">120 {language === 'ru' ? 'минут' : 'min'}</span>
            </div>
          </div>
          <Link to="/services">
            <Button className="bg-[#0F2A24] text-white hover:bg-[#C6A75E] hover:text-[#0F2A24] px-10 py-6 text-lg transition-colors" data-testid="home-services-btn">
              {language === 'ru' ? 'Выбрать услугу' : 'Choose a service'} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Subscriptions Block */}
      <section className="py-24 px-4 bg-[#F7F5F0]" data-testid="home-subscriptions-block">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-[#0F2A24] mb-10">
            {language === 'ru' ? 'Абонементы' : 'Subscriptions'}
          </h2>
          <div className="space-y-2 mb-12">
            <p className="text-xl text-[#0F2A24] font-light leading-relaxed">
              {language === 'ru' ? 'Инвестиция в тело.' : 'Investment in body.'}
            </p>
            <p className="text-xl text-[#0F2A24] font-light leading-relaxed">
              {language === 'ru' ? 'Регулярная забота.' : 'Regular care.'}
            </p>
            <p className="text-xl text-[#0F2A24] font-light leading-relaxed">
              {language === 'ru' ? 'Максимальный результат.' : 'Maximum results.'}
            </p>
          </div>
          <Link to="/subscriptions">
            <Button className="bg-[#0F2A24] text-white hover:bg-[#C6A75E] hover:text-[#0F2A24] px-10 py-6 text-lg transition-colors" data-testid="home-subscriptions-btn">
              {language === 'ru' ? 'Выбрать абонемент' : 'Choose a subscription'} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Certificates Block */}
      <section className="py-24 px-4 bg-[#E8E4DC]" data-testid="home-certificates-block">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif text-[#0F2A24] mb-10">
            {language === 'ru' ? 'Сертификаты' : 'Certificates'}
          </h2>
          <div className="space-y-1 mb-12">
            <p className="text-xl text-[#0F2A24] font-light leading-relaxed">
              {language === 'ru' ? 'Подарите человеку паузу.' : 'Gift someone a pause.'}
            </p>
            <p className="text-xl text-[#0F2A24] font-light leading-relaxed">
              {language === 'ru' ? 'Выберите услугу или номинал —' : 'Choose a service or amount —'}
            </p>
            <p className="text-xl text-[#0F2A24] font-light leading-relaxed pl-8">
              {language === 'ru' ? 'оформите за минуту.' : 'complete in a minute.'}
            </p>
          </div>
          <Link to="/certificates">
            <Button className="bg-[#0F2A24] text-white hover:bg-[#C6A75E] hover:text-[#0F2A24] px-10 py-6 text-lg transition-colors" data-testid="home-certificates-btn">
              {language === 'ru' ? 'Оформить сертификат' : 'Get a certificate'} <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 bg-[#F7F5F0]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-5xl md:text-6xl font-serif text-[#0F2A24] mb-12">
            {t.home.ctaTitle}
          </h2>
          <span onClick={() => openDikidi(bookingUrl)} style={{cursor:"pointer"}}>
            <Button className="bg-[#0F2A24] text-white hover:bg-[#0F2A24]/90 px-12 py-6 text-lg">
              {t.home.ctaButton}
            </Button>
          </span>
        </div>
      </section>
    </div>
  );
};

export default Home;

import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { BOOKING_URL } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Gift, TrendingUp, Star } from 'lucide-react';

const Loyalty = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const features = [
    {
      icon: <Gift className="w-8 h-8" />,
      title: t.loyalty.earn,
      desc: t.loyalty.earnDesc
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: t.loyalty.use,
      desc: t.loyalty.useDesc
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: t.loyalty.special,
      desc: t.loyalty.specialDesc
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] pt-20">
      {/* Header */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0F2A24] to-[#0F2A24]/95">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-[#C6A75E] mb-6">
            {t.loyalty.title}
          </h1>
          <p className="text-xl text-white/80 leading-relaxed">
            {t.loyalty.subtitle}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 px-4 bg-[#F7F5F0]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xl text-gray-700 leading-relaxed">
            {t.loyalty.text}
          </p>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 px-4 bg-[#E8E4DC]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-[#0F2A24] text-center mb-16">
            {t.loyalty.how}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#C6A75E]/10 flex items-center justify-center text-[#C6A75E]">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-medium text-[#0F2A24] mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Example Calculation */}
      <section className="py-20 px-4 bg-[#F7F5F0]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-[#0F2A24] text-center mb-12">
            {language === 'ru' ? 'Пример расчёта' : 'Example Calculation'}
          </h2>
          <Card className="border-[#C6A75E] overflow-hidden">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-700">
                    {language === 'ru' ? 'Массаж 60 мин' : '60 min massage'}
                  </span>
                  <span className="text-xl font-semibold text-[#0F2A24]">2 200₽</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                  <span className="text-gray-700">
                    {language === 'ru' ? 'Начислено баллов (5%)' : 'Points earned (5%)'}
                  </span>
                  <span className="text-xl font-semibold text-[#C6A75E]">+ 110 {language === 'ru' ? 'баллов' : 'points'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">
                    {language === 'ru' ? 'После 5 визитов накоплено' : 'After 5 visits accumulated'}
                  </span>
                  <span className="text-2xl font-bold text-[#C6A75E]">550 {language === 'ru' ? 'баллов' : 'points'}</span>
                </div>
                <div className="pt-4 text-center">
                  <p className="text-gray-600">
                    {language === 'ru'
                      ? 'Этими баллами можно оплатить до 660₽ следующего визита'
                      : 'These points can pay up to 660₽ of your next visit'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section 
        className="py-32 px-4 bg-cover bg-center relative"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1716662978426-1826599fcfea')` }}
      >
        <div className="absolute inset-0 bg-[#0F2A24]/80"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-[#C6A75E] mb-6">
            {language === 'ru'
              ? 'Присоединяйтесь к программе'
              : 'Join the Program'}
          </h2>
          <p className="text-lg text-white/80 mb-8">
            {language === 'ru'
              ? 'Программа действует автоматически для всех гостей студии'
              : 'The program is automatically active for all studio guests'}
          </p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#C6A75E] text-[#0F2A24] hover:bg-[#C6A75E]/90 px-12 py-6 text-lg">
              {t.loyalty.join}
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Loyalty;

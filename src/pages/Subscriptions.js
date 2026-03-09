import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { subscriptionsApi } from '../services/api';
import { subscriptions as mockSubscriptions } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Check, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const visitOptions = [3, 5, 10];

const groups = [
  { key: 'classic-60', category: 'classic', duration: 60 },
  { key: 'classic-90', category: 'classic', duration: 90 },
  { key: 'relaxing-60', category: 'relaxing', duration: 60 },
  { key: 'relaxing-90', category: 'relaxing', duration: 90 },
];

const Subscriptions = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const location = useLocation();

  // State for subscriptions data
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
  const [loading, setLoading] = useState(true);

  const [selectedVisits, setSelectedVisits] = useState({
    'classic-60': 3,
    'classic-90': 3,
    'relaxing-60': 3,
    'relaxing-90': 3,
  });

  // Fetch subscriptions from API
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const data = await subscriptionsApi.getAll();
        setSubscriptions(data);
      } catch (err) {
        setSubscriptions(mockSubscriptions);
        console.error('Failed to fetch subscriptions, using mock data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscriptions();
  }, []);

  const getSub = (category, duration, visits) =>
    subscriptions.find(s => s.category === category && s.duration === duration && s.visits === visits);

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-[#F7F5F0] pt-20">
      {/* Header */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0F2A24] to-[#0F2A24]/95">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-[#C6A75E] mb-6" data-testid="subscriptions-title">
            {t.subscriptions.title}
          </h1>
          <p className="text-xl text-white/80 leading-relaxed">
            {t.subscriptions.subtitle}
          </p>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="py-20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#C6A75E]" />
        </div>
      )}

      {/* Error State */}
      {false && (
        <div className="py-20 text-center">
          <p className="text-red-500">{language === 'ru' ? 'Ошибка загрузки данных' : 'Error loading data'}</p>
        </div>
      )}

      {/* Subscriptions Grid */}
      {!loading && (
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {groups.map(group => {
              const visits = selectedVisits[group.key];
              const sub = getSub(group.category, group.duration, visits);
              if (!sub) return null;

              return (
                <Card
                  key={group.key}
                  id={group.key}
                  data-testid={`subscription-card-${group.key}`}
                  className="overflow-hidden hover:shadow-2xl transition-all duration-300 scroll-mt-32"
                >
                  <CardContent className="p-8">
                    {/* Service name & duration */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-serif text-[#0F2A24] mb-1">
                        {language === 'ru' ? sub.nameRu : sub.nameEn}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {sub.duration} {t.services.duration} / {t.subscriptions.session}
                      </p>
                    </div>

                    {/* Visit selector */}
                    <div className="flex gap-2 mb-8" data-testid={`visits-selector-${group.key}`}>
                      {visitOptions.map(v => {
                        const isActive = visits === v;
                        const isBest = v === 10;
                        return (
                          <button
                            key={v}
                            onClick={() => setSelectedVisits(prev => ({ ...prev, [group.key]: v }))}
                            data-testid={`visit-btn-${group.key}-${v}`}
                            className={`flex-1 py-3 px-2 rounded-lg border-2 transition-all relative ${
                              isActive
                                ? 'border-[#C6A75E] bg-[#C6A75E]/10 text-[#0F2A24]'
                                : 'border-gray-200 text-gray-600 hover:border-[#C6A75E]/40'
                            }`}
                          >
                            {isBest && (
                              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-[#C6A75E] text-[#0F2A24] text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                                {language === 'ru' ? 'выгодно' : 'best'}
                              </span>
                            )}
                            <span className="font-semibold text-lg block">{v}</span>
                            <span className="text-xs block">
                              {v >= 5
                                ? (language === 'ru' ? 'сеансов' : 'sessions')
                                : (language === 'ru' ? 'посещения' : 'visits')}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Price block */}
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-[#0F2A24] mb-1" data-testid={`price-${group.key}`}>
                        {sub.price.toLocaleString()}₽
                      </div>
                      <div className="flex items-center justify-center gap-3 text-sm">
                        <span className="text-gray-500">
                          {sub.pricePerSession.toLocaleString()}₽ / {language === 'ru' ? 'сеанс' : 'session'}
                        </span>
                        <span className="text-[#C6A75E] font-medium">
                          -{sub.savings.toLocaleString()}₽
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      <div className="flex items-center text-sm text-gray-600">
                        <Check className="w-4 h-4 text-[#C6A75E] mr-2 flex-shrink-0" />
                        {language === 'ru'
                          ? `Действует ${visits === 3 ? '1 месяц' : visits === 5 ? '2 месяца' : '3 месяца'}`
                          : `Valid for ${visits === 3 ? '1 month' : visits === 5 ? '2 months' : '3 months'}`}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Check className="w-4 h-4 text-[#C6A75E] mr-2 flex-shrink-0" />
                        {language === 'ru' ? 'Можно дарить' : 'Can be gifted'}
                      </div>
                    </div>

                    {/* CTA */}
                    <a
                      href={`https://t.me/telesno_vlg?text=${encodeURIComponent(`Здравствуйте, хочу приобрести у Вас абонемент "${language === 'ru' ? sub.nameRu : sub.nameEn} ${sub.duration} мин" ${visits} сеансов`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      data-testid={`book-btn-${group.key}`}
                    >
                      <Button className="w-full bg-[#0F2A24] text-white hover:bg-[#C6A75E] hover:text-[#0F2A24] transition-colors">
                        {t.subscriptions.book}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-[#E8E4DC]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif text-[#0F2A24] text-center mb-12">
            {language === 'ru'
              ? 'Преимущества абонементов'
              : 'Membership Benefits'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-serif text-[#C6A75E] mb-4">01</div>
              <h3 className="text-xl font-medium text-[#0F2A24] mb-3">
                {language === 'ru' ? 'Выгодная цена' : 'Great Price'}
              </h3>
              <p className="text-gray-600">
                {language === 'ru'
                  ? 'Стоимость сеанса ниже'
                  : 'Lower session cost'}
              </p>
            </div>
            <div>
              <div className="text-4xl font-serif text-[#C6A75E] mb-4">02</div>
              <h3 className="text-xl font-medium text-[#0F2A24] mb-3">
                {language === 'ru' ? 'Регулярность' : 'Regularity'}
              </h3>
              <p className="text-gray-600">
                {language === 'ru'
                  ? 'Постоянная забота о теле даёт лучший эффект'
                  : 'Regular body care gives the best results'}
              </p>
            </div>
            <div>
              <div className="text-4xl font-serif text-[#C6A75E] mb-4">03</div>
              <h3 className="text-xl font-medium text-[#0F2A24] mb-3">
                {language === 'ru' ? 'Гибкость' : 'Flexibility'}
              </h3>
              <p className="text-gray-600">
                {language === 'ru'
                  ? 'Записывайтесь в удобное время в течение 1-3 месяцев'
                  : 'Book at your convenience within 1-3 months'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Subscriptions;

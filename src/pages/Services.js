import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { servicesApi } from '../services/api';
import { services as mockServices } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Clock, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Services = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  // State for services data
  const [services, setServices] = useState(mockServices);
  const [loading, setLoading] = useState(true);

  // Fetch services from API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await servicesApi.getAll();
        setServices(data);
      } catch (err) {
        setServices(mockServices);
        console.error('Failed to fetch services, using mock data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Group services by type
  const classicMassage = services.filter(s => s.category === 'classic');
  const relaxingMassage = services.filter(s => s.category === 'relaxing');
  const otherServices = services.filter(s => 
    s.category !== 'classic' && s.category !== 'relaxing'
  );

  // State for duration selection
  const [classicDuration, setClassicDuration] = useState(60);
  const [relaxingDuration, setRelaxingDuration] = useState(60);

  const getServiceByDuration = (serviceList, duration) => {
    return serviceList.find(s => s.duration === duration);
  };

  const handleCertificateClick = (category, duration) => {
    navigate(`/certificates?service=${category}&duration=${duration}`);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] pt-20">
      {/* Header */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0F2A24] to-[#0F2A24]/95">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-[#C6A75E] mb-6">
            {t.services.title}
          </h1>
          <p className="text-xl text-white/80 leading-relaxed">
            {t.services.subtitle}
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

      {/* Services Grid */}
      {!loading && (
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Classic Massage - Combined */}
            {classicMassage.length > 0 && (
              <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 group h-full flex flex-col">
                <div 
                  className="h-72 bg-cover bg-center relative overflow-hidden flex-shrink-0"
                  style={{ backgroundImage: `url('${classicMassage[0].image}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A24] via-[#0F2A24]/50 to-transparent group-hover:from-[#0F2A24]/90 transition-all duration-300"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-serif text-white mb-2">
                      {language === 'ru' ? 'Классический массаж' : 'Classic Massage'}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {language === 'ru' ? classicMassage[0].descRu : classicMassage[0].descEn}
                  </p>
                  
                  {/* Duration Selection */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">{t.services.duration}:</p>
                    <div className="flex gap-2">
                      {classicMassage.map(service => (
                        <button
                          key={service.duration}
                          onClick={() => setClassicDuration(service.duration)}
                          className={`flex-1 p-2 rounded border-2 transition-all ${
                            classicDuration === service.duration
                              ? 'border-[#C6A75E] bg-[#C6A75E]/5 text-[#0F2A24]'
                              : 'border-gray-200 text-gray-700 hover:border-[#C6A75E]/50'
                          }`}
                        >
                          <span className="font-medium">{service.duration} мин</span>
                          <span className="text-sm block">{service.price.toLocaleString()}₽</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 mt-auto">
                    <Button 
                      className="w-full bg-[#0F2A24] text-white hover:bg-[#C6A75E] hover:text-[#0F2A24] transition-colors"
                      onClick={() => {
                        const widgetId = classicMassage.find(s => s.duration === classicDuration)?.dikidiWidget || '205592';
                        const a = document.createElement('a');
                        a.href = `https://dikidi.net/#widget=${widgetId}`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }}
                    >
                      {t.services.book}
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        onClick={() => handleCertificateClick('classic', classicDuration)}
                        className="block cursor-pointer"
                      >
                        <Button variant="outline" className="w-full border-[#0F2A24] text-[#0F2A24] hover:bg-[#0F2A24] hover:text-white transition-colors">
                          {t.services.buyCertificate}
                        </Button>
                      </div>
                      <Link to={`/subscriptions#classic-${classicDuration}`} className="block">
                        <Button variant="outline" className="w-full border-[#0F2A24] text-[#0F2A24] hover:bg-[#0F2A24] hover:text-white transition-colors">
                          {t.services.buySubscription}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Relaxing Massage - Combined */}
            {relaxingMassage.length > 0 && (
              <Card className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 group h-full flex flex-col">
                <div 
                  className="h-72 bg-cover bg-center relative overflow-hidden flex-shrink-0"
                  style={{ backgroundImage: `url('${relaxingMassage[0].image}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A24] via-[#0F2A24]/50 to-transparent group-hover:from-[#0F2A24]/90 transition-all duration-300"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-serif text-white mb-2">
                      {language === 'ru' ? 'Расслабляющий массаж' : 'Relaxation Massage'}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {language === 'ru' ? relaxingMassage[0].descRu : relaxingMassage[0].descEn}
                  </p>
                  
                  {/* Duration Selection */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-2">{t.services.duration}:</p>
                    <div className="flex gap-2">
                      {relaxingMassage.map(service => (
                        <button
                          key={service.duration}
                          onClick={() => setRelaxingDuration(service.duration)}
                          className={`flex-1 p-2 rounded border-2 transition-all ${
                            relaxingDuration === service.duration
                              ? 'border-[#C6A75E] bg-[#C6A75E]/5 text-[#0F2A24]'
                              : 'border-gray-200 text-gray-700 hover:border-[#C6A75E]/50'
                          }`}
                        >
                          <span className="font-medium">{service.duration} мин</span>
                          <span className="text-sm block">{service.price.toLocaleString()}₽</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 mt-auto">
                    <Button 
                      className="w-full bg-[#0F2A24] text-white hover:bg-[#C6A75E] hover:text-[#0F2A24] transition-colors"
                      onClick={() => {
                        const widgetId = relaxingMassage.find(s => s.duration === relaxingDuration)?.dikidiWidget || '205592';
                        const a = document.createElement('a');
                        a.href = `https://dikidi.net/#widget=${widgetId}`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }}
                    >
                      {t.services.book}
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                      <div
                        onClick={() => handleCertificateClick('relaxing', relaxingDuration)}
                        className="block cursor-pointer"
                      >
                        <Button variant="outline" className="w-full border-[#0F2A24] text-[#0F2A24] hover:bg-[#0F2A24] hover:text-white transition-colors">
                          {t.services.buyCertificate}
                        </Button>
                      </div>
                      <Link to={`/subscriptions#relaxing-${relaxingDuration}`} className="block">
                        <Button variant="outline" className="w-full border-[#0F2A24] text-[#0F2A24] hover:bg-[#0F2A24] hover:text-white transition-colors">
                          {t.services.buySubscription}
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Other Services */}
            {otherServices.map(service => (
              <Card key={service.id} className="overflow-hidden hover:shadow-2xl transition-shadow duration-300 group h-full flex flex-col">
                <div 
                  className="h-72 bg-cover bg-center relative overflow-hidden flex-shrink-0"
                  style={{ backgroundImage: `url('${service.image}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A24] via-[#0F2A24]/50 to-transparent group-hover:from-[#0F2A24]/90 transition-all duration-300"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-serif text-white mb-2">
                      {language === 'ru' ? service.nameRu : service.nameEn}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {language === 'ru' ? service.descRu : service.descEn}
                  </p>
                  
                  {service.detailsRu && (
                    <div className="mb-6 bg-[#E8E4DC] p-4 rounded-lg">
                      <p className="text-sm font-medium text-[#0F2A24] mb-3">
                        {language === 'ru' ? 'Этапы сеанса:' : 'Session stages:'}
                      </p>
                      <ul className="space-y-2">
                        {(language === 'ru' ? service.detailsRu : service.detailsEn).map((detail, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="text-[#C6A75E] mr-2">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center text-gray-500">
                      <Clock className="w-5 h-5 mr-2" />
                      <span>{service.duration} {t.services.duration}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-semibold text-[#0F2A24]">
                        {service.price.toLocaleString()}₽
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mt-auto">
                    <Button 
                      className="w-full bg-[#0F2A24] text-white hover:bg-[#C6A75E] hover:text-[#0F2A24] transition-colors"
                      onClick={() => {
                        const widgetId = service.dikidiWidget || '205592';
                        const a = document.createElement('a');
                        a.href = `https://dikidi.net/#widget=${widgetId}`;
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }}
                    >
                      {t.services.book}
                    </Button>
                    <div
                      onClick={() => handleCertificateClick(service.category, service.duration)}
                      className="block w-full cursor-pointer"
                    >
                      <Button variant="outline" className="w-full border-[#0F2A24] text-[#0F2A24] hover:bg-[#0F2A24] hover:text-white transition-colors">
                        {t.services.buyCertificate}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

          </div>
        </div>
      </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#E8E4DC]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif text-[#0F2A24] mb-6">
            {language === 'ru' 
              ? 'Не знаете, что выбрать?'
              : 'Not sure what to choose?'}
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            {language === 'ru'
              ? 'Свяжитесь с нами, и мы подберём процедуру специально для вас.'
              : 'Contact us and we\'ll select the perfect treatment for you.'}
          </p>
          <a
            href={`https://t.me/telesno_vlg?text=${encodeURIComponent('Здравствуйте.\nПланирую визит в ТЕЛЕСНО и хотел(а) бы подобрать подходящую процедуру.\n\nИнтересует расслабление, снятие напряжения, массаж лица или программа для двоих.\nБуду благодарен(на) за рекомендацию.')}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="bg-[#C6A75E] text-[#0F2A24] hover:bg-[#C6A75E]/90 px-8 py-6 text-lg" data-testid="choose-procedure-btn">
              {language === 'ru' ? 'Подобрать процедуру' : 'Choose a treatment'}
            </Button>
          </a>
          <p className="text-sm text-gray-500 mt-4">
            {language === 'ru' ? 'Ответим лично в течение 5–10 минут.' : 'We\'ll reply personally within 5–10 minutes.'}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Services;

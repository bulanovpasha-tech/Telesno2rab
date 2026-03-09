import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { mastersApi } from '../services/api';
import { masters as mockMasters } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Send, Loader2 } from 'lucide-react';

const Masters = () => {
  const { language } = useLanguage();
  const t = translations[language];

  // State for masters data
  const [masters, setMasters] = useState(mockMasters);
  const [loading, setLoading] = useState(true);

  // Fetch masters from API
  useEffect(() => {
    const fetchMasters = async () => {
      try {
        const data = await mastersApi.getAll();
        setMasters(data);
      } catch (err) {
        setMasters(mockMasters);
        console.error('Failed to fetch masters, using mock data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMasters();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5F0] pt-20">
      {/* Header */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0F2A24] to-[#0F2A24]/95">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-[#C6A75E] mb-6">
            {t.masters.title}
          </h1>
          <p className="text-xl text-white/80 leading-relaxed">
            {t.masters.subtitle}
          </p>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="py-20 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#C6A75E]" />
        </div>
      )}

      {/* Masters Grid */}
      {!loading && (
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {masters.map(master => (
              <Card key={master.id} className="overflow-hidden hover:shadow-2xl transition-all duration-300 group h-full flex flex-col" data-testid={`master-card-${master.id}`}>
                <div className="relative overflow-hidden flex-shrink-0">
                  <div 
                    className="h-[500px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${master.image}')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2A24] via-transparent to-transparent"></div>
                  </div>
                </div>
                <CardContent className="p-8 flex flex-col flex-1">
                  {(language === 'ru' ? master.nameRu : master.nameEn) && (
                    <h3 className="text-3xl font-serif text-[#0F2A24] mb-2">
                      {language === 'ru' ? master.nameRu : master.nameEn}
                    </h3>
                  )}

                  {(language === 'ru' ? master.specializationRu : master.specializationEn) && (
                    <p className="text-[#C6A75E] font-medium mb-4">
                      {language === 'ru' ? master.specializationRu : master.specializationEn}
                    </p>
                  )}

                  {(language === 'ru' ? master.bioIntroRu : master.bioIntroEn) && (
                    <div className="mb-6">
                      <p className="text-gray-600 mb-3">
                        {language === 'ru' ? master.bioIntroRu : master.bioIntroEn}
                      </p>
                      {(language === 'ru' ? master.bioDetailsRu : master.bioDetailsEn) && (
                        <ul className="space-y-2">
                          {(language === 'ru' ? master.bioDetailsRu : master.bioDetailsEn).map((detail, idx) => (
                            <li key={idx} className="text-gray-600 flex items-start text-sm leading-relaxed">
                              <span className="text-[#C6A75E] mr-2 mt-0.5 flex-shrink-0">&#8226;</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                  {(language === 'ru' ? master.bioRu : master.bioEn) && (
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {language === 'ru' ? master.bioRu : master.bioEn}
                    </p>
                  )}

                  <Button
                    className="w-full bg-[#0F2A24] text-white hover:bg-[#C6A75E] hover:text-[#0F2A24] transition-colors mt-auto"
                    data-testid={`book-master-${master.id}`}
                    onClick={() => {
                      const a = document.createElement('a');
                      a.href = `https://dikidi.net/#widget=${master.dikidiWidget}`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                    }}
                  >
                    {t.masters.book}
                  </Button>
                </CardContent>
              </Card>
            ))}

            {/* Join Our Team Card */}
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group h-full flex flex-col" data-testid="join-team-card">
              <div className="relative overflow-hidden flex-shrink-0">
                <div 
                  className="h-[500px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1765745520336-88acf0b84fe4?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85')` }}
                >
                  <div className="absolute inset-0 bg-[#0F2A24]/50 group-hover:bg-[#0F2A24]/40 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-serif text-[#C6A75E]">?</span>
                  </div>
                </div>
              </div>
              <CardContent className="p-8 flex flex-col flex-1">
                <h3 className="text-3xl font-serif text-[#0F2A24] mb-4">
                  {language === 'ru' ? 'Ищем в команду' : 'Join Our Team'}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-3">
                  {language === 'ru' 
                    ? 'Мы растём и ищем мастера, который разделяет наши ценности: внимание к человеку, бережное отношение к телу и стремление к качеству.' 
                    : 'We are growing and looking for a master who shares our values: attention to people, care for the body, and commitment to quality.'}
                </p>
                <p className="text-gray-600 leading-relaxed mb-2">
                  {language === 'ru' 
                    ? 'Если вы практикуете массаж и хотите работать в пространстве, где важен каждый клиент — напишите нам.' 
                    : 'If you practice massage and want to work in a space where every client matters — contact us.'}
                </p>
                <a href="https://t.me/telesno_vlg" target="_blank" rel="noopener noreferrer" className="block mt-auto">
                  <Button className="w-full bg-[#C6A75E] text-[#0F2A24] hover:bg-[#0F2A24] hover:text-white transition-colors" data-testid="join-team-btn">
                    <Send className="w-4 h-4 mr-2" />
                    {language === 'ru' ? 'Хочу к Вам' : 'I want to join'}
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      )}

      {/* Philosophy Section */}
      <section 
        className="py-32 px-4 bg-cover bg-center relative"
        style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_9da52546-8069-4452-96ab-36a538719de1/artifacts/miqvespr_%D0%A4%D0%BE%D1%82%D0%BE06.png')` }}
      >
        <div className="absolute inset-0 bg-[#0F2A24]/85"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-[#C6A75E] mb-6">
            {language === 'ru' 
              ? 'Профессионализм и забота'
              : 'Professionalism and Care'}
          </h2>
          <p className="text-lg text-white/90 leading-relaxed">
            {language === 'ru'
              ? 'Наши мастера регулярно проходят обучение, изучают новые техники и подходы. Но главное — они умеют слышать тело и работать с уважением к его границам.'
              : 'Our masters regularly undergo training, study new techniques and approaches. But most importantly, they know how to listen to the body and work with respect for its boundaries.'}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Masters;

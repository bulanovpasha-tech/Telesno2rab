import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const About = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="min-h-screen bg-[#F7F5F0] pt-20">
      {/* Header */}
      <section className="py-20 px-4 bg-gradient-to-b from-[#0F2A24] to-[#0F2A24]/95">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-serif text-[#C6A75E] mb-6">
            {t.about.title}
          </h1>
          <p className="text-xl text-white/80 leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif text-[#0F2A24] mb-8">
            {t.about.story}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t.about.storyText}
          </p>
        </div>
      </section>

      {/* Philosophy Image Section */}
      <section 
        className="py-32 px-4 bg-cover bg-center relative"
        style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_9da52546-8069-4452-96ab-36a538719de1/artifacts/oyq12pni_%D0%A4%D0%BE%D1%82%D0%BE08.jpg')` }}
      >
        <div className="absolute inset-0 bg-[#0F2A24]/75"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif text-[#C6A75E] mb-8">
            {t.about.philosophy}
          </h2>
          <p className="text-xl text-white/90 leading-relaxed">
            {t.about.philosophyText}
          </p>
        </div>
      </section>

      {/* Space */}
      <section className="py-20 px-4 bg-[#F7F5F0]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif text-[#0F2A24] mb-8">
            {t.about.space}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-12">
            {t.about.spaceText}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div 
              className="h-64 bg-cover bg-center rounded-lg"
              style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_9da52546-8069-4452-96ab-36a538719de1/artifacts/r1lovv27_%D0%A4%D0%BE%D1%82%D0%BE09.png')` }}
            ></div>
            <div 
              className="h-64 bg-cover bg-center rounded-lg"
              style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_9da52546-8069-4452-96ab-36a538719de1/artifacts/wwzkme67_%D0%A4%D0%BE%D1%82%D0%BE10.jpg')` }}
            ></div>
            <div 
              className="h-64 bg-cover bg-center rounded-lg"
              style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_9da52546-8069-4452-96ab-36a538719de1/artifacts/ncucep3p_%D0%A4%D0%BE%D1%82%D0%BE11.png')` }}
            ></div>
            <div 
              className="h-64 bg-cover bg-center rounded-lg"
              style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_9da52546-8069-4452-96ab-36a538719de1/artifacts/02jdlta7_%D0%A4%D0%BE%D1%82%D0%BE12.jpg')` }}
            ></div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-[#E8E4DC]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-serif text-[#0F2A24] mb-8">
            {t.about.team}
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            {t.about.teamText}
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 bg-[#0F2A24]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-[#C6A75E] text-center mb-16">
            {language === 'ru' ? 'Наши ценности' : 'Our Values'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-5xl font-serif text-[#C6A75E] mb-4">01</div>
              <h3 className="text-xl font-medium text-white mb-3">
                {language === 'ru' ? 'Качество' : 'Quality'}
              </h3>
              <p className="text-white/70">
                {language === 'ru'
                  ? 'Мы не экономим на времени и внимании к деталям'
                  : 'We don\'t compromise on time and attention to detail'}
              </p>
            </div>
            <div>
              <div className="text-5xl font-serif text-[#C6A75E] mb-4">02</div>
              <h3 className="text-xl font-medium text-white mb-3">
                {language === 'ru' ? 'Уважение' : 'Respect'}
              </h3>
              <p className="text-white/70">
                {language === 'ru'
                  ? 'К вашему телу, времени и личным границам'
                  : 'For your body, time and personal boundaries'}
              </p>
            </div>
            <div>
              <div className="text-5xl font-serif text-[#C6A75E] mb-4">03</div>
              <h3 className="text-xl font-medium text-white mb-3">
                {language === 'ru' ? 'Атмосфера' : 'Atmosphere'}
              </h3>
              <p className="text-white/70">
                {language === 'ru'
                  ? 'Пространство, в котором легко отпустить напряжение'
                  : 'A space where it\'s easy to release tension'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

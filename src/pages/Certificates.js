import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { servicesApi } from '../services/api';
import { services as mockServices } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Check, Mail, Printer, MessageSquare, Loader2 } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Certificates = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const location = useLocation();

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
        console.error('Failed to fetch services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // Generate dates
  const purchaseDate = new Date();
  const expiryDate = new Date();
  expiryDate.setMonth(expiryDate.getMonth() + 6);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // State for certificate builder
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(60);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedFormat, setSelectedFormat] = useState('electronic');
  const [message, setMessage] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [amountOnly, setAmountOnly] = useState(false);

  // Checkout form state
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    phone: '',
    email: '',
    recipientName: '',
    recipientPhone: '',
    recipientEmail: '',
    messenger: 'WhatsApp',
    sendViaMessenger: false
  });

  const predefinedAmounts = [3000, 4000, 5000];
  
  // Group services
  const classicMassage = services.filter(s => s.category === 'classic');
  const relaxingMassage = services.filter(s => s.category === 'relaxing');
  const otherServices = services.filter(s => 
    s.category !== 'classic' && s.category !== 'relaxing'
  );

  // Parse URL params to pre-select service
  useEffect(() => {
    if (services.length === 0) return;
    
    const params = new URLSearchParams(location.search);
    const serviceParam = params.get('service');
    const durationParam = params.get('duration');
    
    if (serviceParam && durationParam) {
      const duration = parseInt(durationParam);
      setSelectedDuration(duration);
      
      if (serviceParam === 'classic') {
        setSelectedService({ type: 'classic', duration });
      } else if (serviceParam === 'relaxing') {
        setSelectedService({ type: 'relaxing', duration });
      } else {
        const service = services.find(s => s.category === serviceParam);
        if (service) {
          setSelectedService({ type: 'other', service });
        }
      }
    }
  }, [location, services]);

  const isValidAmount = () => {
    if (selectedAmount === 'custom') {
      const amount = parseInt(customAmount);
      return amount >= 5000;
    }
    return selectedAmount !== null;
  };

  const canPurchase = selectedFormat && (
    (selectedService && !amountOnly) || 
    (amountOnly && isValidAmount())
  );

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    if (amount !== null) {
      setAmountOnly(true);
      setSelectedService(null);
    }
  };

  const handleServiceSelect = (serviceData) => {
    setSelectedService(serviceData);
    setAmountOnly(false);
    setSelectedAmount(null);
    setCustomAmount('');
  };

  const getServiceName = () => {
    if (!selectedService || amountOnly) return null;
    
    if (selectedService.type === 'classic') {
      return language === 'ru' ? 'Классический массаж' : 'Classic Massage';
    } else if (selectedService.type === 'relaxing') {
      return language === 'ru' ? 'Расслабляющий массаж' : 'Relaxation Massage';
    } else if (selectedService.service) {
      return language === 'ru' ? selectedService.service.nameRu : selectedService.service.nameEn;
    }
    return null;
  };

  const getServiceDuration = () => {
    if (!selectedService || amountOnly) return null;
    
    if (selectedService.type === 'classic' || selectedService.type === 'relaxing') {
      return selectedService.duration;
    } else if (selectedService.service) {
      return selectedService.service.duration;
    }
    return null;
  };

  const handlePurchase = () => {
    if (canPurchase) {
      setShowCheckout(true);
    }
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    
    const serviceName = !amountOnly && getServiceName() 
      ? `${getServiceName()}${getServiceDuration() ? ` (${getServiceDuration()} мин)` : ''}`
      : 'На номинал';
    
    const amount = getDisplayAmount() || '—';
    const format = selectedFormat === 'electronic' ? 'Электронный' : 'Печатный';
    
    const text = [
      'Новая заявка на сертификат:',
      `Имя: ${checkoutForm.name}`,
      checkoutForm.recipientName ? `Имя получателя: ${checkoutForm.recipientName}` : '',
      checkoutForm.recipientPhone ? `Телефон получателя: ${checkoutForm.recipientPhone}` : '',
      selectedFormat === 'electronic' && checkoutForm.sendViaMessenger ? `Мессенджер: ${checkoutForm.messenger}` : '',
      selectedFormat === 'electronic' && !checkoutForm.sendViaMessenger && checkoutForm.recipientEmail ? `Email получателя: ${checkoutForm.recipientEmail}` : '',
      `Услуга: ${serviceName}`,
      `Номинал: ${amount}`,
      `Формат: ${format}`,
      message ? `Пожелание: ${message}` : ''
    ].filter(Boolean).join('\n');
    
    window.open(`https://t.me/telesno_vlg?text=${encodeURIComponent(text)}`, '_blank');
    setShowCheckout(false);
  };

  const getDisplayAmount = () => {
    if (selectedAmount === 'custom') {
      return `${parseInt(customAmount || 0).toLocaleString()}₽`;
    }
    return selectedAmount ? `${selectedAmount.toLocaleString()}₽` : '';
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] pt-20">
      {/* Header */}
      <section className="py-12 px-4 bg-gradient-to-b from-[#0F2A24] to-[#0F2A24]/95">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-[#C6A75E] mb-4">
            {t.certificates.title}
          </h1>
          <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto">
            {t.certificates.subtitle}
          </p>
        </div>
      </section>

      {/* Certificate Builder */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Left Column - Controls */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Step 1: Service Selection */}
              <div className="bg-white rounded-xl p-6 shadow-sm" data-testid="service-selection">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-[#0F2A24] text-[#C6A75E] flex items-center justify-center text-sm font-bold flex-shrink-0">1</div>
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-[#0F2A24]">
                      {language === 'ru' ? 'Выберите услугу' : 'Choose Service'}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {language === 'ru' ? 'или перейдите сразу к номиналу' : 'or skip to amount'}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  
                  {/* Classic Massage */}
                  {classicMassage.length > 0 && (
                    <button
                      onClick={() => handleServiceSelect({ type: 'classic', duration: selectedDuration })}
                      data-testid="service-classic"
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        selectedService?.type === 'classic'
                          ? 'bg-[#0F2A24] shadow-lg'
                          : 'bg-[#F7F5F0] hover:bg-[#E8E4DC]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <p className={`font-medium ${selectedService?.type === 'classic' ? 'text-[#C6A75E]' : 'text-[#0F2A24]'}`}>
                          {language === 'ru' ? 'Классический массаж' : 'Classic Massage'}
                        </p>
                        {selectedService?.type === 'classic' && (
                          <Check className="w-5 h-5 text-[#C6A75E] flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex gap-2">
                        {classicMassage.map(service => (
                          <div
                            key={service.duration}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDuration(service.duration);
                              handleServiceSelect({ type: 'classic', duration: service.duration });
                            }}
                            className={`flex-1 py-2 px-3 text-center rounded-lg transition-all cursor-pointer text-sm font-medium ${
                              selectedService?.type === 'classic' && selectedDuration === service.duration
                                ? 'bg-[#C6A75E] text-[#0F2A24] font-bold'
                                : selectedService?.type === 'classic'
                                  ? 'bg-white/10 text-white/70 hover:bg-white/20'
                                  : 'bg-white text-[#0F2A24] hover:bg-[#C6A75E]/10'
                            }`}
                          >
                            {service.duration} {language === 'ru' ? 'мин' : 'min'}
                          </div>
                        ))}
                      </div>
                    </button>
                  )}

                  {/* Relaxing Massage */}
                  {relaxingMassage.length > 0 && (
                    <button
                      onClick={() => handleServiceSelect({ type: 'relaxing', duration: selectedDuration })}
                      data-testid="service-relaxing"
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        selectedService?.type === 'relaxing'
                          ? 'bg-[#0F2A24] shadow-lg'
                          : 'bg-[#F7F5F0] hover:bg-[#E8E4DC]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <p className={`font-medium ${selectedService?.type === 'relaxing' ? 'text-[#C6A75E]' : 'text-[#0F2A24]'}`}>
                          {language === 'ru' ? 'Расслабляющий массаж' : 'Relaxation Massage'}
                        </p>
                        {selectedService?.type === 'relaxing' && (
                          <Check className="w-5 h-5 text-[#C6A75E] flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex gap-2">
                        {relaxingMassage.map(service => (
                          <div
                            key={service.duration}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedDuration(service.duration);
                              handleServiceSelect({ type: 'relaxing', duration: service.duration });
                            }}
                            className={`flex-1 py-2 px-3 text-center rounded-lg transition-all cursor-pointer text-sm font-medium ${
                              selectedService?.type === 'relaxing' && selectedDuration === service.duration
                                ? 'bg-[#C6A75E] text-[#0F2A24] font-bold'
                                : selectedService?.type === 'relaxing'
                                  ? 'bg-white/10 text-white/70 hover:bg-white/20'
                                  : 'bg-white text-[#0F2A24] hover:bg-[#C6A75E]/10'
                            }`}
                          >
                            {service.duration} {language === 'ru' ? 'мин' : 'min'}
                          </div>
                        ))}
                      </div>
                    </button>
                  )}

                  {/* Other Services */}
                  {otherServices.map(service => (
                    <button
                      key={service.id}
                      onClick={() => handleServiceSelect({ type: 'other', service })}
                      data-testid={`service-${service.id}`}
                      className={`w-full text-left p-4 rounded-xl transition-all ${
                        selectedService?.service?.id === service.id
                          ? 'bg-[#0F2A24] shadow-lg'
                          : 'bg-[#F7F5F0] hover:bg-[#E8E4DC]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className={`font-medium ${selectedService?.service?.id === service.id ? 'text-[#C6A75E]' : 'text-[#0F2A24]'}`}>
                            {language === 'ru' ? service.nameRu : service.nameEn}
                          </p>
                          <p className={`text-sm mt-1 ${selectedService?.service?.id === service.id ? 'text-white/60' : 'text-gray-400'}`}>
                            {service.duration} {t.services.duration}
                          </p>
                        </div>
                        {selectedService?.service?.id === service.id && (
                          <Check className="w-5 h-5 text-[#C6A75E] flex-shrink-0 ml-3" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Amount Selection */}
              <div className="bg-white rounded-xl p-6 shadow-sm" data-testid="amount-selection">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-[#0F2A24] text-[#C6A75E] flex items-center justify-center text-sm font-bold flex-shrink-0">2</div>
                  <h3 className="text-lg font-serif font-semibold text-[#0F2A24]">
                    {language === 'ru' ? 'Номинал сертификата' : 'Certificate Amount'}
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {predefinedAmounts.map(amount => (
                    <button
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      data-testid={`amount-${amount}`}
                      className={`py-4 rounded-xl font-bold text-lg transition-all ${
                        selectedAmount === amount
                          ? 'bg-[#C6A75E] text-[#0F2A24] shadow-md'
                          : 'bg-[#F7F5F0] text-[#0F2A24] hover:bg-[#E8E4DC]'
                      }`}
                    >
                      {amount.toLocaleString()}₽
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => handleAmountSelect('custom')}
                  data-testid="amount-custom"
                  className={`w-full py-3 rounded-xl text-sm font-medium transition-all ${
                    selectedAmount === 'custom'
                      ? 'bg-[#C6A75E] text-[#0F2A24] shadow-md'
                      : 'bg-[#F7F5F0] text-[#0F2A24] hover:bg-[#E8E4DC]'
                  }`}
                >
                  {language === 'ru' ? 'Своя сумма от 5 000₽' : 'Custom amount from 5,000₽'}
                </button>
                
                {selectedAmount === 'custom' && (
                  <div className="mt-3">
                    <Input
                      type="number"
                      min="5000"
                      placeholder="5000"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setAmountOnly(true);
                        setSelectedService(null);
                      }}
                      className="text-lg bg-[#F7F5F0] border-0 rounded-xl"
                    />
                    {customAmount && parseInt(customAmount) < 5000 && (
                      <p className="text-sm text-red-500 mt-2">
                        {language === 'ru' ? 'Минимальная сумма 5 000₽' : 'Minimum amount 5,000₽'}
                      </p>
                    )}
                  </div>
                )}
                
                {(selectedAmount || customAmount) && (
                  <p className="text-xs text-gray-400 mt-3">
                    {language === 'ru' 
                      ? '* При выборе номинала услуга не указывается'
                      : '* Service not shown when amount is selected'}
                  </p>
                )}
              </div>

              {/* Step 3: Format */}
              <div className="bg-white rounded-xl p-6 shadow-sm" data-testid="format-selection">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-[#0F2A24] text-[#C6A75E] flex items-center justify-center text-sm font-bold flex-shrink-0">3</div>
                  <h3 className="text-lg font-serif font-semibold text-[#0F2A24]">
                    {language === 'ru' ? 'Формат получения' : 'Delivery Format'}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setSelectedFormat('electronic')}
                    data-testid="format-electronic"
                    className={`p-4 rounded-xl transition-all flex flex-col items-center text-center ${
                      selectedFormat === 'electronic'
                        ? 'bg-[#0F2A24] shadow-md'
                        : 'bg-[#F7F5F0] hover:bg-[#E8E4DC]'
                    }`}
                  >
                    <Mail className={`w-6 h-6 mb-2 ${selectedFormat === 'electronic' ? 'text-[#C6A75E]' : 'text-[#0F2A24]'}`} />
                    <p className={`font-medium text-sm ${selectedFormat === 'electronic' ? 'text-white' : 'text-[#0F2A24]'}`}>
                      {language === 'ru' ? 'Электронный' : 'Electronic'}
                    </p>
                    <p className={`text-xs mt-1 ${selectedFormat === 'electronic' ? 'text-white/60' : 'text-gray-400'}`}>
                      {language === 'ru' ? 'На почту / мессенджер' : 'Email / messenger'}
                    </p>
                  </button>
                  <button
                    onClick={() => setSelectedFormat('printed')}
                    data-testid="format-printed"
                    className={`p-4 rounded-xl transition-all flex flex-col items-center text-center ${
                      selectedFormat === 'printed'
                        ? 'bg-[#0F2A24] shadow-md'
                        : 'bg-[#F7F5F0] hover:bg-[#E8E4DC]'
                    }`}
                  >
                    <Printer className={`w-6 h-6 mb-2 ${selectedFormat === 'printed' ? 'text-[#C6A75E]' : 'text-[#0F2A24]'}`} />
                    <p className={`font-medium text-sm ${selectedFormat === 'printed' ? 'text-white' : 'text-[#0F2A24]'}`}>
                      {language === 'ru' ? 'Печатный' : 'Printed'}
                    </p>
                    <p className={`text-xs mt-1 ${selectedFormat === 'printed' ? 'text-white/60' : 'text-gray-400'}`}>
                      {language === 'ru' ? 'Самовывоз в студии' : 'Pick up at studio'}
                    </p>
                  </button>
                </div>
              </div>

              {/* Step 4: Message */}
              <div className="bg-white rounded-xl p-6 shadow-sm" data-testid="message-section">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-[#C6A75E]/20 text-[#C6A75E] flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-lg font-serif font-semibold text-[#0F2A24]">
                      {language === 'ru' ? 'Пожелание' : 'Message'}
                    </h3>
                    <p className="text-xs text-gray-400">
                      {language === 'ru' ? 'необязательно' : 'optional'}
                    </p>
                  </div>
                </div>
                <Textarea
                  placeholder={language === 'ru' ? 'Напишите тёплые слова получателю...' : 'Write warm words to the recipient...'}
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, 120))}
                  maxLength={120}
                  rows={3}
                  className="resize-none bg-[#F7F5F0] border-0 rounded-xl"
                />
                <p className="text-xs text-gray-400 mt-2 text-right">
                  {message.length} / 120
                </p>
              </div>

            </div>

            {/* Right Column - Certificate Preview & CTA */}
            <div className="lg:col-span-3 lg:sticky lg:top-24 h-fit">
              
              {/* Certificate Preview */}
              <div className="certificate-preview-container mb-8">
                <div className="rounded-2xl shadow-2xl aspect-[210/297] max-w-sm mx-auto relative overflow-hidden"
                  style={{ backgroundImage: `url('https://customer-assets.emergentagent.com/job_9da52546-8069-4452-96ab-36a538719de1/artifacts/lyi1o2nm_%D0%A4%D0%BE%D1%82%D0%BE07.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0F2A24]/90 via-[#0F2A24]/70 to-[#0F2A24]/95"></div>
                  
                  {/* Gold border frame */}
                  <div className="absolute inset-3 border border-[#C6A75E]/30 rounded-xl pointer-events-none"></div>
                  
                  {/* Corner decorations */}
                  <div className="absolute top-5 left-5 w-6 h-6 border-t-2 border-l-2 border-[#C6A75E]/60 rounded-tl-sm"></div>
                  <div className="absolute top-5 right-5 w-6 h-6 border-t-2 border-r-2 border-[#C6A75E]/60 rounded-tr-sm"></div>
                  <div className="absolute bottom-5 left-5 w-6 h-6 border-b-2 border-l-2 border-[#C6A75E]/60 rounded-bl-sm"></div>
                  <div className="absolute bottom-5 right-5 w-6 h-6 border-b-2 border-r-2 border-[#C6A75E]/60 rounded-br-sm"></div>

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col p-8">
                    
                    {/* Top label */}
                    <div className="text-center mb-2">
                      <span className="text-[10px] uppercase tracking-[4px] text-[#C6A75E]/70 font-light">
                        {language === 'ru' ? 'подарочный сертификат' : 'gift certificate'}
                      </span>
                    </div>

                    {/* Brand */}
                    <div className="text-center mb-4">
                      <h2 className="text-4xl md:text-5xl font-serif tracking-[6px] certificate-gold leading-none mb-2">
                        ТЕЛЕСНО
                      </h2>
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-8 h-px bg-gradient-to-r from-transparent to-[#C6A75E]/60"></div>
                        <span className="text-[9px] uppercase tracking-[3px] text-white/50">
                          {language === 'ru' ? 'студия массажа' : 'massage studio'}
                        </span>
                        <div className="w-8 h-px bg-gradient-to-l from-transparent to-[#C6A75E]/60"></div>
                      </div>
                    </div>

                    {/* Main content area */}
                    <div className="flex-1 flex flex-col justify-center">
                      
                      {/* Service */}
                      {!amountOnly && getServiceName() ? (
                        <div className="text-center animate-fade-in mb-4">
                          <div className="inline-block backdrop-blur-sm bg-white/5 rounded-xl px-6 py-4 border border-white/10">
                            <p className="text-[10px] uppercase tracking-[2px] text-white/50 mb-2">
                              {language === 'ru' ? 'услуга' : 'service'}
                            </p>
                            <p className="text-lg font-serif certificate-gold leading-snug">
                              {getServiceName()}
                            </p>
                            {getServiceDuration() && (
                              <p className="text-xs text-white/50 mt-1">
                                {getServiceDuration()} {t.services.duration}
                              </p>
                            )}
                          </div>
                        </div>
                      ) : !amountOnly && (
                        <div className="text-center mb-4">
                          <div className="inline-block backdrop-blur-sm bg-white/5 rounded-xl px-6 py-4 border border-dashed border-white/10">
                            <p className="text-white/30 text-xs italic">
                              {language === 'ru' ? 'Выберите услугу или номинал' : 'Select service or amount'}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Amount */}
                      {(selectedAmount || customAmount) && isValidAmount() && (
                        <div className="text-center animate-fade-in mb-4">
                          <div className="inline-block">
                            <p className="text-[10px] uppercase tracking-[2px] text-white/50 mb-1">
                              {language === 'ru' ? 'номинал' : 'amount'}
                            </p>
                            <p className="text-4xl font-bold certificate-gold tracking-wide">
                              {getDisplayAmount()}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Message */}
                      {message && (
                        <div className="text-center animate-fade-in">
                          <p className="text-xs italic text-white/60 font-serif px-4 leading-relaxed">
                            &laquo;{message}&raquo;
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Bottom section */}
                    <div className="mt-auto space-y-3">
                      {/* Format badge */}
                      <div className="text-center">
                        <span className="inline-block text-[10px] uppercase tracking-[2px] text-[#C6A75E]/60 bg-[#C6A75E]/5 px-3 py-1 rounded-full border border-[#C6A75E]/10">
                          {selectedFormat === 'electronic' 
                            ? (language === 'ru' ? 'электронный' : 'electronic')
                            : (language === 'ru' ? 'печатный' : 'printed')
                          }
                        </span>
                      </div>
                      
                      {/* Dates */}
                      <div className="flex items-center justify-between text-center pt-3 border-t border-[#C6A75E]/10">
                        <div>
                          <p className="text-[9px] uppercase tracking-wider text-white/35 mb-0.5">
                            {language === 'ru' ? 'Оформлен' : 'Issued'}
                          </p>
                          <p className="text-xs text-white/80 font-medium">{formatDate(purchaseDate)}</p>
                        </div>
                        <div className="w-px h-6 bg-[#C6A75E]/20"></div>
                        <div>
                          <p className="text-[9px] uppercase tracking-wider text-white/35 mb-0.5">
                            {language === 'ru' ? 'Действителен до' : 'Valid until'}
                          </p>
                          <p className="text-xs text-white/80 font-medium">{formatDate(expiryDate)}</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="text-center">
                <Button
                  onClick={handlePurchase}
                  disabled={!canPurchase}
                  className={`w-full max-w-md mx-auto py-6 text-lg transition-all ${
                    canPurchase
                      ? 'bg-[#C6A75E] text-[#0F2A24] hover:bg-[#C6A75E]/90'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {language === 'ru' ? 'Купить / Отправить заявку' : 'Buy / Send Request'}
                </Button>
                <div className="flex items-center justify-center mt-4 space-x-3">
                  <div className="w-8 h-px bg-[#C6A75E]/30"></div>
                  <p className="text-sm text-gray-500">
                    {language === 'ru' ? 'Действует 6 месяцев' : 'Valid for 6 months'}
                  </p>
                  <div className="w-8 h-px bg-[#C6A75E]/30"></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Checkout Modal */}
      <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-[#0F2A24]">
              {language === 'ru' ? 'Оформление сертификата' : 'Certificate Checkout'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Summary */}
            <div className="bg-[#E8E4DC] p-4 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{language === 'ru' ? 'Услуга:' : 'Service:'}</span>
                <span className="font-medium text-[#0F2A24]">
                  {!amountOnly && getServiceName() 
                    ? `${getServiceName()} ${getServiceDuration() ? `(${getServiceDuration()} мин)` : ''}`
                    : (language === 'ru' ? 'На номинал' : 'Amount only')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{language === 'ru' ? 'Номинал:' : 'Amount:'}</span>
                <span className="font-medium text-[#0F2A24]">
                  {getDisplayAmount()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{language === 'ru' ? 'Формат:' : 'Format:'}</span>
                <span className="font-medium text-[#0F2A24]">
                  {selectedFormat === 'electronic' 
                    ? (language === 'ru' ? 'Электронный' : 'Electronic')
                    : (language === 'ru' ? 'Печатный' : 'Printed')
                  }
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleCheckoutSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {language === 'ru' ? 'Ваше имя' : 'Your name'} *
                </label>
                <Input
                  required
                  value={checkoutForm.name}
                  onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})}
                  placeholder={language === 'ru' ? 'Иван Иванов' : 'John Doe'}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {selectedFormat === 'electronic'
                    ? (language === 'ru' ? 'Имя получателя' : 'Recipient name')
                    : (language === 'ru' ? 'Телефон получателя' : 'Recipient phone')
                  } *
                </label>
                {selectedFormat === 'electronic' ? (
                  <Input
                    required
                    value={checkoutForm.recipientName}
                    onChange={(e) => setCheckoutForm({...checkoutForm, recipientName: e.target.value})}
                    placeholder={language === 'ru' ? 'Имя получателя' : 'Recipient name'}
                  />
                ) : (
                  <Input
                    required
                    type="tel"
                    value={checkoutForm.recipientPhone}
                    onChange={(e) => setCheckoutForm({...checkoutForm, recipientPhone: e.target.value})}
                    placeholder="+7 (999) 999-99-99"
                  />
                )}
              </div>

              {selectedFormat === 'electronic' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'ru' ? 'Телефон получателя' : 'Recipient phone'} *
                    </label>
                    <Input
                      required
                      type="tel"
                      value={checkoutForm.recipientPhone}
                      onChange={(e) => setCheckoutForm({...checkoutForm, recipientPhone: e.target.value})}
                      placeholder="+7 (999) 999-99-99"
                    />
                  </div>

                  {/* Toggle: Messenger or Email */}
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={checkoutForm.sendViaMessenger}
                        onChange={(e) => setCheckoutForm({...checkoutForm, sendViaMessenger: e.target.checked})}
                        className="w-4 h-4 rounded border-gray-300 text-[#C6A75E] focus:ring-[#C6A75E]"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {language === 'ru' ? 'Отправить в мессенджер' : 'Send via messenger'}
                      </span>
                    </label>

                    {checkoutForm.sendViaMessenger ? (
                      <div className="flex gap-2">
                        {['WhatsApp', 'Telegram', 'MAX'].map(m => (
                          <button
                            key={m}
                            type="button"
                            onClick={() => setCheckoutForm({...checkoutForm, messenger: m})}
                            className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                              checkoutForm.messenger === m
                                ? 'bg-[#0F2A24] text-[#C6A75E]'
                                : 'bg-[#F7F5F0] text-[#0F2A24] hover:bg-[#E8E4DC]'
                            }`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {language === 'ru' ? 'Email получателя' : 'Recipient email'} *
                        </label>
                        <Input
                          required
                          type="email"
                          value={checkoutForm.recipientEmail}
                          onChange={(e) => setCheckoutForm({...checkoutForm, recipientEmail: e.target.value})}
                          placeholder="example@email.com"
                        />
                      </div>
                    )}
                  </div>
                </>
              )}

              {selectedFormat === 'printed' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {language === 'ru' ? 'Имя получателя' : 'Recipient name'}
                    </label>
                    <Input
                      value={checkoutForm.recipientName}
                      onChange={(e) => setCheckoutForm({...checkoutForm, recipientName: e.target.value})}
                      placeholder={language === 'ru' ? 'Имя получателя' : 'Recipient name'}
                    />
                  </div>
                  <div className="bg-[#F7F5F0] p-3 rounded-lg">
                    <p className="text-sm text-[#0F2A24]">
                      <strong>{language === 'ru' ? 'Самовывоз:' : 'Pick up:'}</strong>
                      <br />
                      {language === 'ru' 
                        ? 'Волгоград, ул. Рабоче-Крестьянская, д.35'
                        : 'Volgograd, Raboche-Krestyanskaya St., 35'}
                    </p>
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCheckout(false)}
                  className="flex-1"
                >
                  {language === 'ru' ? 'Закрыть' : 'Close'}
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-[#C6A75E] text-[#0F2A24] hover:bg-[#C6A75E]/90"
                >
                  {language === 'ru' ? 'Отправить заявку' : 'Send Request'}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* How it Works */}
      <section className="py-20 px-4 bg-[#E8E4DC]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-[#0F2A24] mb-6">
            {language === 'ru' ? 'Как это работает' : 'How it works'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-4xl font-serif text-[#C6A75E] mb-3">01</div>
              <h3 className="text-lg font-medium text-[#0F2A24] mb-2">
                {t.certificates.step1}
              </h3>
              <p className="text-gray-600 text-sm">
                {t.certificates.step1Desc}
              </p>
            </div>
            <div>
              <div className="text-4xl font-serif text-[#C6A75E] mb-3">02</div>
              <h3 className="text-lg font-medium text-[#0F2A24] mb-2">
                {t.certificates.step2}
              </h3>
              <p className="text-gray-600 text-sm">
                {t.certificates.step2Desc}
              </p>
            </div>
            <div>
              <div className="text-4xl font-serif text-[#C6A75E] mb-3">03</div>
              <h3 className="text-lg font-medium text-[#0F2A24] mb-2">
                {t.certificates.step3}
              </h3>
              <p className="text-gray-600 text-sm">
                {t.certificates.step3Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .certificate-gold {
          background: linear-gradient(135deg, #C6A75E 0%, #E8D4A0 50%, #C6A75E 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .certificate-preview {
          transition: all 0.3s ease;
        }

        @media (max-width: 1024px) {
          .certificate-preview {
            max-width: 280px;
          }
        }
      `}</style>
    </div>
  );
};

export default Certificates;

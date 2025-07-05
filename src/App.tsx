import React, { useState, useEffect, useRef, forwardRef } from 'react';
import {
  Menu,
  X,
  Mail,
  ArrowUp,
  Instagram,
  Linkedin
} from 'lucide-react';
import { useInView } from './useInView';

// Interactive Canvas Section
const InteractiveCanvas = forwardRef<HTMLDivElement, { title: string }>((props, ref) => {
  return (
    <section 
      ref={ref}
      className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center bg-[#0e0e0e] overflow-hidden select-none"
    >
      <div className="relative z-10 w-full flex flex-col items-center justify-center pointer-events-none">
        <h1 className="text-white text-4xl md:text-6xl font-light text-center max-w-3xl mx-auto relative" style={{top: '-8px'}}>
          {props.title}
        </h1>
      </div>
    </section>
  );
});

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [language, setLanguage] = useState<'tr' | 'en'>('tr');
  const [emailCopied, setEmailCopied] = useState(false);
  const [mouse, setMouse] = useState<{x: number, y: number} | null>(null);
  const [isCursorVisible, setIsCursorVisible] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkBounds = (clientX: number, clientY: number) => {
      const navBounds = navRef.current?.getBoundingClientRect();
      const canvasBounds = canvasRef.current?.getBoundingClientRect();

      const isOverNav = navBounds 
        ? (clientX >= navBounds.left && clientX <= navBounds.right && clientY >= navBounds.top && clientY <= navBounds.bottom) 
        : false;

      const isOverCanvas = canvasBounds 
        ? (clientX >= canvasBounds.left && clientX <= canvasBounds.right && clientY >= canvasBounds.top && clientY <= canvasBounds.bottom)
        : false;

      setIsCursorVisible(isOverNav || isOverCanvas);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const newMousePos = { x: e.clientX, y: e.clientY };
      setMouse(newMousePos);
      checkBounds(newMousePos.x, newMousePos.y);
    };

    const handleScroll = () => {
      if (mouse) {
        checkBounds(mouse.x, mouse.y);
      } else {
        setIsCursorVisible(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mouse]);

  const translations = {
    tr: {
      nav: { about: 'Hakkımda', services: 'Hizmetlerim', contact: 'İletişim' },
      hero: { title: 'Yaratılıcığın yerleşmesi için boşluk gerekir >' },
      about: { title: 'Hakkımda', p1: 'Merhaba, ben <strong>Zeynep Seda Argut</strong>. Görsel iletişim tasarımı alanındaki eğitimimle başlayan yolculuğumda; yaratıcı fikir üretimi, kampanya tasarımı, <strong>marka iletişimi</strong>, sosyal medya yönetimi ve <strong>sanat yönetimi</strong> gibi alanlarda aktif olarak çalıştım. Moda, yaşam stili ve kurumsal iletişim gibi farklı sektörlerde edindiğim deneyimlerle tasarım dilimi geliştirdim. Her projede hem <strong>stratejik</strong> hem de estetik bir bakış açısıyla üretmeye odaklandım. Tasarım sürecinde fikrin yön belirleyici olduğuna inanıyor, <strong>güçlü bir fikrin</strong> olmadığı yerde estetiğin de anlamını yitirdiğini düşünüyorum.', p2: 'Tasarımı yalnızca görsel bir ifade biçimi değil, aynı zamanda <strong>çözüm üreten ve dönüşüm sağlayan</strong> bir araç olarak görüyorum. Kreatif metin yazarlığı, moodboard ve <strong>çekim konsepti geliştirme</strong> gibi alanlarda da üretmeye devam ediyorum. Gelecekteki hedefim; tasarım pratiğimi <strong>yapay zeka</strong> ve <strong>yaratıcı teknolojilerle</strong> entegre ederek dönüştürmek.', p3: 'Değişen dünyaya adapte olma süreci beni heyecanlandırıyor; bu dönüşümün içinde <strong>aktif kalmayı</strong> önemsiyorum.' },
      services: { title: 'Birlikte Neler Yapabiliriz?', items: [ { title: 'Görsel Dünya ve Konsept Geliştirme', desc: 'Markanın hikayesini yansıtan özgün görsel kurgu ve yaratıcı konseptler.' }, { title: 'Kreatif İçerik Üretimi', desc: 'Dijital platformlara uygun, estetik ve stratejik içerikler.' }, { title: 'Sosyal Medya Tasarımı ve Yönetimi', desc: 'Markaya özel sosyal medya kurgusu, tasarımı ve içerik planlaması.' }, { title: 'Marka Stratejisi ve İletişim Dili Oluşturma', desc: 'Tutarlı bir marka kimliği için stratejik yaklaşım ve etkili iletişim dili.' }, { title: 'Kurumsal Kimlik Tasarımı', desc: 'Logo, renk, tipografi ve uygulamalarla bütünlüklü görsel kimlik oluşturma.' }, { title: 'İsimlendirme ve Logo Tasarımı', desc: 'Marka degerlerini yansıtan isim ve güçlü bir ilk izlenim için logo tasarımı.' } ] },
      contact: { title: 'İletişim', subtitle: 'Aşağıdaki formu doldurarak veya sosyal medya hesaplarımdan bana ulaşabilirsin!', formTitle: 'Mesaj Gönder', contactTitle: 'Birlikte Üretelim', contactDescription: 'Proje fikirlerinizi, işbirliği tekliflerinizi veya sadece bir merhaba demek için aşağıdaki kanalları kullanabilirsiniz. En kısa sürede size geri döneceğim.', name: 'Adınız *', email: 'E-posta Adresiniz *', message: 'Mesajınız *', submit: 'Mesajımı Gönder!', namePlaceholder: 'Adınız...', emailPlaceholder: 'E-posta adresiniz...', messagePlaceholder: 'Mesajınız...', copied: 'Kopyalandı!' },
      footer: { copyright: '© 2025 Zeynep Seda Argut. Tüm Hakları Saklıdır.' }
    },
    en: {
      nav: { about: 'About', services: 'Services', contact: 'Contact' },
      hero: { title: 'A space is needed for creativity to settle >' },
      about: { title: 'About Me', p1: 'Hello, I am <strong>Zeynep Seda Argut</strong>. In my journey that began with my education in visual communication design; I have actively worked in areas such as creative idea generation, campaign design, <strong>brand communication</strong>, social media management and <strong>art direction</strong>. I developed my design language with the experiences I gained in different sectors such as fashion, lifestyle and corporate communication. In every project, I focused on producing with both <strong>strategic</strong> and aesthetic perspectives. I believe that the idea is the guiding direction in the design process, and I think that aesthetics loses its meaning where there is no <strong>strong idea</strong>.', p2: 'I see design not only as a visual form of expression, but also as a tool that <strong>produces solutions and provides transformation</strong>. I continue to produce in areas such as creative copywriting, moodboard and <strong>shooting concept development</strong>. My future goal is to transform my design practice by integrating it with <strong>artificial intelligence</strong> and <strong>creative technologies</strong>.', p3: 'The process of adapting to the changing world excites me; I care about <strong>staying active</strong> in this transformation.' },
      services: { title: 'What can we do together?', items: [ { title: 'Visual World and Concept Development', desc: 'Unique visual composition and creative concepts that reflect the brand story.' }, { title: 'Creative Content Production', desc: 'Aesthetic and strategic content suitable for digital platforms.' }, { title: 'Social Media Design and Management', desc: 'Brand-specific social media composition, design and content planning.' }, { title: 'Brand Strategy and Communication Language Creation', desc: 'Strategic approach and effective communication language for a consistent brand identity.' }, { title: 'Corporate Identity Design', desc: 'Creating a unified visual identity with logo, color, typography and applications.' }, { title: 'Naming and Logo Design', desc: 'Name reflecting brand values and logo design for a strong first impression.' } ] },
      contact: { title: 'Contact', subtitle: 'You can reach me by filling out the form below or through my social media accounts!', formTitle: 'Send Message', contactTitle: 'Get In Touch', contactDescription: 'You can use the channels below for your project ideas, collaboration offers, or just to say hello. I will get back to you as soon as possible.', name: 'Your Name *', email: 'Your Email *', message: 'Your Message *', submit: 'Send My Message!', namePlaceholder: 'Your name...', emailPlaceholder: 'Your email...', messagePlaceholder: 'Your message...', copied: 'Copied!' },
      footer: { copyright: '© 2025 Zeynep Seda Argut. All Rights Reserved.' }
    }
  };
  
  const t = translations[language];

  const [aboutSectionRef, aboutSectionInView] = useInView({ threshold: 0.15 });
  const [servicesSectionRef, servicesSectionInView] = useInView({ threshold: 0.15 });
  const [contactSectionRef, contactSectionInView] = useInView({ threshold: 0.15 });

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('zeynepsedaargut@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch (err) {
      console.error('E-posta kopyalanamadı:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem('website') as HTMLInputElement)?.value;
    if (honeypot) {
      alert('Spam koruması: Lütfen tekrar deneyin.');
      return;
    }
    const formData = new FormData(form);
    try {
      const res = await fetch('/contact.php', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert('Mesajınız başarıyla gönderildi!');
        form.reset();
      } else {
        alert(data.error || 'Bir hata oluştu, lütfen tekrar deneyin.');
      }
    } catch (err) {
      alert('Sunucuya ulaşılamadı.');
    }
  };

  return (
    <div className="font-sans bg-white text-darkgray">
      {isCursorVisible && mouse && (
        <div
          className="pointer-events-none rounded-full bg-white z-[9999]"
          style={{
            position: 'fixed',
            top: mouse.y,
            left: mouse.x,
            width: '80px',
            height: '80px',
            transform: 'translate(-50%, -50%)',
            mixBlendMode: 'difference',
          }}
        />
      )}

      {/* Navigation */}
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-[#0e0e0e] border-b border-gray-900"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex flex-col items-center justify-center leading-[1.1]">
              <span className="text-2xl sm:text-xl font-semibold text-white tracking-tight">Zeynep Seda Argut</span>
              <span className="text-sm sm:text-xs font-medium text-gray-300 tracking-wide -mt-1">Art Director</span>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('hakkimda')} className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">{t.nav.about}</button>
              <button onClick={() => scrollToSection('hizmetlerim')} className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">{t.nav.services}</button>
              <button onClick={() => scrollToSection('iletisim')} className="text-gray-200 hover:text-white transition-colors duration-200 font-medium">{t.nav.contact}</button>
              {/* Dil Değiştirme Butonu */}
              <div className="flex items-center space-x-2 ml-4">
                <button onClick={() => setLanguage('tr')} className={`px-2 py-1 text-sm font-medium rounded transition-colors duration-200 ${language === 'tr' ? 'text-white bg-gray-700' : 'text-gray-400 hover:text-white'}`}>TR</button>
                <span className="text-gray-500">|</span>
                <button onClick={() => setLanguage('en')} className={`px-2 py-1 text-sm font-medium rounded transition-colors duration-200 ${language === 'en' ? 'text-white bg-gray-700' : 'text-gray-400 hover:text-white'}`}>EN</button>
              </div>
            </div>
            {/* Mobile Menu Button */}
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md hover:bg-gray-800 transition-colors duration-200">
              {isMenuOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
            </button>
          </div>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0e0e0e] border-t border-gray-900">
            <div className="px-6 py-4 space-y-3">
              <button onClick={() => scrollToSection('hakkimda')} className="block w-full text-left text-gray-200 hover:text-white transition-colors duration-200 font-medium py-2">{t.nav.about}</button>
              <button onClick={() => scrollToSection('hizmetlerim')} className="block w-full text-left text-gray-200 hover:text-white transition-colors duration-200 font-medium py-2">{t.nav.services}</button>
              <button onClick={() => scrollToSection('iletisim')} className="block w-full text-left text-gray-200 hover:text-white transition-colors duration-200 font-medium py-2">{t.nav.contact}</button>
              {/* Mobil Dil Değiştirme */}
              <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-800">
                <button onClick={() => setLanguage('tr')} className={`px-3 py-2 text-sm font-medium rounded transition-colors duration-200 ${language === 'tr' ? 'text-white bg-gray-700' : 'text-gray-400 hover:text-white'}`}>TR</button>
                <span className="text-gray-500">|</span>
                <button onClick={() => setLanguage('en')} className={`px-3 py-2 text-sm font-medium rounded transition-colors duration-200 ${language === 'en' ? 'text-white bg-gray-700' : 'text-gray-400 hover:text-white'}`}>EN</button>
              </div>
            </div>
          </div>
        )}
      </nav>
      {/* Interactive Canvas */}
      <InteractiveCanvas 
        ref={canvasRef}
        title={t.hero.title} 
      />
      {/* About Me Section */}
      <section id="hakkimda" className="py-20 lg:py-32 bg-white text-darkgray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Profil Fotoğrafı */}
            <div className="order-1 lg:order-1 flex justify-center">
              <div className="w-80 h-80 bg-gray-200 rounded-full flex items-center justify-center group">
                <img src="/pp.png" alt="Profile" className="w-full h-full object-cover rounded-full" />
              </div>
            </div>
            {/* Hakkımda Başlık ve Paragraflar */}
            <div className="order-2 lg:order-2">
              <h3 className="text-3xl md:text-4xl font-light mb-8 tracking-tight">{t.about.title}</h3>
              <div className="space-y-6 text-darkgray max-w-[700px] mx-auto">
                <p className="text-lg leading-[1.7]" dangerouslySetInnerHTML={{ __html: t.about.p1 }} />
                <p className="text-lg leading-[1.7]" dangerouslySetInnerHTML={{ __html: t.about.p2 }} />
                <p className="text-lg leading-[1.7]" dangerouslySetInnerHTML={{ __html: t.about.p3 }} />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="hizmetlerim" className="py-24 bg-white text-darkgray min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-[1200px] mx-auto bg-white rounded-[12px] shadow-none px-0 md:px-0 py-0 md:py-0 border-none">
          <div className="text-center mb-20">
            <h3 className="text-5xl md:text-6xl font-normal mb-6 tracking-tight leading-none">{t.services.title}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-16 px-10 pb-24">
            {t.services.items.map((item, idx) => (
              <div key={item.title} className="flex flex-col items-center text-center group relative">
                <div className="w-full h-0.5 bg-gray-300 mb-6 mx-auto relative overflow-hidden group-hover:bg-transparent">
                  <span className="absolute top-0 left-1/2 w-0 h-full bg-gradient-to-r from-pink-500 to-red-500 transition-all duration-500 ease-out group-hover:w-full group-hover:left-0"></span>
                </div>
                <h4 className="text-2xl font-semibold mb-3 tracking-tight leading-tight cursor-pointer">{item.title}</h4>
                <div className="min-h-[64px] flex items-start justify-center">
                  <p className="text-gray-400 italic text-base mt-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 -translate-y-2 transition-all duration-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* İletişim Bölümü */}
      <section id="iletisim" className="py-20 lg:py-32 bg-gray-50 text-darkgray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">{t.contact.title}</h2>
            <p className="text-center text-lg text-gray-600">{t.contact.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Sol Taraf: İletişim Bilgileri ve Sosyal Medya */}
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-darkgray">{t.contact.contactTitle}</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">{t.contact.contactDescription}</p>
              <div className="space-y-4">
                {/* Gmail */}
                <button onClick={copyEmailToClipboard} className="group flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-white hover:shadow-lg transition-all duration-300 w-full text-left">
                  <Mail size={22} className="text-gray-500 group-hover:text-pink-500 transition-colors duration-300" />
                  <div className="flex-1">
                    <span className="font-semibold text-darkgray">E-mail</span>
                    <p className="text-gray-500">zeynepsedaargut@gmail.com</p>
                  </div>
                  {emailCopied && (<span className="text-green-600 text-sm font-medium">{t.contact.copied}</span>)}
                </button>
                {/* Instagram */}
                <a href="https://www.instagram.com/zeysedargut?igsh=MW1nZDZzdmx0ZnY2aw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-white hover:shadow-lg transition-all duration-300">
                  <Instagram size={22} className="text-gray-500 group-hover:text-pink-500 transition-colors duration-300" />
                  <div>
                    <span className="font-semibold text-darkgray">Instagram</span>
                    <p className="text-gray-500">@zeysedargut</p>
                  </div>
                </a>
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/zeynep-seda-argut?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-white hover:shadow-lg transition-all duration-300">
                  <Linkedin size={22} className="text-gray-500 group-hover:text-blue-500 transition-colors duration-300" />
                  <div>
                    <span className="font-semibold text-darkgray">LinkedIn</span>
                    <p className="text-gray-500">Zeynep Seda Argut</p>
                  </div>
                </a>
                {/* Behance */}
                <a href="https://www.behance.net/zeynepsedacb81" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-white hover:shadow-lg transition-all duration-300">
                  <div className="w-6 h-6 bg-gray-500 group-hover:bg-[#1769ff] rounded-sm flex items-center justify-center transition-colors duration-300">
                    <span className="text-white text-xs font-bold">Be</span>
                  </div>
                  <div>
                    <span className="font-semibold text-darkgray">Behance</span>
                    <p className="text-gray-500">Zeynep Seda Argut</p>
                  </div>
                </a>
              </div>
            </div>
            {/* Sağ Taraf: İletişim Formu */}
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-lg hover:shadow-2xl">
              <h3 className="text-3xl font-light text-center mb-8 text-darkgray tracking-tight">{t.contact.formTitle}</h3>
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div style={{display: 'none'}}>
                  <label htmlFor="website">Websiteniz</label>
                  <input id="website" name="website" type="text" autoComplete="off" tabIndex={-1} />
                </div>
                <div className="relative">
                  <input id="name" name="name" type="text" required className="block w-full px-4 py-3 text-lg text-darkgray bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-pink-500 peer transition-colors duration-300" placeholder=" " />
                  <label htmlFor="name" className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white px-2 left-2 peer-focus:px-2 peer-focus:text-pink-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4">{t.contact.name}</label>
                </div>
                <div className="relative">
                  <input id="email" name="email" type="email" required className="block w-full px-4 py-3 text-lg text-darkgray bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-pink-500 peer transition-colors duration-300" placeholder=" " />
                  <label htmlFor="email" className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white px-2 left-2 peer-focus:px-2 peer-focus:text-pink-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4">{t.contact.email}</label>
                </div>
                <div className="relative">
                  <textarea id="message" name="message" required rows={5} className="block w-full px-4 py-3 text-lg text-darkgray bg-transparent border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-pink-500 peer resize-none transition-colors duration-300" placeholder=" " />
                  <label htmlFor="message" className="absolute text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] bg-white px-2 left-2 peer-focus:px-2 peer-focus:text-pink-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-5 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-4">{t.contact.message}</label>
                </div>
                <div className="pt-2">
                  <button type="submit" className="w-full bg-darkgray text-white font-bold py-4 rounded-lg text-lg transition-all duration-300 ease-in-out flex items-center justify-center group hover:bg-gradient-to-r hover:from-pink-500 hover:to-red-500 hover:shadow-xl transform hover:-translate-y-1">{t.contact.submit}<Mail size={22} className="ml-3 transform transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" /></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 text-darkgray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p className="font-light">{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button onClick={scrollToTop} className="fixed bottom-8 right-8 p-3 bg-darkgray text-white rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl z-50">
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

export default App;

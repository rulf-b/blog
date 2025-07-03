import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Palette, 
  Search, 
  ShoppingCart, 
  Menu, 
  X,
  Mail,
  ArrowUp,
  Instagram,
  Linkedin,
  ExternalLink
} from 'lucide-react';
import { useInView } from './useInView';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Kademeli animasyonlar için useInView
  // Hakkımda
  const [aboutSectionRef, aboutSectionInView] = useInView({ threshold: 0.15 });
  // Hizmetler
  const [servicesSectionRef, servicesSectionInView] = useInView({ threshold: 0.15 });
  // İletişim
  const [contactSectionRef, contactSectionInView] = useInView({ threshold: 0.15 });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
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

  // Interactive Canvas Section
  const InteractiveCanvas: React.FC = () => {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const particlesRef = React.useRef<any[]>([]);
    const mousePosition = React.useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
    const palette = [
      "rgba(255, 107, 107, 0.9)", // Canlı Mercan
      "rgba(78, 205, 196, 0.9)",  // Orta Turkuaz
      "rgba(247, 184, 1, 0.9)",   // Safran
      "rgba(69, 183, 209, 0.9)",  // Pasifik Mavisi
      "rgba(250, 208, 44, 0.9)",   // Mimoza
    ];

    React.useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      let animationFrameId: number;

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight * 0.9;
      };
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      const createParticle = (x: number, y: number, isClick: boolean = false) => {
        const particleCount = isClick ? 30 : 1;
        for (let i = 0; i < particleCount; i++) {
          if (particlesRef.current.length > 150) {
            particlesRef.current.shift();
          }
          const color = palette[Math.floor(Math.random() * palette.length)];
          particlesRef.current.push({
            x,
            y,
            size: isClick ? Math.random() * 3 + 2 : Math.random() * 2 + 1,
            color: color,
            vx: (Math.random() - 0.5) * (isClick ? 4 : 1),
            vy: (Math.random() - 0.5) * (isClick ? 4 : 1),
          });
        }
      };

      const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mousePosition.current = { x: e.clientX, y: e.clientY };
        createParticle(e.clientX - rect.left, e.clientY - rect.top);
      };

      const handleMouseClick = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        createParticle(e.clientX - rect.left, e.clientY - rect.top, true);
      };

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw connections
        for (let i = 0; i < particlesRef.current.length; i++) {
          for (let j = i; j < particlesRef.current.length; j++) {
            const p1 = particlesRef.current[i];
            const p2 = particlesRef.current[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = p1.color.replace('0.9', `${1 - distance / 100}`);
              ctx.lineWidth = 0.5;
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }

        // Draw particles
        for (let i = 0; i < particlesRef.current.length; i++) {
          const p = particlesRef.current[i];
          
          // Update position
          p.x += p.vx;
          p.y += p.vy;

          // Bounce off walls
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

          // Draw particle
          ctx.beginPath();
          ctx.fillStyle = p.color;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.shadowBlur = 0;
        animationFrameId = requestAnimationFrame(animate);
      };

      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('click', handleMouseClick);
      animate();

      return () => {
        window.removeEventListener('resize', resizeCanvas);
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('click', handleMouseClick);
        cancelAnimationFrame(animationFrameId);
      };
    }, []);

    return (
      <section className="relative w-full h-[90vh] min-h-[600px] flex items-center justify-center bg-[#0e0e0e] overflow-hidden">
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full cursor-none" />
        <div className="relative z-10 w-full flex flex-col items-center justify-center pointer-events-none">
          <h1 className="text-white text-4xl md:text-6xl font-light text-center max-w-3xl mx-auto">
            Bir fikrin dokunuşu her şeyi değiştirir.
          </h1>
        </div>
      </section>
    );
  };

  return (
    <div className="font-sans bg-white text-darkgray">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0e0e0e] border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex flex-col items-center justify-center leading-[1.1]">
              <span className="text-2xl sm:text-xl font-semibold text-white tracking-tight">Zeynep Seda Argut</span>
              <span className="text-sm sm:text-xs font-medium text-gray-300 tracking-wide -mt-1">Art Director</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('hakkimda')}
                className="text-gray-200 hover:text-white transition-colors duration-200 font-medium"
              >
                Hakkımda
              </button>
              <button 
                onClick={() => scrollToSection('hizmetlerim')}
                className="text-gray-200 hover:text-white transition-colors duration-200 font-medium"
              >
                Hizmetlerim
              </button>
              <button 
                onClick={() => scrollToSection('iletisim')}
                className="text-gray-200 hover:text-white transition-colors duration-200 font-medium"
              >
                İletişim
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-800 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#0e0e0e] border-t border-gray-900">
            <div className="px-6 py-4 space-y-3">
              <button 
                onClick={() => scrollToSection('hakkimda')}
                className="block w-full text-left text-gray-200 hover:text-white transition-colors duration-200 font-medium py-2"
              >
                Hakkımda
              </button>
              <button 
                onClick={() => scrollToSection('hizmetlerim')}
                className="block w-full text-left text-gray-200 hover:text-white transition-colors duration-200 font-medium py-2"
              >
                Hizmetlerim
              </button>
              <button 
                onClick={() => scrollToSection('iletisim')}
                className="block w-full text-left text-gray-200 hover:text-white transition-colors duration-200 font-medium py-2"
              >
                İletişim
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Interactive Canvas Section */}
      <InteractiveCanvas />

      {/* About Me Section */}
      <section
        id="hakkimda"
        ref={aboutSectionRef}
        className="py-20 lg:py-32 bg-white text-darkgray"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Profil Fotoğrafı */}
            <div
              className={`order-1 lg:order-1 flex justify-center transition-all duration-700
                ${aboutSectionInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
              `}
              style={{ transitionDelay: aboutSectionInView ? '0ms' : '0ms' }}
            >
              <div className="w-80 h-80 bg-gray-200 rounded-full flex items-center justify-center group transition-all duration-300">
                <img 
                  src="/pp.png"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                />
              </div>
            </div>
            {/* Hakkımda Başlık ve Paragraflar */}
            <div className="order-2 lg:order-2">
              <h3
                className={`text-3xl md:text-4xl font-light mb-8 tracking-tight transition-all duration-700
                  ${aboutSectionInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
                  delay-100
                `}
                style={{ transitionDelay: aboutSectionInView ? '100ms' : '0ms' }}
              >
                Hakkımda
              </h3>
              <div className="space-y-6 text-darkgray max-w-[700px] mx-auto">
                <p
                  className={`text-lg leading-[1.7] transition-all duration-700
                    ${aboutSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `}
                  style={{ transitionDelay: aboutSectionInView ? '250ms' : '0ms' }}
                >
                  Merhaba, ben <strong>Zeynep Seda Argut</strong>.
                  Görsel iletişim tasarımı alanındaki eğitimimle başlayan yolculuğumda; yaratıcı fikir üretimi, kampanya tasarımı, marka iletişimi, <strong>sosyal medya yönetimi</strong> ve <strong>sanat yönetimi</strong> gibi alanlarda aktif olarak çalıştım. Moda, yaşam stili ve kurumsal iletişim gibi farklı sektörlerde edindiğim deneyimlerle tasarım dilimi geliştirdim. Her projede hem <strong>stratejik</strong> hem de <strong>estetik</strong> bir bakış açısıyla üretmeye odaklandım. Tasarım sürecinde fikrin yön belirleyici olduğuna inanıyor, güçlü bir fikrin olmadığı yerde estetiğin de anlamını yitirdiğini düşünüyorum.
                </p>
                <p
                  className={`text-lg leading-[1.7] transition-all duration-700
                    ${aboutSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `}
                  style={{ transitionDelay: aboutSectionInView ? '400ms' : '0ms' }}
                >
                  Tasarımı yalnızca görsel bir ifade biçimi değil, aynı zamanda çözüm üreten ve dönüşüm sağlayan bir araç olarak görüyorum. Kreatif metin yazarlığı, moodboard ve <strong>çekim konsepti geliştirme</strong> gibi alanlarda da üretmeye devam ediyorum. Gelecekteki hedefim; tasarım pratiğimi <strong>yapay zeka</strong> ve <strong>yaratıcı teknolojilerle</strong> entegre ederek dönüştürmek.
                </p>
                <p
                  className={`text-lg leading-[1.7] transition-all duration-700
                    ${aboutSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                  `}
                  style={{ transitionDelay: aboutSectionInView ? '550ms' : '0ms' }}
                >
                  Değişen dünyaya adapte olma süreci beni heyecanlandırıyor; bu dönüşümün içinde aktif kalmayı önemsiyorum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="hizmetlerim"
        ref={servicesSectionRef}
        className="py-24 bg-white text-darkgray min-h-[80vh] flex items-center justify-center"
      >
        <div className="w-full max-w-[1200px] mx-auto bg-white rounded-[12px] shadow-none px-0 md:px-0 py-0 md:py-0 border-none">
          <div className="text-center mb-20">
            <h3
              className={`text-5xl md:text-6xl font-normal mb-6 tracking-tight leading-none uppercase transition-all duration-700
                ${servicesSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
              style={{ transitionDelay: servicesSectionInView ? '0ms' : '0ms' }}
            >
              Birlikte neler yapabiliriz ?
            </h3>
          </div>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-16 px-10 pb-24 transition-all duration-700
              ${servicesSectionInView ? 'opacity-100' : 'opacity-0'}
            `}
          >
            {[
              {
                title: 'Görsel Dünya ve Konsept Geliştirme',
                desc: 'Markanın hikayesini yansıtan özgün görsel kurgu ve yaratıcı konseptler.'
              },
              {
                title: 'Kreatif İçerik Üretimi',
                desc: 'Dijital platformlara uygun, estetik ve stratejik içerikler.'
              },
              {
                title: 'Sosyal Medya Tasarımı ve Yönetimi',
                desc: 'Markaya özel sosyal medya kurgusu, tasarımı ve içerik planlaması.'
              },
              {
                title: 'Marka Stratejisi ve İletişim Dili Oluşturma',
                desc: 'Tutarlı bir marka kimligi için stratejik yaklaşım ve etkili iletişim dili.'
              },
              {
                title: 'Kurumsal Kimlik Tasarımı',
                desc: 'Logo, renk, tipografi ve uygulamalarla butunluklu görsel kimlik oluşturma.'
              },
              {
                title: 'İsimlendirme ve Logo Tasarımı',
                desc: 'Marka degerlerini yansıtan isim ve güçlü bir ilk izlenim için logo tasarımı.'
              }
            ].map((item, idx) => (
              <div
                key={item.title}
                className={`flex flex-col items-center text-center group relative transition-all duration-700
                  ${servicesSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
                style={{ transitionDelay: servicesSectionInView ? `${150 + idx * 100}ms` : '0ms' }}
              >
                <div className="w-11/12 h-px bg-gray-300 mb-6 mx-auto"></div>
                <h4 className="text-2xl font-semibold mb-3 tracking-tight leading-tight cursor-pointer">
                  {item.title}
              </h4>
                <div className="min-h-[64px] flex items-start justify-center">
                  <p className="text-gray-400 italic text-base mt-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 -translate-y-2 transition-all duration-300">
                    {item.desc}
              </p>
            </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* İletişim Bölümü */}
      <section
        id="iletisim"
        ref={contactSectionRef}
        className={`py-20 lg:py-32 bg-white text-darkgray transition-all duration-700
          ${contactSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 transition-all duration-700">
            İletişim
          </h2>
          <p className="text-center text-lg text-gray-500 mb-16 transition-all duration-700">
            Aşağıdaki formu doldurarak veya sosyal medya hesaplarımdan bana ulaşabilirsin!
          </p>
          
          {/* Sosyal Medya Butonları */}
          <div
            className={`flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 mb-16 transition-all duration-700
              ${contactSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: contactSectionInView ? '100ms' : '0ms' }}
          >
            {/* Gmail */}
            <a
              href="mailto:zeynepsedaargut@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 border-gray-200 rounded-lg hover:border-darkgray hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md w-full sm:w-auto justify-center sm:justify-start"
            >
              <Mail size={24} className="text-gray-600 group-hover:text-darkgray transition-colors duration-300" />
              <span className="text-base sm:text-lg font-medium text-gray-700 group-hover:text-darkgray transition-colors duration-300">
                zeynepsedaargut@gmail.com
              </span>
              <ExternalLink size={16} className="text-gray-400 group-hover:text-darkgray transition-colors duration-300" />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/zeysedargut?igsh=MW1nZDZzdmx0ZnY2aw%3D%3D&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 border-gray-200 rounded-lg hover:border-darkgray hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md w-full sm:w-auto justify-center sm:justify-start"
            >
              <Instagram size={24} className="text-gray-600 group-hover:text-darkgray transition-colors duration-300" />
              <span className="text-base sm:text-lg font-medium text-gray-700 group-hover:text-darkgray transition-colors duration-300">
                @zeysedargut
              </span>
              <ExternalLink size={16} className="text-gray-400 group-hover:text-darkgray transition-colors duration-300" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/zeynep-seda-argut?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 border-gray-200 rounded-lg hover:border-darkgray hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md w-full sm:w-auto justify-center sm:justify-start"
            >
              <Linkedin size={24} className="text-gray-600 group-hover:text-darkgray transition-colors duration-300" />
              <span className="text-base sm:text-lg font-medium text-gray-700 group-hover:text-darkgray transition-colors duration-300">
                Zeynep Seda Argut
              </span>
              <ExternalLink size={16} className="text-gray-400 group-hover:text-darkgray transition-colors duration-300" />
            </a>

            {/* Behance */}
            <a
              href="https://www.behance.net/zeynepsedacb81"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 sm:px-6 py-3 sm:py-4 bg-white border-2 border-gray-200 rounded-lg hover:border-darkgray hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md w-full sm:w-auto justify-center sm:justify-start"
            >
              <div className="w-6 h-6 bg-[#1769ff] rounded-sm flex items-center justify-center">
                <span className="text-white text-xs font-bold">B</span>
              </div>
              <span className="text-base sm:text-lg font-medium text-gray-700 group-hover:text-darkgray transition-colors duration-300">
                Zeynep Seda Argut
              </span>
              <ExternalLink size={16} className="text-gray-400 group-hover:text-darkgray transition-colors duration-300" />
            </a>
          </div>

          {/* İletişim Formu */}
          <div className="max-w-xl mx-auto">
            <h3 className="text-2xl font-semibold text-center mb-8 text-darkgray">
              Mesaj Gönder
            </h3>
            <form className="space-y-8">
              <div
                className={`transition-all duration-700 ${contactSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: contactSectionInView ? '200ms' : '0ms' }}
              >
                <label className="block text-base font-medium mb-2" htmlFor="name">Adınız *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Adınız..."
                  className="w-full border-0 border-b border-gray-300 px-0 py-3 text-lg focus:outline-none focus:border-b-2 focus:border-darkgray bg-white transition-all duration-200"
                />
              </div>
              <div
                className={`transition-all duration-700 ${contactSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: contactSectionInView ? '300ms' : '0ms' }}
              >
                <label className="block text-base font-medium mb-2" htmlFor="email">E-posta Adresiniz *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="E-posta adresiniz..."
                  className="w-full border-0 border-b border-gray-300 px-0 py-3 text-lg focus:outline-none focus:border-b-2 focus:border-darkgray bg-white transition-all duration-200"
                />
              </div>
              <div
                className={`transition-all duration-700 ${contactSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: contactSectionInView ? '400ms' : '0ms' }}
              >
                <label className="block text-base font-medium mb-2" htmlFor="message">Mesajınız *</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Mesajınız..."
                  rows={5}
                  className="w-full border-0 border-b border-gray-300 px-0 py-3 text-lg focus:outline-none focus:border-b-2 focus:border-darkgray bg-white resize-none transition-all duration-200"
                />
              </div>
              <div
                className={`transition-all duration-700 ${contactSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: contactSectionInView ? '500ms' : '0ms' }}
              >
                <button
                  type="submit"
                  className="w-full bg-darkgray text-white font-bold py-3 rounded-md text-lg transition-all duration-200 hover:brightness-110 hover:scale-105"
                >
                  Mesajımı Gönder!
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 text-darkgray">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center text-gray-600">
            <p className="font-light">
              © 2025 Zeynep Seda Argut. Tüm Hakları Saklıdır.
            </p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 bg-darkgray text-white rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl z-50"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Palette, 
  Search, 
  ShoppingCart, 
  Menu, 
  X,
  Mail,
  ArrowUp
} from 'lucide-react';
import { useInView } from './useInView';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Hakkımda animasyonları için
  const [aboutTextRef, aboutTextInView] = useInView({ threshold: 0.2 });
  const [aboutImgRef, aboutImgInView] = useInView({ threshold: 0.2 });
  // Hakkımda section tamamı için
  const [aboutSectionRef, aboutSectionInView] = useInView({ threshold: 0.15 });
  // Hizmetler animasyonları için
  const [servicesHeaderRef, servicesHeaderInView] = useInView({ threshold: 0.15 });
  const [servicesGridRef, servicesGridInView] = useInView({ threshold: 0.15 });
  // İletişim animasyonları için
  const [contactHeaderRef, contactHeaderInView] = useInView({ threshold: 0.15 });
  const [contactBoxRef, contactBoxInView] = useInView({ threshold: 0.15 });
  // Footer animasyonu için
  const [footerRef, footerInView] = useInView({ threshold: 0.1 });

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

  return (
    <div className="font-sans bg-white text-darkgray">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-darkgray border-b border-gray-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-xl font-semibold tracking-tight">
              <span className="text-white">[Adınız Soyadınız]</span>
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
          <div className="md:hidden bg-darkgray border-t border-gray-900">
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

      {/* Hero Section */}
      <section className="min-h-screen bg-white flex items-center justify-center px-6 text-darkgray">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight mb-6">
            [Adınız Soyadınız]
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-darkgray tracking-wide">
            [Mesleğiniz / Unvanınız]
          </h2>
        </div>
      </section>

      {/* About Me Section */}
      <section
        id="hakkimda"
        ref={aboutSectionRef}
        className={`py-20 lg:py-32 bg-white text-darkgray transition-all duration-1000 ease-out
          ${aboutSectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div
              ref={aboutImgRef}
              className={`order-1 lg:order-1 flex justify-center transition-all duration-1000 ease-out
                ${aboutImgInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-16'}
              `}
            >
              <div className="w-80 h-80 bg-gray-200 rounded-full flex items-center justify-center">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
            <div
              ref={aboutTextRef}
              className={`order-2 lg:order-2 transition-all duration-1000 ease-out
                ${aboutTextInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-16'}
              `}
            >
              <h3 className="text-3xl md:text-4xl font-light mb-8 tracking-tight">
                Hakkımda
              </h3>
              <div className="space-y-6 text-darkgray leading-relaxed">
                <p className="text-lg">
                  Merhaba, ben Zeynep Seda Argut.
Görsel iletişim tasarımı alanındaki eğitimimle başlayan yolculuğumda; yaratıcı fikir üretimi, kampanya tasarımı, marka iletişimi, sosyal medya yönetimi ve sanat yönetimi gibi alanlarda aktif olarak çalıştım. Moda, yaşam stili ve kurumsal iletişim gibi farklı sektörlerde edindiğim deneyimlerle tasarım dilimi geliştirdim. Her projede hem stratejik hem de estetik bir bakış açısıyla üretmeye odaklandım. Tasarım sürecinde fikrin yön belirleyici olduğuna inanıyor, güçlü bir fikrin olmadığı yerde estetiğin de anlamını yitirdiğini düşünüyorum.
                </p>
                <p className="text-lg">
                  Tasarımı yalnızca görsel bir ifade biçimi değil, aynı zamanda çözüm üreten ve dönüşüm sağlayan bir araç olarak görüyorum. Kreatif metin yazarlığı, moodboard ve çekim konsepti geliştirme gibi alanlarda da üretmeye devam ediyorum. Gelecekteki hedefim; tasarım pratiğimi yapay zeka ve yaratıcı teknolojilerle entegre ederek dönüştürmek.
                </p>
                <p className="text-lg">
                  Değişen dünyaya adapte olma süreci beni heyecanlandırıyor; bu dönüşümün içinde aktif kalmayı önemsiyorum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Redesigned to match reference */}
      <section id="hizmetlerim" className="py-24 bg-white text-darkgray min-h-[80vh] flex items-center justify-center">
        <div className="w-full max-w-[1200px] mx-auto bg-white rounded-[12px] shadow-none px-0 md:px-0 py-0 md:py-0 border-none">
          {/* Header with capabilities tag */}
          <div
            ref={servicesHeaderRef}
            className={`text-center mb-20 transition-all duration-1000 ease-out
              ${servicesHeaderInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <div className="inline-flex items-center px-4 py-1 border border-gray-400 rounded-full text-xs font-medium text-black tracking-widest mb-8 uppercase bg-white">
              + YETENEKLERİM
            </div>
            <h3 className="text-5xl md:text-6xl font-normal mb-6 tracking-tight leading-none uppercase">
              Birlikte neler yapabiliriz ?
            </h3>
            <p className="text-gray-700 text-base max-w-2xl mx-auto leading-relaxed font-normal">
              Studio 47 is a web design studio known for its innovative and customized approach to web development. Specializing in creating visually appealing and highly functional websites, Studio 47 caters to a wide range of clients, from small businesses to large enterprises, ensuring each project is tailored to meet the specific needs and goals of the client.
            </p>
          </div>
          
          {/* Services Grid */}
          <div
            ref={servicesGridRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-16 px-10 pb-24 transition-all duration-1000 ease-out
              ${servicesGridInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            {/* Service 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-11/12 h-px bg-gray-300 mb-6 mx-auto"></div>
              <h4 className="text-2xl font-semibold mb-3 tracking-tight leading-tight">
                Görsel Dünya ve Konsept Geliştirme
              </h4>
            </div>
            {/* Service 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-11/12 h-px bg-gray-300 mb-6 mx-auto"></div>
              <h4 className="text-2xl font-semibold mb-3 tracking-tight leading-tight">
                Kreatif İçerik Üretimi
              </h4>
            </div>
            {/* Service 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-11/12 h-px bg-gray-300 mb-6 mx-auto"></div>
              <h4 className="text-2xl font-semibold mb-3 tracking-tight leading-tight">
                Sosyal Medya Tasarımı ve Yönetimi
              </h4>
            </div>
            {/* Service 4 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-11/12 h-px bg-gray-300 mb-6 mx-auto"></div>
              <h4 className="text-2xl font-semibold mb-3 tracking-tight leading-tight">
                Marka Stratejisi ve İletişim Dili Oluşturma
              </h4>
            </div>
            {/* Service 5 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-11/12 h-px bg-gray-300 mb-6 mx-auto"></div>
              <h4 className="text-2xl font-semibold mb-3 tracking-tight leading-tight">
                Kurumsal Kimlik Tasarımı
              </h4>
            </div>
            {/* Service 6 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-11/12 h-px bg-gray-300 mb-6 mx-auto"></div>
              <h4 className="text-2xl font-semibold mb-3 tracking-tight leading-tight">
                İsimlendirme ve Logo Tasarımı
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="iletisim" className="py-20 lg:py-32 bg-white text-darkgray">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h3
            ref={contactHeaderRef}
            className={`text-3xl md:text-4xl font-light mb-6 tracking-tight transition-all duration-1000 ease-out
              ${contactHeaderInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            Birlikte Neler Yapabiliriz?
          </h3>
          <p
            className={`text-xl text-gray-600 mb-12 leading-relaxed transition-all duration-1000 ease-out
              ${contactHeaderInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            Yeni projeler veya iş birlikleri için benimle iletişime geçin.
          </p>
          <div
            ref={contactBoxRef}
            className={`inline-flex items-center justify-center p-6 bg-gray-50 rounded-sm border border-gray-100 hover:border-gray-200 transition-all duration-300 group transition-all duration-1000 ease-out
              ${contactBoxInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            <Mail size={24} className="mr-3 text-gray-600 group-hover:text-black transition-colors duration-300" />
            <a 
              href="mailto:email@example.com" 
              className="text-xl font-medium text-gray-600 hover:text-black transition-colors duration-300"
            >
              email@example.com
            </a>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white text-darkgray">
        <div className="max-w-xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">İletişim</h2>
          <p className="text-center text-lg text-gray-500 mb-10">Aşağıdaki formu doldurarak bana ulaşabilirsin!</p>
          <form
            className="space-y-8"
            onSubmit={e => {
              e.preventDefault();
              alert('Mesajınız gönderildi!');
            }}
          >
            <div>
              <label className="block text-xl font-semibold mb-2" htmlFor="name">Adınız *</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Adınız..."
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:border-darkgray bg-white"
              />
            </div>
            <div>
              <label className="block text-xl font-semibold mb-2" htmlFor="email">E-posta Adresiniz *</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="E-posta adresiniz..."
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:border-darkgray bg-white"
              />
            </div>
            <div>
              <label className="block text-xl font-semibold mb-2" htmlFor="message">Mesajınız *</label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="Mesajınız..."
                rows={5}
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-lg focus:outline-none focus:border-darkgray bg-white resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full border-2 border-darkgray text-darkgray font-bold py-3 rounded-md hover:bg-darkgray hover:text-white transition-colors duration-200 text-lg"
            >
              Mesajımı Gönder!
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer
        ref={footerRef}
        className={`bg-white border-t border-gray-100 py-8 text-darkgray transition-all duration-1000 ease-out
          ${footerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
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
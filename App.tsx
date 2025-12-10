import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, 
  Menu, 
  X, 
  Check, 
  BrainCircuit, 
  HeartHandshake, 
  ShieldCheck, 
  Clock, 
  Video, 
  CalendarCheck,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Smile,
  Sparkles
} from 'lucide-react';

// Componente para animar elementos ao entrar na tela (Scroll Reveal)
interface RevealOnScrollProps {
  children?: React.ReactNode;
  delay?: number;
  className?: string;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, delay = 0, className = "" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Dispara quando 10% do elemento estiver visível
        rootMargin: "0px 0px -50px 0px" // Um pequeno offset para não disparar muito cedo no rodapé
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-12"
      } ${className}`}
    >
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleFaq = (index: number) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  const whatsappLink = "https://wa.me/5581999999999"; 

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-800 overflow-x-hidden">
      
      {/* Decorative Background Elements (Global) */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#FFF5DD] rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-[#FDE4E8] rounded-full blur-3xl opacity-60"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md shadow-sm z-50 border-b border-slate-100 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#4D6BD9] rounded-lg flex items-center justify-center text-white">
                <span className="font-bold font-sans text-lg">M</span>
              </div>
              <span className="font-sans font-bold text-xl text-[#4D6BD9] tracking-tight">Psi. Mayara Luna</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('quem-sou')} className="text-slate-600 hover:text-[#F58888] font-bold text-sm uppercase tracking-wider transition-colors">Para quem é</button>
              <button onClick={() => scrollToSection('sobre')} className="text-slate-600 hover:text-[#F58888] font-bold text-sm uppercase tracking-wider transition-colors">Sobre Mim</button>
              <button onClick={() => scrollToSection('faq')} className="text-slate-600 hover:text-[#F58888] font-bold text-sm uppercase tracking-wider transition-colors">Dúvidas</button>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="bg-[#4D6BD9] hover:bg-[#3b55b3] text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-[4px_4px_0px_0px_rgba(216,230,255,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] flex items-center gap-2"
              >
                <MessageCircle size={18} />
                Agendar Sessão
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button onClick={toggleMenu} className="text-[#4D6BD9] focus:outline-none p-2">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full shadow-lg p-4 animate-in slide-in-from-top-5">
            <div className="space-y-3">
              <button onClick={() => scrollToSection('quem-sou')} className="block w-full text-left px-4 py-3 text-slate-600 font-bold hover:bg-[#FFF5DD] rounded-xl transition-colors">Para quem é</button>
              <button onClick={() => scrollToSection('sobre')} className="block w-full text-left px-4 py-3 text-slate-600 font-bold hover:bg-[#FFF5DD] rounded-xl transition-colors">Sobre Mim</button>
              <button onClick={() => scrollToSection('faq')} className="block w-full text-left px-4 py-3 text-slate-600 font-bold hover:bg-[#FFF5DD] rounded-xl transition-colors">Dúvidas</button>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="block w-full text-center mt-4 bg-[#4D6BD9] text-white px-4 py-3 rounded-xl font-bold"
              >
                Agendar via WhatsApp
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 bg-[#FFF5DD] relative overflow-hidden">
        {/* Doodle decorations */}
        <svg className="absolute top-32 left-10 w-16 h-16 text-[#F58888] opacity-50 animate-float" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M10,50 Q25,25 50,50 T90,50" />
          <path d="M10,70 Q25,45 50,70 T90,70" />
        </svg>
        <div className="absolute right-0 top-1/4 w-32 h-32 bg-[#D8E6FF] rounded-full blur-2xl opacity-60"></div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-center md:text-left">
            <RevealOnScroll>
              <div className="inline-block px-4 py-1.5 mb-6 bg-white border-2 border-[#D8E6FF] text-[#4D6BD9] rounded-full text-sm font-extrabold tracking-wide uppercase shadow-sm">
                ✨ Psicoterapia Online
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-[1.15] mb-6">
                Aprenda a lidar com a <span className="text-[#4D6BD9] relative inline-block">
                  ansiedade
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-[#F58888] opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span> e a autocobrança.
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed font-medium">
                Um espaço seguro e sem julgamentos para você entender suas emoções e construir uma relação mais leve consigo mesma.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start items-center">
                <a 
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-8 py-4 bg-[#F58888] hover:bg-[#e07575] text-white rounded-2xl font-bold text-lg shadow-[4px_4px_0px_0px_#4D6BD9] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#4D6BD9] transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-6 h-6" />
                  Quero Agendar
                </a>
                <button 
                  onClick={() => scrollToSection('sobre')}
                  className="w-full sm:w-auto px-8 py-4 bg-white border-2 border-[#D8E6FF] hover:border-[#4D6BD9] text-slate-600 hover:text-[#4D6BD9] rounded-2xl font-bold transition-all"
                >
                  Conhecer a Mayara
                </button>
              </div>

              <div className="mt-8 grid grid-cols-3 md:flex md:flex-wrap md:justify-start gap-1.5 md:gap-4 text-[10px] md:text-sm font-bold text-slate-500">
                {[
                  "Atendimento Online", 
                  "Abordagem TCC", 
                  "Crianças",
                  "Adolescentes",
                  "Mulheres",
                  "Adultos"
                ].map((item, index) => (
                  <div key={index} className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-0.5 md:gap-1 bg-white/60 px-0.5 py-1 md:px-3 md:py-1.5 rounded-md md:rounded-lg text-center md:text-left h-full shadow-sm md:shadow-none">
                    <Check size={12} className="text-[#F58888] md:w-4 md:h-4 shrink-0" />
                    <span className="leading-[1.1] md:leading-tight">{item}</span>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          <RevealOnScroll delay={200} className="relative mx-auto w-full max-w-md md:max-w-full">
            {/* Abstract shapes behind image */}
            <div className="absolute top-4 right-4 w-full h-full border-4 border-[#F58888] rounded-[2rem] z-0 transform rotate-3"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-[#D8E6FF] rounded-full z-10 flex items-center justify-center animate-bounce">
               <span className="text-2xl">💖</span>
            </div>
            
            <div className="relative z-0 rounded-[2rem] overflow-hidden shadow-2xl bg-white aspect-[4/5]">
               <img 
                 src="https://i.postimg.cc/cCfBWMq2/download.png" 
                 alt="Psicóloga Mayara Luna" 
                 className="w-full h-full object-cover"
               />
               <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#4D6BD9]/90 to-transparent p-6 pt-20 pl-24">
                 <p className="text-white font-bold text-lg">"Sua saúde mental é prioridade."</p>
               </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Para quem é este acompanhamento? */}
      <section id="quem-sou" className="py-20 px-4 bg-white relative">
        <div className="max-w-5xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <span className="text-[#F58888] font-extrabold uppercase tracking-widest text-sm">Identificação</span>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                Esse espaço é para você?
              </h2>
              <div className="w-24 h-1 bg-[#FFF5DD] mx-auto rounded-full">
                 <div className="w-12 h-1 bg-[#F58888] rounded-full"></div>
              </div>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1 space-y-4">
               {[
                  "Você sente que sua mente não para, mesmo tentando descansar.",
                  "Tem dificuldade de dizer 'não' e se sobrecarrega.",
                  "Sente culpa frequente e se cobra perfeição.",
                  "Percebe padrões de relacionamento que te machucam.",
                  "Sente-se emocionalmente esgotada."
                ].map((item, i) => (
                  <RevealOnScroll key={i} delay={i * 100}>
                    <div className="flex items-start gap-4 p-4 rounded-2xl hover:bg-[#FFF5DD] transition-colors group border border-transparent hover:border-[#F58888]/20">
                      <div className="mt-1 min-w-[32px] h-8 w-8 rounded-full bg-[#D8E6FF] flex items-center justify-center text-[#4D6BD9] group-hover:scale-110 transition-transform">
                        <Check size={18} strokeWidth={3} />
                      </div>
                      <span className="text-slate-700 font-semibold text-lg">{item}</span>
                    </div>
                  </RevealOnScroll>
                ))}
            </div>

            <div className="order-1 md:order-2 flex justify-center relative">
               <RevealOnScroll delay={300}>
                 <div className="relative w-72 h-72 md:w-96 md:h-96">
                    <div className="absolute inset-0 bg-[#FDE4E8] rounded-full opacity-50 blur-xl"></div>
                    <div className="relative z-10 bg-white p-8 rounded-3xl shadow-xl border-2 border-[#D8E6FF] transform rotate-2 hover:rotate-0 transition-transform duration-500 h-full flex flex-col items-center justify-center text-center">
                      <BrainCircuit size={64} className="text-[#4D6BD9] mb-6" />
                      <p className="text-xl font-bold text-slate-800">
                        "Não é frescura. É a sua história pedindo cuidado."
                      </p>
                      <div className="mt-6">
                        <Sparkles className="text-[#F58888] w-8 h-8 inline-block animate-pulse" />
                      </div>
                    </div>
                 </div>
               </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* TCC Section */}
      <section className="py-20 px-4 bg-[#FDE4E8] relative">
         {/* Background pattern - Polka dots */}
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#F58888 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
        
        <RevealOnScroll>
          <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Como a Psicoterapia pode ajudar?
            </h2>
            <p className="text-lg text-slate-700 max-w-2xl mx-auto font-medium">
              Utilizo a <span className="bg-white px-2 py-0.5 rounded shadow-sm text-[#4D6BD9] font-bold">TCC (Terapia Cognitivo-Comportamental)</span>, uma abordagem prática que nos ajuda a entender a conexão entre o que você pensa, sente e faz.
            </p>
          </div>
        </RevealOnScroll>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 relative z-10">
          {[
            {
              icon: <Smile size={40} className="text-white" />,
              title: "Autoconhecimento",
              desc: "Entenda os 'porquês' e identifique seus gatilhos.",
              bg: "bg-[#4D6BD9]"
            },
            {
              icon: <ShieldCheck size={40} className="text-white" />,
              title: "Ferramentas",
              desc: "Estratégias reais para regular emoções difíceis.",
              bg: "bg-[#F58888]"
            },
            {
              icon: <HeartHandshake size={40} className="text-[#4D6BD9]" />,
              title: "Relações",
              desc: "Aprenda a impor limites e construir autoestima.",
              bg: "bg-[#FFF5DD]" // Special styling for contrast
            }
          ].map((card, idx) => (
            <RevealOnScroll key={idx} delay={idx * 150} className="h-full">
              <div className="bg-white p-8 rounded-3xl shadow-lg hover:-translate-y-2 transition-transform duration-300 border-b-8 border-[#D8E6FF] h-full">
                <div className={`mb-6 w-16 h-16 rounded-2xl flex items-center justify-center shadow-md ${card.bg} ${card.bg === 'bg-[#FFF5DD]' ? 'text-[#4D6BD9]' : 'text-white'}`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{card.title}</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  {card.desc}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-24 px-4 bg-[#D8E6FF] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-20 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4D6BD9] opacity-10 rounded-full blur-3xl -ml-20 -mb-20"></div>

        <RevealOnScroll>
          <div className="max-w-5xl mx-auto bg-white rounded-[3rem] p-8 md:p-12 shadow-2xl relative">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 relative">
                 <div className="absolute inset-0 bg-[#F58888] rounded-full transform translate-x-2 translate-y-2"></div>
                 <img 
                   src="https://i.postimg.cc/63MN0R18/download-(3).png" 
                   alt="Psicóloga Mayara Luna" 
                   className="w-full h-full object-cover rounded-full border-4 border-white relative z-10 shadow-md grayscale-[20%] hover:grayscale-0 transition-all duration-500" 
                 />
              </div>
              
              <div className="text-center md:text-left flex-1">
                <div className="inline-block bg-[#FFF5DD] text-[#F58888] px-4 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide mb-4">
                  Sobre a Psi
                </div>
                <h2 className="text-3xl font-bold mb-2 text-slate-900">Olá, sou a Mayara Luna</h2>
                
                <div className="space-y-4 text-slate-600 font-medium leading-relaxed">
                  <p>
                    Sou psicóloga clínica apaixonada por ajudar pessoas a se reconectarem consigo mesmas. Acredito que a terapia não precisa ser fria; ela pode ser um encontro humano, quente e transformador.
                  </p>
                  <p>
                    Minha missão é oferecer uma escuta técnica, mas profundamente acolhedora. Crio um espaço seguro onde você pode tirar a armadura e falar sobre suas vulnerabilidades sem medo.
                  </p>
                </div>
                
                <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <a 
                    href={whatsappLink}
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#4D6BD9] text-white px-8 py-3 rounded-full font-bold hover:bg-[#3b55b3] transition-colors shadow-lg"
                  >
                    Vamos conversar?
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Logistics Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <RevealOnScroll>
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Como funciona na prática?
              </h2>
              <p className="text-slate-500 font-bold uppercase tracking-wide text-sm">Simples, seguro e online</p>
            </div>
          </RevealOnScroll>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Clock, title: "Duração", text: "Sessões de 50 minutos." },
              { icon: CalendarCheck, title: "Frequência", text: "Geralmente semanal." },
              { icon: Video, title: "Plataforma", text: "Google Meet ou WhatsApp Video." },
              { icon: ShieldCheck, title: "Sigilo", text: "Plataformas seguras e ética rigorosa." },
            ].map((item, i) => (
              <RevealOnScroll key={i} delay={i * 100}>
                <div className="bg-[#FFF5DD]/50 p-6 rounded-2xl flex items-center gap-5 hover:bg-[#FFF5DD] transition-colors duration-300">
                  <div className="bg-white p-3 rounded-xl shadow-sm text-[#F58888]">
                    <item.icon size={28} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">{item.title}</h3>
                    <p className="text-slate-600 font-medium">{item.text}</p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={400}>
            <div className="mt-10 p-8 bg-[#FDE4E8] rounded-3xl text-center relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-10">
                 <MessageCircle size={100} />
               </div>
              <p className="text-slate-800 font-bold text-lg">
                ✨ Valores e Formas de Pagamento
              </p>
              <p className="text-slate-600 mt-2 max-w-lg mx-auto">
                Todas as informações sobre investimento são passadas de forma clara e transparente através do WhatsApp.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-12">
              Perguntas Frequentes
            </h2>
          </RevealOnScroll>

          <div className="space-y-4">
            {[
              {
                q: "Como faço para agendar a primeira sessão?",
                a: "Basta clicar no botão de WhatsApp. Eu entrarei em contato para verificar a disponibilidade e tirar dúvidas."
              },
              {
                q: "A terapia online funciona mesmo?",
                a: "Sim! Estudos comprovam que a eficácia é equivalente à presencial, com a vantagem da comodidade."
              },
              {
                q: "Aceita convênios?",
                a: "Atendimento particular. Emito recibo para solicitação de reembolso no seu plano de saúde."
              },
              {
                q: "Preciso ter um 'problema grave'?",
                a: "Não! A terapia é para autoconhecimento e prevenção. Você não precisa esperar uma crise."
              }
            ].map((faq, index) => (
              <RevealOnScroll key={index} delay={index * 100}>
                <div className="border-2 border-[#D8E6FF] rounded-2xl overflow-hidden bg-white hover:border-[#4D6BD9] transition-colors">
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  >
                    <span className="font-bold text-slate-800 text-lg pr-4">{faq.q}</span>
                    {openFaqIndex === index ? <ChevronUp className="text-[#F58888]" /> : <ChevronDown className="text-[#4D6BD9]" />}
                  </button>
                  {openFaqIndex === index && (
                    <div className="p-6 pt-0 text-slate-600 leading-relaxed font-medium bg-[#FFF5DD]/30">
                      {faq.a}
                    </div>
                  )}
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 bg-[#4D6BD9] text-center relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{ backgroundImage: 'linear-gradient(45deg, #ffffff 25%, transparent 25%, transparent 50%, #ffffff 50%, #ffffff 75%, transparent 75%, transparent)', backgroundSize: '40px 40px' }}></div>
        
        <RevealOnScroll>
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Vamos cuidar de você?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-xl mx-auto font-medium">
              Você não precisa carregar tudo sozinha. Dê o primeiro passo hoje.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
              <a 
                href={whatsappLink}
                target="_blank" 
                rel="noreferrer"
                className="px-10 py-5 bg-[#F58888] hover:bg-[#FF9999] text-white rounded-full font-bold text-xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3"
              >
                <MessageCircle size={24} />
                Agendar Agora
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* Footer */}
      <footer className="bg-[#FFF5DD] text-slate-600 py-12 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-[#4D6BD9] font-bold text-xl mb-1">Psi. Mayara Luna</h3>
            <p className="text-sm mt-2 opacity-75">Atendimento Online para todo o Brasil</p>
          </div>
          
          <div className="flex gap-6 font-bold text-sm">
             <a href="#" className="hover:text-[#F58888] transition-colors">Instagram</a>
             <a href="#" className="hover:text-[#F58888] transition-colors">LinkedIn</a>
          </div>
        </div>
        <div className="text-center mt-12 text-xs opacity-50 font-semibold">
          &copy; {new Date().getFullYear()} Psicóloga Mayara Luna.
        </div>
      </footer>
    </div>
  );
};

export default App;

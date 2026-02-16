
import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  Ticket, 
  ChevronRight,
  Navigation,
  CheckCircle,
  Coffee,
  Utensils,
  Image as ImageIcon,
  Sparkles,
  Users,
  Send,
  Phone,
  ExternalLink,
  Zap,
  Clock
} from 'lucide-react';
import { VenueFeature, GalleryImage } from './types';
import VibeMeter from './components/VibeMeter';

const features: VenueFeature[] = [
  { id: '1', title: 'Gorilla Dance', description: 'High-energy performance that will set the stage on fire and keep the crowd hyped.', icon: '🦍' },
  { id: '2', title: 'Fun Zone', description: 'Full access to games, challenges, and unlimited entertainment to capture amazing moments.', icon: '🎮' },
  { id: '3', title: 'Ticket Entry', description: 'Secure entry system with exclusive digital tickets. No ticket, no entry.', icon: '🎟️' },
  { id: '4', title: 'Surprise Gifts', description: 'Special surprise gifts for all attendees to make the night truly memorable.', icon: '🎁' },
];

const menuData = {
  starters: ['Paneer Tikka', 'Veg Spring Roll', 'Noodles', 'Veg Manchurian (Dry)'],
  mainCourse: ['Dal Makhani', 'Mix Veg', 'Kadai Paneer', 'Jeera Rice', 'Assorted Breads', 'Green Salad', 'Boondi Raita', 'White Sauce Pasta'],
  dessert: ['Gulab Jamun with Ice Cream'],
  drinks: ['Welcome Drink on Arrival']
};

const gallery: GalleryImage[] = [
  { id: '1', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200', caption: 'Event Atmosphere' },
  { id: '2', url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800', caption: 'Night Life Vibes' },
  { id: '4', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800', caption: 'Party Highlight' },
  { id: '7', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800', caption: 'Vibrant Celebration' },
  { id: '8', url: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=800', caption: 'Nightly Spectacle' },
  { id: '9', url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=800', caption: 'Grand Venue' },
  { id: '11', url: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800', caption: 'Closing Moments' },
];

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', phone: '', guests: '1' });

  useEffect(() => {
    const targetDate = new Date('2026-03-28T15:00:00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
    setBookingStatus('submitting');
    setTimeout(() => {
      setBookingStatus('success');
    }, 1500);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, '');
    setFormData({ ...formData, name: value });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 10);
    setFormData({ ...formData, phone: value });
  };

  return (
    <div className="min-h-screen bg-transparent relative overflow-x-hidden text-white selection:bg-purple-600 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg shadow-purple-500/20">A</div>
            <div className="flex flex-col md:flex-row md:items-baseline">
              <span className="text-xl font-bold tracking-tighter uppercase cursor-pointer" onClick={scrollToTop}>AfterParty<span className="text-purple-500">Luxe</span></span>
              <span className="text-[10px] md:text-xs font-medium text-gray-400 lowercase tracking-widest md:ml-2">by ARN</span>
            </div>
          </div>
          <button 
            onClick={(e) => scrollToSection(e, 'booking')} 
            className="hidden md:block px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-purple-600/30"
          >
            Secure Tickets
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-48 pb-20 px-6 flex items-center z-10 overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10 animate-pulse"></div>
          
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest animate-bounce">
              <Zap size={14} className="animate-pulse" />
              <span>A Production by ARN</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black leading-tight tracking-tighter uppercase">
              The 12th <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">
                After Party
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-lg leading-relaxed font-light">
              Elevate your experience at Sky Restaurant. High-energy performances, exclusive fun zones, and a gourmet buffet waiting for the elite.
            </p>

            <div className="flex flex-wrap gap-4 py-4">
              <div className="glass px-6 py-4 rounded-[1.5rem] border-purple-500/20 min-w-[100px] flex flex-col items-center">
                <span className="text-4xl font-black text-white leading-none">{timeLeft.days}</span>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mt-2">Days</span>
              </div>
              <div className="glass px-6 py-4 rounded-[1.5rem] border-purple-500/20 min-w-[100px] flex flex-col items-center">
                <span className="text-4xl font-black text-white leading-none">{timeLeft.hours}</span>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mt-2">Hours</span>
              </div>
              <div className="glass px-6 py-4 rounded-[1.5rem] border-purple-500/20 min-w-[100px] flex flex-col items-center">
                <span className="text-4xl font-black text-white leading-none">{timeLeft.minutes}</span>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mt-2">Mins</span>
              </div>
              <div className="glass px-6 py-4 rounded-[1.5rem] bg-purple-600/10 border-purple-500/40 min-w-[100px] flex flex-col items-center shadow-lg shadow-purple-500/20">
                <span className="text-4xl font-black text-white leading-none animate-pulse">{timeLeft.seconds}</span>
                <span className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mt-2">Secs</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <button onClick={(e) => scrollToSection(e, 'booking')} className="px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full font-bold transition-all shadow-xl shadow-purple-600/30 flex items-center space-x-2 group">
                <span>Secure Tickets</span>
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button onClick={(e) => scrollToSection(e, 'menu')} className="px-8 py-4 glass hover:bg-white/10 rounded-full font-bold transition-all flex items-center space-x-2">
                <span>Gourmet Menu</span>
                <Utensils size={18} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-white/10">
              <div className="flex items-center space-x-3 group">
                <Calendar className="text-purple-400 group-hover:text-purple-300 transition-colors" size={20} />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Date</p>
                  <p className="font-bold">March 28, 2026</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group">
                <Clock className="text-purple-400 group-hover:text-purple-300 transition-colors" size={20} />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Time</p>
                  <p className="font-bold">3 PM - 7 PM</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group">
                <Ticket className="text-purple-400 group-hover:text-purple-300 transition-colors" size={20} />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Entry</p>
                  <p className="font-bold">Tickets Only</p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-3 group">
                <MapPin className="text-purple-400 group-hover:text-purple-300 transition-colors" size={20} />
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Venue</p>
                  <p className="font-bold">Sky Restaurant</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Features */}
      <section id="venue" className="py-32 px-6 bg-white/[0.01] z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 space-y-12">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black uppercase leading-tight tracking-tighter">The <span className="text-purple-500 italic">Vibe</span> Protocol</h2>
                <p className="text-gray-400 max-w-xl text-lg font-light">Engineered for maximum energy from 3 PM to 7 PM. Every element of the 12th After Party is curated for an unforgettable experience.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {features.map((f) => (
                  <div 
                    key={f.id} 
                    className="p-8 rounded-3xl glass hover:bg-white/[0.06] hover:border-purple-500/30 transition-all duration-300 group"
                  >
                    <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform">
                      {f.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-purple-400 transition-colors">{f.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{f.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center">
               <div className="relative">
                 <div className="absolute inset-0 bg-purple-600/20 blur-[60px] rounded-full animate-pulse"></div>
                 <VibeMeter />
                 <p className="mt-6 text-center text-[10px] font-black uppercase tracking-[0.4em] text-purple-500 animate-pulse">Live Event Metrics</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Food Menu Section */}
      <section id="menu" className="py-32 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">Gourmet <span className="text-purple-500">Experience</span></h2>
            <p className="text-gray-400 font-light italic">Fuel your afternoon with our premium buffet selection.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-[2rem] border border-white/5 hover:bg-white/[0.04] transition-all">
              <div className="flex items-center space-x-3 mb-6">
                <Utensils className="text-purple-500" />
                <h3 className="text-2xl font-bold uppercase tracking-tight">Starters</h3>
              </div>
              <ul className="space-y-4">
                {menuData.starters.map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-gray-400 group">
                    <CheckCircle size={16} className="text-purple-500/30 group-hover:text-purple-500 transition-colors" />
                    <span className="group-hover:text-white transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass p-8 rounded-[2rem] border border-purple-500/30 bg-purple-500/5 lg:scale-105 transition-all shadow-2xl shadow-purple-900/20">
              <div className="flex items-center space-x-3 mb-6">
                <Utensils className="text-purple-500" />
                <h3 className="text-2xl font-bold uppercase tracking-tight">Main Course</h3>
              </div>
              <ul className="space-y-4">
                {menuData.mainCourse.map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-gray-100 group">
                    <CheckCircle size={16} className="text-purple-500 group-hover:scale-110 transition-transform" />
                    <span className="font-medium group-hover:translate-x-1 transition-transform">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass p-8 rounded-[2rem] border border-white/5 hover:bg-white/[0.04] transition-all">
              <div className="flex items-center space-x-3 mb-6">
                <Coffee className="text-purple-500" />
                <h3 className="text-2xl font-bold uppercase tracking-tight">Finale</h3>
              </div>
              <div className="space-y-8">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] uppercase text-purple-400 mb-1 font-black tracking-widest">Dessert</p>
                  <p className="text-gray-100 font-bold">{menuData.dessert[0]}</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                  <p className="text-[10px] uppercase text-purple-400 mb-1 font-black tracking-widest">Beverage</p>
                  <p className="text-gray-100 font-bold">{menuData.drinks[0]}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section id="gallery" className="py-32 px-6 bg-white/[0.01] z-10 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Captured <span className="text-purple-500">Vibes</span></h2>
            <p className="text-gray-400 font-light italic">Moments that define the energy of our gatherings.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[250px] md:auto-rows-[300px]">
            {gallery.map((img, idx) => (
              <div 
                key={img.id} 
                className={`relative overflow-hidden rounded-[2.5rem] group border border-white/10 shadow-2xl transition-all duration-700 hover:shadow-purple-500/20
                  ${idx === 0 || idx === 3 ? 'md:col-span-2 md:row-span-2' : ''} 
                `}
              >
                <img 
                  src={img.url} 
                  alt={img.caption} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:brightness-110" 
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.unsplash.com/photo-1514525253361-bee8718a300a?auto=format&fit=crop&q=80&w=800';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 backdrop-blur-[2px]">
                  <p className="text-white font-black text-2xl tracking-tighter uppercase leading-none">{img.caption}</p>
                  <div className="w-16 h-1 bg-white mt-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-32 px-6 z-10 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[100px] rounded-full -z-10 animate-pulse"></div>
          
          <div className="glass p-8 md:p-16 rounded-[4rem] border-white/10 relative shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-3xl rounded-full"></div>
            
            <div className="absolute top-8 right-8 bg-purple-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-purple-600/40">
              Limited Seats
            </div>
            
            {bookingStatus === 'success' ? (
              <div className="text-center space-y-10 py-10 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center mx-auto mb-8 border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                  <CheckCircle size={48} className="animate-pulse" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none">Ticket <span className="text-purple-500">Reserved!</span></h2>
                  <p className="text-gray-300 text-lg max-w-md mx-auto leading-relaxed font-light">
                    Finalize your booking now. The event starts at 3 PM. You're one step away from joining the elite circle at Sky Restaurant.
                  </p>
                </div>
                
                <div className="pt-6">
                  <a 
                    href="https://forms.gle/ngamLjSp4ekZ5rfT8" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-4 px-10 py-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 hover:scale-105 active:scale-95 rounded-2xl font-black uppercase tracking-[0.2em] shadow-2xl shadow-purple-500/40 transition-all group"
                  >
                    <span>Finalize Confirmation</span>
                    <ExternalLink size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                </div>

                <button 
                  onClick={() => setBookingStatus('idle')}
                  className="text-gray-500 text-xs font-bold hover:text-white transition-colors pt-8 uppercase tracking-[0.3em]"
                >
                  Edit RSVP details
                </button>
              </div>
            ) : (
              <div className="space-y-12">
                <div className="text-center space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Secure Your <span className="text-purple-500 italic">Ticket</span></h2>
                  <p className="text-gray-400 font-light">March 28 • 3 PM - 7 PM • Sky Restaurant</p>
                </div>

                <form onSubmit={handleBooking} className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 ml-4">Full Name</label>
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors">
                        <Users size={20} />
                      </div>
                      <input 
                        required
                        type="text" 
                        placeholder="ALPHABETS ONLY"
                        value={formData.name}
                        onChange={handleNameChange}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 outline-none focus:border-purple-500 focus:bg-white/[0.08] transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 ml-4">WhatsApp Number</label>
                    <div className="relative group">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors">
                        <Phone size={20} />
                      </div>
                      <input 
                        required
                        type="tel" 
                        pattern="[0-9]{10}"
                        title="10 digit phone number"
                        placeholder="10 DIGIT NUMBER"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        className="w-full bg-white/[0.03] border border-white/5 rounded-2xl py-5 pl-14 pr-6 outline-none focus:border-purple-500 focus:bg-white/[0.08] transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 md:col-span-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400 ml-4">Guests</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                      {[1, 2, 3, 4, 5, '6+'].map(num => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setFormData({...formData, guests: num.toString()})}
                          className={`py-4 rounded-xl text-xs font-black transition-all border ${formData.guests === num.toString() ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/20' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="md:col-span-2 pt-6">
                    <button 
                      type="submit" 
                      disabled={bookingStatus === 'submitting'}
                      className="w-full py-6 bg-white text-black hover:bg-purple-600 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl font-black uppercase tracking-[0.3em] shadow-xl transition-all active:scale-[0.98] flex items-center justify-center space-x-4"
                    >
                      {bookingStatus === 'submitting' ? (
                        <div className="w-6 h-6 border-3 border-black/20 border-t-black rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Secure Tickets</span>
                          <Send size={18} />
                        </>
                      )}
                    </button>
                  </div>
                  
                  <p className="md:col-span-2 text-center text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed pt-4 font-bold">
                    * QR Tickets will be sent to your WhatsApp after confirmation.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-32 px-6 z-10 relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12">
            <h2 className="text-4xl md:text-6xl font-black uppercase leading-tight tracking-tighter">The <span className="text-purple-500 italic">Genesis</span> Destination</h2>
            <div className="space-y-10">
              <div className="flex items-start space-x-6 group">
                <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-lg shadow-purple-600/5">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-black text-xl uppercase tracking-tight">Sky Restaurant</h4>
                  <p className="text-gray-400 leading-relaxed font-light">Genesis Mall, Top Floor, Alwar Bypass Road<br/>Bhiwadi, Rajasthan 301019</p>
                </div>
              </div>
              <div className="flex items-start space-x-6 group">
                <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-lg shadow-purple-600/5">
                  <Navigation size={24} />
                </div>
                <div>
                  <h4 className="font-black text-xl uppercase tracking-tight">Access Control</h4>
                  <p className="text-gray-400 leading-relaxed font-light">Ample parking at Genesis Mall. Event runs from 3 PM to 7 PM. Present your digital ticket QR at the elevator base.</p>
                </div>
              </div>
            </div>
            
            <a 
               href="https://maps.app.goo.gl/fMn4H6jn7R6QCadA8"
               target="_blank"
               rel="noopener noreferrer"
               className="inline-flex items-center space-x-4 px-10 py-5 glass hover:bg-white/10 rounded-full font-black uppercase tracking-[0.2em] text-xs transition-all shadow-2xl"
             >
               <span>Get Directions</span>
               <ExternalLink size={18} />
            </a>
          </div>
          
          <a 
            href="https://maps.app.goo.gl/fMn4H6jn7R6QCadA8" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block rounded-[3rem] overflow-hidden glass h-[450px] relative group border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] cursor-pointer"
          >
            <iframe
              src="https://maps.google.com/maps?q=Sky%20Restaurant%20Genesis%20Mall%20Bhiwadi@28.214434,76.842795&t=&z=17&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="opacity-70 grayscale-[50%] hover:grayscale-0 hover:opacity-100 transition-all duration-1000 scale-110 group-hover:scale-100 pointer-events-none"
              title="Sky Restaurant Map"
            ></iframe>
            
            {/* Accuracy Pulse Marker Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative group/marker">
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-xl whitespace-nowrap opacity-100 transition-opacity">
                  Sky Restaurant
                </div>
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.8)] border-2 border-white animate-bounce pointer-events-auto">
                  <MapPin size={20} />
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-purple-500/30 rounded-full animate-ping"></div>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#030014]/60 to-transparent pointer-events-none"></div>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-white/5 z-10 relative">
        <div className="max-w-7xl mx-auto text-center space-y-16">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">See You <br/><span className="text-purple-500 italic">There.</span></h2>
            <p className="text-gray-400 text-lg font-light tracking-wide italic">"Vibes don't lie. 3 PM to 7 PM on March 28th."</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-[10px] font-black uppercase tracking-[0.4em] gap-8">
            <div className="flex flex-col items-center md:items-start cursor-pointer group" onClick={scrollToTop}>
              <span className="font-black text-white group-hover:text-purple-500 transition-colors">AfterParty<span className="text-purple-500 group-hover:text-white transition-colors">Luxe</span></span>
              <span className="text-gray-600 leading-none">ARN PRODUCTIONS</span>
            </div>
            <div className="flex space-x-8">
              <span className="hover:text-white cursor-pointer transition-colors" onClick={(e) => scrollToSection(e, 'venue')}>Experience</span>
              <span className="hover:text-white cursor-pointer transition-colors" onClick={(e) => scrollToSection(e, 'gallery')}>Gallery</span>
              <span className="hover:text-white cursor-pointer transition-colors" onClick={(e) => scrollToSection(e, 'booking')}>Tickets</span>
            </div>
            <span className="text-gray-700">© MMXXVI</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

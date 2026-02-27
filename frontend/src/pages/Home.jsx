import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext';
import { useMapsLibrary } from '@vis.gl/react-google-maps';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchData, setSearchData] = useState({ from: '', to: '' });
  const placesLibrary = useMapsLibrary('places');
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const [fromAutocomplete, setFromAutocomplete] = useState(null);
  const [toAutocomplete, setToAutocomplete] = useState(null);

  useEffect(() => {
    if (!placesLibrary || !fromInputRef.current) return;
    const options = { fields: ['formatted_address', 'geometry', 'name'] };
    const autocomplete = new placesLibrary.Autocomplete(fromInputRef.current, options);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      setSearchData(prev => ({ ...prev, from: place.formatted_address || place.name || '' }));
    });
    setFromAutocomplete(autocomplete);
  }, [placesLibrary]);

  useEffect(() => {
    if (!placesLibrary || !toInputRef.current) return;
    const options = { fields: ['formatted_address', 'geometry', 'name'] };
    const autocomplete = new placesLibrary.Autocomplete(toInputRef.current, options);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      setSearchData(prev => ({ ...prev, to: place.formatted_address || place.name || '' }));
    });
    setToAutocomplete(autocomplete);
  }, [placesLibrary]);

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchData.from) params.set('from', searchData.from);
    if (searchData.to) params.set('to', searchData.to);
    navigate(`/FindRides?${params.toString()}`);
  };

  return (
    <div className="bg-[#f0f4f8] dark:bg-slate-900 text-slate-800 dark:text-slate-100 min-h-screen font-sans flex flex-col transition-colors duration-200">
      {/* Top Navigation Wrapper for visual separation */}
      <header className="bg-blue-600 dark:bg-blue-900 text-white rounded-b-3xl pb-8 pt-6 px-6 lg:px-12 shadow-sm relative overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 dark:bg-black/10 rounded-full -translate-y-32 translate-x-32 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400/20 dark:bg-blue-700/20 rounded-full translate-y-24 -translate-x-12 blur-xl"></div>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-blue-100 text-sm font-medium tracking-wide">Welcome back,</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Hello {user?.user_metadata?.first_name || 'Commuter'}!
            </h1>
          </div>
        </div>

        {/* Quick Search Floating Bar */}
        <div className="relative z-10 max-w-3xl mx-auto mt-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-2 flex flex-col sm:flex-row gap-2">
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700">
            <span className="material-symbols-outlined text-blue-600">my_location</span>
            <input
              ref={fromInputRef}
              type="text"
              placeholder="Current Location"
              className="bg-transparent border-none outline-none text-slate-700 dark:text-slate-200 w-full text-sm font-medium"
              value={searchData.from}
              onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
            />
          </div>
          <div className="flex items-center justify-center sm:-mx-4 z-10 hidden sm:flex">
            <div className="h-8 w-8 rounded-full bg-white dark:bg-slate-800 border overflow-hidden border-slate-100 dark:border-slate-700 flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-slate-400 text-[18px]">swap_horiz</span>
            </div>
          </div>
          <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-700">
            <span className="material-symbols-outlined text-sky-500">location_on</span>
            <input
              ref={toInputRef}
              type="text"
              placeholder="Where to?"
              className="bg-transparent border-none outline-none text-slate-700 dark:text-slate-200 w-full text-sm font-medium"
              value={searchData.to}
              onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
            />
          </div>
          <button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 py-3 font-semibold transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-[20px]">search</span>
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-12 py-8 flex flex-col gap-10">
        {/* Upcoming Trip Section */}
        <section className="animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">calendar_clock</span>
              Upcoming Trip
            </h2>
            <button onClick={() => navigate('/MyBookings')} className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors">View All</button>
          </div>
          <div className="bg-gradient-to-r from-blue-500 to-sky-600 rounded-2xl p-6 text-white shadow-md relative overflow-hidden group hover:shadow-lg transition-all">
            {/* Map Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCI+PHBhdGggZD0iTTAgMGwyMCAyME0yMCAwbC0yMCAyMCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiIC8+PC9zdmc+')] bg-repeat mix-blend-overlay"></div>

            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex-1 w-full">
                <div className="flex items-center justify-between mb-2 text-blue-50">
                  <span className="text-sm font-semibold tracking-wide uppercase">Today, 14:30 PM</span>
                  <span className="text-sm font-mono bg-white/20 px-2 py-0.5 rounded backdrop-blur-sm">TR-#8821</span>
                </div>
                <div className="flex items-center gap-6 mt-4 relative">
                  <div className="absolute left-[11px] top-6 bottom-6 w-0.5 bg-white/30 border-l border-dashed border-white/50"></div>
                  <div className="flex flex-col gap-8 w-full">
                    <div className="flex items-start gap-4">
                      <div className="size-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm z-10">
                        <div className="size-2.5 rounded-full bg-blue-500"></div>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg leading-tight">Sandton City</h4>
                        <p className="text-blue-100 text-sm">Pickup Point A</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="size-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm z-10">
                        <span className="material-symbols-outlined text-[14px] text-sky-600">location_on</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-lg leading-tight">OR Tambo Int.</h4>
                        <p className="text-blue-100 text-sm">Terminal 2 Drop-off</p>
                      </div>
                      <div className="ml-auto text-right">
                        <span className="text-2xl font-black block">R 45.00</span>
                        <span className="text-xs text-blue-100 bg-black/20 px-2 py-1 rounded inline-block mt-1">Paid</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-row md:flex-col gap-3 shrink-0">
                <button className="flex-1 md:w-full bg-white text-blue-700 font-bold py-3 px-6 rounded-xl shadow-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">directions_car</span>
                  Track Driver
                </button>
                <button className="flex-1 md:w-full bg-black/20 text-white font-bold py-3 px-6 rounded-xl hover:bg-black/30 backdrop-blur-sm transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">qr_code_scanner</span>
                  Boarding Pass
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Recommended Rides */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-sky-500">recommend</span>
                Recommended Rides
              </h2>
              <div className="flex gap-2">
                <button className="size-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <span className="material-symbols-outlined text-slate-500 text-[18px]">chevron_left</span>
                </button>
                <button className="size-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <span className="material-symbols-outlined text-slate-500 text-[18px]">chevron_right</span>
                </button>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Ride Card 1 */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-400 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">bolt</span> Express
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900 dark:text-white block">R 35.00</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="size-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                    <div className="w-0.5 h-6 bg-slate-200 dark:bg-slate-700"></div>
                    <div className="size-2.5 rounded-full bg-blue-500"></div>
                  </div>
                  <div className="flex flex-col justify-between h-[60px]">
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">Pretoria CBD</p>
                      <p className="text-xs text-slate-500">16:00 PM</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">Centurion Mall</p>
                      <p className="text-xs text-slate-500">16:45 PM</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-bold">MK</div>
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Mike K. <span className="text-amber-500">★ 4.8</span></span>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">event_seat</span>
                    2 left
                  </span>
                </div>
              </div>

              {/* Ride Card 2 */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span> Standard
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900 dark:text-white block">R 25.00</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex flex-col items-center gap-1">
                    <div className="size-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                    <div className="w-0.5 h-6 bg-slate-200 dark:bg-slate-700"></div>
                    <div className="size-2.5 rounded-full bg-sky-500"></div>
                  </div>
                  <div className="flex flex-col justify-between h-[60px]">
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">Menlyn Maine</p>
                      <p className="text-xs text-slate-500">17:15 PM</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">Hatfield Station</p>
                      <p className="text-xs text-slate-500">17:40 PM</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <div className="size-6 rounded-full bg-slate-200 dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center text-[10px] font-bold">SJ</div>
                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Sarah J. <span className="text-amber-500">★ 4.9</span></span>
                  </div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">event_seat</span>
                    4 left
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Actions & System Health */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-600">flash_on</span>
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => navigate('/FindRides')} className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-800 transition-colors group">
                  <div className="size-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-blue-600">search</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Find Ride</span>
                </button>
                <button onClick={() => navigate('/PostTrip')} className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 hover:bg-sky-50 dark:hover:bg-sky-900/20 hover:border-sky-200 dark:hover:border-sky-800 transition-colors group">
                  <div className="size-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-sky-500">add_circle</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Offer Ride</span>
                </button>
                <button onClick={() => navigate('/Wallet')} className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:border-emerald-200 dark:hover:border-emerald-800 transition-colors group">
                  <div className="size-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-emerald-600">account_balance_wallet</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Top Up Wallet</span>
                </button>
                <button onClick={() => navigate('/MyBookings')} className="flex flex-col items-center justify-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-700 hover:bg-amber-50 dark:hover:bg-amber-900/20 hover:border-amber-200 dark:hover:border-amber-800 transition-colors group">
                  <div className="size-10 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-amber-500">history</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">History</span>
                </button>
              </div>
            </div>

            {/* Saved Places */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-rose-500">favorite</span>
                Saved Places
              </h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 cursor-pointer transition-colors">
                  <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-slate-500">home</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Home</p>
                    <p className="text-xs text-slate-500 truncate">123 Maple Street, Pretoria</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 cursor-pointer transition-colors">
                  <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-slate-500">work</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Office</p>
                    <p className="text-xs text-slate-500 truncate">Centurion Business Park</p>
                  </div>
                </div>
              </div>
              <button className="w-full mt-2 py-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors border border-dashed border-blue-200 dark:border-blue-800">
                + Add Saved Place
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
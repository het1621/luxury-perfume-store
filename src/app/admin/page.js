"use client";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  DollarSign, 
  TrendingUp, 
  MoreHorizontal 
} from 'lucide-react';

export default function AdminDashboard() {
  // Fake data for the CSS bar chart
  const weeklyRevenue = [
    { day: 'Mon', amount: 40 },
    { day: 'Tue', amount: 70 },
    { day: 'Wed', amount: 45 },
    { day: 'Thu', amount: 90 },
    { day: 'Fri', amount: 65 },
    { day: 'Sat', amount: 100 },
    { day: 'Sun', amount: 85 },
  ];

  // Fake data for recent orders
  const recentOrders = [
    { id: '#ORD-001', customer: 'Eleanor Vance', date: 'Today, 2:45 PM', status: 'Processing', total: '$215.00' },
    { id: '#ORD-002', customer: 'James Sterling', date: 'Today, 11:20 AM', status: 'Shipped', total: '$120.00' },
    { id: '#ORD-003', customer: 'Sophia Rossi', date: 'Yesterday', status: 'Delivered', total: '$340.00' },
    { id: '#ORD-004', customer: 'Michael Chang', date: 'Yesterday', status: 'Processing', total: '$85.00' },
  ];

  return (
    <div className="min-h-screen bg-[#020202] pt-24 px-4 md:px-8 pb-12 flex flex-col md:flex-row gap-8">
      
      {/* LEFT SIDEBAR (Navigation) */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-sm sticky top-32">
          <h2 className="text-xs text-gray-500 tracking-[0.2em] uppercase mb-8">Menu</h2>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-4 text-[#d4af37] bg-white/5 p-3 text-xs tracking-widest uppercase transition-colors">
              <LayoutDashboard size={16} /> Overview
            </a>
            <a href="#" className="flex items-center gap-4 text-gray-400 hover:text-white p-3 text-xs tracking-widest uppercase transition-colors">
              <ShoppingBag size={16} /> Products
            </a>
            <a href="#" className="flex items-center gap-4 text-gray-400 hover:text-white p-3 text-xs tracking-widest uppercase transition-colors">
              <Users size={16} /> Customers
            </a>
            <a href="#" className="flex items-center gap-4 text-gray-400 hover:text-white p-3 text-xs tracking-widest uppercase transition-colors">
              <DollarSign size={16} /> Finances
            </a>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-end border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl font-serif text-white uppercase tracking-widest mb-2">Dashboard</h1>
            <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">Welcome back, Admin. Here is your store's performance.</p>
          </div>
          <button className="bg-white text-black px-6 py-3 text-[10px] tracking-[0.2em] uppercase hover:bg-[#d4af37] transition-colors">
            Download Report
          </button>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Total Revenue', value: '$24,500', icon: DollarSign, trend: '+12.5%' },
            { title: 'Active Orders', value: '142', icon: ShoppingBag, trend: '+5.2%' },
            { title: 'Total Customers', value: '1,204', icon: Users, trend: '+18.1%' },
            { title: 'Conversion Rate', value: '3.8%', icon: TrendingUp, trend: '+1.2%' },
          ].map((metric, idx) => (
            <div key={idx} className="bg-[#0a0a0a] border border-white/10 p-6 group hover:border-white/30 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <p className="text-[10px] text-gray-400 tracking-[0.2em] uppercase">{metric.title}</p>
                <metric.icon size={16} className="text-gray-500 group-hover:text-[#d4af37] transition-colors" />
              </div>
              <h3 className="text-2xl font-serif text-white tracking-widest">{metric.value}</h3>
              <p className="text-[#d4af37] text-[10px] tracking-widest mt-2">{metric.trend} from last month</p>
            </div>
          ))}
        </div>

        {/* Middle Section: Chart & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Fake CSS Bar Chart */}
          <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/10 p-6 sm:p-8">
            <h2 className="text-xs text-white tracking-[0.2em] uppercase mb-8">Revenue Overview (This Week)</h2>
            <div className="h-48 flex items-end justify-between gap-2 sm:gap-4 mt-8">
              {weeklyRevenue.map((day, idx) => (
                <div key={idx} className="w-full flex flex-col items-center gap-4 group">
                  {/* The Bar */}
                  <div className="w-full bg-white/5 relative group-hover:bg-white/10 transition-colors rounded-t-sm" style={{ height: '100%' }}>
                    <div 
                      className="absolute bottom-0 w-full bg-[#d4af37] transition-all duration-1000 ease-out"
                      style={{ height: `${day.amount}%` }}
                    ></div>
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white text-black text-[9px] font-bold py-1 px-2 tracking-widest transition-opacity">
                      ${day.amount}k
                    </div>
                  </div>
                  {/* The Label */}
                  <p className="text-[10px] text-gray-500 tracking-widest uppercase">{day.day}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="bg-[#0a0a0a] border border-white/10 p-6 sm:p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xs text-white tracking-[0.2em] uppercase">Recent Orders</h2>
              <button className="text-gray-500 hover:text-white"><MoreHorizontal size={16} /></button>
            </div>
            
            <div className="space-y-6">
              {recentOrders.map((order, idx) => (
                <div key={idx} className="flex justify-between items-center pb-6 border-b border-white/5 last:border-0 last:pb-0">
                  <div>
                    <p className="text-xs text-white tracking-widest mb-1">{order.customer}</p>
                    <p className="text-[9px] text-gray-500 tracking-widest uppercase">{order.id} • {order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-[#d4af37] tracking-widest mb-1">{order.total}</p>
                    <span className={`text-[9px] tracking-[0.2em] uppercase px-2 py-1 ${
                      order.status === 'Delivered' ? 'bg-green-900/30 text-green-400' : 
                      order.status === 'Shipped' ? 'bg-blue-900/30 text-blue-400' : 
                      'bg-orange-900/30 text-orange-400'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
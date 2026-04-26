'use client';
import React, { useState } from 'react';
import useSWR from 'swr';
import ErrorBoundary from '@/components/ErrorBoundary';
import { 
  LayoutDashboard, 
  Stethoscope, 
  Users, 
  MessageSquare, 
  LogOut, 
  Menu, 
  X,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  Loader2,
  X as CloseIcon,
  TrendingUp,
  Calendar,
  Clock,
  DollarSign,
  Activity,
  ArrowUp,
  ArrowDown,
  ChevronDown
} from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';
import { toast } from 'sonner';
import { Service, Dentist, ContactQuery, Appointment } from '@/types/firebase';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

type AdminTab = 'dashboard' | 'services' | 'dentists' | 'queries' | 'appointments';

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function AdminPanel() {
  return (
    <ErrorBoundary>
      <AdminPanelContent />
    </ErrorBoundary>
  );
}

function AdminPanelContent() {
  const { isAuthenticated, loading: authLoading, logout } = useAdminAuth();
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [dentistModalOpen, setDentistModalOpen] = useState(false);
  const [editingDentist, setEditingDentist] = useState<Dentist | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [queryModalOpen, setQueryModalOpen] = useState(false);
  const [editingQuery, setEditingQuery] = useState<ContactQuery | null>(null);

  const { data: servicesData, mutate: mutateServices } = useSWR(
    isAuthenticated ? '/api/services' : null,
    fetcher,
    { revalidateOnFocus: true, revalidateOnReconnect: true, dedupingInterval: 5000 }
  );

  const { data: dentistsData, mutate: mutateDentists } = useSWR(
    isAuthenticated ? '/api/dentists' : null,
    fetcher,
    { revalidateOnFocus: true, revalidateOnReconnect: true, dedupingInterval: 5000 }
  );

  const { data: queriesData, mutate: mutateQueries } = useSWR(
    isAuthenticated ? '/api/queries' : null,
    fetcher,
    { revalidateOnFocus: true, revalidateOnReconnect: true, dedupingInterval: 5000 }
  );

  const { data: appointmentsData, mutate: mutateAppointments } = useSWR(
    isAuthenticated ? '/api/appointments' : null,
    fetcher,
    { revalidateOnFocus: true, revalidateOnReconnect: true, dedupingInterval: 5000 }
  );

  const services = servicesData?.data || [];
  const dentists = dentistsData?.data || [];
  const queries = queriesData?.data || [];
  const appointments = appointmentsData?.data || [];
  const loading = !servicesData && !dentistsData && !queriesData && !appointmentsData;

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'bg-gradient-to-br from-blue-500 to-blue-600' },
    { id: 'services', label: 'Services', icon: Stethoscope, color: 'bg-gradient-to-br from-teal-500 to-teal-600' },
    { id: 'dentists', label: 'Our Dentists', icon: Users, color: 'bg-gradient-to-br from-purple-500 to-purple-600' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, color: 'bg-gradient-to-br from-rose-500 to-rose-600' },
    { id: 'queries', label: 'Contact Queries', icon: MessageSquare, color: 'bg-gradient-to-br from-amber-500 to-amber-600' },
  ];

  const handleLogout = () => {
    toast.success('Logged out successfully');
    logout();
  };

  // Early returns after all hooks
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-navy-600 mx-auto mb-4" />
          <p className="text-slate-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect by useAdminAuth
  }

  // Delete functions
  const handleDeleteService = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        mutateServices();
        toast.success('Service deleted successfully');
      } else {
        toast.error(data.error || 'Failed to delete service');
      }
    } catch (error: any) {
      toast.error('Failed to delete service');
    }
  };

  const handleDeleteDentist = async (id: string) => {
    if (!confirm('Are you sure you want to delete this dentist?')) return;
    try {
      const res = await fetch(`/api/dentists/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        mutateDentists();
        toast.success('Dentist deleted successfully');
      } else {
        toast.error(data.error || 'Failed to delete dentist');
      }
    } catch (error: any) {
      toast.error('Failed to delete dentist');
    }
  };

  const handleDeleteQuery = async (id: string) => {
    if (!confirm('Are you sure you want to delete this query?')) return;
    try {
      const res = await fetch(`/api/queries/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        mutateQueries();
        toast.success('Query deleted successfully');
      } else {
        toast.error(data.error || 'Failed to delete query');
      }
    } catch (error: any) {
      toast.error('Failed to delete query');
    }
  };

  const handleDeleteAppointment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return;
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        mutateAppointments();
        toast.success('Appointment deleted successfully');
      } else {
        toast.error(data.error || 'Failed to delete appointment');
      }
    } catch (error: any) {
      toast.error('Failed to delete appointment');
    }
  };

  const handleUpdateAppointmentStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        mutateAppointments();
        toast.success('Appointment status updated');
      } else {
        toast.error(data.error || 'Failed to update appointment');
      }
    } catch (error) {
      toast.error('Failed to update appointment');
    }
  };

  const handleUpdateQueryStatus = async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/queries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (data.success) {
        mutateQueries();
        toast.success('Query status updated');
      } else {
        toast.error(data.error || 'Failed to update query');
      }
    } catch (error) {
      toast.error('Failed to update query');
    }
  };

  const handleCreateAppointment = async (appointmentData: Partial<Appointment>) => {
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...appointmentData, consentGiven: true })
      });
      const data = await res.json();
      if (data.success) {
        mutateAppointments();
        toast.success('Appointment created successfully');
        setAppointmentModalOpen(false);
        setEditingAppointment(null);
      } else {
        toast.error(data.error || 'Failed to create appointment');
      }
    } catch (error) {
      toast.error('Failed to create appointment');
    }
  };

  const handleUpdateAppointment = async (id: string, appointmentData: Partial<Appointment>) => {
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData)
      });
      const data = await res.json();
      if (data.success) {
        mutateAppointments();
        toast.success('Appointment updated successfully');
        setAppointmentModalOpen(false);
        setEditingAppointment(null);
      } else {
        toast.error(data.error || 'Failed to update appointment');
      }
    } catch (error) {
      toast.error('Failed to update appointment');
    }
  };

  const handleCreateQuery = async (queryData: Partial<ContactQuery>) => {
    try {
      const res = await fetch('/api/queries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...queryData, status: 'pending' })
      });
      const data = await res.json();
      if (data.success) {
        mutateQueries();
        toast.success('Query created successfully');
        setQueryModalOpen(false);
        setEditingQuery(null);
      } else {
        toast.error(data.error || 'Failed to create query');
      }
    } catch (error) {
      toast.error('Failed to create query');
    }
  };

  const handleUpdateQuery = async (id: string, queryData: Partial<ContactQuery>) => {
    try {
      const res = await fetch(`/api/queries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(queryData)
      });
      const data = await res.json();
      if (data.success) {
        mutateQueries();
        toast.success('Query updated successfully');
        setQueryModalOpen(false);
        setEditingQuery(null);
      } else {
        toast.error(data.error || 'Failed to update query');
      }
    } catch (error) {
      toast.error('Failed to update query');
    }
  };

  const handleCreateService = async (serviceData: Partial<Service>) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData)
      });
      const data = await res.json();
      if (data.success) {
        mutateServices();
        toast.success('Service created successfully');
        setServiceModalOpen(false);
        setEditingService(null);
      } else {
        toast.error(data.error || 'Failed to create service');
      }
    } catch (error) {
      toast.error('Failed to create service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateService = async (id: string, serviceData: Partial<Service>) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/services/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData)
      });
      const data = await res.json();
      if (data.success) {
        mutateServices();
        toast.success('Service updated successfully');
        setServiceModalOpen(false);
        setEditingService(null);
      } else {
        toast.error(data.error || 'Failed to update service');
      }
    } catch (error) {
      toast.error('Failed to update service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateDentist = async (dentistData: Partial<Dentist>) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/dentists', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dentistData)
      });
      const data = await res.json();
      if (data.success) {
        mutateDentists();
        toast.success('Dentist created successfully');
        setDentistModalOpen(false);
        setEditingDentist(null);
      } else {
        toast.error(data.error || 'Failed to create dentist');
      }
    } catch (error) {
      toast.error('Failed to create dentist');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateDentist = async (id: string, dentistData: Partial<Dentist>) => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/dentists/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dentistData)
      });
      const data = await res.json();
      if (data.success) {
        mutateDentists();
        toast.success('Dentist updated successfully');
        setDentistModalOpen(false);
        setEditingDentist(null);
      } else {
        toast.error(data.error || 'Failed to update dentist');
      }
    } catch (error) {
      toast.error('Failed to update dentist');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-navy-600 mx-auto mb-4" />
          <p className="text-slate-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Mobile header */}
      <div className="lg:hidden bg-gradient-to-r from-navy-700 to-navy-800 px-4 py-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5">
          <AppLogo size={32} />
          <span className="font-display text-lg font-bold text-white">SmileCare Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-white/10 text-white transition-all"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:sticky top-0 left-0 z-50 w-72 h-screen bg-gradient-to-b from-navy-800 to-navy-900 shadow-2xl transition-transform duration-300`}>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/10">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <AppLogo size={28} />
              </div>
              <div>
                <span className="font-display text-xl font-bold text-white">SmileCare</span>
                <p className="text-xs text-slate-300">Admin Dashboard</p>
              </div>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as AdminTab)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    activeTab === item.id
                      ? `${item.color} text-white shadow-lg transform scale-[1.02]`
                      : 'text-slate-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <item.icon size={18} className={activeTab === item.id ? 'text-white' : 'text-slate-400 group-hover:text-white'} />
                  {item.label}
                  {activeTab === item.id && <ChevronDown size={16} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />}
                </button>
              ))}
            </nav>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/10 bg-navy-900/50 backdrop-blur-sm">
            <div className="bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-teal-400" />
                <span className="text-xs font-semibold text-teal-400">Performance</span>
              </div>
              <p className="text-2xl font-bold text-white">98.5%</p>
              <p className="text-xs text-slate-400">System uptime</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all border border-red-500/20"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 lg:p-8 min-h-screen">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-navy-800 capitalize">
                {activeTab}
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage your {activeTab}
              </p>
            </div>
            {activeTab !== 'dashboard' && (
              <button 
                onClick={() => {
                  if (activeTab === 'services') {
                    setEditingService(null);
                    setServiceModalOpen(true);
                  } else if (activeTab === 'dentists') {
                    setEditingDentist(null);
                    setDentistModalOpen(true);
                  } else if (activeTab === 'appointments') {
                    setEditingAppointment(null);
                    setAppointmentModalOpen(true);
                  } else if (activeTab === 'queries') {
                    setEditingQuery(null);
                    setQueryModalOpen(true);
                  }
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-navy-600 to-navy-700 hover:from-navy-700 hover:to-navy-800 text-white text-sm font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
              >
                <Plus size={16} />
                Add New
              </button>
            )}
          </div>

          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Services', value: services.length, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50', icon: Stethoscope, trend: '+12%', trendUp: true },
                  { label: 'Total Dentists', value: dentists.length, color: 'from-teal-500 to-teal-600', bg: 'bg-teal-50', icon: Users, trend: '+5%', trendUp: true },
                  { label: 'Appointments', value: appointments.length, color: 'from-rose-500 to-rose-600', bg: 'bg-rose-50', icon: Calendar, trend: '+18%', trendUp: true },
                  { label: 'Pending Queries', value: queries.filter((q: ContactQuery) => q.status === 'pending').length, color: 'from-amber-500 to-amber-600', bg: 'bg-amber-50', icon: MessageSquare, trend: '-8%', trendUp: false },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-slate-100">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-md`}>
                        <stat.icon size={24} className="text-white" />
                      </div>
                      <div className={`flex items-center gap-1 text-xs font-semibold ${stat.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.trendUp ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                        {stat.trend}
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-navy-800">{stat.value}</p>
                    <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Services by Category Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                  <h3 className="font-display text-lg font-bold text-navy-800 mb-4">Services by Category</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={services.reduce((acc: any, s: Service) => {
                      const existing = acc.find((item: any) => item.category === s.category);
                      if (existing) {
                        existing.count++;
                      } else {
                        acc.push({ category: s.category, count: 1 });
                      }
                      return acc;
                    }, [])}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="category" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e293b', 
                          borderRadius: '8px', 
                          border: 'none',
                          color: '#fff'
                        }} 
                      />
                      <Bar dataKey="count" fill="url(#colorGradient)" radius={[8, 8, 0, 0]} />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        </linearGradient>
                      </defs>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Query Status Distribution */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                  <h3 className="font-display text-lg font-bold text-navy-800 mb-4">Query Status Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Pending', value: queries.filter((q: ContactQuery) => q.status === 'pending').length, color: '#f59e0b' },
                          { name: 'Resolved', value: queries.filter((q: ContactQuery) => q.status === 'resolved').length, color: '#10b981' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        <Cell fill="#f59e0b" />
                        <Cell fill="#10b981" />
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1e293b', 
                          borderRadius: '8px', 
                          border: 'none',
                          color: '#fff'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="text-sm text-slate-600">Pending</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-sm text-slate-600">Resolved</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-100">
                <h3 className="font-display text-lg font-bold text-navy-800 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {queries.slice(0, 5).map((query: ContactQuery) => (
                    <div key={query.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                      <div className={`w-10 h-10 rounded-full ${query.status === 'pending' ? 'bg-amber-100' : 'bg-green-100'} flex items-center justify-center`}>
                        <MessageSquare size={18} className={query.status === 'pending' ? 'text-amber-600' : 'text-green-600'} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-navy-800">{query.name}</p>
                        <p className="text-xs text-slate-500">{query.subject}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${query.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                          {query.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Services */}
          {activeTab === 'services' && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white shadow-sm"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
                    <Filter size={16} />
                    Filter
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:text-navy-700">Service</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:text-navy-700">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:text-navy-700">Duration</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:text-navy-700">Price</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:text-navy-700">Popular</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {services.map((service: Service) => (
                      <tr key={service.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-lg ${service.color} flex items-center justify-center shadow-sm`}>
                              <Stethoscope size={18} />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-navy-700">{service.name}</p>
                              <p className="text-xs text-slate-500 line-clamp-1">{service.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{service.category}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{service.duration}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-navy-700">{service.price}</td>
                        <td className="px-6 py-4">
                          {service.popular ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-700 shadow-sm">
                              Yes
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600 shadow-sm">
                              No
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => {
                                setEditingService(service);
                                setServiceModalOpen(true);
                              }}
                              className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-navy-600 transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteService(service.id)}
                              className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Dentists */}
          {activeTab === 'dentists' && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search dentists..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white shadow-sm"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
                    <Filter size={16} />
                    Filter
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {dentists.map((dentist: Dentist) => (
                    <div key={dentist.id} className="bg-gradient-to-br from-slate-50 to-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow border border-slate-100">
                      <div className="relative h-48">
                        <img
                          src={dentist.photo}
                          alt={dentist.name}
                          className="w-full h-full object-cover"
                        />
                        <span className={`absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full ${dentist.badgeColor} shadow-sm`}>
                          {dentist.badge}
                        </span>
                      </div>
                      <div className="p-5">
                        <h3 className="font-display text-lg font-semibold text-navy-700 mb-1">{dentist.name}</h3>
                        <p className="text-sm text-slate-500 mb-2">{dentist.title}</p>
                        <p className="text-sm font-semibold text-teal-600 mb-3">{dentist.specialization}</p>
                        <p className="text-xs text-slate-500 line-clamp-2 mb-4">{dentist.bio}</p>
                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <button 
                            onClick={() => {
                              setEditingDentist(dentist);
                              setDentistModalOpen(true);
                            }}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                          >
                            <Edit size={14} />
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDeleteDentist(dentist.id)}
                            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Queries */}
          {activeTab === 'queries' && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search queries..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white shadow-sm"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
                    <Filter size={16} />
                    Filter
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:text-navy-700">Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:text-navy-700">Email</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:text-navy-700">Subject</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:text-navy-700">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:text-navy-700">Status</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {queries.map((query: ContactQuery) => (
                      <tr key={query.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-navy-700">{query.name}</p>
                            <p className="text-xs text-slate-500">{query.phone}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{query.email}</td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-600 capitalize">{query.subject}</p>
                          <p className="text-xs text-slate-500 line-clamp-1">{query.message}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {new Date(query.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={query.status}
                            onChange={(e) => handleUpdateQueryStatus(query.id, e.target.value)}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border-0 cursor-pointer shadow-sm ${
                              query.status === 'pending' 
                                ? 'bg-amber-100 text-amber-700' 
                                : query.status === 'in-progress'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => {
                                setEditingQuery(query);
                                setQueryModalOpen(true);
                              }}
                              className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-navy-600 transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteQuery(query.id)}
                              className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Appointments */}
          {activeTab === 'appointments' && (
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
                <div className="flex items-center gap-4">
                  <div className="relative flex-1">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search appointments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 bg-white shadow-sm"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all">
                    <Filter size={16} />
                    Filter
                  </button>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:text-navy-700">Patient Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:text-navy-700">Service</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:text-navy-700">Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:text-navy-700">Time</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:text-navy-700">Phone</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider cursor-pointer hover:text-navy-700">Status</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-slate-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {appointments.map((appointment: Appointment) => (
                      <tr key={appointment.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-navy-700">{appointment.patientName}</p>
                            <p className="text-xs text-slate-500">{appointment.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{appointment.service}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">
                          {new Date(appointment.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600">{appointment.timeSlot}</td>
                        <td className="px-6 py-4 text-sm text-slate-600">{appointment.phone}</td>
                        <td className="px-6 py-4">
                          <select
                            value={appointment.status}
                            onChange={(e) => handleUpdateAppointmentStatus(appointment.id, e.target.value)}
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border-0 cursor-pointer shadow-sm ${
                              appointment.status === 'pending' 
                                ? 'bg-amber-100 text-amber-700' 
                                : appointment.status === 'confirmed'
                                ? 'bg-green-100 text-green-700'
                                : appointment.status === 'cancelled'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => {
                                setEditingAppointment(appointment);
                                setAppointmentModalOpen(true);
                              }}
                              className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-navy-600 transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDeleteAppointment(appointment.id)}
                              className="p-2 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Service Modal */}
      {serviceModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4" role="dialog" aria-modal="true" aria-labelledby="service-modal-title">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 shadow-2xl max-h-[90vh] overflow-y-auto" role="document">
            <div className="flex items-center justify-between mb-6">
              <h2 id="service-modal-title" className="font-display text-xl font-bold text-navy-700">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button 
                onClick={() => {
                  setServiceModalOpen(false);
                  setEditingService(null);
                }}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <CloseIcon size={20} />
              </button>
            </div>
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                
                // Form validation
                const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
                const category = (form.elements.namedItem('category') as HTMLSelectElement).value as Service['category'];
                const duration = (form.elements.namedItem('duration') as HTMLInputElement).value.trim();
                const price = (form.elements.namedItem('price') as HTMLInputElement).value.trim();
                const description = (form.elements.namedItem('description') as HTMLTextAreaElement).value.trim();
                const popular = (form.elements.namedItem('popular') as HTMLSelectElement).value === 'true';
                const color = (form.elements.namedItem('color') as HTMLInputElement).value.trim();
                
                if (!name || !category || !duration || !price || !description) {
                  toast.error('Please fill in all required fields');
                  return;
                }
                
                const serviceData = {
                  name,
                  category,
                  duration,
                  price,
                  description,
                  popular,
                  color,
                };
                
                if (editingService) {
                  await handleUpdateService(editingService.id, serviceData);
                } else {
                  await handleCreateService(serviceData);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Service Name</label>
                <input 
                  name="name" 
                  defaultValue={editingService?.name}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Category</label>
                <select 
                  name="category"
                  defaultValue={editingService?.category}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                >
                  <option value="Preventive">Preventive</option>
                  <option value="Cosmetic">Cosmetic</option>
                  <option value="Restorative">Restorative</option>
                  <option value="Orthodontic">Orthodontic</option>
                  <option value="Surgical">Surgical</option>
                  <option value="Emergency">Emergency</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Duration</label>
                  <input 
                    name="duration" 
                    defaultValue={editingService?.duration}
                    required
                    placeholder="60 min"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Price</label>
                  <input 
                    name="price" 
                    defaultValue={editingService?.price}
                    required
                    placeholder="From $85"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Description</label>
                <textarea 
                  name="description"
                  defaultValue={editingService?.description}
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Color Class</label>
                  <input 
                    name="color" 
                    defaultValue={editingService?.color || 'bg-blue-50 text-blue-600'}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Popular</label>
                  <select 
                    name="popular"
                    defaultValue={editingService?.popular ? 'true' : 'false'}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  >
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => {
                    setServiceModalOpen(false);
                    setEditingService(null);
                  }}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {editingService ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    editingService ? 'Update' : 'Create'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Dentist Modal */}
      {dentistModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-navy-700">
                {editingDentist ? 'Edit Dentist' : 'Add New Dentist'}
              </h2>
              <button 
                onClick={() => {
                  setDentistModalOpen(false);
                  setEditingDentist(null);
                }}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <CloseIcon size={20} />
              </button>
            </div>
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                
                // Form validation
                const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
                const title = (form.elements.namedItem('title') as HTMLInputElement).value.trim();
                const specialization = (form.elements.namedItem('specialization') as HTMLInputElement).value.trim();
                const experience = (form.elements.namedItem('experience') as HTMLInputElement).value.trim();
                const languages = (form.elements.namedItem('languages') as HTMLInputElement).value.trim();
                const bio = (form.elements.namedItem('bio') as HTMLTextAreaElement).value.trim();
                const photo = (form.elements.namedItem('photo') as HTMLInputElement).value.trim();
                const photoAlt = (form.elements.namedItem('photoAlt') as HTMLInputElement).value.trim();
                const badge = (form.elements.namedItem('badge') as HTMLInputElement).value.trim();
                const badgeColor = (form.elements.namedItem('badgeColor') as HTMLInputElement).value.trim();
                const nextSlot = (form.elements.namedItem('nextSlot') as HTMLInputElement).value.trim();
                
                if (!name || !title || !specialization || !experience || !languages || !bio) {
                  toast.error('Please fill in all required fields');
                  return;
                }
                
                const dentistData = {
                  name,
                  title,
                  specialization,
                  experience,
                  languages,
                  bio,
                  photo,
                  photoAlt,
                  badge,
                  badgeColor,
                  nextSlot,
                };
                
                if (editingDentist) {
                  await handleUpdateDentist(editingDentist.id, dentistData);
                } else {
                  await handleCreateDentist(dentistData);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Name</label>
                <input 
                  name="name" 
                  defaultValue={editingDentist?.name}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Title</label>
                  <input 
                    name="title" 
                    defaultValue={editingDentist?.title}
                    required
                    placeholder="DDS, MS"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Experience</label>
                  <input 
                    name="experience" 
                    defaultValue={editingDentist?.experience}
                    required
                    placeholder="14 years"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Specialization</label>
                <input 
                  name="specialization" 
                  defaultValue={editingDentist?.specialization}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Languages</label>
                <input 
                  name="languages" 
                  defaultValue={editingDentist?.languages}
                  required
                  placeholder="English, Hindi, Gujarati"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Bio</label>
                <textarea 
                  name="bio"
                  defaultValue={editingDentist?.bio}
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Photo URL</label>
                <input 
                  name="photo" 
                  defaultValue={editingDentist?.photo}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Photo Alt Text</label>
                <input 
                  name="photoAlt" 
                  defaultValue={editingDentist?.photoAlt}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Badge</label>
                  <input 
                    name="badge" 
                    defaultValue={editingDentist?.badge || 'Dentist'}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Badge Color</label>
                  <input 
                    name="badgeColor" 
                    defaultValue={editingDentist?.badgeColor || 'bg-teal-100 text-teal-700'}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Next Available Slot</label>
                <input 
                  name="nextSlot" 
                  defaultValue={editingDentist?.nextSlot}
                  placeholder="Today, 3:30 PM"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => {
                    setDentistModalOpen(false);
                    setEditingDentist(null);
                  }}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      {editingDentist ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    editingDentist ? 'Update' : 'Create'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Appointment Modal */}
      {appointmentModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-navy-700">
                {editingAppointment ? 'Edit Appointment' : 'Add New Appointment'}
              </h2>
              <button 
                onClick={() => {
                  setAppointmentModalOpen(false);
                  setEditingAppointment(null);
                }}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <CloseIcon size={20} />
              </button>
            </div>
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const appointmentData = {
                  patientName: (form.elements.namedItem('patientName') as HTMLInputElement).value,
                  email: (form.elements.namedItem('email') as HTMLInputElement).value,
                  phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
                  service: (form.elements.namedItem('service') as HTMLSelectElement).value,
                  dentistName: (form.elements.namedItem('dentistName') as HTMLSelectElement).value,
                  date: (form.elements.namedItem('date') as HTMLInputElement).value,
                  timeSlot: (form.elements.namedItem('timeSlot') as HTMLInputElement).value,
                  status: (form.elements.namedItem('status') as HTMLSelectElement).value as any,
                  notes: (form.elements.namedItem('notes') as HTMLTextAreaElement).value,
                };
                if (editingAppointment) {
                  await handleUpdateAppointment(editingAppointment.id, appointmentData);
                } else {
                  await handleCreateAppointment(appointmentData);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Patient Name</label>
                <input 
                  name="patientName" 
                  defaultValue={editingAppointment?.patientName}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Email</label>
                  <input 
                    name="email" 
                    type="email"
                    defaultValue={editingAppointment?.email}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Phone</label>
                  <input 
                    name="phone" 
                    defaultValue={editingAppointment?.phone}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Service</label>
                  <select 
                    name="service"
                    defaultValue={editingAppointment?.service}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  >
                    {services.map((s: Service) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Dentist</label>
                  <select 
                    name="dentistName"
                    defaultValue={editingAppointment?.dentistName}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  >
                    <option value="No preference">No preference</option>
                    {dentists.map((d: Dentist) => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Date</label>
                  <input 
                    name="date" 
                    type="date"
                    defaultValue={editingAppointment?.date}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Time Slot</label>
                  <input 
                    name="timeSlot" 
                    defaultValue={editingAppointment?.timeSlot}
                    required
                    placeholder="10:00 AM"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Status</label>
                <select 
                  name="status"
                  defaultValue={editingAppointment?.status || 'pending'}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Notes</label>
                <textarea 
                  name="notes"
                  defaultValue={editingAppointment?.notes}
                  rows={2}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => {
                    setAppointmentModalOpen(false);
                    setEditingAppointment(null);
                  }}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700"
                >
                  {editingAppointment ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Query Modal */}
      {queryModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-navy-700">
                {editingQuery ? 'Edit Query' : 'Add New Query'}
              </h2>
              <button 
                onClick={() => {
                  setQueryModalOpen(false);
                  setEditingQuery(null);
                }}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                <CloseIcon size={20} />
              </button>
            </div>
            <form 
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const queryData = {
                  name: (form.elements.namedItem('name') as HTMLInputElement).value,
                  email: (form.elements.namedItem('email') as HTMLInputElement).value,
                  phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
                  subject: (form.elements.namedItem('subject') as HTMLSelectElement).value as any,
                  message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
                  status: (form.elements.namedItem('status') as HTMLSelectElement).value as any,
                };
                if (editingQuery) {
                  await handleUpdateQuery(editingQuery.id, queryData);
                } else {
                  await handleCreateQuery(queryData);
                }
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Name</label>
                <input 
                  name="name" 
                  defaultValue={editingQuery?.name}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Email</label>
                  <input 
                    name="email" 
                    type="email"
                    defaultValue={editingQuery?.email}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-navy-700 mb-1">Phone</label>
                  <input 
                    name="phone" 
                    defaultValue={editingQuery?.phone}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Subject</label>
                <select 
                  name="subject" 
                  defaultValue={editingQuery?.subject}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                >
                  <option value="appointment">Appointment</option>
                  <option value="insurance">Insurance</option>
                  <option value="billing">Billing</option>
                  <option value="records">Medical Records</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Message</label>
                <textarea 
                  name="message"
                  defaultValue={editingQuery?.message}
                  required
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-navy-700 mb-1">Status</label>
                <select 
                  name="status"
                  defaultValue={editingQuery?.status || 'pending'}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <button 
                  type="button"
                  onClick={() => {
                    setQueryModalOpen(false);
                    setEditingQuery(null);
                  }}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700"
                >
                  {editingQuery ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

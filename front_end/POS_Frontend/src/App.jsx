import React, { useState } from 'react';
import POSScreen from './components/POSScreen';
import OrdersScreen from './components/OrdersScreen';
import { ShoppingCart, Monitor } from 'lucide-react';

function App() {
  const [activeTab, setActiveTab] = useState('pos');

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #eff6ff, #e0e7ff)' }}>
      {/* Header */}
      <div style={{ background: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShoppingCart size={32} />
              POS System
            </h1>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setActiveTab('pos')}
                style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === 'pos' ? '#4f46e5' : '#e5e7eb',
                  color: activeTab === 'pos' ? 'white' : '#374151',
                  boxShadow: activeTab === 'pos' ? '0 4px 6px rgba(79, 70, 229, 0.3)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <ShoppingCart size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Bán hàng
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                style={{
                  padding: '0.5rem 1.5rem',
                  borderRadius: '0.5rem',
                  fontWeight: '500',
                  border: 'none',
                  cursor: 'pointer',
                  background: activeTab === 'orders' ? '#4f46e5' : '#e5e7eb',
                  color: activeTab === 'orders' ? 'white' : '#374151',
                  boxShadow: activeTab === 'orders' ? '0 4px 6px rgba(79, 70, 229, 0.3)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <Monitor size={16} style={{ display: 'inline', marginRight: '0.5rem' }} />
                Đơn hàng
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem' }}>
        {activeTab === 'pos' ? <POSScreen /> : <OrdersScreen />}
      </div>
    </div>
  );
}

export default App;
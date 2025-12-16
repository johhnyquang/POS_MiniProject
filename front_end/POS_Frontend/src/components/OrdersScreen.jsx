import React, { useState, useEffect } from 'react';
import { Monitor, Hash, Clock } from 'lucide-react';
import signalRService from '../services/signalRService';

const API_URL = import.meta.env.VITE_API_URL;

function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Fetch initial orders
    fetchOrders();

    // Setup SignalR connection
    const setupSignalR = async () => {
      const connected = await signalRService.startConnection(API_URL);
      setIsConnected(connected);

      if (connected) {
        signalRService.onReceiveNewOrder((order) => {
          console.log('New order received:', order);
          setOrders(prevOrders => [order, ...prevOrders]);
        });
      }
    };

    setupSignalR();

    // Cleanup
    return () => {
      signalRService.stopConnection();
    };
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/api/Orders`);
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1f2937' }}>
          <Monitor size={28} />
          Đơn hàng Realtime
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isConnected ? '#10b981' : '#ef4444' }}></div>
          <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            {isConnected ? 'Đang kết nối' : 'Mất kết nối'}
          </span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: '#9ca3af' }}>
          <Monitor size={64} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
          <p style={{ fontSize: '1.125rem' }}>Chưa có đơn hàng nào</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {orders.map((order, index) => (
            <div
              key={order.orderId}
              className={index === 0 ? 'animate-slide-in' : ''}
              style={{
                background: 'linear-gradient(to right, #eef2ff, #dbeafe)',
                padding: '1.5rem',
                borderRadius: '0.5rem',
                borderLeft: '4px solid #4f46e5',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#374151', marginBottom: '0.5rem' }}>
                    <Hash size={16} />
                    <span>Mã đơn hàng: {order.orderId}</span>
                    <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{order.id}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                    <Clock size={16} />
                    <span>Thời gian: {formatDate(order.orderDate)}</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>Tổng tiền</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5' }}>
                    {formatCurrency(order.totalAmount)}
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '0.75rem', marginTop: '0.75rem' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>Chi tiết:</div>
                <div style={{ display: 'grid', gap: '0.25rem' }}>
                  {order.orderItems.map(item => (
                    <div key={item.productId} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#6b7280' }}>
                      <span>{item.productName} x{item.quantity}</span>
                      <span style={{ fontWeight: '500' }}>{formatCurrency(item.productPrice * item.quantity)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrdersScreen;
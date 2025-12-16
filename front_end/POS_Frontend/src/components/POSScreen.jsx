import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package, DollarSign } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

function POSScreen() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/api/Products`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      showNotification('Lỗi tải sản phẩm', 'error');
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.productId === product.productId);
    if (existingItem) {
      setCart(cart.map(item =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCart(cart.map(item => {
      if (item.productId === productId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(''), 3000);
  };

  const checkout = async () => {
    if (cart.length === 0) {
      showNotification('Giỏ hàng trống!', 'error');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/Orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderItems: cart }),
      });

      const data = await response.json();

      if (data.success) {
        showNotification('Thanh toán thành công!', 'success');
        setCart([]);
      } else {
        showNotification(data.message || 'Lỗi thanh toán', 'error');
      }
    } catch (error) {
      console.error('Error checkout:', error);
      showNotification('Lỗi kết nối server', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {notification && (
        <div style={{
          position: 'fixed',
          top: '5rem',
          right: '1rem',
          background: notification.type === 'success' ? '#10b981' : '#ef4444',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}>
          {notification.message}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1f2937' }}>
              <Package size={24} />
              Danh sách sản phẩm
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
              {products.map(product => (
                <button
                  key={product.productId}
                  onClick={() => addToCart(product)}
                  style={{
                    background: 'linear-gradient(to bottom right, #eef2ff, #dbeafe)',
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    border: '2px solid #c7d2fe',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <img
                      src={product.imageUrl}
                      alt={product.productName}
                      style={{
                        width: '100%',
                        height: '140px',
                        objectFit: 'cover',
                        borderRadius: '0.5rem',
                        backgroundColor: '#f3f4f6'
                      }}
                    />
                  <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>{product.productName}</div>
                  <div style={{ color: '#4f46e5', fontWeight: 'bold' }}>{formatCurrency(product.price)}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div style={{ background: 'white', borderRadius: '1rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', padding: '1.5rem', position: 'sticky', top: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1f2937' }}>
              <ShoppingCart size={24} />
              Giỏ hàng
            </h2>

            <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '1rem' }}>
              {cart.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#9ca3af', padding: '2rem 0' }}>Chưa có sản phẩm</p>
              ) : (
                cart.map(item => (
                  <div key={item.productId} style={{ background: '#f9fafb', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                      <div style={{ fontWeight: '500', color: '#1f2937' }}>{item.productName}</div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        ✕
                      </button>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button onClick={() => updateQuantity(item.productId, -1)} style={{ background: '#e5e7eb', border: 'none', width: '28px', height: '28px', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                        <span style={{ width: '32px', textAlign: 'center', fontWeight: '600' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, 1)} style={{ background: '#e5e7eb', border: 'none', width: '28px', height: '28px', borderRadius: '4px', cursor: 'pointer' }}>+</button>
                      </div>
                      <div style={{ color: '#4f46e5', fontWeight: 'bold' }}>
                        {formatCurrency(item.price * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>Tổng cộng:</span>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4f46e5' }}>
                  {formatCurrency(getTotal())}
                </span>
              </div>
              <button
                onClick={checkout}
                disabled={cart.length === 0 || loading}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  fontWeight: 'bold',
                  color: 'white',
                  border: 'none',
                  cursor: cart.length === 0 || loading ? 'not-allowed' : 'pointer',
                  background: cart.length === 0 || loading ? '#d1d5db' : 'linear-gradient(to right, #4f46e5, #3b82f6)'
                }}
              >
                <DollarSign size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
                {loading ? 'Đang xử lý...' : 'Thanh toán'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default POSScreen;
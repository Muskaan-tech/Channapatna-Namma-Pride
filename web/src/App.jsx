import { useState, useRef, useCallback, useEffect } from 'react';
import {
  products, artisans, getArtisan, getProduct, verifyCode as verifyCodeFn,
} from './data';

/* ─── Login Screen (Google + Email only) ─────────────────────────────── */
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogle = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin('Google User', 'google@user.com'); }, 1400);
  };

  const handleEmail = () => {
    if (!email.includes('@')) { setError('Enter a valid email address'); return; }
    if (!password) { setError('Enter your password'); return; }
    setError(''); setLoading(true);
    setTimeout(() => { setLoading(false); onLogin(email.split('@')[0], email); }, 1000);
  };

  return (
    <div className="login-screen">
      <div className="login-hero">
        <div className="login-hero-icon">🪆</div>
        <div className="login-hero-title">Channapatna<br />Namma Pride</div>
        <div className="login-hero-sub">Handcrafted with love · Verified by artisans</div>
      </div>

      <div className="login-card">
        <div className="login-welcome">Welcome back 👋</div>
        <div className="login-welcome-sub">Sign in to shop authentic Channapatna crafts</div>

        {/* Google */}
        <button className="login-google-btn" onClick={handleGoogle} disabled={loading}>
          <svg width="20" height="20" viewBox="0 0 48 48">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.35-8.16 2.35-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          {loading ? 'Connecting…' : 'Continue with Google'}
        </button>

        <div className="login-divider"><span>or use email</span></div>

        <div className="login-field">
          <label className="login-label">Email Address</label>
          <input className="login-input login-input-full" type="email" placeholder="you@example.com"
            value={email} onChange={e => { setEmail(e.target.value); setError(''); }} />
        </div>
        <div className="login-field">
          <label className="login-label">Password</label>
          <div className="login-input-row">
            <input className="login-input" type={showPass?'text':'password'} placeholder="Enter your password"
              value={password} onChange={e => setPassword(e.target.value)} />
            <button className="login-eye" onClick={()=>setShowPass(p=>!p)}>{showPass?'🙈':'👁️'}</button>
          </div>
        </div>

        {error && <div className="login-error">⚠️ {error}</div>}

        <button className="btn btn-primary btn-full login-submit" onClick={handleEmail} disabled={loading}>
          {loading ? <><span className="loading-spinner" /> Signing in…</> : '🔐 Sign In with Email'}
        </button>

        <div className="login-terms">By continuing you agree to our <span>Terms</span> &amp; <span>Privacy Policy</span></div>
      </div>
    </div>
  );
}

/* ─── Star Rating ─────────────────────────────────────────────────── */
function StarRating({ rating, size = 12 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1 }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          style={{
            fontSize: size,
            color: i <= Math.round(rating) ? '#F4C430' : '#D5C3AE',
          }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

/* ─── Product Card ────────────────────────────────────────────────── */
function ProductCard({ product, onClick }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div className="product-card" onClick={onClick}>
      {!imgErr
        ? <img
            className="product-card-img"
            src={product.imageUrl}
            alt={product.name}
            onError={() => setImgErr(true)}
            loading="lazy"
          />
        : <div className="product-card-img-placeholder">🎨</div>
      }
      <div className="product-card-body">
        <div className="product-card-name">{product.name}</div>
        <div className="product-card-row">
          <span className="product-card-price">₹{product.price.toFixed(2)}</span>
          <span className="product-card-rating">
            <span className="star">★</span>{product.rating}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Featured Card ───────────────────────────────────────────────── */
function FeaturedCard({ product, onClick }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div className="featured-card" onClick={onClick}>
      <div className="featured-img-wrap">
        {!imgErr
          ? <img src={product.imageUrl} alt={product.name} onError={() => setImgErr(true)} />
          : <div style={{ width: '100%', height: '100%', background: 'var(--sand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40 }}>🎨</div>
        }
        <div className="featured-badge">
          <span className="featured-badge-name">{product.name}</span>
          <span className="featured-badge-rating">
            <span>★</span>{product.rating}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ─── Toast ──────────────────────────────────────────────────────── */
function Toast({ message, onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2200); return () => clearTimeout(t); }, []);
  return (
    <div style={{
      position: 'fixed', bottom: 90, left: '50%', transform: 'translateX(-50%)',
      background: 'var(--wood-brown)', color: '#fff', borderRadius: 30,
      padding: '12px 24px', fontSize: 14, fontWeight: 600, zIndex: 9999,
      boxShadow: '0 4px 20px rgba(0,0,0,0.25)', whiteSpace: 'nowrap',
      animation: 'popIn 0.3s ease',
    }}>{message}</div>
  );
}

/* ─── Buy Now Modal ───────────────────────────────────────────────── */
function BuyNowModal({ product, onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      zIndex: 9998, animation: 'popIn 0.2s ease',
    }} onClick={onClose}>
      <div style={{
        background: 'var(--cream)', borderRadius: '24px 24px 0 0',
        padding: '28px 24px 40px', width: '100%', maxWidth: 430,
      }} onClick={e => e.stopPropagation()}>
        <div style={{ width: 40, height: 4, background: 'var(--divider)', borderRadius: 2, margin: '0 auto 20px' }} />
        <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6 }}>🛍️ Ready to Order?</div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.6 }}>
          You're about to buy <strong>{product.name}</strong> for <strong>₹{product.price.toFixed(2)}</strong>.
          Direct from the artisan — no middlemen!
        </div>
        <div style={{ background: 'var(--sand)', borderRadius: 14, padding: '14px 16px', marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Order Summary</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 6 }}>
            <span style={{ color: 'var(--text-secondary)' }}>{product.name}</span>
            <span style={{ fontWeight: 700 }}>₹{product.price.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-muted)' }}>
            <span>Shipping</span><span style={{ color: 'var(--green)', fontWeight: 600 }}>FREE</span>
          </div>
          <div style={{ height: 1, background: 'var(--divider)', margin: '10px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800, color: 'var(--wood-brown)' }}>
            <span>Total</span><span>₹{product.price.toFixed(2)}</span>
          </div>
        </div>
        <div style={{ background: 'var(--sand)', borderRadius: 14, padding: '12px 16px', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 24 }}>🚧</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--wood-brown)' }}>Payment Coming Soon</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>UPI, Card & COD — launching next update</div>
          </div>
        </div>
        <button className="btn btn-primary btn-full" onClick={onClose} style={{ marginBottom: 10 }}>Got it!</button>
        <button className="btn btn-secondary btn-full" onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

/* ─── Home Screen ─────────────────────────────────────────────────── */
function HomeScreen({ navigate, cart }) {
  const [query, setQuery] = useState('');
  const filtered = query.trim()
    ? products.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : products;

  const featured = products.slice(0, 4);

  return (
    <div className="screen">
      {/* Top bar */}
      <div className="top-bar">
        <span className="top-bar-logo">🪆</span>
        <span className="top-bar-title">Channapatna Namma Pride</span>
        <div
          style={{ position: 'relative', marginLeft: 'auto', cursor: 'pointer', padding: '4px 6px' }}
          onClick={() => navigate('cart')}
        >
          <span style={{ fontSize: 22 }}>🛒</span>
          {cart.length > 0 && (
            <span style={{
              position: 'absolute', top: -2, right: -4,
              background: '#E53935', color: '#fff',
              fontSize: 10, fontWeight: 800,
              borderRadius: '50%', width: 17, height: 17,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              lineHeight: 1, boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
            }}>{cart.length}</span>
          )}
        </div>
      </div>

      <div style={{ padding: '16px 16px 0' }}>
        {/* Search */}
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            placeholder="Search handmade toys, decor..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <span
              style={{ cursor: 'pointer', opacity: 0.5, fontSize: 16 }}
              onClick={() => setQuery('')}
            >✕</span>
          )}
        </div>
      </div>

      {/* Featured horizontal */}
      {!query && (
        <div style={{ padding: '18px 0 0 16px' }}>
          <div className="section-title" style={{ paddingRight: 16 }}>Featured Products</div>
          <div className="featured-scroll" style={{ paddingRight: 16 }}>
            {featured.map((p) => (
              <FeaturedCard
                key={p.id}
                product={p}
                onClick={() => navigate('detail', { productId: p.id })}
              />
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <div style={{ padding: '18px 16px 8px' }}>
        <div className="section-title">
          {query ? `Results for "${query}"` : 'All Products'}
        </div>
        {filtered.length === 0
          ? <div className="text-center text-muted" style={{ padding: '40px 0' }}>No products found</div>
          : <div className="product-grid">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onClick={() => navigate('detail', { productId: p.id })}
                />
              ))}
            </div>
        }
      </div>
    </div>
  );
}

/* ─── Product Detail Screen ───────────────────────────────────────── */
function ProductDetailScreen({ productId, navigate, onAddToCart }) {
  const product = getProduct(productId);
  const artisan = product ? getArtisan(product.artisanId) : null;
  const [imgErr, setImgErr] = useState(false);
  const [artImgErr, setArtImgErr] = useState(false);
  const [toast, setToast] = useState(null);
  const [addedAnim, setAddedAnim] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setToast('🛒 Added to cart!');
    setAddedAnim(true);
    setTimeout(() => setAddedAnim(false), 600);
  };

  const handleBuyNow = () => {
    onAddToCart(product);
    navigate('payment');
  };

  if (!product) return <EmptyState message="Product not found" onBack={() => navigate('home')} />;

  return (
    <div className="screen-no-nav">
      {/* Top bar */}
      <div className="top-bar">
        <button className="top-bar-back" onClick={() => navigate('back')}>‹</button>
        <span className="top-bar-title">{product.name}</span>
      </div>

      {/* Hero image */}
      <div className="detail-hero">
        {!imgErr
          ? <img src={product.imageUrl} alt={product.name} onError={() => setImgErr(true)} />
          : <div style={{ width: '100%', height: '100%', background: 'var(--sand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80 }}>🎨</div>
        }
      </div>

      {/* Content */}
      <div className="detail-content">
        {/* Name + rating */}
        <div className="detail-name-row">
          <h1 className="detail-name">{product.name}</h1>
          <span className="detail-rating">
            <span style={{ color: '#F4C430' }}>★</span>
            {product.rating}
          </span>
        </div>

        {/* Price */}
        <div className="detail-price">₹{product.price.toFixed(2)}</div>

        {/* Verified badge + cart actions */}
        {product.isVerified && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <span className="verified-badge">✓ Verified</span>
            <button
              onClick={handleAddToCart}
              style={{
                background: addedAnim ? 'var(--green)' : 'var(--sand)',
                color: addedAnim ? '#fff' : 'var(--wood-brown)',
                border: '1.5px solid var(--divider)',
                borderRadius: 20, padding: '5px 14px',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                transition: 'background 0.2s, color 0.2s',
                display: 'flex', alignItems: 'center', gap: 5,
              }}
            >
              {addedAnim ? '✓ Added!' : '🛒 Add to Cart'}
            </button>
            <button
              onClick={handleBuyNow}
              style={{
                background: 'var(--wood-brown)', color: '#fff',
                border: 'none', borderRadius: 20, padding: '5px 14px',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 5,
                boxShadow: '0 2px 8px rgba(92,51,23,0.25)',
              }}
            >
              ⚡ Buy Now
            </button>
          </div>
        )}
        {toast && <Toast message={toast} onDone={() => setToast(null)} />}

        {/* Description */}
        <div className="card">
          <div className="card-title">Description</div>
          <p className="description-text">{product.description}</p>
        </div>

        {/* Artisan card */}
        {artisan && (
          <div
            className="artisan-card"
            onClick={() => navigate('artisan', { artisanId: artisan.id })}
          >
            {!artImgErr && artisan.photoUrl
              ? <img
                  className="artisan-avatar"
                  src={artisan.photoUrl}
                  alt={artisan.name}
                  onError={() => setArtImgErr(true)}
                />
              : <div className="artisan-avatar-placeholder">👤</div>
            }
            <div className="artisan-info">
              <div className="artisan-label">Artisan Preview Card</div>
              <div className="artisan-name">{artisan.name}</div>
              <div className="artisan-rating">
                <StarRating rating={artisan.rating} />
                <span style={{ marginLeft: 4 }}>{artisan.rating.toFixed(1)}</span>
              </div>
            </div>
            <span className="artisan-arrow">›</span>
          </div>
        )}

        {/* Action buttons */}
        <div className="btn-row">
          <button
            className="btn btn-secondary"
            onClick={() => navigate('story', { productId: product.id })}
          >
            📖 Read Story
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate('ar', { productId: product.id })}
          >
            🥽 AR View
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── AR Screen ───────────────────────────────────────────────────── */
// Channapatna toy 3D model mapping — 6 products, 6 dedicated GLB files:
//  prod_001 → Lacquered_Gombe_Doll.glb
//  prod_002 → Wooden_Rocking_Horse.glb
//  prod_003 → Handcrafted_Elephant.glb
//  prod_004 → Traditional_Gombe.glb
//  prod_005 → Colorful_Spinning_Top.glb
//  prod_006 → Decorative_Vase.glb
const AR_MODELS = {
  'prod_001': '/models/Lacquered_Gombe_Doll.glb',
  'prod_002': '/models/Wooden_Rocking_Horse.glb',
  'prod_003': '/models/Handcrafted_Elephant.glb',
  'prod_004': '/models/Traditional_Gombe.glb',
  'prod_005': '/models/Colorful_Spinning_Top.glb',
  'prod_006': '/models/Decorative_Vase.glb',
};

function ARScreen({ productId, navigate }) {
  const product = getProduct(productId);
  const modelSrc = product ? AR_MODELS[product.id] : null;

  if (!product) return <EmptyState message="Product not found" onBack={() => navigate('back')} />;

  return (
    <div className="screen-no-nav" style={{ background: '#0D0D0D', display: 'flex', flexDirection: 'column' }}>
      {/* Dark top bar */}
      <div className="top-bar" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <button className="top-bar-back" onClick={() => navigate('back')} style={{ color: '#fff' }}>‹</button>
        <span className="top-bar-title" style={{ color: '#fff' }}>🥽 AR Viewer</span>
        <span style={{ marginLeft: 'auto', fontSize: 12, color: 'rgba(255,255,255,0.55)', fontWeight: 600 }}>
          {product.category}
        </span>
      </div>

      {/* ── model-viewer ───────────────────────────────────────────── */}
      <div style={{ position: 'relative', flexShrink: 0 }}>
        {/* @ts-ignore — model-viewer is a custom element registered by the CDN script */}
        <model-viewer
          src={modelSrc}
          ar
          ar-modes="webxr scene-viewer quick-look"
          camera-controls
          auto-rotate
          auto-rotate-delay="500"
          rotation-per-second="25deg"
          shadow-intensity="1.2"
          shadow-softness="0.8"
          exposure="0.9"
          camera-orbit="0deg 75deg auto"
          min-camera-orbit="auto auto 5%"
          max-camera-orbit="auto auto 100%"
          style={{
            width: '100%',
            height: 320,
            background: 'radial-gradient(ellipse at 50% 60%, #1c1535 0%, #0D0D0D 100%)',
            display: 'block',
          }}
        >
          {/* Custom AR launch button inside the slot */}
          <button
            slot="ar-button"
            id="ar-launch-btn"
            style={{
              position: 'absolute', bottom: 18, left: '50%',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(135deg, #F4A300, #E05C0A)',
              color: '#fff', border: 'none', borderRadius: 30,
              padding: '13px 28px', fontSize: 15, fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 6px 24px rgba(244,163,0,0.55)',
              display: 'flex', alignItems: 'center', gap: 8,
              whiteSpace: 'nowrap',
            }}
          >
            📱 View in Your Room
          </button>
        </model-viewer>

        {/* AR READY pill */}
        <div style={{
          position: 'absolute', top: 12, left: 12,
          background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
          borderRadius: 20, padding: '5px 12px',
          display: 'flex', alignItems: 'center', gap: 7,
        }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            background: '#4CAF50', display: 'inline-block',
            boxShadow: '0 0 8px #4CAF50',
            animation: 'pulse 1.6s ease-in-out infinite',
          }} />
          <span style={{ fontSize: 12, color: '#fff', fontWeight: 700 }}>AR Ready</span>
        </div>

        {/* Drag hint */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
          borderRadius: 20, padding: '5px 10px', fontSize: 11,
          color: 'rgba(255,255,255,0.75)', fontWeight: 600,
        }}>
          👆 Drag to rotate
        </div>
      </div>

      {/* ── Info panel ─────────────────────────────────────────────── */}
      <div style={{
        flex: 1, overflowY: 'auto',
        background: 'var(--cream)',
        borderRadius: '22px 22px 0 0',
        padding: '6px 16px 24px',
        marginTop: -10,
      }}>
        {/* Handle */}
        <div style={{ width: 36, height: 4, background: 'var(--divider)', borderRadius: 2, margin: '10px auto 16px' }} />

        {/* Product row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
          background: '#fff', borderRadius: 14, padding: '12px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
        }}>
          <div style={{ width: 52, height: 52, borderRadius: 12, overflow: 'hidden', background: 'var(--sand)', flexShrink: 0 }}>
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>{product.name}</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
              {product.category} · ₹{product.price.toFixed(2)}
            </div>
          </div>
          {product.isVerified && <span className="verified-badge" style={{ fontSize: 11 }}>✓ Verified</span>}
        </div>

        {/* Steps */}
        <div style={{
          background: 'linear-gradient(135deg, #3E1F0A, #7B3F00)',
          borderRadius: 16, padding: '16px', marginBottom: 14, color: '#fff',
        }}>
          <div style={{ fontWeight: 800, fontSize: 15, marginBottom: 12 }}>🥽 How to use AR</div>
          {[
            ['🖐️', 'Rotate the 3D model', 'Drag to spin · Pinch to zoom · Double-tap to reset'],
            ['📱', 'Tap "View in Your Room"', 'Android → Scene Viewer AR  ·  iOS → AR Quick Look'],
            ['🏠', 'Place in your space', 'Point at a flat surface and tap to place the toy!'],
          ].map(([icon, title, sub], i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: i < 2 ? 12 : 0 }}>
              <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>Step {i+1} — {title}</div>
                <div style={{ fontSize: 12, opacity: 0.8, lineHeight: 1.5 }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Model info */}
        <div style={{
          background: 'var(--sand)', borderRadius: 12, padding: '12px 14px',
          display: 'flex', gap: 10, alignItems: 'flex-start',
        }}>
          <span style={{ fontSize: 18 }}>✨</span>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--wood-brown)', marginBottom: 2 }}>Real Channapatna Toy Model</div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.5 }}>
              This is an actual 3D scan of the product. Tap "View in Your Room" to place it in your space via AR!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Verification Screen ─────────────────────────────────────────── */
function VerificationScreen({ navigate }) {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [result, setResult] = useState(null); // null | { success, product, artisan }
  const [loading, setLoading] = useState(false);
  const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const code = digits.join('');

  const handleDigit = useCallback((idx, val) => {
    const v = val.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[idx] = v;
    setDigits(next);
    setResult(null);
    if (v && idx < 5) refs[idx + 1].current?.focus();
  }, [digits]);

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      refs[idx - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(''));
      setResult(null);
      refs[5].current?.focus();
    }
    e.preventDefault();
  };

  const handleVerify = () => {
    if (code.length < 6) return;
    setLoading(true);
    setTimeout(() => {
      const match = verifyCodeFn(code);
      if (match) {
        const product = getProduct(match.productId);
        const artisan = getArtisan(match.artisanId);
        setResult({ success: true, product, artisan });
      } else {
        setResult({ success: false });
      }
      setLoading(false);
    }, 800);
  };

  const fillDemo = (demoCode) => {
    const d = demoCode.split('');
    setDigits(d);
    setResult(null);
    refs[5].current?.focus();
  };

  const reset = () => {
    setDigits(['', '', '', '', '', '']);
    setResult(null);
    refs[0].current?.focus();
  };

  return (
    <div className="screen">
      {/* Top bar */}
      <div className="top-bar">
        <span className="top-bar-logo">🔐</span>
        <span className="top-bar-title">Verify Authenticity</span>
      </div>

      <div className="verify-container">
        <div className="verify-title">Verify Authenticity</div>
        <p className="verify-subtitle">
          Enter the 6-digit code printed on your product tag to confirm it is a genuine Channapatna craft.
        </p>

        {/* OTP Boxes */}
        <div className="otp-row">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={refs[i]}
              className={`otp-box${d ? ' filled' : ''}`}
              type="tel"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleDigit(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={i === 0 ? handlePaste : undefined}
            />
          ))}
        </div>

        {/* Verify button */}
        <button
          className="btn btn-primary btn-full"
          onClick={handleVerify}
          disabled={code.length < 6 || loading}
          style={{ maxWidth: 320 }}
        >
          {loading
            ? <><span className="loading-spinner" /> Verifying…</>
            : '🔍 Verify'
          }
        </button>

        {/* Result */}
        {result && result.success && (
          <div className="verify-success slide-up" style={{ maxWidth: 360 }}>
            <div className="verify-success-icon">✓</div>
            <div className="verify-success-title">Verified!</div>
            {result.product && (
              <>
                <div className="verify-success-line">
                  Product: <strong>{result.product.name}</strong>
                </div>
                {result.artisan && (
                  <div className="verify-success-line">
                    Artisan: <strong>{result.artisan.name}</strong>
                  </div>
                )}
                <div className="verify-success-line">Certified Channapatna Craft</div>
                <button
                  className="btn"
                  style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', marginTop: 8 }}
                  onClick={() => navigate('detail', { productId: result.product.id })}
                >
                  View Product →
                </button>
              </>
            )}
          </div>
        )}

        {result && !result.success && (
          <div className="verify-error slide-up" style={{ maxWidth: 360 }}>
            <div className="verify-error-icon">❌</div>
            <div className="verify-error-title">Not Verified</div>
            <div className="verify-error-text">
              This code doesn't match any registered Channapatna product. Check the code and try again.
            </div>
            <button
              className="btn btn-secondary"
              style={{ marginTop: 8 }}
              onClick={reset}
            >Try Again</button>
          </div>
        )}

        {/* Demo tip */}
        <div className="demo-tip" style={{ maxWidth: 360 }}>
          <div className="demo-tip-title">💡 Demo Codes</div>
          <div className="demo-tip-text">Tap a code below to auto-fill:</div>
          <div className="demo-tip-codes">
            {['847291', '956234', '495673'].map((c) => (
              <button key={c} className="demo-code-chip" onClick={() => fillDemo(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Artisan Screen ──────────────────────────────────────────────── */
function ArtisanScreen({ artisanId, navigate }) {
  const artisan = getArtisan(artisanId);
  const [imgErr, setImgErr] = useState(false);
  const artisanProducts = products.filter((p) => p.artisanId === artisanId);

  if (!artisan) return <EmptyState message="Artisan not found" onBack={() => navigate('back')} />;

  return (
    <div className="screen-no-nav">
      {/* Top bar */}
      <div className="top-bar">
        <button className="top-bar-back" onClick={() => navigate('back')}>‹</button>
        <span className="top-bar-title">{artisan.name}</span>
      </div>

      {/* Hero */}
      <div className="artisan-hero">
        {!imgErr && artisan.photoUrl
          ? <img
              className="artisan-hero-avatar"
              src={artisan.photoUrl}
              alt={artisan.name}
              onError={() => setImgErr(true)}
            />
          : <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 44 }}>👤</div>
        }
        <div className="artisan-hero-name">{artisan.name}</div>
        <div className="artisan-hero-specialty">{artisan.specialty}</div>
        <div className="artisan-hero-stats">
          <div className="artisan-stat">
            <span className="artisan-stat-value">★ {artisan.rating}</span>
            <span className="artisan-stat-label">Rating</span>
          </div>
          <div className="artisan-stat">
            <span className="artisan-stat-value">{artisan.yearsExperience}y</span>
            <span className="artisan-stat-label">Experience</span>
          </div>
          <div className="artisan-stat">
            <span className="artisan-stat-value">{artisanProducts.length}</span>
            <span className="artisan-stat-label">Products</span>
          </div>
        </div>
      </div>

      <div className="artisan-screen-content">
        {/* Bio */}
        <div className="card">
          <div className="card-title">📍 {artisan.location}</div>
          <p className="description-text" style={{ marginTop: 8 }}>{artisan.bio}</p>
        </div>

        {/* Products */}
        <div className="section-title">Crafted by {artisan.name.split(' ')[0]}</div>
        <div className="product-grid">
          {artisanProducts.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onClick={() => navigate('detail', { productId: p.id })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Story Screen ────────────────────────────────────────────────── */
function StoryScreen({ productId, navigate }) {
  const product = getProduct(productId);
  const [imgErr, setImgErr] = useState(false);
  const [storyText, setStoryText] = useState(product?.story || '');
  const [loading, setLoading] = useState(false);

  if (!product) return <EmptyState message="Story not found" onBack={() => navigate('back')} />;

  const generateStory = () => {
    setLoading(true);
    // Simulated AI generation with rich fallback (Gemini not available client-side w/o key)
    const stories = [
      `Deep in the fragrant workshop of Channapatna, where ivory wood chips curl like sleeping caterpillars, a craftsman holds a piece of wood up to the morning light. He turns it slowly — the grain tells him something. He nods. This will be ${product.name}. For three days he and the wood converse without words, one shaping the other, until what emerges carries both the memory of the forest and the dream of the maker.`,
      `The ${product.name} begins not with a chisel, but with a story. Before a single cut is made, the artisan whispers the name of the tree the wood came from — a custom passed down three generations. The vibrant colours that emerge are not paint but a conversation between craft and tradition, each hue a verse in a song that has been sung in Channapatna for four hundred years.`,
      `When you hold a ${product.name}, you are holding 400 years of Karnataka's craft heritage. The natural dyes — turmeric yellow, indigo blue, kumkum red — were first mixed by an artisan's ancestor during the reign of Tipu Sultan. Today, the same recipe, the same patience, and the same pride produce this small masterpiece that travels from a Karnataka workshop to your hands.`,
    ];
    setTimeout(() => {
      setStoryText(stories[Math.floor(Math.random() * stories.length)]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="screen-no-nav">
      {/* Top bar */}
      <div className="top-bar">
        <button className="top-bar-back" onClick={() => navigate('back')}>‹</button>
        <span className="top-bar-title">✨ Magic Storyteller</span>
      </div>

      <div className="story-container">
        {!imgErr
          ? <img
              className="story-img"
              src={product.imageUrl}
              alt={product.name}
              onError={() => setImgErr(true)}
            />
          : <div style={{ width: '100%', height: 220, background: 'var(--sand)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80 }}>🎨</div>
        }

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>{product.name}</h2>

        <div className="story-card">
          <div className="story-card-title">📜 The Living Legend</div>
          <p className="story-text">{storyText}</p>
        </div>

        <button
          className="btn btn-primary btn-full"
          onClick={generateStory}
          disabled={loading}
        >
          {loading
            ? <><span className="loading-spinner" /> Weaving the story…</>
            : '✨ Generate New Story'
          }
        </button>
      </div>
    </div>
  );
}

/* ─── Profile Screen (User Account) ───────────────────────────────── */
function ProfileScreen({ navigate, user }) {
  const name = user?.name || 'Guest User';
  const email = user?.email || 'guest@nammapride.in';
  const initials = name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
  const menuSections = [
    {
      title: 'Shopping',
      items: [
        { icon: '📦', label: 'My Orders', sub: 'Track, return or buy again', action: null },
        { icon: '❤️', label: 'Wishlist', sub: 'Saved items for later', action: null },
        { icon: '📍', label: 'Delivery Address', sub: 'Manage saved addresses', action: null },
      ]
    },
    {
      title: 'Discover',
      items: [
        { icon: '🧑‍🎨', label: 'Meet the Artisans', sub: 'Stories behind every craft', action: 'artisans' },
        { icon: '📍', label: 'Artisan Map', sub: 'Find workshops near you', action: 'location' },
        { icon: '✅', label: 'Verify Authenticity', sub: 'Check your product code', action: 'verify' },
      ]
    },
    {
      title: 'Account',
      items: [
        { icon: '🔔', label: 'Notifications', sub: 'Order updates & offers', action: null },
        { icon: '🚫', label: 'Sign Out', sub: null, action: 'logout', danger: true },
      ]
    },
  ];

  return (
    <div className="screen">
      <div className="top-bar">
        <span className="top-bar-logo">👤</span>
        <span className="top-bar-title">My Account</span>
      </div>

      <div className="user-profile-hero">
        <div className="user-avatar">{initials}</div>
        <div className="user-name">{name}</div>
        <div className="user-email">{email}</div>
        <div className="user-badge">⭐ Craft Enthusiast</div>
      </div>

      <div className="user-stats-row">
        <div className="user-stat"><span className="user-stat-val">0</span><span className="user-stat-lbl">Orders</span></div>
        <div className="user-stat-div" />
        <div className="user-stat"><span className="user-stat-val">0</span><span className="user-stat-lbl">Wishlist</span></div>
        <div className="user-stat-div" />
        <div className="user-stat"><span className="user-stat-val">0</span><span className="user-stat-lbl">Reviews</span></div>
      </div>

      <div className="user-menu">
        {menuSections.map(sec => (
          <div key={sec.title} className="user-menu-section">
            <div className="user-menu-section-title">{sec.title}</div>
            {sec.items.map(item => (
              <button
                key={item.label}
                className={`user-menu-item${item.danger?' danger':''}`}
                onClick={() => {
                  if (item.action === 'logout') { navigate('home'); }
                  else if (item.action === 'artisans') { navigate('artisans'); }
                  else if (item.action === 'location') { navigate('location'); }
                  else if (item.action === 'verify') { navigate('verify'); }
                }}
              >
                <span className="user-menu-icon">{item.icon}</span>
                <div className="user-menu-text">
                  <div className="user-menu-label">{item.label}</div>
                  {item.sub && <div className="user-menu-sub">{item.sub}</div>}
                </div>
                {!item.danger && <span className="user-menu-arrow">›</span>}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Empty State ─────────────────────────────────────────────────── */
function EmptyState({ message, onBack }) {
  return (
    <div className="screen-no-nav" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, gap: 16 }}>
      <span style={{ fontSize: 60 }}>🔍</span>
      <p style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'center' }}>{message}</p>
      {onBack && (
        <button className="btn btn-primary" onClick={onBack}>← Go Back</button>
      )}
    </div>
  );
}

/* ─── Cart Screen ─────────────────────────────────────────────────── */
function CartScreen({ cart, onRemove, navigate }) {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const isEmpty = cart.length === 0;

  return (
    <div className="screen-no-nav">
      <div className="top-bar">
        <button className="top-bar-back" onClick={() => navigate('back')}>‹</button>
        <span className="top-bar-title">🛒 My Cart</span>
        {!isEmpty && (
          <span style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>
            {cart.length} item{cart.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      <div style={{ padding: '16px', overflowY: 'auto', flex: 1 }}>

        {/* Empty state */}
        {isEmpty && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', gap: 16 }}>
            <span style={{ fontSize: 64 }}>🛒</span>
            <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)' }}>Your cart is empty</div>
            <div style={{ fontSize: 14, color: 'var(--text-muted)', textAlign: 'center' }}>Add some beautiful Channapatna crafts to get started!</div>
            <button className="btn btn-primary" onClick={() => navigate('home')}>Browse Products</button>
          </div>
        )}

        {/* Cart Items + checkout */}
        {!isEmpty && (
          <>
            {/* Item list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              {cart.map((item) => (
                <CartItem key={item.cartId} item={item} onRemove={onRemove} navigate={navigate} />
              ))}
            </div>

            {/* Delivery trust badges */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
              {[
                { icon: '🚚', text: 'Free Delivery' },
                { icon: '🔄', text: '7-Day Returns' },
                { icon: '🏺', text: 'GI Certified' },
                { icon: '🔒', text: 'Secure Pay' },
              ].map(b => (
                <div key={b.text} style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  background: '#fff', borderRadius: 20, padding: '5px 12px',
                  fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.07)',
                  border: '1px solid var(--divider)',
                }}>
                  <span>{b.icon}</span>{b.text}
                </div>
              ))}
            </div>

            {/* Coupon row */}
            <div style={{
              background: '#fff', borderRadius: 14, padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
              boxShadow: '0 1px 6px rgba(0,0,0,0.06)', border: '1.5px dashed var(--divider)',
            }}>
              <span style={{ fontSize: 20 }}>🏷️</span>
              <input
                placeholder="Enter coupon code"
                style={{
                  flex: 1, border: 'none', outline: 'none', background: 'none',
                  fontSize: 14, color: 'var(--text-primary)', fontFamily: 'inherit',
                }}
              />
              <button style={{
                background: 'var(--wood-brown)', color: '#fff', border: 'none',
                borderRadius: 8, padding: '6px 14px', fontSize: 12, fontWeight: 700,
                cursor: 'pointer',
              }}>Apply</button>
            </div>

            {/* Order Summary */}
            <div style={{
              background: '#fff', borderRadius: 16,
              padding: '18px 16px', marginBottom: 16,
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>Order Summary</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Subtotal ({cart.length} items)</span>
                <span style={{ fontWeight: 600 }}>₹{total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                <span style={{ color: '#27AE60', fontWeight: 600 }}>FREE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, marginBottom: 8 }}>
                <span style={{ color: 'var(--text-secondary)' }}>Artisan Support</span>
                <span style={{ color: '#27AE60', fontWeight: 600 }}>Included ♥</span>
              </div>
              <div style={{ height: 1, background: 'var(--divider)', margin: '12px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 800, color: 'var(--wood-brown)' }}>
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout button → Payment */}
            <button
              className="btn btn-primary btn-full"
              style={{ fontSize: 16, padding: '16px', borderRadius: 14 }}
              onClick={() => navigate('payment')}
            >
              🔐 Proceed to Checkout · ₹{total.toFixed(2)}
            </button>

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 6, fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, margin: '10px 0 4px',
            }}>
              🔒 100% Secure &nbsp;·&nbsp; UPI &nbsp;·&nbsp; Cards &nbsp;·&nbsp; COD
            </div>

            <button
              className="btn btn-secondary btn-full"
              style={{ marginTop: 6 }}
              onClick={() => navigate('home')}
            >
              ← Continue Shopping
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Cart Item Row ─────────────────────────────────────────────────── */
function CartItem({ item, onRemove, navigate }) {
  const [imgErr, setImgErr] = useState(false);
  return (
    <div style={{
      background: '#fff', borderRadius: 16,
      padding: '12px', display: 'flex', gap: 12,
      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
      alignItems: 'center',
    }}>
      {/* Thumbnail */}
      <div
        style={{ width: 72, height: 72, borderRadius: 12, overflow: 'hidden', flexShrink: 0, cursor: 'pointer', background: 'var(--sand)' }}
        onClick={() => navigate('detail', { productId: item.id })}
      >
        {!imgErr
          ? <img src={item.imageUrl} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={() => setImgErr(true)} />
          : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28 }}>🎨</div>
        }
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {item.name}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 6 }}>{item.category}</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--wood-brown)' }}>₹{item.price.toFixed(2)}</div>
      </div>

      {/* Remove */}
      <button
        onClick={() => onRemove(item.cartId)}
        style={{
          background: '#FFF0F0', border: 'none', borderRadius: 10,
          padding: '8px 10px', cursor: 'pointer', color: '#E53935',
          fontSize: 16, flexShrink: 0,
          transition: 'background 0.15s',
        }}
        title="Remove from cart"
      >
        🗑️
      </button>
    </div>
  );
}

/* ─── Payment Screen ──────────────────────────────────────────────── */
function PaymentScreen({ cart, navigate }) {
  const total = cart.reduce((s, i) => s + i.price, 0);
  const [method, setMethod] = useState('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [bank, setBank] = useState('');
  const [step, setStep] = useState('form');

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => setStep('success'), 2200);
  };

  if (step === 'success') return (
    <div className="screen-no-nav pay-success-screen">
      <div className="pay-success-icon">✅</div>
      <div className="pay-success-title">Payment Successful!</div>
      <div className="pay-success-sub">Your order of ₹{total.toFixed(2)} is confirmed.{'\n'}The artisan will ship within 2-3 days.</div>
      <div className="pay-order-id">Order ID: CNP-{Date.now().toString().slice(-6)}</div>
      <button className="btn btn-primary btn-full" style={{marginTop:24}} onClick={() => navigate('home')}>🏠 Back to Home</button>
    </div>
  );

  if (step === 'processing') return (
    <div className="screen-no-nav pay-processing-screen">
      <span className="loading-spinner" style={{width:48,height:48,borderWidth:4,borderColor:'rgba(92,51,23,0.2)',borderTopColor:'var(--wood-brown)'}} />
      <div style={{marginTop:24,fontSize:17,fontWeight:700,color:'var(--wood-brown)'}}>Processing Payment…</div>
      <div style={{fontSize:13,color:'var(--text-muted)',marginTop:8}}>Please wait, do not press back</div>
    </div>
  );

  const methods = [
    { id:'upi',  icon:'📱', label:'UPI / GPay / PhonePe' },
    { id:'card', icon:'💳', label:'Credit / Debit Card' },
    { id:'cod',  icon:'💵', label:'Cash on Delivery' },
    { id:'nb',   icon:'🏦', label:'Net Banking' },
  ];

  return (
    <div className="screen-no-nav">
      <div className="top-bar">
        <button className="top-bar-back" onClick={() => navigate('back')}>‹</button>
        <span className="top-bar-title">💳 Checkout</span>
        <span style={{marginLeft:'auto',fontSize:12,fontWeight:700,color:'rgba(255,255,255,0.8)'}}>🔒 Secure</span>
      </div>
      <div className="pay-container">
        {/* Summary */}
        <div className="pay-summary-card">
          <div className="pay-section-label">Order Summary</div>
          {cart.length === 0
            ? <div style={{fontSize:13,color:'var(--text-muted)'}}>No items — add products from Home</div>
            : cart.map(item => (
              <div key={item.cartId} style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:4}}>
                <span style={{color:'var(--text-secondary)',flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',marginRight:8}}>{item.name}</span>
                <span style={{fontWeight:600,flexShrink:0}}>₹{item.price.toFixed(2)}</span>
              </div>
            ))
          }
          <div style={{height:1,background:'var(--divider)',margin:'10px 0'}} />
          <div style={{display:'flex',justifyContent:'space-between',fontWeight:800,fontSize:16,color:'var(--wood-brown)'}}>
            <span>Total</span><span>₹{total.toFixed(2)}</span>
          </div>
        </div>

        {/* Methods */}
        <div className="pay-section-label" style={{margin:'16px 0 8px'}}>Payment Method</div>
        <div className="pay-methods">
          {methods.map(m => (
            <button key={m.id} className={`pay-method-btn${method===m.id?' active':''}`} onClick={()=>setMethod(m.id)}>
              <span className="pay-method-icon">{m.icon}</span>
              <span className="pay-method-label">{m.label}</span>
              <span className="pay-radio">{method===m.id?'◉':'○'}</span>
            </button>
          ))}
        </div>

        {method==='upi' && (
          <div className="pay-input-group">
            <label className="login-label">UPI ID</label>
            <input className="pay-input" type="text" placeholder="yourname@upi"
              value={upiId} onChange={e=>setUpiId(e.target.value)} />
            <div className="pay-upi-apps">
              {['📸 GPay','🔵 PhonePe','🟠 Paytm','⬛ BHIM'].map(a=>(
                <button key={a} className="pay-upi-chip" onClick={()=>setUpiId('demo@oksbi')}>{a}</button>
              ))}
            </div>
          </div>
        )}

        {method==='card' && (
          <div className="pay-input-group">
            <label className="login-label">Card Number</label>
            <input className="pay-input" type="tel" inputMode="numeric" placeholder="1234 5678 9012 3456"
              value={cardNum} onChange={e=>setCardNum(e.target.value.replace(/\D/g,'').slice(0,16).replace(/(\d{4})/g,'$1 ').trim())} />
            <div style={{display:'flex',gap:10,marginTop:10}}>
              <div style={{flex:1}}>
                <label className="login-label">Expiry</label>
                <input className="pay-input" type="tel" placeholder="MM/YY"
                  value={cardExp} onChange={e=>setCardExp(e.target.value)} />
              </div>
              <div style={{flex:1}}>
                <label className="login-label">CVV</label>
                <input className="pay-input" type="password" maxLength={3} placeholder="•••"
                  value={cardCvv} onChange={e=>setCardCvv(e.target.value)} />
              </div>
            </div>
            <label className="login-label" style={{marginTop:10}}>Cardholder Name</label>
            <input className="pay-input" type="text" placeholder="As on card"
              value={cardName} onChange={e=>setCardName(e.target.value)} />
          </div>
        )}

        {method==='cod' && (
          <div className="pay-cod-note">
            📦 Pay ₹{total.toFixed(2)} in cash when your order arrives. No extra charges!
          </div>
        )}

        {method==='nb' && (
          <div className="pay-input-group">
            <label className="login-label">Select Bank</label>
            <select className="pay-input pay-select" value={bank} onChange={e=>setBank(e.target.value)}>
              <option value="">-- Choose your bank --</option>
              {['SBI','HDFC','ICICI','Axis','Kotak','PNB','Canara'].map(b=>(
                <option key={b} value={b}>{b} Bank</option>
              ))}
            </select>
          </div>
        )}

        <div className="pay-security">
          <span>🔒 256-bit SSL</span><span>•</span>
          <span>🛡️ PCI DSS</span><span>•</span>
          <span>✅ RBI Safe</span>
        </div>

        <button className="btn btn-primary btn-full pay-submit" onClick={handlePay} disabled={cart.length===0}>
          🔐 Pay ₹{total.toFixed(2)} Securely
        </button>
        {cart.length===0 && <div style={{textAlign:'center',fontSize:12,color:'var(--text-muted)',marginTop:8}}>Add items to cart first</div>}
      </div>
    </div>
  );
}

/* ─── Location Screen ─────────────────────────────────────────────── */
const ARTISAN_LOCATIONS = [
  { id:'a1', name:'Ravi Kumar Workshop',    lat:12.6518, lng:77.2090, desc:'Master doll maker • 40 yrs exp',       type:'workshop' },
  { id:'a2', name:'Lakshmi Devi Studio',    lat:12.6475, lng:77.2145, desc:'Traditional lacquerware specialist',    type:'workshop' },
  { id:'a3', name:'Channapatna GI Store',   lat:12.6502, lng:77.2078, desc:'Official GI-certified showroom',        type:'store'    },
  { id:'a4', name:'Heritage Craft Centre',  lat:12.6530, lng:77.2055, desc:'Govt. craft training & museum',         type:'govt'     },
  { id:'a5', name:'Artisan Market Hub',     lat:12.6490, lng:77.2110, desc:'Weekly artisan market • Sat-Sun',       type:'market'   },
];

function LocationScreen() {
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const [selected, setSelected] = useState(null);
  const [locLoading, setLocLoading] = useState(false);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? ARTISAN_LOCATIONS : ARTISAN_LOCATIONS.filter(l => l.type === filter);

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;
    const L = window.L;
    if (!L) return;
    const map = L.map(mapRef.current, { center: [12.6502, 77.2090], zoom: 14, zoomControl: false });
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const icons = { workshop:'🏠', store:'🛒', govt:'🏛️', market:'🎪' };
    ARTISAN_LOCATIONS.forEach(loc => {
      const icon = L.divIcon({
        className: '',
        html: `<div class="map-pin map-pin-${loc.type}">${icons[loc.type]||'📍'}</div>`,
        iconSize: [40,40], iconAnchor:[20,40],
      });
      L.marker([loc.lat, loc.lng], { icon })
        .addTo(map)
        .bindPopup(`<b>${loc.name}</b><br/><small>${loc.desc}</small>`);
    });
    leafletMap.current = map;
    return () => { if (leafletMap.current) { leafletMap.current.remove(); leafletMap.current = null; } };
  }, []);

  const handleLocate = () => {
    setLocLoading(true);
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords;
        setLocLoading(false);
        if (leafletMap.current) leafletMap.current.flyTo([lat, lng], 14);
      },
      () => setLocLoading(false),
      { timeout: 8000 }
    );
  };

  const flyTo = (loc) => {
    setSelected(loc);
    if (leafletMap.current) leafletMap.current.flyTo([loc.lat, loc.lng], 17);
  };

  const typeColors = { workshop:'#5C3317', store:'#1565C0', govt:'#2E7D32', market:'#F4A300' };
  const filterBtns = [
    { id:'all', label:'📍 All' }, { id:'workshop', label:'🏠 Workshops' },
    { id:'store', label:'🛒 Stores' }, { id:'govt', label:'🏛️ Govt' }, { id:'market', label:'🎪 Markets' },
  ];

  return (
    <div className="screen loc-screen">
      <div className="top-bar">
        <span className="top-bar-logo">📍</span>
        <span className="top-bar-title">Artisan Map</span>
        <button onClick={handleLocate} disabled={locLoading}
          style={{marginLeft:'auto',background:'rgba(255,255,255,0.2)',border:'none',color:'#fff',
            borderRadius:20,padding:'5px 12px',fontSize:12,fontWeight:700,cursor:'pointer',whiteSpace:'nowrap'}}>
          {locLoading ? '📍…' : '📍 Near Me'}
        </button>
      </div>

      <div className="loc-filter-row">
        {filterBtns.map(f=>(
          <button key={f.id} className={`loc-filter-chip${filter===f.id?' active':''}`}
            onClick={()=>setFilter(f.id)}>{f.label}</button>
        ))}
      </div>

      <div ref={mapRef} className="loc-map" />

      <div className="loc-list">
        <div style={{padding:'10px 16px 4px',fontSize:13,fontWeight:700,color:'var(--text-muted)',textTransform:'uppercase',letterSpacing:'0.5px'}}>
          {filtered.length} Location{filtered.length!==1?'s':''}
        </div>
        {filtered.map(loc=>(
          <div key={loc.id} className={`loc-card${selected?.id===loc.id?' selected':''}`} onClick={()=>flyTo(loc)}>
            <div className="loc-card-icon" style={{background:typeColors[loc.type]||'#5C3317'}}>
              {loc.type==='workshop'?'🏠':loc.type==='store'?'🛒':loc.type==='govt'?'🏛️':'🎪'}
            </div>
            <div className="loc-card-info">
              <div className="loc-card-name">{loc.name}</div>
              <div className="loc-card-desc">{loc.desc}</div>
            </div>
            <span style={{fontSize:18,color:'var(--text-muted)'}}>›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Bottom Navigation ───────────────────────────────────────────── */
function BottomNav({ active, navigate }) {
  const tabs = [
    { id: 'home',     label: 'Home',    icon: '🏠' },
    { id: 'verify',   label: 'Verify',  icon: '✅' },
    { id: 'location', label: 'Map',     icon: '📍' },
    { id: 'profile',  label: 'Profile', icon: '👤' },
  ];
  return (
    <nav className="bottom-nav">
      {tabs.map((t) => (
        <button
          key={t.id}
          className={`nav-item${active === t.id ? ' active' : ''}`}
          onClick={() => navigate(t.id)}
        >
          <span className="nav-icon">{t.icon}</span>
          {t.label}
        </button>
      ))}
    </nav>
  );
}

/* ─── App Root ────────────────────────────────────────────────────── */
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: 'Guest User', email: 'guest@nammapride.in' });
  const [history, setHistory] = useState([{ screen: 'home', params: {} }]);
  const [cart, setCart] = useState([]);

  const onAddToCart = (product) => {
    setCart((prev) => [...prev, { ...product, cartId: Date.now() }]);
  };
  const onRemoveFromCart = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };
  const current = history[history.length - 1];
  const activeTab = ['home', 'verify', 'profile', 'location'].includes(current.screen)
    ? current.screen : null;

  const navigate = (screen, params = {}) => {
    if (screen === 'back') {
      if (history.length > 1) setHistory((h) => h.slice(0, -1));
      return;
    }
    // Tab switch resets stack
    if (['home', 'verify', 'profile', 'location'].includes(screen)) {
      setHistory([{ screen, params }]);
      return;
    }
    setHistory((h) => [...h, { screen, params }]);
  };

  const showNav = activeTab !== null;

  if (!loggedIn) return <LoginScreen onLogin={(name, email) => { setUser({ name, email }); setLoggedIn(true); }} />;

  return (
    <div className="app-shell">
      {current.screen === 'home' && (
        <HomeScreen navigate={navigate} cart={cart} />
      )}
      {current.screen === 'verify' && (
        <VerificationScreen navigate={navigate} />
      )}
      {current.screen === 'profile' && (
        <ProfileScreen navigate={navigate} user={user} />
      )}
      {current.screen === 'location' && (
        <LocationScreen navigate={navigate} />
      )}
      {current.screen === 'payment' && (
        <PaymentScreen cart={cart} navigate={navigate} />
      )}
      {current.screen === 'detail' && (
        <ProductDetailScreen productId={current.params.productId} navigate={navigate} onAddToCart={onAddToCart} />
      )}
      {current.screen === 'artisan' && (
        <ArtisanScreen artisanId={current.params.artisanId} navigate={navigate} />
      )}
      {current.screen === 'story' && (
        <StoryScreen productId={current.params.productId} navigate={navigate} />
      )}
      {current.screen === 'cart' && (
        <CartScreen cart={cart} onRemove={onRemoveFromCart} navigate={navigate} />
      )}
      {current.screen === 'ar' && (
        <ARScreen productId={current.params.productId} navigate={navigate} />
      )}

      {showNav && (
        <BottomNav active={current.screen} navigate={navigate} />
      )}
    </div>
  );
}

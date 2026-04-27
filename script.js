// script.js - stockage, panier, dark mode, rendu dynamique, admin CRUD
const STORAGE = {
  products: 'nova_products',
  cart: 'nova_cart',
  darkMode: 'nova_darkmode',
  adminAuth: 'nova_admin_auth',
  orders: 'nova_orders'
};

let products = [];
let cart = [];

// Helper notifications
function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast bg-${type === 'success' ? 'green' : 'red'}-500 text-white px-5 py-3 rounded-xl shadow-lg flex items-center gap-2 mb-2`;
  toast.innerHTML = `<span>${message}</span>`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 2500);
}

// Gestion des produits
function saveProducts() { localStorage.setItem(STORAGE.products, JSON.stringify(products)); }
function loadProducts() {
  const stored = localStorage.getItem(STORAGE.products);
  if (stored) { products = JSON.parse(stored); }
  else {
    products = [
      {
        id: 1,
        name: "Huile d'Argan Bio Premium",
        price: 1890.0,
        description: "Huile d'argan pure 100% bio, antirides et hydratante",
        longDescription: "Huile d'argan vierge certifiée bio, produite artisanalement au Maroc. Riche en vitamine E et acides gras essentiels, elle nourrit, régénère et protège la peau. Idéale pour le visage, corps et cheveux. Emballage luxueux avec certificat d'authenticité.",
        category: "BEAUTÉ & COSMÉTIQUES",
        images: ["https://images.unsplash.com/photo-1583947218272-f4ae0be25a3c?w=400", "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400"],
        videoUrl: "https://www.youtube.com/embed/abc123",
        stock: 45,
        rating: 4.8,
        reviews: 234,
        badge: "Best Seller"
      },
      {
        id: 2,
        name: "Support Téléphone Voiture Magnétique",
        price: 790.0,
        description: "Support magnétique 360° pour tableau de bord et grille d'aération",
        longDescription: "Support téléphone magnétique ultra puissant avec fixation 3-en-1. Compatible avec tous les smartphones. Rotation complète 360°, installation facile sans outils. Aimants néodyme ultra-forts, maintient parfait même sur routes accidentées.",
        category: "ACCESSOIRES VOITURE",
        images: ["https://images.unsplash.com/photo-1557862921-37829c790f19?w=400", "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=400"],
        videoUrl: "https://www.youtube.com/embed/def456",
        stock: 120,
        rating: 4.6,
        reviews: 189,
        badge: "Viral"
      },
      {
        id: 3,
        name: "Pantalon Streetwear Cargo",
        price: 289.0,
        description: "Pantalon cargo moderne avec poches tactiques et coupe ajustée",
        longDescription: "Pantalon streetwear tendance avec coupe slim fit et poches cargo multifonctions. Tissu coton stretch respirant, parfait pour le quotidien et sorties urbaines. Fermetures éclair renforcées, détails militaires modernes. Disponible en plusieurs couleurs.",
        category: "MODE HOMME",
        images: ["https://images.unsplash.com/photo-1541099649105-f6e7ad7d3136?w=400", "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400"],
        videoUrl: "https://www.youtube.com/embed/ghi789",
        stock: 67,
        rating: 4.7,
        reviews: 156,
        badge: "Tendance"
      },
      {
        id: 4,
        name: "Rasoir Électrique Barbe Pro",
        price: 3490.0,
        description: "Rasoir électrique sans fil avec lame en acier inoxydable",
        longDescription: "Rasoir électrique professionnel avec technologie de coupe flottante. Batterie lithium-ion 90min d'autonomie, étanche IPX7. Lames auto-aiguisantes en acier japonais, parfait pour barbe et contours. Charge rapide USB-C, voyage inclus.",
        category: "BEAUTÉ & COSMÉTIQUES",
        images: ["https://images.unsplash.com/photo-1620916566398-39f5a7917523?w=400", "https://images.unsplash.com/photo-1595420905405-4cf6be88e6d8?w=400"],
        videoUrl: "https://www.youtube.com/embed/jkl012",
        stock: 89,
        rating: 4.5,
        reviews: 98,
        badge: "Promo"
      },
      {
        id: 5,
        name: "Coussin Orthopédique Mémoire",
        price: 2590.0,
        description: "Coussin cervical en mousse à mémoire de forme, anti-douleur",
        longDescription: "Coussin orthopédique ergonomique avec mousse viscoélastique haute densité. Soulage les douleurs cervicales et lombaires. Design anatomique, housse amovible lavable. Idéal pour bureau, voiture et lit. Garantie 5 ans.",
        category: "MAISON & CUISINE",
        images: ["https://images.unsplash.com/photo-1595420905405-4cf6be88e6d8?w=400", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"],
        videoUrl: "https://www.youtube.com/embed/mno345",
        stock: 34,
        rating: 4.9,
        reviews: 267,
        badge: "Best Seller"
      },
      {
        id: 6,
        name: "Trancheuse Légumes 3-en-1",
        price: 1590.0,
        description: "Trancheuse électrique multifonction avec 3 lames interchangeables",
        longDescription: "Trancheuse électrique professionnelle avec 3 lames inox (julienne, émince, râpe). Moteur puissant 200W, sécurité enfant. Parfait pour légumes, fromages, fruits. Nettoyage facile au lave-vaisselle. Livré avec livre de recettes.",
        category: "MAISON & CUISINE",
        images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400", "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=400"],
        videoUrl: "https://www.youtube.com/embed/pqr678",
        stock: 78,
        rating: 4.4,
        reviews: 145,
        badge: "Pratique"
      },
      {
        id: 7,
        name: "Fer à Repasser Portable",
        price: 1990.0,
        description: "Mini fer à repasser sans fil, parfait pour voyage",
        longDescription: "Fer à repasser compact 2-en-1 avec fonction vapeur. Puissance 1200W, prête en 30 secondes. Semelle céramique anti-adhésive, réservoir d'eau 80ml. Idéal pour retouches rapides et voyages. Poignée ergonomique, rangement facile.",
        category: "MAISON & CUISINE",
        images: ["https://images.unsplash.com/photo-1583492905149-6e5a9b2c0c7c?w=400", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"],
        videoUrl: "https://www.youtube.com/embed/stu901",
        stock: 92,
        rating: 4.3,
        reviews: 87,
        badge: "Voyage"
      },
      {
        id: 8,
        name: "Gants Chauffants USB",
        price: 1290.0,
        description: "Gants chauffants avec batterie intégrée, 3 niveaux de chaleur",
        longDescription: "Gants chauffants intelligents avec technologie carbon fiber. 3 niveaux de température (40/50/60°C), batterie 7.4V 2200mAh. Extensible, touch screen compatible. Parfait pour hiver, moto, travail extérieur. Charge rapide USB.",
        category: "ACCESSOIRES",
        images: ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"],
        videoUrl: "https://www.youtube.com/embed/vwx234",
        stock: 56,
        rating: 4.6,
        reviews: 123,
        badge: "Hiver"
      },
      {
        id: 9,
        name: "Sac en Cuir Marocain Artisanal",
        price: 450.0,
        description: "Sac main en cuir véritable avec motifs berbères traditionnels",
        longDescription: "Sac artisanal marocain en cuir pleine fleur, tanné naturellement. Motifs berbères brodés main, fermoir en métal argenté. Plusieurs compartiments, doublure soie. Pièce unique, certificat d'artisanat local. Fabriqué à Marrakech.",
        category: "MODE FEMME",
        images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400", "https://images.unsplash.com/photo-1544967344-1a1925cb661f?w=400"],
        videoUrl: "https://www.youtube.com/embed/yzx567",
        stock: 23,
        rating: 4.9,
        reviews: 89,
        badge: "Artisanal"
      },
      {
        id: 10,
        name: "Sneakers Tendance Urban",
        price: 3990.0,
        description: "Baskets streetwear avec semelle épaisse et design moderne",
        longDescription: "Sneakers urban style avec plateforme chunky. Tissu mesh respirant et détails synthétiques. Semelle caoutchouc antidérapante, coutures renforcées. Confort toute la journée, style tendance TikTok. Disponible en 3 coloris.",
        category: "MODE HOMME",
        images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400", "https://images.unsplash.com/photo-1460353581641-379add0c36f1?w=400"],
        videoUrl: "https://www.youtube.com/embed/abc890",
        stock: 45,
        rating: 4.5,
        reviews: 167,
        badge: "Viral"
      },
      {
        id: 11,
        name: "Sérum Vitamine C Éclat",
        price: 145.0,
        description: "Sérum visage éclaircissant à la vitamine C et acide hyaluronique",
        longDescription: "Sérum concentré 20% vitamine C pure, acide hyaluronique et vitamine E. Antioxydant puissant, éclaircit le teint, réduit les taches brunes. Texture légère, absorption rapide. Fabriqué en France, testé dermatologiquement.",
        category: "BEAUTÉ & COSMÉTIQUES",
        images: ["https://images.unsplash.com/photo-1596462502278-27fefc4063bb?w=400", "https://images.unsplash.com/photo-1570172619644-d8238965c32c?w=400"],
        videoUrl: "https://www.youtube.com/embed/def123",
        stock: 67,
        rating: 4.7,
        reviews: 234,
        badge: "Best Seller"
      },
      {
        id: 12,
        name: "Caméra de Surveillance WiFi",
        price: 289.0,
        description: "Caméra intérieure 1080P avec vision nocturne et détection mouvement",
        longDescription: "Caméra surveillance intelligente WiFi 1080P Full HD. Vision nocturne 10m, détection mouvement IA, audio bidirectionnel. Stockage cloud et SD card. Compatible Alexa/Google Home. Installation facile 5min.",
        category: "GADGETS & ÉLECTRONIQUE",
        images: ["https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400", "https://images.unsplash.com/photo-1558024920-71e3d3cdad0b?w=400"],
        videoUrl: "https://www.youtube.com/embed/ghi456",
        stock: 41,
        rating: 4.4,
        reviews: 178,
        badge: "Sécurité"
      },
      {
        id: 13,
        name: "Robe Kaftan Marocaine Luxe",
        price: 680.0,
        description: "Kaftan traditionnel en soie avec broderies dorées",
        longDescription: "Kaftan de luxe en soie pure avec broderies manuelles fils d'or. Design exclusif inspiré palais marocains. Coupe princesse, manches flottantes. Idéal pour mariages et soirées. Livré dans coffret cadeau.",
        category: "MODE FEMME",
        images: ["https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=400", "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400"],
        videoUrl: "https://www.youtube.com/embed/jkl789",
        stock: 12,
        rating: 5.0,
        reviews: 45,
        badge: "Luxe"
      },
      {
        id: 14,
        name: "Enceinte Bluetooth Waterproof",
        price: 1790.0,
        description: "Enceinte portable étanche IPX7 avec basses puissantes",
        longDescription: "Enceinte Bluetooth 5.0 étanche IPX7. Son 360° avec basses profondes, 20W puissance. Autonomie 12h, charge rapide USB-C. Design compact avec sangle. Parfait plage, randonnée, douche.",
        category: "GADGETS & ÉLECTRONIQUE",
        images: ["https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400", "https://images.unsplash.com/photo-1541364987778-5c870444a652?w=400"],
        videoUrl: "https://www.youtube.com/embed/mno012",
        stock: 89,
        rating: 4.6,
        reviews: 234,
        badge: "Étanche"
      },
      {
        id: 15,
        name: "Organisateur Maquillage Luxe",
        price: 225.0,
        description: "Boîte rangement maquillage avec miroir LED et tiroirs",
        longDescription: "Organisateur maquillage professionnel avec 8 tiroirs et miroir LED. MDF laqué blanc, poignées chromées. Compartiments ajustables, serrure de sécurité. Miroir avec éclairage 3 niveaux. Parfait coiffeuse et dressing.",
        category: "BEAUTÉ & COSMÉTIQUES",
        images: ["https://images.unsplash.com/photo-1596462502278-27fefc4063bb?w=400", "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400"],
        videoUrl: "https://www.youtube.com/embed/pqr345",
        stock: 34,
        rating: 4.8,
        reviews: 156,
        badge: "Rangement"
      },
      {
        id: 16,
        name: "Chargeur Voiture Rapide 2 Ports",
        price: 990.0,
        description: "Chargeur USB rapide 2 ports avec écran LED et protection",
        longDescription: "Chargeur voiture 2 ports USB-C 36W PD + USB-A 18W. Écran LED affichage tension/courant. Protection surcharge, court-circuit. Compatible tous appareils. Design aluminium, compact.",
        category: "ACCESSOIRES VOITURE",
        images: ["https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400", "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400"],
        videoUrl: "https://www.youtube.com/embed/stu678",
        stock: 156,
        rating: 4.5,
        reviews: 289,
        badge: "Essentiel"
      },
      {
        id: 17,
        name: "Montre Connectée Sport Pro",
        price: 4990,
        description: "Smartwatch avec cardio, GPS et 7 jours d'autonomie",
        longDescription: "Montre sportive avec GPS intégré, fréquence cardiaque 24/7. 7 jours autonomie, 50 sports tracking. Écran AMOLED 1.4\", étanche 5ATM. Notifications smartphone, musique. Design élégant bracelet silicone.",
        category: "GADGETS & ÉLECTRONIQUE",
        images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400", "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400"],
        videoUrl: "https://www.youtube.com/embed/vwx901",
        stock: 28,
        rating: 4.7,
        reviews: 198,
        badge: "Sport"
      },
      {
        id: 18,
        name: "Parfum Oud Marocain Intense",
        price: 380,
        description: "Parfum de luxe Oud boisé avec notes épicées marocaines",
        longDescription: "Parfum artisanal marocain avec Oud pur de première qualité. Notes de tête bergamote, cœur épices cardamome, fond bois de oud et vanille. Flacon 100ml avec capuchon bois précieux. Longue tenue 8h. Création exclusive.",
        category: "BEAUTÉ & COSMÉTIQUES",
        images: ["https://images.unsplash.com/photo-1598446918428-694735e50c21?w=400", "https://images.unsplash.com/photo-1541647177338-79e0455fc71c?w=400"],
        videoUrl: "https://www.youtube.com/embed/yzx234",
        stock: 18,
        rating: 4.9,
        reviews: 67,
        badge: "Exclusif"
      },
      {
        id: 19,
        name: "Blouson Streetwear Oversize",
        price: 4200,
        description: "Blouson moderne coupe oversize avec capuche et poches kangourou",
        longDescription: "Blouson streetwear tendance coupe oversize unisexe. Tissu coton polaire douce intérieure, capuche ajustable. Poches kangourou et manches raglan. Finitions qualité, logo discret. Parfait automne/hiver urbain.",
        category: "MODE HOMME",
        images: ["https://images.unsplash.com/photo-1551488831-00ddcb6c6b53?w=400", "https://images.unsplash.com/photo-1576871335922-3bce813b7c1a?w=400"],
        videoUrl: "https://www.youtube.com/embed/abc567",
        stock: 39,
        rating: 4.6,
        reviews: 134,
        badge: "Tendance"
      },
      {
        id: 20,
        name: "Set Thé à la Menthe Marocain",
        price: 125,
        description: "Théière en métal et verres à thé traditionnels avec plateau",
        longDescription: "Set thé marocain complet avec théière en laiton gravé, 6 verres colorés et plateau bois. Thé vert à la menthe bio inclus. Design artisanal de Fès. Idéal cadeaux et cérémonies du thé. Livré avec recette traditionnelle.",
        category: "MAISON & CUISINE",
        images: ["https://images.unsplash.com/photo-1577666263713-dc6a0182a328?w=400", "https://images.unsplash.com/photo-1576092768244-dec231879fc5?w=400"],
        videoUrl: "https://www.youtube.com/embed/def890",
        stock: 56,
        rating: 4.8,
        reviews: 189,
        badge: "Tradition"
      },
      {
        id: 21,
        name: "Lampe Henna Marocaine",
        price: 290,
        description: "Lampe décorative en métal avec motifs henna colorés",
        longDescription: "Lampe artisanale marocaine en métal perforé avec motifs henna traditionnels. Lumière tamisée colorée créant ambiance magique. Hauteur 45cm, électrique avec interrupteur. Fabriquée à Safi, pièce unique.",
        category: "MAISON & CUISINE",
        images: ["https://images.unsplash.com/photo-1513519242328-c79e41390be1?w=400", "https://images.unsplash.com/photo-1530320233319-56d8c2e9e8a9?w=400"],
        videoUrl: "https://www.youtube.com/embed/ghi123",
        stock: 29,
        rating: 4.7,
        reviews: 98,
        badge: "Décoration"
      },
      {
        id: 22,
        name: "Power Bank 20000mAh Ultra",
        price: 1490,
        description: "Batterie externe haute capacité avec charge rapide PD",
        longDescription: "Power bank 20000mAh avec charge rapide PD 65W et QC 4.0. 2 ports USB-C + 2 USB-A. Écran LED affichage niveau. Compatible laptops, phones, tablets. Charge complète en 1.5h. Garantie 2 ans.",
        category: "GADGETS & ÉLECTRONIQUE",
        images: ["https://images.unsplash.com/photo-1593642632822-c18b7e6c8a1b?w=400", "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400"],
        videoUrl: "https://www.youtube.com/embed/jkl456",
        stock: 78,
        rating: 4.5,
        reviews: 267,
        badge: "Essentiel"
      },
      {
        id: 23,
        name: "Boucles Oreilles Berbères",
        price: 165,
        description: "Boucles d'oreilles traditionnelles en argent avec émaux colorés",
        longDescription: "Boucles oreilles artisanales berbères en argent 925 avec émaux colorés. Motifs traditionnels du sud marocain. Système fermé sécurisé. Fabriquées par artisans de Tiznit. Livré dans écrin cadeau.",
        category: "MODE FEMME",
        images: ["https://images.unsplash.com/photo-1608344176986-fd1a9ac0e8b5?w=400", "https://images.unsplash.com/photo-1572566500753-1f7a0a772777?w=400"],
        videoUrl: "https://www.youtube.com/embed/mno789",
        stock: 34,
        rating: 4.9,
        reviews: 145,
        badge: "Artisanal"
      },
      {
        id: 24,
        name: "Gilet de Sécurité LED",
        price: 95,
        description: "Gilet réfléchissant avec bandes LED rechargeables USB",
        longDescription: "Gilet de sécurité haute visibilité avec bandes LED USB rechargeables. 3 modes clignotants, autonomie 8h. Tissu respirant, tailles S-XXL. Parfait moto, vélo, travail nocturne. Norme CE, étanche IPX4.",
        category: "ACCESSOIRES",
        images: ["https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"],
        videoUrl: "https://www.youtube.com/embed/pqr012",
        stock: 89,
        rating: 4.4,
        reviews: 178,
        badge: "Sécurité"
      },
      {
        id: 25,
        name: "Tapis de Prière Marocain",
        price: 78,
        description: "Tapis de prière en velours avec motifs géométriques traditionnels",
        longDescription: "Tapis prière marocain velours épais avec motifs islamiques traditionnels. Dimensions 110x70cm, antidérapant. Sacs de transport inclus. Fabriqué à Rabat, qualité supérieure. Couleurs multiples disponibles.",
        category: "MAISON & CUISINE",
        images: ["https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"],
        videoUrl: "https://www.youtube.com/embed/stu345",
        stock: 123,
        rating: 4.7,
        reviews: 234,
        badge: "Tradition"
      }
    ];
    saveProducts();
  }
}

// Panier
function loadCart() {
  const stored = localStorage.getItem(STORAGE.cart);
  cart = stored ? JSON.parse(stored) : [];
  updateCartBadge();
}
function saveCart() { localStorage.setItem(STORAGE.cart, JSON.stringify(cart)); updateCartBadge(); }
function updateCartBadge() {
  document.querySelectorAll('#cartCountBadge').forEach(badge => {
    badge.innerText = cart.reduce((s, i) => s + i.quantity, 0);
  });
}
function addToCart(productId, qty = 1) {
  const product = products.find(p => p.id == productId);
  if (!product) return;
  const existing = cart.find(i => i.id == productId);
  if (existing) existing.quantity += qty;
  else cart.push({ id: product.id, name: product.name, price: product.price, quantity: qty, image: product.images[0] });
  saveCart();
  showToast(`${product.name} ajouté au panier`);
}
function removeFromCart(productId) { cart = cart.filter(i => i.id != productId); saveCart(); if (window.location.pathname.includes('cart.html')) renderCartPage(); }
function updateQuantity(productId, newQty) {
  let item = cart.find(i => i.id == productId);
  if (item && newQty > 0) item.quantity = newQty;
  else if (newQty <= 0) cart = cart.filter(i => i.id != productId);
  saveCart();
  if (window.location.pathname.includes('cart.html')) renderCartPage();
}

// Thèmes simplifiés (clair/sombre)
function initThemeSystem() {
  const darkMode = localStorage.getItem(STORAGE.darkMode) === 'true';
  if (darkMode) document.documentElement.classList.add('dark');
  
  // Gérer le dark mode toggle
  document.querySelectorAll('#darkModeToggle, #darkModeToggleShop').forEach(btn => {
    if (btn) btn.onclick = () => {
      document.documentElement.classList.toggle('dark');
      localStorage.setItem(STORAGE.darkMode, document.documentElement.classList.contains('dark'));
    };
  });
}

// Envoi de commande vers WhatsApp
function sendOrderToWhatsApp(order) {
  const phoneNumber = "+212621924487";
  const message = `🛍️ *NOUVELLE COMMANDE NOVA* 🛍️\n\n` +
    `📋 *Numéro:* #${order.id}\n` +
    `👤 *Client:* ${order.customer}\n` +
    `📞 *Téléphone:* ${order.phone}\n` +
    `🏠 *Adresse:* ${order.address}\n` +
    `💰 *Total:* ${order.total.toFixed(2)}$\n\n` +
    `📦 *PRODUITS COMMANDÉS:*\n` +
    order.items.map(item => 
      `• ${item.name} x${item.quantity} = ${(item.price * item.quantity).toFixed(2)}$`
    ).join('\n') +
    `\n\n📅 *Date:* ${new Date(order.date).toLocaleString('fr-FR')}\n` +
    `🚀 *Statut:* En attente de traitement`;
  
  const whatsappUrl = `https://wa.me/${phoneNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

// --- Pages Rendering ---
// Page de connexion client
function showCustomerLogin() {
  const loginModal = document.createElement('div');
  loginModal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
  loginModal.innerHTML = `
    <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl w-96 max-w-[90vw] shadow-2xl">
      <h2 class="text-xl font-bold mb-4">🔐 Connexion Client</h2>
      <form id="customerLoginForm" class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Nom complet</label>
          <input type="text" id="customerName" required class="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg">
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Email</label>
          <input type="email" id="customerEmail" required class="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg">
        </div>
        <button type="submit" class="w-full ripple-btn bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold">
          🚀 Se connecter
        </button>
      </form>
      <button onclick="this.closest('.fixed').remove()" class="mt-4 w-full text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
        Annuler
      </button>
    </div>
  `;
  
  document.body.appendChild(loginModal);
  
  // Gérer la soumission du formulaire
  document.getElementById('customerLoginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    
    if (name && email) {
      loginCustomer(name, email);
      loginModal.remove();
    }
  });
}

window.loadHomepage = async function() {
  const container = document.getElementById('mainContent');
  if (!container) return;
  const featured = products.slice(0, 4);
  const categories = [...new Set(products.map(p => p.category))];
  container.innerHTML = `
    <div class="relative overflow-hidden h-96 md:h-[500px]" id="heroCarousel"></div>
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-semibold mt-12 mb-6 hero-title">Produits vedettes</h2>
      <div id="featuredGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"></div>
      <h2 class="text-3xl font-semibold mt-16 mb-6 floating">Catégories</h2>
      <div id="categoryGrid" class="grid grid-cols-2 md:grid-cols-4 gap-5"></div>
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-3xl p-8 text-center my-16 floating"><h3 class="text-2xl font-bold">🚚 Livraison gratuite dès 99$</h3><button class="mt-4 ripple-btn btn-shine px-8 py-3 text-lg" onclick="window.location.href='shop.html'">Explorer la boutique →</button></div>
      <div class="mb-16"><h2 class="text-2xl font-semibold mb-8">Avis clients</h2><div class="grid md:grid-cols-3 gap-6 mt-6"><div class="p-5 rounded-2xl shadow-lg category-card">⭐⭐⭐⭐⭐ "Qualité premium exceptionnelle" - Marie</div><div class="p-5 rounded-2xl shadow-lg category-card">⭐⭐⭐⭐⭐ "Livraison ultra rapide" - Lucas</div><div class="p-5 rounded-2xl shadow-lg category-card">⭐⭐⭐⭐⭐ "Design épuré et moderne" - Chloé</div></div></div>
      <div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl p-8 rounded-3xl mb-10"><h3 class="text-xl font-bold mb-4">📧 Newsletter</h3><div class="flex mt-3 gap-2"><input type="email" id="newsEmail" placeholder="Votre email..." class="flex-1 p-3 rounded-full border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur"><button id="newsBtn" class="ripple-btn px-6 rounded-full">S'abonner</button></div></div>
    </div>`;
  // Carrousel simple
  const slides = [{ img: "https://picsum.photos/id/15/1600/500", title: "NOVA Édition", sub: "Puissance & élégance" }, { img: "https://picsum.photos/id/20/1600/500", title: "AirGlide Max", sub: "Son spatial" }];
  let idx = 0;
  const carDiv = document.getElementById('heroCarousel');
  function upd() { carDiv.innerHTML = `<div class="w-full h-full bg-cover bg-center flex items-center justify-center text-white" style="background-image:linear-gradient(0deg,rgba(0,0,0,0.4),rgba(0,0,0,0.2)), url(${slides[idx].img})"><div><h1 class="text-4xl md:text-6xl font-bold">${slides[idx].title}</h1><p>${slides[idx].sub}</p></div></div>`; }
  upd(); setInterval(() => { idx = (idx + 1) % slides.length; upd(); }, 5000);
  const grid = document.getElementById('featuredGrid');
  grid.innerHTML = featured.map((p, index) => `<div class="product-card bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg" style="animation-delay: ${index * 0.1}s"><img src="${p.images[0]}" class="h-56 w-full object-cover"><div class="p-4"><h3 class="font-bold text-lg">${p.name}</h3><p class="text-lg font-semibold text-blue-600 dark:text-blue-400">$${p.price}</p><button onclick="addToCart(${p.id},1)" class="mt-2 w-full ripple-btn">🛒 Ajouter au panier</button></div></div>`).join('');
  document.getElementById('categoryGrid').innerHTML = categories.map((c, index) => `<div class="category-card bg-white/80 dark:bg-gray-700/80 backdrop-blur-lg p-6 rounded-2xl text-center cursor-pointer" style="animation-delay: ${index * 0.15}s" onclick="window.location.href='shop.html?category=${encodeURIComponent(c)}'"><div class="text-4xl mb-2 floating">📁</div><h3 class="font-bold">${c}</h3></div>`).join('');
  document.getElementById('newsBtn')?.addEventListener('click', () => { const email = document.getElementById('newsEmail')?.value; if (email) showToast('Merci pour votre abonnement !'); else showToast('Email invalide', 'error'); });
};

window.loadShopPage = function() {
  const container = document.getElementById('shopContent');
  if (!container) return;
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category') || '';
  const searchParam = urlParams.get('search') || '';
  let filtered = [...products];
  let searchTerm = searchParam.toLowerCase(), priceMax = 20000, sort = 'default';
  const render = () => {
    let items = filtered.filter(p => (categoryParam === '' || p.category === categoryParam) && p.price <= priceMax && (p.name.toLowerCase().includes(searchTerm) || p.description.toLowerCase().includes(searchTerm) || p.category.toLowerCase().includes(searchTerm)));
    if (sort === 'low-high') items.sort((a,b)=>a.price-b.price);
    if (sort === 'high-low') items.sort((a,b)=>b.price-a.price);
    document.getElementById('productGrid').innerHTML = items.map((p, index) => `<div class="product-card bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl p-4 shadow-lg" style="animation-delay: ${index * 0.1}s"><img src="${p.images[0]}" class="h-48 w-full object-cover rounded-xl"><h3 class="font-bold mt-2 text-lg">${p.name}</h3><p class="text-blue-600 dark:text-blue-400 font-semibold">${p.price} MAD</p><div class="flex gap-2 mt-2"><button onclick="addToCart(${p.id},1)" class="ripple-btn flex-1">🛒 Ajouter</button><button onclick="window.location.href='product.html?id=${p.id}'" class="border-2 border-gray-300 dark:border-gray-600 py-1 rounded-full flex-1 hover:bg-gray-100 dark:hover:bg-gray-700 transition">👁️ Détail</button></div></div>`).join('');
    document.getElementById('resultCount').innerText = `${items.length} produits trouvés${searchTerm ? ` pour "${searchTerm}"` : ''}${categoryParam ? ` dans ${categoryParam}` : ''}`;
  };
  container.innerHTML = `<div class="max-w-7xl mx-auto px-4 fade-page"><div class="flex flex-col md:flex-row gap-6"><aside class="md:w-1/4"><div class="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg p-4 rounded-2xl shadow-lg"><h3 class="font-bold mb-4">🔍 Filtres</h3><select id="catFilter" class="w-full p-2 border rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur"><option value="">Toutes catégories</option>${[...new Set(products.map(p=>p.category))].map(c=>`<option value="${c}" ${categoryParam === c ? 'selected' : ''}>${c}</option>`)}</select><div class="mt-4"><label class="block text-sm font-medium mb-2">Prix max: <span id="priceVal" class="text-blue-600 font-bold">20000 MAD</span></label><input type="range" id="priceRange" min="0" max="20000" step="100" class="w-full"></div><input type="text" id="searchShop" placeholder="🔎 Rechercher un produit..." value="${searchParam}" class="w-full p-2 border rounded-lg mt-4 bg-white/50 dark:bg-gray-700/50 backdrop-blur"></div></aside><div class="md:w-3/4"><div class="flex justify-between items-center mb-4"><h2 class="text-2xl font-bold">Boutique</h2><select id="sortSelect" class="p-2 border rounded-lg bg-white/50 dark:bg-gray-700/50 backdrop-blur"><option value="default">Trier</option><option value="low-high">Prix croissant</option><option value="high-low">Prix décroissant</option></select></div><div id="resultCount" class="mb-4 text-gray-600 dark:text-gray-400"></div><div id="productGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"></div></div></div></div>`;
  document.getElementById('catFilter').addEventListener('change', e => { categoryParam = e.target.value; render(); });
  document.getElementById('priceRange').addEventListener('input', e => { priceMax = parseInt(e.target.value); document.getElementById('priceVal').innerText = `${priceMax} MAD`; render(); });
  document.getElementById('searchShop').addEventListener('input', e => { searchTerm = e.target.value; render(); });
  document.getElementById('sortSelect').addEventListener('change', e => { sort = e.target.value; render(); });
  render();
};

window.loadProductDetail = function() {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const product = products.find(p => p.id === id);
  const container = document.getElementById('productDetailContainer');
  if (!product) { container.innerHTML = '<div class="text-center py-20"><h2 class="text-2xl font-bold">❌ Produit introuvable</h2><a href="shop.html" class="mt-4 inline-block ripple-btn px-6 py-2">Retour à la boutique</a></div>'; return; }
  let mainImage = product.images[0];
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  container.innerHTML = `<div class="max-w-7xl mx-auto px-4 fade-page"><div class="grid md:grid-cols-2 gap-8"><div class="space-y-4"><div class="relative overflow-hidden rounded-2xl shadow-2xl"><img id="mainImg" src="${mainImage}" class="w-full image-zoom"></div><div class="flex gap-2" id="thumbList">${product.images.map((img, index) => `<img src="${img}" class="w-20 h-20 rounded-lg cursor-pointer border-2 hover:border-blue-500 transition-all hover:scale-110" style="animation-delay: ${index * 0.1}s">`).join('')}</div></div><div class="space-y-6"><h1 class="text-4xl font-bold hero-title">${product.name}</h1><p class="text-3xl font-bold text-blue-600 dark:text-blue-400">$${product.price}</p><p class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">${product.description}</p><button id="detailAddCart" class="mt-6 w-full ripple-btn btn-shine py-4 text-lg font-semibold">🛒 Ajouter au panier</button>${product.videoUrl ? `<div class="mt-8"><h3 class="text-xl font-bold mb-4">📹 Vidéo de présentation</h3><iframe class="w-full h-64 rounded-xl shadow-lg" src="${product.videoUrl}" frameborder="0"></iframe></div>` : ''}</div></div><div class="mt-16"><h2 class="text-3xl font-bold mb-8 floating">🎯 Produits similaires</h2><div class="grid grid-cols-2 md:grid-cols-3 gap-6">${related.map((r, index) => `<div class="product-card bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-4 rounded-2xl shadow-lg" style="animation-delay: ${index * 0.15}s"><img src="${r.images[0]}" class="h-32 w-full object-cover rounded-xl mb-3"><p class="font-bold">${r.name}</p><p class="text-blue-600 font-semibold">$${r.price}</p><button onclick="window.location.href='product.html?id=${r.id}'" class="mt-2 w-full ripple-btn">👁️ Voir</button></div>`).join('')}</div></div></div>`;
  document.getElementById('detailAddCart').onclick = () => addToCart(product.id, 1);
  document.querySelectorAll('#thumbList img').forEach(thumb => thumb.addEventListener('click', e => { 
    mainImage = e.target.src; 
    const mainImg = document.getElementById('mainImg');
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = mainImage;
      mainImg.style.opacity = '1';
    }, 200);
  }));
};

window.renderCartPage = function() {
  const container = document.getElementById('cartContainer');
  if (!container) return;
  if (cart.length === 0) { 
    container.innerHTML = `<div class="max-w-2xl mx-auto text-center py-20 fade-page"><div class="mb-8"><div class="text-6xl mb-4 floating">🛒</div><h2 class="text-3xl font-bold mb-4">Votre panier est vide</h2><p class="text-gray-600 dark:text-gray-400 mb-8">Découvrez nos produits et remplissez votre panier !</p></div><a href="shop.html" class="inline-block ripple-btn btn-shine px-8 py-3 text-lg">🛍️ Commencer mes achats</a></div>`; 
    return; 
  }
  let total = cart.reduce((s,i)=>s+(i.price*i.quantity),0);
  container.innerHTML = `<div class="max-w-7xl mx-auto px-4 fade-page"><div class="flex flex-col lg:flex-row gap-8"><div class="flex-1 space-y-4" id="cartItemsList"></div><div class="lg:w-80"><div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-6 rounded-2xl shadow-lg sticky top-24"><h2 class="text-2xl font-bold mb-4">🧾 Récapitulatif</h2><div class="space-y-2 mb-4">${cart.map(i=>`<div class="flex justify-between text-sm"><span>${i.name} x${i.quantity}</span><span class="font-semibold">${(i.price*i.quantity).toFixed(2)} MAD</span></div>`).join('')}</div><div class="border-t pt-4"><div class="flex justify-between text-xl font-bold">Total: <span class="text-blue-600">${total.toFixed(2)} MAD</span></div></div><button id="checkoutBtn" class="w-full mt-6 ripple-btn btn-shine py-3 text-lg">🚀 Commander</button><button onclick="window.location.href='shop.html'" class="w-full mt-2 border-2 border-gray-300 dark:border-gray-600 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition">🛍️ Continuer mes achats</button></div></div></div></div>`;
  const listDiv = document.getElementById('cartItemsList');
  const renderList = () => { 
    listDiv.innerHTML = cart.map((i, index) => `<div class="cart-item bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-4 rounded-2xl shadow-lg" style="animation-delay: ${index * 0.1}s"><div class="flex gap-4"><img src="${i.image}" class="w-24 h-24 object-cover rounded-xl"><div class="flex-1"><h3 class="font-bold text-lg">${i.name}</h3><p class="text-blue-600 font-semibold">${i.price} MAD</p><div class="flex items-center gap-3 mt-3"><button class="qtyDec w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition" data-id="${i.id}">−</button><span class="font-bold text-lg w-8 text-center">${i.quantity}</span><button class="qtyInc w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition" data-id="${i.id}">+</button><button class="remove text-red-500 hover:text-red-700 transition ml-4" data-id="${i.id}">🗑️ Supprimer</button></div></div></div></div>`).join('');
    document.querySelectorAll('.qtyInc').forEach(btn => btn.addEventListener('click',()=>{ let id=parseInt(btn.dataset.id); let item=cart.find(i=>i.id===id); if(item) updateQuantity(id, item.quantity+1); }));
    document.querySelectorAll('.qtyDec').forEach(btn => btn.addEventListener('click',()=>{ let id=parseInt(btn.dataset.id); let item=cart.find(i=>i.id===id); if(item && item.quantity>1) updateQuantity(id, item.quantity-1); else if(item) updateQuantity(id,0); }));
    document.querySelectorAll('.remove').forEach(btn => btn.addEventListener('click',()=>{ removeFromCart(parseInt(btn.dataset.id)); }));
  };
  renderList();
  document.getElementById('checkoutBtn').onclick = () => window.location.href='checkout.html';
};

window.loadBankPage = function() {
  const container = document.getElementById('bankContainer');
  if (!container) return;
  
  // Calculer les statistiques
  const orders = JSON.parse(localStorage.getItem(STORAGE.orders) || '[]');
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const totalProductsSold = orders.reduce((sum, order) => sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0);
  
  // Produits les plus vendus
  const productSales = {};
  orders.forEach(order => {
    order.items.forEach(item => {
      if (!productSales[item.id]) {
        productSales[item.id] = { name: item.name, quantity: 0, revenue: 0 };
      }
      productSales[item.id].quantity += item.quantity;
      productSales[item.id].revenue += item.price * item.quantity;
    });
  });
  
  const topProducts = Object.values(productSales)
    .sort((a, b) => b.quantity - a.quantity)
    .slice(0, 5);
  
  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 fade-page">
      <div class="mb-8">
        <h1 class="text-4xl font-bold mb-4 hero-title">🏦 Tableau de Bord Bancaire</h1>
        <p class="text-gray-600 dark:text-gray-400">Gérez vos finances et suivez vos performances commerciales</p>
      </div>
      
      <!-- Statistiques principales -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div class="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg floating">
          <div class="text-3xl mb-2">💰</div>
          <h3 class="text-lg font-semibold mb-1">Revenu Total</h3>
          <p class="text-3xl font-bold">${totalRevenue.toFixed(2)} DH</p>
          <p class="text-sm opacity-90 mt-2">${totalOrders} commandes</p>
        </div>
        
        <div class="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg floating" style="animation-delay: 0.1s">
          <div class="text-3xl mb-2">📦</div>
          <h3 class="text-lg font-semibold mb-1">Produits Vendus</h3>
          <p class="text-3xl font-bold">${totalProductsSold}</p>
          <p class="text-sm opacity-90 mt-2">Unités totales</p>
        </div>
        
        <div class="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg floating" style="animation-delay: 0.2s">
          <div class="text-3xl mb-2">📊</div>
          <h3 class="text-lg font-semibold mb-1">Panier Moyen</h3>
          <p class="text-3xl font-bold">${averageOrderValue.toFixed(2)} DH</p>
          <p class="text-sm opacity-90 mt-2">Par commande</p>
        </div>
        
        <div class="bg-gradient-to-br from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg floating" style="animation-delay: 0.3s">
          <div class="text-3xl mb-2">📈</div>
          <h3 class="text-lg font-semibold mb-1">Taux de Conversion</h3>
          <p class="text-3xl font-bold">3.2%</p>
          <p class="text-sm opacity-90 mt-2">Moyenne du site</p>
        </div>
      </div>
      
      <!-- Produits les plus vendus -->
      <div class="grid md:grid-cols-2 gap-8 mb-8">
        <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
          <h2 class="text-2xl font-bold mb-6">🏆 Produits les Plus Vendus</h2>
          <div class="space-y-4">
            ${topProducts.map((product, index) => `
              <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    ${index + 1}
                  </div>
                  <div>
                    <p class="font-semibold">${product.name}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">${product.quantity} unités</p>
                  </div>
                </div>
                <div class="text-right">
                  <p class="font-bold text-blue-600 dark:text-blue-400">${product.revenue.toFixed(2)} DH</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">Revenu</p>
                </div>
              </div>
            `).join('')}
            ${topProducts.length === 0 ? '<p class="text-center text-gray-500 py-8">Aucune vente enregistrée</p>' : ''}
          </div>
        </div>
        
        <!-- Transactions récentes -->
        <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
          <h2 class="text-2xl font-bold mb-6">💳 Transactions Récentes</h2>
          <div class="space-y-3 max-h-96 overflow-y-auto">
            ${orders.slice(-10).reverse().map(order => `
              <div class="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                <div class="flex justify-between items-start">
                  <div>
                    <p class="font-semibold">Commande #${order.id}</p>
                    <p class="text-sm text-gray-600 dark:text-gray-400">${order.customer}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-500">${new Date(order.date).toLocaleDateString('fr-FR')}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-green-600 dark:text-green-400">+${order.total.toFixed(2)} DH</p>
                    <p class="text-xs text-gray-500 dark:text-gray-500">${order.items.length} articles</p>
                  </div>
                </div>
              </div>
            `).join('')}
            ${orders.length === 0 ? '<p class="text-center text-gray-500 py-8">Aucune transaction enregistrée</p>' : ''}
          </div>
        </div>
      </div>
      
      <!-- Actions rapides -->
      <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
        <h2 class="text-2xl font-bold mb-6">⚡ Actions Rapides</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button onclick="window.location.href='shop.html'" class="ripple-btn p-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl">
            <div class="text-2xl mb-2">🛍️</div>
            <p class="font-semibold">Voir la Boutique</p>
            <p class="text-sm opacity-90">Gérer les produits</p>
          </button>
          
          <button onclick="window.location.href='admin.html'" class="ripple-btn p-4 bg-green-500 hover:bg-green-600 text-white rounded-xl">
            <div class="text-2xl mb-2">⚙️</div>
            <p class="font-semibold">Administration</p>
            <p class="text-sm opacity-90">Paramètres avancés</p>
          </button>
          
          <button onclick="exportData()" class="ripple-btn p-4 bg-purple-500 hover:bg-purple-600 text-white rounded-xl">
            <div class="text-2xl mb-2">📊</div>
            <p class="font-semibold">Exporter les Données</p>
            <p class="text-sm opacity-90">Télécharger le rapport</p>
          </button>
        </div>
      </div>
    </div>
  `;
};

// Fonction pour exporter les données
function exportData() {
  const orders = JSON.parse(localStorage.getItem(STORAGE.orders) || '[]');
  const products = JSON.parse(localStorage.getItem(STORAGE.products) || '[]');
  
  const data = {
    exportDate: new Date().toISOString(),
    statistics: {
      totalOrders: orders.length,
      totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
      totalProducts: products.length
    },
    orders: orders,
    products: products
  };
  
  const dataStr = JSON.stringify(data, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `nova-export-${new Date().toISOString().split('T')[0]}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
  
  showToast('📊 Données exportées avec succès !');
}

window.loadCheckout = function() {
  const container = document.getElementById('checkoutContainer');
  const total = cart.reduce((s,i)=>s+(i.price*i.quantity),0);
  container.innerHTML = `<div class="max-w-7xl mx-auto px-4 fade-page"><div class="grid md:grid-cols-2 gap-8"><div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-8 rounded-2xl shadow-lg"><h2 class="text-2xl font-bold mb-6">📦 Informations de livraison</h2><form id="orderForm" class="space-y-4"><div><label class="block text-sm font-medium mb-2">👤 Nom complet</label><input required id="fullName" class="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 transition"></div><div><label class="block text-sm font-medium mb-2">📞 Téléphone</label><input required id="phone" type="tel" class="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 transition"></div><div><label class="block text-sm font-medium mb-2">🏠 Adresse de livraison</label><input required id="address" class="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl focus:border-blue-500 transition"></div><button type="submit" class="w-full ripple-btn btn-shine py-4 text-lg font-semibold">✅ Confirmer ma commande</button></form></div><div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-8 rounded-2xl shadow-lg"><h2 class="text-2xl font-bold mb-6">🧾 Récapitulatif de commande</h2><div class="space-y-3 mb-6">${cart.map(i=>`<div class="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl"><div><span class="font-semibold">${i.name}</span><span class="text-gray-600 dark:text-gray-400 ml-2">x${i.quantity}</span></div><span class="font-bold text-blue-600">${(i.price*i.quantity).toFixed(2)} MAD</span></div>`).join('')}</div><div class="border-t pt-4"><div class="flex justify-between text-xl font-bold">Total: <span class="text-blue-600">${total.toFixed(2)} MAD</span></div></div><div class="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl"><div class="flex items-center gap-2 text-green-700 dark:text-green-400"><span class="text-xl">🚚</span><span class="font-semibold">Livraison gratuite</span></div></div></div></div></div>`;
  document.getElementById('orderForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if(cart.length===0) { showToast('🛒 Votre panier est vide','error'); return; }
    const orders = JSON.parse(localStorage.getItem(STORAGE.orders) || '[]');
    const newOrder = { id: Date.now(), items: [...cart], total, date: new Date().toISOString(), customer: document.getElementById('fullName').value, phone: document.getElementById('phone').value, address: document.getElementById('address').value };
    orders.push(newOrder);
    localStorage.setItem(STORAGE.orders, JSON.stringify(orders));
    localStorage.removeItem(STORAGE.cart);
    cart = []; saveCart();
    
    // Animation de succès avec option WhatsApp
    container.innerHTML = `<div class="max-w-2xl mx-auto text-center py-20 fade-page"><div class="mb-8"><div class="text-6xl mb-4 floating">✅</div><h2 class="text-3xl font-bold mb-4">Commande confirmée !</h2><p class="text-gray-600 dark:text-gray-400 mb-2">Merci ${newOrder.customer} pour votre confiance</p><p class="text-gray-600 dark:text-gray-400 mb-8">Votre commande #${newOrder.id} a été enregistrée</p><div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-6 rounded-2xl shadow-lg mb-8"><h3 class="font-bold mb-4">Détails de livraison</h3><p class="text-sm">📞 ${newOrder.phone}</p><p class="text-sm">🏠 ${newOrder.address}</p></div></div><div class="flex flex-col sm:flex-row gap-4 justify-center"><button onclick="sendOrderToWhatsApp(${JSON.stringify(newOrder)})" class="inline-block bg-green-500 hover:bg-green-600 text-white px-8 py-3 text-lg rounded-xl font-semibold">💬 Envoyer via WhatsApp</button><button onclick="window.location.href='index.html'" class="inline-block ripple-btn btn-shine px-8 py-3 text-lg">🏠 Retour à l'accueil</button></div></div>`;
    showToast('🎉 Commande confirmée ! Merci pour votre achat.', 'success');
  });
};

window.loadAdmin = function() {
  const container = document.getElementById('adminContainer');
  const isLogged = localStorage.getItem(STORAGE.adminAuth) === 'true';
  if (!isLogged) {
    container.innerHTML = `<div class="max-w-md mx-auto mt-20 p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-lg"><h2 class="text-xl font-bold mb-4">🔐 Connexion admin</h2><div class="my-3"><label class="block text-sm font-medium mb-1">Utilisateur:</label><input id="adminUser" class="w-full p-2 border rounded"></div><div class="my-3"><label class="block text-sm font-medium mb-1">Mot de passe:</label><input id="adminPass" type="password" class="w-full p-2 border rounded"></div><button id="adminLoginBtn" class="mt-4 w-full ripple-btn py-2">Se connecter</button></div>`;
    document.getElementById('adminLoginBtn')?.addEventListener('click', () => { const u = document.getElementById('adminUser').value; const p = document.getElementById('adminPass').value; if (u === 'admin' && p === 'admin') { localStorage.setItem(STORAGE.adminAuth, 'true'); showToast('Bienvenue admin'); loadAdmin(); } else showToast('Identifiants incorrects', 'error'); });
    return;
  }
  const totalProd = products.length, cats = new Set(products.map(p=>p.category)).size, ordersTotal = JSON.parse(localStorage.getItem(STORAGE.orders)||'[]').length;
  container.innerHTML = `<div class="flex justify-between"><h1 class="text-3xl font-bold">Dashboard</h1><button id="logoutAdmin" class="bg-red-500 text-white px-4 py-2 rounded-full">Déconnexion</button></div><div class="grid grid-cols-3 gap-4 my-8"><div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl"><p>📦 Produits</p><p class="text-2xl font-bold">${totalProd}</p></div><div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl"><p>🏷️ Catégories</p><p class="text-2xl font-bold">${cats}</p></div><div class="bg-gray-100 dark:bg-gray-800 p-4 rounded-2xl"><p>📋 Commandes</p><p class="text-2xl font-bold">${ordersTotal}</p></div></div><button id="addProductAdmin" class="bg-blue-600 text-white px-5 py-2 rounded-full">+ Ajouter produit</button><div class="mt-8 overflow-x-auto"><table class="w-full"><thead><tr><th>ID</th><th>Nom</th><th>Prix</th><th>Catégorie</th><th>Actions</th></tr></thead><tbody>${products.map(p => `<tr><td>${p.id}</td><td>${p.name}</td><td>$${p.price}</td><td>${p.category}</td><td><button class="editProdBtn bg-yellow-500 px-2 py-1 rounded text-white" data-id="${p.id}">Modifier</button> <button class="delProdBtn bg-red-500 px-2 py-1 rounded text-white" data-id="${p.id}">Supprimer</button></td></tr>`).join('')}</tbody></table></div>`;
  document.getElementById('logoutAdmin').onclick = () => { localStorage.removeItem(STORAGE.adminAuth); loadAdmin(); };
  document.getElementById('addProductAdmin').onclick = () => openProductModal(null);
  document.querySelectorAll('.editProdBtn').forEach(btn => btn.addEventListener('click', (e) => { const id = parseInt(btn.dataset.id); openProductModal(products.find(p => p.id === id)); }));
  document.querySelectorAll('.delProdBtn').forEach(btn => btn.addEventListener('click', (e) => { const id = parseInt(btn.dataset.id); products = products.filter(p => p.id !== id); saveProducts(); loadAdmin(); showToast('Produit supprimé'); }));
};

function openProductModal(product) {
  const isEdit = !!product;
  const modalDiv = document.createElement('div');
  modalDiv.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
  modalDiv.innerHTML = `<div class="bg-white dark:bg-gray-800 p-6 rounded-2xl w-96 max-h-[90vh] overflow-y-auto shadow-2xl"><h2 class="text-xl font-bold mb-4">${isEdit ? 'Modifier' : 'Nouveau produit'}</h2><div class="my-3"><label class="block text-sm font-medium mb-2">Nom du produit:</label><input id="prodName" value="${isEdit ? product.name : ''}" class="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg"></div><div class="my-3"><label class="block text-sm font-medium mb-2">Prix:</label><input id="prodPrice" type="number" value="${isEdit ? product.price : ''}" class="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg"></div><div class="my-3"><label class="block text-sm font-medium mb-2">Catégorie:</label><input id="prodCat" value="${isEdit ? product.category : ''}" class="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg"></div><div class="my-3"><label class="block text-sm font-medium mb-2">Description:</label><textarea id="prodDesc" rows="3" class="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg">${isEdit ? product.description : ''}</textarea></div><div class="my-3"><label class="block text-sm font-medium mb-2">Images depuis l'appareil:</label><input type="file" id="prodImagesFile" multiple accept="image/*" class="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg"><div id="imagePreview" class="grid grid-cols-3 gap-2 mt-2"></div></div><div class="my-3"><label class="block text-sm font-medium mb-2">URL images (séparées par des virgules):</label><input id="prodImages" value="${isEdit ? product.images.join(',') : ''}" class="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg"></div><div class="my-3"><label class="block text-sm font-medium mb-2">URL vidéo:</label><input id="prodVideo" value="${isEdit ? product.videoUrl : ''}" class="w-full p-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg"></div><div class="flex gap-2 mt-6"><button id="saveModalBtn" class="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold">💾 Enregistrer</button><button id="closeModalBtn" class="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-3 rounded-lg font-semibold">❌ Annuler</button></div></div>`;
  document.body.appendChild(modalDiv);
  
  // Gestion de la prévisualisation des images
  const fileInput = document.getElementById('prodImagesFile');
  const previewDiv = document.getElementById('imagePreview');
  const uploadedImages = [];
  
  fileInput.addEventListener('change', (e) => {
    previewDiv.innerHTML = '';
    uploadedImages.length = 0;
    
    Array.from(e.target.files).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgData = event.target.result;
        uploadedImages.push(imgData);
        
        const preview = document.createElement('div');
        preview.className = 'relative';
        preview.innerHTML = `<img src="${imgData}" class="w-full h-20 object-cover rounded"><button type="button" class="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs" onclick="this.parentElement.remove(); uploadedImages.splice(${index},1);">×</button>`;
        previewDiv.appendChild(preview);
      };
      reader.readAsDataURL(file);
    });
  });
  
  document.getElementById('saveModalBtn').onclick = () => {
    const urlImages = document.getElementById('prodImages').value.split(',').map(s=>s.trim()).filter(s=>s);
    const allImages = [...uploadedImages, ...urlImages];
    
    const newProd = {
      id: isEdit ? product.id : Date.now(),
      name: document.getElementById('prodName').value,
      price: parseFloat(document.getElementById('prodPrice').value),
      category: document.getElementById('prodCat').value,
      description: document.getElementById('prodDesc').value,
      images: allImages.length > 0 ? allImages : ['https://picsum.photos/id/999/400/400'],
      videoUrl: document.getElementById('prodVideo').value
    };
    if (isEdit) { const idx = products.findIndex(p=>p.id===product.id); if(idx!==-1) products[idx]=newProd; }
    else products.push(newProd);
    saveProducts();
    modalDiv.remove();
    loadAdmin();
    showToast(`Produit ${isEdit ? 'modifié' : 'ajouté'}`);
  };
  document.getElementById('closeModalBtn').onclick = () => modalDiv.remove();
}

// Recherche globale
function initGlobalSearch() {
  const searchInputs = ['globalSearchInput', 'mobileGlobalSearch'];
  
  searchInputs.forEach(inputId => {
    const input = document.getElementById(inputId);
    if (input) {
      input.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query.length > 2) {
          const results = products.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
          );
          
          if (results.length > 0) {
            showToast(`${results.length} produit(s) trouvé(s) pour "${query}"`);
            if (!window.location.pathname.includes('shop.html')) {
              setTimeout(() => {
                window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
              }, 500);
            }
          }
        }
      });
      
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          const query = e.target.value;
          if (query.trim()) {
            window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
          }
        }
      });
    }
  });
}

// Bouton WhatsApp flottant
function createWhatsAppButton() {
  if (document.querySelector('.whatsapp-float')) return;
  
  const whatsappBtn = document.createElement('a');
  whatsappBtn.href = 'https://wa.me/212621924487?text=Bonjour%20NOVA%20!%20Je%20souhaite%20passer%20commande...';
  whatsappBtn.target = '_blank';
  whatsappBtn.className = 'whatsapp-float fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-2xl z-40 transition-all hover:scale-110';
  whatsappBtn.innerHTML = '💬';
  whatsappBtn.title = 'Contacter via WhatsApp';
  
  document.body.appendChild(whatsappBtn);
  
  // Animation d'entrée
  whatsappBtn.style.opacity = '0';
  whatsappBtn.style.transform = 'scale(0)';
  setTimeout(() => {
    whatsappBtn.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    whatsappBtn.style.opacity = '1';
    whatsappBtn.style.transform = 'scale(1)';
  }, 1000);
}

// Gestion session client
function initCustomerSession() {
  const isLoggedIn = localStorage.getItem('customerLoggedIn') === 'true';
  const customerName = localStorage.getItem('customerName') || '';
  
  return { isLoggedIn, customerName };
}

function updateNavigationForCustomer() {
  const { isLoggedIn, customerName } = initCustomerSession();
  
  // Mettre à jour toutes les navigations
  document.querySelectorAll('nav').forEach(nav => {
    const desktopNav = nav.querySelector('.hidden.md\\:flex');
    const mobileMenu = nav.querySelector('#mobileMenu .space-y-2');
    const loginBtn = nav.querySelector('#customerLoginBtn');
    const mobileLoginBtn = nav.querySelector('#mobileCustomerLoginBtn');
    
    if (desktopNav) {
      updateNavigationLinks(desktopNav, isLoggedIn, customerName);
    }
    
    if (mobileMenu) {
      updateNavigationLinks(mobileMenu, isLoggedIn, customerName);
    }
    
    // Gérer les boutons de connexion
    if (loginBtn) {
      if (isLoggedIn) {
        loginBtn.style.display = 'none';
      } else {
        loginBtn.style.display = 'block';
        loginBtn.onclick = showCustomerLogin;
      }
    }
    
    if (mobileLoginBtn) {
      if (isLoggedIn) {
        mobileLoginBtn.style.display = 'none';
      } else {
        mobileLoginBtn.style.display = 'block';
        mobileLoginBtn.onclick = showCustomerLogin;
      }
    }
  });
}

function updateNavigationLinks(container, isLoggedIn, customerName) {
  // Vérifier si les liens Banque et Admin existent déjà
  const existingBankLink = container.querySelector('a[href*="bank.html"]');
  const existingAdminLink = container.querySelector('a[href*="admin.html"]');
  
  if (isLoggedIn) {
    // Ajouter les liens si connecté et n'existent pas
    if (!existingBankLink) {
      const bankLink = document.createElement('a');
      bankLink.href = 'bank.html';
      bankLink.className = 'hover:text-blue-600 dark:hover:text-blue-400 transition';
      bankLink.textContent = '🏦 Banque';
      container.appendChild(bankLink);
    }
    
    if (!existingAdminLink) {
      const adminLink = document.createElement('a');
      adminLink.href = 'admin.html';
      adminLink.className = 'hover:text-blue-600 dark:hover:text-blue-400 transition';
      adminLink.textContent = '⚙️ Admin';
      container.appendChild(adminLink);
    }
    
    // Ajouter le nom du client et bouton déconnexion
    if (!container.querySelector('.customer-info')) {
      const customerInfo = document.createElement('div');
      customerInfo.className = 'customer-info flex items-center gap-2 text-sm';
      customerInfo.innerHTML = `
        <span class="text-green-600 dark:text-green-400">👤 ${customerName}</span>
        <button onclick="logoutCustomer()" class="text-red-500 hover:text-red-700 transition">🚪</button>
      `;
      container.appendChild(customerInfo);
    }
  } else {
    // Supprimer les liens si déconnecté
    if (existingBankLink) existingBankLink.remove();
    if (existingAdminLink) existingAdminLink.remove();
    
    // Supprimer les infos client
    const customerInfo = container.querySelector('.customer-info');
    if (customerInfo) customerInfo.remove();
  }
}

function loginCustomer(name, email) {
  localStorage.setItem('customerLoggedIn', 'true');
  localStorage.setItem('customerName', name);
  localStorage.setItem('customerEmail', email);
  updateNavigationForCustomer();
  showToast(`👋 Bienvenue ${name} !`);
}

function logoutCustomer() {
  localStorage.removeItem('customerLoggedIn');
  localStorage.removeItem('customerName');
  localStorage.removeItem('customerEmail');
  updateNavigationForCustomer();
  showToast('👋 Au revoir !');
  window.location.href = 'index.html';
}

// Menu mobile hamburger
function initMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const menu = document.getElementById('mobileMenu');
  const icon = document.getElementById('hamburgerIcon');
  
  if (toggle && menu && icon) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('hidden');
      icon.textContent = menu.classList.contains('hidden') ? '☰' : '✕';
    });
    
    // Fermer le menu en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.add('hidden');
        icon.textContent = '☰';
      }
    });
    
    // Fermer le menu lors du clic sur un lien
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.add('hidden');
        icon.textContent = '☰';
      });
    });
  }
}

// Initialisation générale selon la page
document.addEventListener('DOMContentLoaded', () => {
  loadProducts(); loadCart(); initThemeSystem(); initGlobalSearch(); createWhatsAppButton(); initMobileMenu(); updateNavigationForCustomer();
  const path = window.location.pathname;
  if (path.includes('index.html') || path === '/') window.loadHomepage();
  else if (path.includes('shop.html')) window.loadShopPage();
  else if (path.includes('product.html')) window.loadProductDetail();
  else if (path.includes('cart.html')) window.renderCartPage();
  else if (path.includes('checkout.html')) window.loadCheckout();
  else if (path.includes('bank.html')) window.loadBankPage();
  else if (path.includes('admin.html')) window.loadAdmin();
  window.addToCart = addToCart;
  window.loginCustomer = loginCustomer;
  window.logoutCustomer = logoutCustomer;
});
let cart = [];
let toShipOrders = [];
let toReceiveOrders = [];

function getUserKey(prefix) {
  const email = (localStorage.getItem("petOraEmail") || "guest").toLowerCase();
  return `${prefix}_${email}`;
}

function loadUserData() {
  cart = JSON.parse(localStorage.getItem(getUserKey("petOraCart"))) || [];
  toShipOrders = JSON.parse(localStorage.getItem(getUserKey("petOraToShip"))) || [];
  toReceiveOrders = JSON.parse(localStorage.getItem(getUserKey("petOraToReceive"))) || [];
}

function saveCart() {
  localStorage.setItem(getUserKey("petOraCart"), JSON.stringify(cart));
}

function saveOrders() {
  localStorage.setItem(getUserKey("petOraToShip"), JSON.stringify(toShipOrders));
  localStorage.setItem(getUserKey("petOraToReceive"), JSON.stringify(toReceiveOrders));
}

function switchTab(tabName) {
  const views = document.querySelectorAll('.view-section');
  views.forEach(v => v.classList.remove('active-view'));

  const navLinks = document.querySelectorAll('.nav-links li a');
  navLinks.forEach(l => l.classList.remove('active'));

  const targetView = document.getElementById('view-' + tabName);
  const targetNav = document.getElementById('nav-' + tabName);

  if (targetView) targetView.classList.add('active-view');
  if (targetNav) targetNav.classList.add('active');

  if (tabName === 'cart') {
    renderCartView();
    renderOrders();
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function switchCartSubTab(subTabName) {
  const subviews = document.querySelectorAll('.cart-subview');
  subviews.forEach(v => v.classList.remove('active-subview'));

  const tabBtns = document.querySelectorAll('.cart-tab-btn');
  tabBtns.forEach(b => b.classList.remove('active'));

  const targetSubView = document.getElementById('cart-subview-' + subTabName);
  const targetBtn = document.getElementById('cart-tab-' + subTabName);

  if (targetSubView) targetSubView.classList.add('active-subview');
  if (targetBtn) targetBtn.classList.add('active');

  renderOrders();
}

function filterByCategory(cat) {
  switchTab('categories');
  const btn = document.querySelector(`.filter-btn[data-category="${cat}"]`);
  if (btn) btn.click();
}

const productsCatalog = [
  { 
    id: 1, 
    title: "Premium Cat Food", 
    category: "Cats", 
    price: 250.99, 
    image: "meowmix.webp", 
    description: "High quality nutrition for your feline friend.",
    rating: "4.8 ★★★★★ (240 reviews)",
    features: [
      "Rich in natural omega fatty acids for coat shine",
      "Real meat is the #1 ingredient",
      "No artificial colors, flavors, or chemical preservatives"
    ]
  },
  { 
    id: 2, 
    title: "Dog Food", 
    category: "Dogs", 
    price: 250.99, 
    image: "DOGFO.png", 
    description: "Balanced diet for all breeds.",
    rating: "4.7 ★★★★★ (185 reviews)",
    features: [
      "Optimized protein-to-fat ratio for healthy muscle building",
      "Fortified with glucosamine for joint mobility",
      "Easy-to-digest whole grains & prebiotic fiber"
    ]
  },
  { 
    id: 3, 
    title: "Universal Leash For Cat And Dog", 
    category: "Accessories", 
    price: 299.99, 
    image: "HARNESS N LEASH.jpg", 
    description: "Durable and reliable pet leash.",
    rating: "4.5 ★★★★☆ (98 reviews)",
    features: [
      "Heavy-duty nylon webbing with reflective stitching",
      "360-degree tangle-free swivel zinc alloy clasp",
      "Ergonomic padded neoprene handle for comfortable grip"
    ]
  },
  { 
    id: 4, 
    title: "Assorted Pet Supplies", 
    category: "Accessories", 
    price: 1499.99, 
    image: "various prdu.jpg", 
    description: "Essential care supplies for your daily pet needs.",
    rating: "4.6 ★★★★☆ (110 reviews)",
    features: [
      "All-in-one grooming and wellness care starter pack",
      "Eco-friendly, pet-safe materials throughout",
      "Includes comb, nail clipper, and travel bowl"
    ]
  },
  { 
    id: 5, 
    title: "Multi-Pet Essentials Pack", 
    category: "Accessories", 
    price: 1299.99, 
    image: "istockphoto-1445196818-612x612.jpg", 
    description: "Premium selection for cats, dogs, and small animals.",
    rating: "4.9 ★★★★★ (320 reviews)",
    features: [
      "Universal grooming and maintenance essentials",
      "Compact storage case included",
      "Gentle bristles suitable for sensitive skin"
    ]
  },
  { 
    id: 6, 
    title: "Ultra-Absorbent Clumping Tofu Cat Litter (6L)", 
    category: "Cats", 
    price: 349.00, 
    image: "Dofu-Cat-Tofu-Cat-Litter-13.2lbs.webp", 
    description: "100% natural, flushable, dust-free cat litter with odor control.", 
    rating: "4.9 ★★★★★ (412 reviews)", 
    features: [
      "Rapid 2-second clumping prevents tracking",
      "99.9% dust-free to protect sensitive respiratory systems",
      "Biodegradable and safely flushable in small batches",
      "Infused with activated charcoal for superior odor suppression"
    ]
  },
  { 
    id: 7, 
    title: "Salmon & Tuna Cat Treats Puree (Pack of 8)", 
    category: "Cats", 
    price: 199.50, 
    image: "tuna salmon puree.webp", 
    description: "Lickable creamy puree treats enriched with taurine and vitamin E.", 
    rating: "4.8 ★★★★★ (150 reviews)", 
    features: [
      "High moisture content supports healthy feline kidney hydration",
      "Grain-free recipe formulated without fillers or animal by-products",
      "Easy tear single-serve squeeze tubes"
    ]
  },
  { 
    id: 8, 
    title: "Orthopedic Memory Foam Dog Bed (Large)", 
    category: "Dogs", 
    price: 1850.00, 
    image: "dog bed.jpg", 
    description: "High-density therapeutic foam providing joint support for senior dogs.", 
    rating: "4.7 ★★★★★ (92 reviews)", 
    features: [
      "Medical-grade egg crate memory foam relieves hip dysplasia and arthritis",
      "Removable water-resistant cover that is fully machine washable",
      "Non-skid bottom keeps bed securely in place on tile or hardwood floors"
    ]
  },
  { 
    id: 9, 
    title: "Organic Dental Chew Bones for Dogs (10 pcs)", 
    category: "Dogs", 
    price: 280.00, 
    image: "dogbone.webp", 
    description: "Veterinarian-recommended dental sticks fighting plaque and freshening breath.", 
    rating: "4.6 ★★★★☆ (215 reviews)", 
    features: [
      "Unique ridged texture scrapes tartar during natural chewing",
      "Mint & parsley extract for lasting fresh breath",
      "Easily digestible gluten-free formula"
    ]
  },
  { 
    id: 10, 
    title: "Stainless Steel Automatic Pet Water Fountain (2.5L)", 
    category: "Accessories", 
    price: 1199.00, 
    image: "fountain.jpg", 
    description: "Ultra-quiet recirculating water fountain with quadruple filtration.", 
    rating: "4.8 ★★★★★ (340 reviews)", 
    features: [
      "Food-grade 304 stainless steel resists bacterial growth",
      "Whisper-quiet submersible pump under 20dB",
      "Includes 3 replaceable carbon filters with ion exchange resin"
    ]
  },
  { 
    id: 11, 
    title: "Dual-Sided Undercoat De-Shedding Rake", 
    category: "Accessories", 
    price: 420.00, 
    image: "grooming rake.webp", 
    description: "Efficient grooming brush for heavy shedding breeds and matted fur.", 
    rating: "4.9 ★★★★★ (510 reviews)", 
    features: [
      "Double-sided head: 9 teeth for stubborn mats, 17 teeth for thinning & de-shedding",
      "Rounded outer teeth glide smoothly across skin without scratching",
      "Dramatically reduces dead fur shedding around the house by up to 95%"
    ]
  }
];

function openProductPreview(productId) {
  const product = productsCatalog.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById("product-preview-modal");
  const modalBody = document.getElementById("preview-modal-body");

  const imageHtml = `<img src="${product.image}" alt="${product.title}">`;

  const featuresList = (product.features || [product.description])
    .map(feat => `<li>${feat}</li>`)
    .join('');

  modalBody.innerHTML = `
    <div class="preview-left-col">
      <div class="preview-image-wrap">
        ${imageHtml}
      </div>
    </div>
    <div class="preview-right-col">
      <span class="preview-tag">Category: ${product.category}</span>
      <h2 class="preview-title">${product.title}</h2>
      <div class="preview-rating">${product.rating || "4.8 ★★★★★"}</div>
      <div class="preview-price">₱${product.price.toFixed(2)}</div>
      
      <div class="preview-badge-instock">✔ In Stock</div>
      <p style="font-size: 12px; color: #555; margin-bottom: 15px;">${product.description}</p>

      <div class="preview-about-heading">About this item:</div>
      <ul class="preview-features-list">
        ${featuresList}
      </ul>

      <div class="preview-qty-row">
        <label for="preview-qty-select"><strong>Quantity:</strong></label>
        <select id="preview-qty-select">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <button class="preview-add-btn" onclick="addFromPreview(${product.id})">Add to Cart</button>
    </div>
  `;

  modal.style.display = "flex";
}

function closeProductPreview() {
  const modal = document.getElementById("product-preview-modal");
  if (modal) modal.style.display = "none";
}

function addFromPreview(productId) {
  const product = productsCatalog.find(p => p.id === productId);
  if (!product) return;

  const qtySelect = document.getElementById("preview-qty-select");
  const quantity = qtySelect ? parseInt(qtySelect.value, 10) : 1;

  for (let i = 0; i < quantity; i++) {
    addToCart(product.title, product.price);
  }

  closeProductPreview();
}

function addToCart(productTitle, productPrice) {
  const productInfo = productsCatalog.find(p => p.title === productTitle) || { image: "meowmix.webp", price: productPrice };
  
  const existingItem = cart.find(item => item.title === productTitle);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      title: productTitle,
      price: productInfo.price,
      image: productInfo.image,
      quantity: 1
    });
  }

  saveCart();
  updateCartBadge();

  const toast = document.getElementById("cart-toast");
  if (toast) {
    toast.innerText = productTitle + " added to cart!";
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 2500);
  }
}

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (badge) {
    if (totalCount > 0) {
      badge.innerText = totalCount;
      badge.style.display = "inline-block";
    } else {
      badge.style.display = "none";
    }
  }
}

function changeQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
  updateCartBadge();
  renderCartView();
}

function renderCartView() {
  const container = document.getElementById("cart-items-container");
  const subtotalElem = document.getElementById("summary-subtotal");
  const totalElem = document.getElementById("summary-total");
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<p style="text-align: center; color: #777; padding: 40px 0; grid-column: 1/-1;">Your cart is currently empty.</p>`;
    if (subtotalElem) subtotalElem.innerText = "₱0.00";
    if (totalElem) totalElem.innerText = "₱50.00";
    return;
  }

  container.innerHTML = "";
  let subtotal = 0;

  cart.forEach((item, index) => {
    let itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    container.innerHTML += `
      <div class="cart-item-card">
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-price">₱${item.price.toFixed(2)}</div>
          <div class="qty-controls">
            <button class="qty-btn" onclick="changeQuantity(${index}, -1)">-</button>
            <span style="font-size: 12px; font-weight: bold;">${item.quantity}</span>
            <button class="qty-btn" onclick="changeQuantity(${index}, 1)">+</button>
          </div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 13px; font-weight: bold; margin-bottom: 10px;">₱${itemTotal.toFixed(2)}</div>
          <button onclick="changeQuantity(${index}, -${item.quantity})" style="background: none; border: none; color: #ff4757; font-size: 11px; cursor: pointer;">Remove</button>
        </div>
      </div>
    `;
  });

  let shipping = 50.00;
  if (subtotalElem) subtotalElem.innerText = `₱${subtotal.toFixed(2)}`;
  if (totalElem) totalElem.innerText = `₱${(subtotal + shipping).toFixed(2)}`;
}

function renderOrders() {
  const toShipContainer = document.getElementById("toship-items-container");
  const toReceiveContainer = document.getElementById("toreceive-items-container");
  const countToShip = document.getElementById("count-toship");
  const countToReceive = document.getElementById("count-toreceive");

  if (countToShip) countToShip.innerText = toShipOrders.length;
  if (countToReceive) countToReceive.innerText = toReceiveOrders.length;

  if (toShipContainer) {
    if (toShipOrders.length === 0) {
      toShipContainer.innerHTML = `<p style="text-align: center; color: #777; padding: 40px 0;">No pending items to ship.</p>`;
    } else {
      toShipContainer.innerHTML = "";
      toShipOrders.forEach((order, index) => {
        let itemsHtml = order.items.map(item => `
          <div class="order-row-item">
            <img src="${item.image}" alt="${item.title}">
            <div style="flex:1;">
              <strong>${item.title}</strong>
              <div style="color: #666;">Qty: ${item.quantity} × ₱${item.price.toFixed(2)}</div>
            </div>
            <div><strong>₱${(item.price * item.quantity).toFixed(2)}</strong></div>
          </div>
        `).join("");

        toShipContainer.innerHTML += `
          <div class="order-box">
            <div class="order-header">
              <span><strong>Order #${order.id}</strong> • Placed on ${order.date}</span>
              <span class="order-status-badge">Seller Preparing Parcel</span>
            </div>
            <div class="order-items-grid">
              ${itemsHtml}
            </div>
            <div class="order-footer">
              <span>Payment: <strong>${order.payment}</strong></span>
              <div style="display: flex; gap: 12px; align-items: center;">
                <span>Total: <strong>${order.total}</strong></span>
                <button class="order-action-btn" onclick="simulateShipment(${index})">Mark as Shipped</button>
              </div>
            </div>
          </div>
        `;
      });
    }
  }

  if (toReceiveContainer) {
    if (toReceiveOrders.length === 0) {
      toReceiveContainer.innerHTML = `<p style="text-align: center; color: #777; padding: 40px 0;">No parcels currently on the way.</p>`;
    } else {
      toReceiveContainer.innerHTML = "";
      toReceiveOrders.forEach((order, index) => {
        let itemsHtml = order.items.map(item => `
          <div class="order-row-item">
            <img src="${item.image}" alt="${item.title}">
            <div style="flex:1;">
              <strong>${item.title}</strong>
              <div style="color: #666;">Qty: ${item.quantity} × ₱${item.price.toFixed(2)}</div>
            </div>
            <div><strong>₱${(item.price * item.quantity).toFixed(2)}</strong></div>
          </div>
        `).join("");

        toReceiveContainer.innerHTML += `
          <div class="order-box">
            <div class="order-header">
              <span><strong>Order #${order.id}</strong> • Parcel in Transit</span>
              <span class="order-status-badge" style="background:#e3f2fd; color:#1565c0;">Out for Delivery</span>
            </div>
            <div class="order-items-grid">
              ${itemsHtml}
            </div>
            <div class="order-footer">
              <span>Payment: <strong>${order.payment}</strong></span>
              <div style="display: flex; gap: 12px; align-items: center;">
                <span>Total: <strong>${order.total}</strong></span>
                <button class="order-action-btn" style="background:#2e7d32;" onclick="confirmOrderReceived(${index})">Order Received</button>
              </div>
            </div>
          </div>
        `;
      });
    }
  }
}

function simulateShipment(index) {
  const shipped = toShipOrders.splice(index, 1)[0];
  toReceiveOrders.push(shipped);
  saveOrders();
  renderOrders();
  switchCartSubTab('toreceive');
}

function confirmOrderReceived(index) {
  toReceiveOrders.splice(index, 1);
  saveOrders();
  renderOrders();
  alert("Thank you! Parcel receipt confirmed. Hope your pet loves it!");
}

function isValidGmail(email) {
  return /^[a-zA-Z0-9._%+-]+@gmail\.com$/i.test(email.trim());
}

document.addEventListener("DOMContentLoaded", function() {

  loadUserData();
  updateCartBadge();
  renderOrders();

  const welcomeMsg = document.getElementById("welcome-msg");
  const authModal = document.getElementById("auth-modal");
  const closeAuth = document.getElementById("close-auth");
  const authForm = document.getElementById("auth-form");
  const authNameInput = document.getElementById("auth-name");
  const authEmailInput = document.getElementById("auth-email");
  const authPasswordInput = document.getElementById("auth-password");
  const authSubmitBtn = document.getElementById("auth-submit-btn");
  const authStatus = document.getElementById("auth-status");

  const tabBtnSignup = document.getElementById("tab-btn-signup");
  const tabBtnLogin = document.getElementById("tab-btn-login");

  const headerLoginBtn = document.getElementById("header-login-btn");
  const headerSignupBtn = document.getElementById("header-signup-btn");
  const homeLoginBtn = document.getElementById("home-login-btn");
  const getStartedBtn = document.getElementById("get-started-btn");
  const accountBtn = document.getElementById("account-btn");

  const profileDropdown = document.getElementById("profile-dropdown");
  const profileAvatarChar = document.getElementById("profile-avatar-char");
  const profileDisplayName = document.getElementById("profile-display-name");
  const profileDisplayEmail = document.getElementById("profile-display-email");
  const profileLogoutBtn = document.getElementById("profile-logout-btn");
  const profileDeleteBtn = document.getElementById("profile-delete-btn");

  let currentAuthMode = "signup";

  function refreshAccountUI() {
    const savedName = localStorage.getItem("petOraUsername");
    const savedEmail = localStorage.getItem("petOraEmail");

    if (savedName && welcomeMsg) {
      welcomeMsg.innerHTML = "Welcome back to PetOra, <strong>" + savedName + "</strong>!";
      if (headerLoginBtn) headerLoginBtn.style.display = "none";
      if (headerSignupBtn) headerSignupBtn.style.display = "none";
      if (profileDisplayName) profileDisplayName.innerText = savedName;
      if (profileDisplayEmail) profileDisplayEmail.innerText = savedEmail || "";
      if (profileAvatarChar) profileAvatarChar.innerText = savedName.charAt(0).toUpperCase();
    } else {
      if (welcomeMsg) welcomeMsg.innerHTML = "Your one-stop sanctuary for pet essentials.";
      if (headerLoginBtn) headerLoginBtn.style.display = "inline-block";
      if (headerSignupBtn) headerSignupBtn.style.display = "inline-block";
      if (profileDisplayName) profileDisplayName.innerText = "Guest User";
      if (profileDisplayEmail) profileDisplayEmail.innerText = "Not signed in";
      if (profileAvatarChar) profileAvatarChar.innerText = "G";
    }
  }
  refreshAccountUI();

  if (accountBtn && profileDropdown) {
    accountBtn.onclick = function(e) {
      e.stopPropagation();
      const isLoggedIn = !!localStorage.getItem("petOraUsername");
      if (!isLoggedIn) {
        openAuthModal("login");
      } else {
        profileDropdown.classList.toggle("open");
      }
    };
  }

  document.addEventListener("click", function(e) {
    if (profileDropdown && !profileDropdown.contains(e.target) && e.target !== accountBtn) {
      profileDropdown.classList.remove("open");
    }
  });

  if (profileLogoutBtn) {
    profileLogoutBtn.onclick = function() {
      localStorage.removeItem("petOraUsername");
      localStorage.removeItem("petOraEmail");
      if (profileDropdown) profileDropdown.classList.remove("open");

      loadUserData();
      updateCartBadge();
      renderCartView();
      renderOrders();
      refreshAccountUI();
      alert("You have been logged out.");
    };
  }

  if (profileDeleteBtn) {
    profileDeleteBtn.onclick = function() {
      const confirmed = confirm("Are you sure you want to delete your account? All cart items and order histories will be permanently removed.");
      if (confirmed) {
        const email = (localStorage.getItem("petOraEmail") || "").toLowerCase();
        localStorage.removeItem(getUserKey("petOraCart"));
        localStorage.removeItem(getUserKey("petOraToShip"));
        localStorage.removeItem(getUserKey("petOraToReceive"));
        localStorage.removeItem(`petOraPwd_${email}`);
        localStorage.removeItem(`petOraName_${email}`);
        localStorage.removeItem("petOraUsername");
        localStorage.removeItem("petOraEmail");

        if (profileDropdown) profileDropdown.classList.remove("open");

        loadUserData();
        updateCartBadge();
        renderCartView();
        renderOrders();
        refreshAccountUI();
        alert("Account and associated data deleted successfully.");
      }
    };
  }

  function setAuthMode(mode) {
    currentAuthMode = mode;
    authStatus.innerText = "";
    if (authPasswordInput) authPasswordInput.value = "";
    if (mode === "login") {
      tabBtnLogin.classList.add("active");
      tabBtnSignup.classList.remove("active");
      authNameInput.style.display = "none";
      authNameInput.required = false;
      authSubmitBtn.innerText = "Log In";
    } else {
      tabBtnSignup.classList.add("active");
      tabBtnLogin.classList.remove("active");
      authNameInput.style.display = "block";
      authNameInput.required = true;
      authSubmitBtn.innerText = "Sign Up";
    }
  }

  function openAuthModal(mode) {
    setAuthMode(mode);
    if (authModal) authModal.style.display = "flex";
  }

  if (tabBtnSignup) tabBtnSignup.onclick = () => setAuthMode("signup");
  if (tabBtnLogin) tabBtnLogin.onclick = () => setAuthMode("login");

  if (headerSignupBtn) headerSignupBtn.onclick = () => openAuthModal("signup");
  if (headerLoginBtn) headerLoginBtn.onclick = () => openAuthModal("login");
  if (getStartedBtn) getStartedBtn.onclick = () => openAuthModal("signup");
  if (homeLoginBtn) homeLoginBtn.onclick = () => openAuthModal("login");

  if (closeAuth) {
    closeAuth.onclick = function() {
      authModal.style.display = "none";
    };
  }

  if (authForm) {
    authForm.onsubmit = function(e) {
      e.preventDefault();
      const nameVal = authNameInput.value.trim();
      const emailVal = authEmailInput.value.trim().toLowerCase();
      const passwordVal = authPasswordInput.value.trim();

      if (!isValidGmail(emailVal)) {
        authStatus.innerText = "Please enter a valid Gmail address (ending in @gmail.com).";
        authStatus.style.color = "red";
        return;
      }

      if (passwordVal.length < 6) {
        authStatus.innerText = "Password must be at least 6 characters long.";
        authStatus.style.color = "red";
        return;
      }

      if (currentAuthMode === "signup") {
        if (nameVal === "") {
          authStatus.innerText = "Please enter your full name.";
          authStatus.style.color = "red";
          return;
        }

        const existingStoredPassword = localStorage.getItem(`petOraPwd_${emailVal}`);
        if (existingStoredPassword) {
          authStatus.innerText = "An account with this email already exists. Please log in.";
          authStatus.style.color = "red";
          return;
        }

        localStorage.setItem(`petOraPwd_${emailVal}`, passwordVal);
        localStorage.setItem(`petOraName_${emailVal}`, nameVal);
        localStorage.setItem("petOraUsername", nameVal);
        localStorage.setItem("petOraEmail", emailVal);

        authStatus.innerText = "Sign up successful! Welcome to PetOra.";
        authStatus.style.color = "green";
      } else {
        const storedPassword = localStorage.getItem(`petOraPwd_${emailVal}`);
        const storedName = localStorage.getItem(`petOraName_${emailVal}`) || emailVal.split("@")[0];

        if (!storedPassword) {
          authStatus.innerText = "No account found with this email. Please sign up first.";
          authStatus.style.color = "red";
          return;
        }

        if (storedPassword !== passwordVal) {
          authStatus.innerText = "Incorrect password. Please try again.";
          authStatus.style.color = "red";
          return;
        }

        localStorage.setItem("petOraUsername", storedName);
        localStorage.setItem("petOraEmail", emailVal);
        authStatus.innerText = `Welcome back, ${storedName}!`;
        authStatus.style.color = "green";
      }

      loadUserData();
      updateCartBadge();
      renderCartView();
      renderOrders();
      refreshAccountUI();

      setTimeout(() => {
        authModal.style.display = "none";
        authStatus.innerText = "";
        authForm.reset();
      }, 1300);
    };
  }

  const closePreviewBtn = document.getElementById("close-preview-btn");
  const previewModal = document.getElementById("product-preview-modal");
  if (closePreviewBtn) closePreviewBtn.onclick = closeProductPreview;
  if (previewModal) {
    previewModal.onclick = function(e) {
      if (e.target === previewModal) closeProductPreview();
    };
  }

  const cartIconBtn = document.getElementById("cart-icon-btn");
  if (cartIconBtn) {
    cartIconBtn.onclick = function() {
      switchTab('cart');
    };
  }

  const proceedCheckoutBtn = document.getElementById("proceed-checkout-btn");
  if (proceedCheckoutBtn) {
    proceedCheckoutBtn.onclick = function() {
      if (cart.length === 0) {
        alert("Your cart is empty. Add products before checking out!");
        return;
      }

      const selectedPayment = document.querySelector('input[name="payment_method"]:checked')?.value || "Cash on Delivery (COD)";
      const totalElem = document.getElementById("summary-total");
      const totalAmount = totalElem ? totalElem.innerText : "₱0.00";

      const newOrder = {
        id: Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString(),
        items: [...cart],
        payment: selectedPayment,
        total: totalAmount
      };

      toShipOrders.push(newOrder);
      saveOrders();

      cart = [];
      saveCart();
      updateCartBadge();
      renderCartView();
      renderOrders();

      alert(
        `Order Placed Successfully!\n\n` +
        `Order ID: #${newOrder.id}\n` +
        `Payment Method: ${selectedPayment}\n` +
        `Total Amount: ${totalAmount}\n\n` +
        `Your items have been moved to 'To Ship'.`
      );

      switchCartSubTab('toship');
    };
  }

  const mainProductCard = document.getElementById("main-product-card");
  const mainProductImg = document.getElementById("main-product-img");

  if (mainProductCard && mainProductImg) {
    const originalImgSrc = "CATFO.PNG";
    mainProductCard.onmouseover = function() {
      mainProductCard.classList.add("card-highlight");
    };
    mainProductCard.onmouseout = function() {
      mainProductCard.classList.remove("card-highlight");
    };
  }

  const newsletterForm = document.getElementById("newsletter-form");
  const emailInput = document.getElementById("email-input");
  const formMsg = document.getElementById("form-msg");

  if (newsletterForm && emailInput && formMsg) {
    newsletterForm.onsubmit = function(event) {
      event.preventDefault();
      let emailValue = emailInput.value.trim();

      if (!isValidGmail(emailValue)) {
        formMsg.innerHTML = "Please enter a valid Gmail address (ending in @gmail.com).";
        formMsg.style.color = "red";
      } else {
        formMsg.innerHTML = "Successfully subscribed to PetOra!";
        formMsg.style.color = "green";
        emailInput.value = "";
      }
    };
  }

  function renderGrid(targetContainerId, selectedCat, searchVal) {
    const container = document.getElementById(targetContainerId);
    if (!container) return;

    container.innerHTML = "";
    let filtered = productsCatalog.filter(product => {
      const matchesCategory = selectedCat === "All" || product.category === selectedCat;
      const matchesSearch = !searchVal || product.title.toLowerCase().includes(searchVal.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchVal.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #777; padding: 40px 0;">No products found.</p>`;
      return;
    }

    filtered.forEach(product => {
      const cardHtml = `
        <div class="product-card" onclick="openProductPreview(${product.id})">
          <img src="${product.image}" alt="${product.title}">
          <span class="product-tag">${product.category}</span>
          <h3>${product.title}</h3>
          <p>${product.description}</p>
          <div class="product-bottom" onclick="event.stopPropagation()">
            <span class="product-price">₱${product.price.toFixed(2)}</span>
            <div class="card-actions">
              <button class="quick-view-btn" onclick="openProductPreview(${product.id})">Quick Look</button>
              <button class="add-cart-btn" onclick="addToCart('${product.title.replace(/'/g, "\\'")}', ${product.price})">Add</button>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += cardHtml;
    });
  }

  renderGrid("product-grid", "All", "");
  renderGrid("category-grid", "All", "");

  const searchInput = document.getElementById("search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function(e) {
      renderGrid("product-grid", "All", e.target.value);
    });
  }

  let currentCategory = "All";
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", function() {
      filterBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      currentCategory = this.getAttribute("data-category");
      renderGrid("category-grid", currentCategory, "");
    });
  });

});
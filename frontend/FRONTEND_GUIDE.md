# Frontend Documentation

## Architecture Overview

The MediShop frontend is built with React and uses modern state management patterns with Context API. The app follows a component-based architecture with clear separation of concerns.

## Project Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page-level components
├── context/          # React Context for state management
├── utils/            # Helper functions and API calls
├── App.js            # Main app component
├── index.js          # Entry point
└── index.css         # Global styles
```

## Components

### Navbar.js
**Purpose:** Navigation bar with user menu and cart

**Features:**
- Sticky positioning
- User authentication menu
- Cart icon with item count
- Mobile responsive with hamburger menu
- Admin dashboard link for admin users

**Props:** None (uses Context)

**State:**
- `menuOpen` - Boolean for mobile menu toggle

---

### Footer.js
**Purpose:** Footer with company info and links

**Features:**
- About section
- Quick links
- Trust badges
- Contact information
- Social media links

**Props:** None

---

### MedicineCard.js
**Purpose:** Reusable card component for displaying medicines

**Props:**
- `medicine` - Object containing medicine data
- `onAddToCart` - Callback function when adding to cart

**Features:**
- Medicine image
- Category badge
- Name and dosage
- Star rating
- Price and stock display
- Add to cart button
- Stock status indicator

---

### Toast.js
**Purpose:** Notification component for user feedback

**Props:**
- `message` - String message to display
- `type` - 'success' | 'error' | 'warning' | 'info'
- `onClose` - Callback when toast closes

**Features:**
- Auto-dismiss after 3 seconds
- Animated appearance
- Color coding based on type
- Fixed position

---

## Pages

### HomePage.js
**Route:** `/`

**Features:**
- Hero section with CTA
- Trust badges
- Category browsing
- Featured medicines carousel
- Call to action section

**State:**
- `medicines` - Array of featured medicines
- `loading` - Loading state
- `toast` - Toast notification state

---

### MedicinesPage.js
**Route:** `/medicines`

**Features:**
- Advanced search and filtering
- Category filtering
- Price range filtering
- Pagination
- Loading skeletons
- Grid/list display
- Add to cart functionality

**State:**
- `medicines` - Array of medicines
- `loading` - Loading state
- `search` - Search query
- `selectedCategory` - Current category filter
- `minPrice`, `maxPrice` - Price filters
- `currentPage` - Current page number
- `totalPages` - Total number of pages
- `toast` - Toast notification

**URL Parameters:**
- `category` - Pre-filter by category

---

### CartPage.js
**Route:** `/cart`

**Features:**
- Display all cart items
- Edit quantity
- Remove items
- Clear cart
- Order summary with tax
- Checkout button
- Empty cart state

**Uses Context:**
- `CartContext` - Cart operations

---

### CheckoutPage.js
**Route:** `/checkout` (Protected)

**Features:**
- Shipping address form
- Order summary
- Trust badges
- Order placement
- Validation

**Form Fields:**
- Street address
- City
- Postal code
- Country
- Phone number

**Uses Context:**
- `CartContext` - Cart data
- `AuthContext` - User authentication

---

### LoginPage.js
**Route:** `/login`

**Features:**
- Email and password inputs
- Password visibility toggle
- Demo credentials display
- Form validation
- Loading state
- Signup link

**Form Fields:**
- Email
- Password

**Uses Context:**
- `AuthContext` - Login function

---

### SignupPage.js
**Route:** `/signup`

**Features:**
- Full name input
- Email input
- Password input with confirmation
- Password visibility toggles
- Form validation
- Login link

**Form Fields:**
- Name
- Email
- Password
- Confirm Password

**Uses Context:**
- `AuthContext` - Register function

---

### OrdersPage.js
**Route:** `/orders` (Protected)

**Features:**
- Display all user orders
- Order status badges
- Order details with medicines
- Shipping address display
- Order date and total price
- Loading and empty states

**State:**
- `orders` - Array of orders
- `loading` - Loading state
- `toast` - Toast notification

---

## Context API

### AuthContext.js

**State:**
- `user` - Current logged-in user object
- `loading` - Initial auth check loading state
- `token` - JWT token from localStorage

**Methods:**
- `register(name, email, password, confirmPassword)` - Register new user
- `login(email, password)` - Login user
- `logout()` - Logout user
- `getMe()` - Fetch current user

**Provider:** `AuthProvider` - Wraps entire app

---

### CartContext.js

**State:**
- `cart` - Array of items in cart

**Methods:**
- `addToCart(medicine, quantity)` - Add medicine to cart
- `removeFromCart(medicineId)` - Remove medicine from cart
- `updateQuantity(medicineId, quantity)` - Update item quantity
- `clearCart()` - Remove all items from cart
- `getTotalPrice()` - Calculate total cart price

**Features:**
- Persists to localStorage
- Prevents duplicate items
- Auto-removes when quantity is 0

**Provider:** `CartProvider` - Wraps entire app

---

## Utils

### api.js

**Axios Instance:**
- Base URL: `process.env.REACT_APP_API_URL`
- Content-Type: application/json
- Auto-adds JWT token to headers

**API Endpoints:**

```javascript
// Auth
authAPI.register(data)
authAPI.login(data)
authAPI.getMe()

// Medicines
medicinesAPI.getAll(params)
medicinesAPI.getById(id)
medicinesAPI.create(data)
medicinesAPI.update(id, data)
medicinesAPI.delete(id)
medicinesAPI.getCategories()

// Orders
ordersAPI.create(data)
ordersAPI.getAll()
ordersAPI.getById(id)
ordersAPI.getAllAdmin()
ordersAPI.updateStatus(id, data)
```

---

## Styling

### Tailwind CSS
- Custom green color scheme (#10b981)
- Mobile-first responsive design
- Utility-first approach

### Theme Colors
- Primary: `#10b981` (Green)
- Secondary: `#059669` (Dark Green)
- Success: `#10b981`
- Error: `#ef4444` (Red)
- Warning: `#f59e0b` (Amber)

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

---

## Routing

**React Router v6 Configuration:**

```
/                    - Home page (public)
/medicines          - Medicine listing (public)
/medicines/:id      - Medicine detail (public)
/cart               - Shopping cart (public)
/checkout           - Checkout (protected)
/login              - Login (public)
/signup             - Sign up (public)
/orders             - User orders (protected)
/profile            - User profile (coming soon)
/admin              - Admin dashboard (protected, admin only)
```

**Protected Routes:**
- `/checkout`
- `/orders`
- `/admin`

---

## State Management Flow

```
AuthProvider (Global Auth State)
└─ AuthContext
   ├─ user
   ├─ token
   ├─ register()
   ├─ login()
   └─ logout()

CartProvider (Global Cart State)
└─ CartContext
   ├─ cart
   ├─ addToCart()
   ├─ removeFromCart()
   ├─ updateQuantity()
   ├─ clearCart()
   └─ getTotalPrice()
```

---

## Data Flow

### User Registration Flow
1. User fills SignupPage form
2. Submit triggers `register()` from AuthContext
3. API call to `/auth/register`
4. Token stored in localStorage
5. User state updated
6. Redirect to home page

### Shopping Flow
1. User browses medicines on MedicinesPage
2. Clicks "Add to Cart"
3. Item added to CartContext
4. Cart persisted to localStorage
5. Cart icon shows item count
6. Navigate to CartPage
7. Review and checkout

### Order Flow
1. User clicks "Proceed to Checkout"
2. Check if logged in (redirect to login if not)
3. Fill shipping address on CheckoutPage
4. Submit order
5. API call to `/orders`
6. Stock decremented in database
7. Redirect to OrdersPage
8. View order status

---

## Error Handling

**Toast Notifications:**
- Success: Green background
- Error: Red background
- Warning: Yellow background
- Info: Blue background

**API Error Handling:**
- All API calls wrapped in try-catch
- Error response displayed in toast
- User-friendly error messages

---

## Performance Optimizations

1. **Code Splitting:** React.lazy for pages (optional)
2. **Loading Skeletons:** While fetching medicines
3. **Debouncing:** Search input (can be added)
4. **Image Lazy Loading:** On MedicineCard
5. **Context Optimization:** Only necessary values exposed
6. **Memoization:** useCallback for event handlers

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## Accessibility

- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- Focus indicators on buttons
- Alt text for images

---

## Environment Variables

```
REACT_APP_API_URL=http://localhost:5000/api
```

---

## Common Issues & Solutions

### Issue: API calls fail with 401
**Solution:** Token expired or invalid. Logout and login again.

### Issue: Cart not persisting
**Solution:** Check if localStorage is enabled in browser.

### Issue: Images not loading
**Solution:** Verify image URLs are accessible and CORS is configured.

### Issue: Styles not applying
**Solution:** Run `npm install tailwindcss` and rebuild.

---

## Development Workflow

1. Create component in `components/` or `pages/`
2. Import necessary utilities and contexts
3. Use `useContext()` for state management
4. Add styling with Tailwind CSS
5. Add error handling with try-catch
6. Display feedback with Toast component
7. Test on mobile and desktop

---

## Future Enhancements

- [ ] Medicine detail page
- [ ] User profile page
- [ ] Admin dashboard
- [ ] Wishlist feature
- [ ] Product reviews
- [ ] Rating system
- [ ] Payment integration
- [ ] Email notifications
- [ ] Search suggestions
- [ ] Dark mode support

---

For more information, refer to the main README.md file.

# E-Commerce Functional Testing

## 1. Testing Approach

The objective is to validate the core customer journey of an e-commerce application, from product discovery through order completion, while covering positive scenarios, negative scenarios, error conditions, and important edge cases.

Testing should focus on:

- Business-critical customer journeys
- Revenue-impacting functionality
- Frequently used functionality
- Data integrity
- Error handling
- Boundary and edge conditions

---

## 2. Functional Areas and Test Scenarios

### 2.1 User Registration

| ID | Scenario | Type |
|---|---|---|
| REG-01 | Register with valid mandatory details | Positive |
| REG-02 | Register with an already registered email | Negative |
| REG-03 | Submit registration with mandatory fields missing | Negative |
| REG-04 | Enter an invalid email format | Negative |
| REG-05 | Verify password and confirm-password mismatch is rejected | Negative |
| REG-06 | Verify minimum and maximum field length boundaries | Edge |
| REG-07 | Verify leading/trailing spaces are handled correctly | Edge |

### 2.2 Login and Authentication

| ID | Scenario | Type |
|---|---|---|
| AUTH-01 | Login with valid credentials | Positive |
| AUTH-02 | Login with an invalid password | Negative |
| AUTH-03 | Login with an unregistered email | Negative |
| AUTH-04 | Submit login with missing credentials | Negative |
| AUTH-05 | Verify account lockout/rate limiting after repeated failures | Edge |
| AUTH-06 | Verify logout invalidates the authenticated session | Positive |
| AUTH-07 | Verify protected pages cannot be accessed after logout | Negative |

### 2.3 Product Search

| ID | Scenario | Type |
|---|---|---|
| SRCH-01 | Search using an exact product name | Positive |
| SRCH-02 | Search using a partial product name | Positive |
| SRCH-03 | Search using different letter casing | Positive |
| SRCH-04 | Search for a product that does not exist | Negative |
| SRCH-05 | Search with special characters | Edge |
| SRCH-06 | Search with leading/trailing spaces | Edge |
| SRCH-07 | Search with an empty search term | Edge |

### 2.4 Product Listing, Filtering and Sorting

| ID | Scenario | Type |
|---|---|---|
| PLP-01 | Filter products by category | Positive |
| PLP-02 | Apply multiple compatible filters | Positive |
| PLP-03 | Remove an applied filter | Positive |
| PLP-04 | Sort products by price | Positive |
| PLP-05 | Apply filters that produce no results | Edge |
| PLP-06 | Verify filter and sort combinations produce consistent results | Edge |
| PLP-07 | Verify pagination loads the correct products | Positive |

### 2.5 Product Details

| ID | Scenario | Type |
|---|---|---|
| PDP-01 | Open product details from search/listing results | Positive |
| PDP-02 | Verify product name, price and availability | Positive |
| PDP-03 | Select a valid product variant | Positive |
| PDP-04 | Attempt to continue without selecting a required variant | Negative |
| PDP-05 | Verify out-of-stock products cannot be purchased | Negative |
| PDP-06 | Verify minimum and maximum product quantity boundaries | Edge |

### 2.6 Shopping Cart

| ID | Scenario | Type |
|---|---|---|
| CART-01 | Add an available product to the cart | Positive |
| CART-02 | Add multiple different products | Positive |
| CART-03 | Increase/decrease product quantity | Positive |
| CART-04 | Remove a product from the cart | Positive |
| CART-05 | Attempt to add an unavailable product | Negative |
| CART-06 | Set quantity above available inventory | Negative |
| CART-07 | Verify cart subtotal is calculated correctly | Positive |
| CART-08 | Verify cart persists when navigating away and returning | Edge |
| CART-09 | Verify checkout cannot proceed with an empty cart | Negative |

### 2.7 Wishlist

| ID | Scenario | Type |
|---|---|---|
| WISH-01 | Add an available product to wishlist | Positive |
| WISH-02 | Remove a product from wishlist | Positive |
| WISH-03 | Attempt to add the same product twice | Edge |
| WISH-04 | Verify wishlist persists for an authenticated user | Positive |
| WISH-05 | Verify unauthenticated wishlist behavior | Negative |

### 2.8 Checkout

| ID | Scenario | Type |
|---|---|---|
| CHK-01 | Proceed to checkout with valid cart items | Positive |
| CHK-02 | Select an existing shipping address | Positive |
| CHK-03 | Add a new valid shipping address | Positive |
| CHK-04 | Submit checkout with missing mandatory address fields | Negative |
| CHK-05 | Enter invalid postal/phone/address data | Negative |
| CHK-06 | Select a supported shipping method | Positive |
| CHK-07 | Verify shipping charges are calculated correctly | Positive |
| CHK-08 | Verify taxes are calculated correctly | Positive |
| CHK-09 | Verify final order total is calculated correctly | Edge |

### 2.9 Promotions and Coupons

| ID | Scenario | Type |
|---|---|---|
| PROMO-01 | Apply a valid coupon | Positive |
| PROMO-02 | Apply an expired coupon | Negative |
| PROMO-03 | Apply an invalid coupon | Negative |
| PROMO-04 | Apply a coupon below its minimum order value | Negative |
| PROMO-05 | Verify discount is calculated correctly | Positive |
| PROMO-06 | Attempt to apply the same coupon multiple times | Edge |

### 2.10 Payment

| ID | Scenario | Type |
|---|---|---|
| PAY-01 | Complete payment using a valid supported payment method | Positive |
| PAY-02 | Verify successful payment creates an order | Positive |
| PAY-03 | Verify payment failure is handled correctly | Negative |
| PAY-04 | Verify declined payment does not create a successful order | Negative |
| PAY-05 | Verify cancellation during payment is handled correctly | Negative |
| PAY-06 | Verify duplicate submission does not create duplicate orders/charges | Edge |
| PAY-07 | Verify order total matches the checkout total | Edge |

### 2.11 Order Placement and Confirmation

| ID | Scenario | Type |
|---|---|---|
| ORD-01 | Place an order successfully | Positive |
| ORD-02 | Verify order confirmation is displayed | Positive |
| ORD-03 | Verify an order number is generated | Positive |
| ORD-04 | Verify ordered products and quantities are correct | Positive |
| ORD-05 | Verify shipping address is correct | Positive |
| ORD-06 | Verify order total is correct | Positive |
| ORD-07 | Verify failed payment does not create a completed order | Negative |

### 2.12 Order History, Cancellation and Refunds

| ID | Scenario | Type |
|---|---|---|
| OTH-01 | View previously placed orders | Positive |
| OTH-02 | Open order details | Positive |
| OTH-03 | Cancel an eligible order | Positive |
| OTH-04 | Attempt to cancel an order that is no longer cancellable | Negative |
| OTH-05 | Verify refund status after cancellation | Positive |
| OTH-06 | Verify refund amount follows applicable refund rules | Edge |

### 2.13 Inventory and Availability

| ID | Scenario | Type |
|---|---|---|
| INV-01 | Purchase a product that is in stock | Positive |
| INV-02 | Attempt to purchase an out-of-stock product | Negative |
| INV-03 | Attempt to purchase more units than available inventory | Negative |
| INV-04 | Verify stock is revalidated during checkout | Edge |
| INV-05 | Verify concurrent attempts to purchase the last available item are handled correctly | Edge |

---

## 3. Critical End-to-End Journeys

### E2E-01 — Customer Purchase

1. Login/register.
2. Search or browse for a product.
3. Open product details.
4. Select required variant.
5. Add product to cart.
6. Proceed to checkout.
7. Enter/select shipping address.
8. Select shipping method.
9. Select payment method.
10. Complete payment.
11. Verify order confirmation.
12. Verify order appears in order history.

### E2E-02 — Purchase with Promotion

1. Login.
2. Add an eligible product to cart.
3. Apply a valid coupon.
4. Verify discount.
5. Proceed to checkout.
6. Complete payment.
7. Verify the final order amount.

### E2E-03 — Failed Payment

1. Login.
2. Add an available product to cart.
3. Proceed to checkout.
4. Enter valid checkout information.
5. Use a payment method that results in failure.
6. Verify appropriate error handling.
7. Verify no completed order is created.
8. Verify the cart remains recoverable where applicable.

---

## 4. High-Risk Edge Cases

Particular attention should be given to:

- Product becoming out of stock between adding to cart and checkout.
- Price changing between product selection and checkout.
- Coupon becoming invalid or expiring during checkout.
- Multiple users attempting to purchase the last available item.
- Duplicate payment/order submission.
- Payment succeeding but the confirmation response being delayed.
- Browser refresh during checkout or payment.
- Session expiration during checkout.
- Network interruption during order placement.
- Rounding differences between tax, discount and final totals.
- Minimum/maximum quantity boundaries.
- Empty cart checkout attempts.

---

## 5. Test Data Considerations

Test data should cover:

- Registered and unregistered users.
- Valid and invalid credentials.
- In-stock and out-of-stock products.
- Products with different prices and variants.
- Valid, invalid, expired and restricted coupons.
- Valid and invalid shipping addresses.
- Successful and failed payment methods.
- Orders in different lifecycle states.

Test data should be isolated where possible to prevent one test from affecting another.

---

## 6. Automation Candidates

The following scenarios are strong candidates for automation because they are repeatable, business-critical and regression-prone:

1. Login
2. Product search
3. Product selection
4. Add/remove from cart
5. Cart quantity and price calculations
6. Checkout
7. Coupon application
8. Successful order placement
9. Payment failure handling
10. Order history
11. Critical API validations
12. Inventory validation

Exploratory, usability and highly visual scenarios should complement the automated suite rather than being automation-only activities.


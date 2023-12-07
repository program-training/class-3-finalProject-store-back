# finalProject-store-back

# Path

# users:

/users/register = user sign up
/users/login = user log in

# products:

/products/all/:categoryName? = get all products
/products/product/:productId = get product
/products/categories = get categories
/products/banners = get banners

# orders:

/orders/ = get order by user
/orders/order = post order

# carts:

/carts/getItems = get cart by user
/carts/addItem = add product to cart
/carts/deleteItem/:cartItemID = delete product from cart

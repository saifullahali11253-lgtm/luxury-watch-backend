import supabase from "../config/supabase.js";

export const placeOrder = async (req, res) => {
  try {
    const {
      user_id,
      customer_name,
      email,
      phone,
      address,
      city,
      postal_code,
      country,
      payment_method,
      total,
    } = req.body;

    // Create Order
    const estimatedDelivery = new Date();
    estimatedDelivery.setDate(estimatedDelivery.getDate() + 5);

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          customer_name,
          email,
          phone,
          address,
          city,
          postal_code,
          country,
          payment_method,
          total,

          user_id: req.body.user_id,

          status: "Processing",

          tracking_number: `TLX-${Date.now()}`,

          estimated_delivery:
            estimatedDelivery.toISOString().split("T")[0],
        },
      ])
      .select()
      .single();

    if (orderError) {
      return res.status(500).json(orderError);
    }

    // Get Cart Items
    const { data: cartItems, error: cartError } = await supabase
      .from("cart")
      .select(`
        product_id,
        quantity,
        products (
          price
        )
      `)
      .eq("user_id", req.body.user_id);

    if (cartError) {
      return res.status(500).json(cartError);
    }

    // Prepare Order Items
    const items = cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.products.price,
    }));

    // Save Order Items
    const { error: itemError } = await supabase
      .from("order_items")
      .insert(items);

    if (itemError) {
      return res.status(500).json(itemError);
    }

    // Empty Cart
    await supabase
      .from("cart")
      .delete()
      .eq("user_id", req.body.user_id);

    res.json(order);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (
          quantity,
          price,
          product_id,
          products (
            id,
            name,
            image
          )
        )
      `)
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json(error);
    }

    console.log("Orders Found:", data);

    res.json(data);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ===============================
// Get All Orders (Admin)
// ===============================
export const getAllOrders = async (req, res) => {
  try {

    const { data, error } = await supabase
      .from("orders")
      .select(`
        *,
        order_items (
          quantity,
          price,
          product_id,
          products (
            id,
            name,
            image
          )
        )
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return res.status(500).json(error);
    }

    res.json(data);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// ===============================
// Update Order (Admin)
// ===============================
export const updateOrder = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      status,
      tracking_number,
      estimated_delivery,
    } = req.body;

    const updateData = {
      status,
      tracking_number,
      estimated_delivery,
    };

    // Save delivery time automatically
    if (status === "Delivered") {
      updateData.delivered_at = new Date().toISOString();
    }

    const { data, error } = await supabase
      .from("orders")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.log(error);
      return res.status(500).json(error);
    }

    res.json(data);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
};


// ===============================
// Delete Order (Admin)
// ===============================
export const deleteOrder = async (req, res) => {
  try {

    const { id } = req.params;

    // Delete order items first
    await supabase
      .from("order_items")
      .delete()
      .eq("order_id", id);

    const { error } = await supabase
      .from("orders")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      return res.status(500).json(error);
    }

    res.json({
      message: "Order Deleted Successfully",
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
};
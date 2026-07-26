import supabase from "../config/supabase.js";

export const addToCart = async (req, res) => {
  console.log("=== ADD TO CART ===");
  console.log(req.body);

  try {
    const {
      product_id,
      product_name,
      user_id,
    } = req.body;

    // Check if product already exists
    const { data: existing } = await supabase
      .from("cart")
      .select("*")
      .eq("product_id", product_id)
      .eq("user_id", user_id)
      .single();

    if (existing) {
      const { data, error } = await supabase
        .from("cart")
        .update({
          quantity: existing.quantity + 1,
        })
        .eq("id", existing.id)
        .select();

      if (error) return res.status(500).json(error);

      return res.json(data);
    }

    // Insert new product
    const { data, error } = await supabase
      .from("cart")
      .insert([
        {
          product_id,
          product_name,
          user_id,
          quantity: 1,
        },
      ])
      .select();

    if (error) return res.status(500).json(error);

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const { user_id } = req.query;

    let query = supabase
      .from("cart")
      .select(`
        id,
        quantity,
        products (
          id,
          name,
          price,
          image
        )
      `);

    if (user_id) {
      query = query.eq("user_id", user_id);
    }

    const { data, error } = await query;

    if (error) {
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

export const increaseQuantity = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: cart } = await supabase
      .from("cart")
      .select("*")
      .eq("id", id)
      .single();

    const { data, error } = await supabase
      .from("cart")
      .update({
        quantity: cart.quantity + 1,
      })
      .eq("id", id)
      .select();

    if (error) return res.status(500).json(error);

    res.json(data);
  } catch (err) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const decreaseQuantity = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: cart } = await supabase
      .from("cart")
      .select("*")
      .eq("id", id)
      .single();

    if (cart.quantity <= 1) {
      return res.json(cart);
    }

    const { data, error } = await supabase
      .from("cart")
      .update({
        quantity: cart.quantity - 1,
      })
      .eq("id", id)
      .select();

    if (error) return res.status(500).json(error);

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("cart")
      .delete()
      .eq("id", id);

    if (error) {
      return res.status(500).json(error);
    }

    res.json({
      message: "Item removed successfully",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
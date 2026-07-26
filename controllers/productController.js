import supabase from "../config/supabase.js";

// ===============================
// Get All Products
// ===============================
export const getProducts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        brands (
          id,
          name
        ),
        categories (
          id,
          name
        )
      `)
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return res.status(500).json(error);
    }

    const products = data.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      image: product.image,
      featured: product.featured,
      created_at: product.created_at,

      brand_id: product.brand_id,
      category_id: product.category_id,

      brand: product.brands?.name || "",
      category: product.categories?.name || "",
    }));

    res.json(products);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ===============================
// Add Product
// ===============================
export const addProduct = async (req, res) => {
  try {

    console.log("========== ADD PRODUCT ==========");
    console.log("REQUEST BODY:");
    console.log(req.body);

    const {
      name,
      description,
      price,
      stock,
      image,
      brand_id,
      category_id,
    } = req.body;

console.log("INSERT OBJECT:");
console.log({
  name,
  description,
  price: Number(price),
  stock: Number(stock),
  image,
  brand_id: Number(brand_id),
  category_id: Number(category_id),
});

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          name,
          description,
          price: Number(price),
          stock: Number(stock),
          image,
          brand_id: Number(brand_id),
          category_id: Number(category_id),
        },
      ])
      .select()
      .single();

if (error) {
  console.log("========== INSERT FAILED ==========");
  console.log(error);

  return res.status(500).json({
    success: false,
    error,
  });
}

    console.log("PRODUCT INSERTED:");
    console.log(data);

    res.json(data);

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ===============================
// Update Product
// ===============================
export const updateProduct = async (req, res) => {
  try {

    const { id } = req.params;

    const {
      name,
      description,
      price,
      stock,
      image,
      brand_id,
      category_id,
    } = req.body;

    const { data, error } = await supabase
      .from("products")
      .update({
        name,
        description,
        price: Number(price),
        stock: Number(stock),
        image,
        brand_id: Number(brand_id),
        category_id: Number(category_id),
      })
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
// Delete Product
// ===============================
export const deleteProduct = async (req, res) => {
  try {

    const { id } = req.params;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      return res.status(500).json(error);
    }

    res.json({
      message: "Product Deleted Successfully",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Server Error",
    });
  }
};
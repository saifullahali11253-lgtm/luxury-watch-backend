import supabase from "../config/supabase.js";

export const getDashboard = async (req, res) => {
  try {

    // Total Products
    const { count: totalProducts } = await supabase
      .from("products")
      .select("*", { count: "exact", head: true });

    // Total Users
    const { count: totalUsers } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true });

    // Total Orders
    const { count: totalOrders } = await supabase
      .from("orders")
      .select("*", { count: "exact", head: true });

    // Revenue
    const { data: revenueData } = await supabase
      .from("orders")
      .select("total");

    const totalRevenue =
      revenueData?.reduce(
        (sum, order) => sum + Number(order.total),
        0
      ) || 0;

    // Recent Orders
    const { data: recentOrders } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    // Latest Users
    const { data: latestUsers } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);

    // Low Stock Products
    const { data: lowStock } = await supabase
      .from("products")
      .select("*")
      .lte("stock", 5);

    res.json({
      totalProducts,
      totalUsers,
      totalOrders,
      totalRevenue,
      recentOrders,
      latestUsers,
      lowStock,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
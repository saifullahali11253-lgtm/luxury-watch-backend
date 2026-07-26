import supabase from "../config/supabase.js";

export const getAnalytics = async (req, res) => {
  try {

    // ===========================
    // Total Revenue
    // ===========================

    const { data: revenueData } = await supabase
      .from("orders")
      .select("total");

    const totalRevenue =
      revenueData?.reduce(
        (sum, item) => sum + Number(item.total),
        0
      ) || 0;

    // ===========================
    // Total Orders
    // ===========================

    const { count: totalOrders } = await supabase
      .from("orders")
      .select("*", {
        count: "exact",
        head: true,
      });

    // ===========================
    // Processing Orders
    // ===========================

    const { count: processingOrders } = await supabase
      .from("orders")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "Processing");

    // ===========================
    // Delivered Orders
    // ===========================

    const { count: deliveredOrders } = await supabase
      .from("orders")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "Delivered");

    // ===========================
    // Cancelled Orders
    // ===========================

    const { count: cancelledOrders } = await supabase
      .from("orders")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "Cancelled");

    // ===========================
    // Total Users
    // ===========================

    const { count: totalUsers } = await supabase
      .from("users")
      .select("*", {
        count: "exact",
        head: true,
      });

    // ===========================
    // Total Products
    // ===========================

    const { count: totalProducts } = await supabase
      .from("products")
      .select("*", {
        count: "exact",
        head: true,
      });

    // ===========================
    // Payment Methods
    // ===========================

    const { data: payments } = await supabase
      .from("orders")
      .select("payment_method");

    const paymentStats = {};

    payments?.forEach((item) => {

      if (!paymentStats[item.payment_method]) {
        paymentStats[item.payment_method] = 0;
      }

      paymentStats[item.payment_method]++;

    });

    // ===========================
    // Low Stock Products
    // ===========================

    const { data: lowStockProducts } = await supabase
      .from("products")
      .select("id,name,stock,image")
      .lte("stock", 5)
      .order("stock");

    res.json({

      totalRevenue,

      totalOrders,

      processingOrders,

      deliveredOrders,

      cancelledOrders,

      totalUsers,

      totalProducts,

      paymentStats,

      lowStockProducts,

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });

  }
};
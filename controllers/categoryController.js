import supabase from "../config/supabase.js";

export const getCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("*");

    console.log("CATEGORY DATA:", data);
    console.log("CATEGORY ERROR:", error);

    if (error) {
      return res.status(500).json(error);
    }

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
};
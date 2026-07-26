import supabase from "../config/supabase.js";

export const getBrands = async (req, res) => {
  try {
    console.log("Project URL:", process.env.SUPABASE_URL);

    const { data, error } = await supabase
      .from("brands")
      .select("*");

    console.log("DATA:", data);
    console.log("ERROR:", error);

    const { data: sqlData, error: sqlError } = await supabase.rpc(
      "version"
    );

    console.log("RPC:", sqlData);
    console.log("RPC ERROR:", sqlError);

    res.json(data);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
import supabase from "../config/supabase.js";

// ===============================
// Get All Users
// ===============================
export const getUsers = async (req, res) => {
  try {

    const { data, error } = await supabase
      .from("users")
      .select("*")
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
// Update User Role
// ===============================
export const updateUserRole = async (req, res) => {
  try {

    const { id } = req.params;
    const { role } = req.body;

    const { data, error } = await supabase
      .from("users")
      .update({
        role,
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
// Delete User
// ===============================
export const deleteUser = async (req, res) => {
  try {

    const { id } = req.params;

    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      return res.status(500).json(error);
    }

    res.json({
      message: "User Deleted Successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};
const { getAuth, clerkClient } = require("@clerk/express");
const User = require("../Models/User");

exports.syncUser = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);  
  
    const { userId } = getAuth(req);
    console.log("Clerk userId:", userId);

    if (!userId) {
      return res.status(400).json({ error: "No userId found in Clerk auth" });
    }

    const role = req.body?.role || "user";
    // Update Clerk metadata before anything else
    await clerkClient.users.updateUser(userId, {
      publicMetadata: { 
        role,
        setupComplete: true,       
      },
    });
    console.log("Role updated successfully") //

    const clerkUser = await clerkClient.users.getUser(userId);
    console.log("Clerk user object:", clerkUser);

    const email = clerkUser.emailAddresses?.[0]?.emailAddress;
    const username = clerkUser.username || email?.split("@")[0];
    //const role = req.body?.role || "user"; // Default to user if role not passed

    if (!email) {
      return res.status(400).json({ error: "Email not found in Clerk user" });
    }

    // check if user already exists in MongoDB > if not, create a new one 
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        clerkId: userId, 
        username,
        email,
        role,
        favourites: [],
      });
    }

    res.status(200).json({ message: "User synced successfully", user });
  } catch (err) {
    console.error("Sync user error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
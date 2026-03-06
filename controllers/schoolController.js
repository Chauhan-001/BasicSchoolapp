import db from "../config/db.js";

/* ADD SCHOOL */
export const addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query ="INSERT INTO schools (name,address,latitude,longitude) VALUES (?,?,?,?)";

  db.query(query, [name, address, latitude, longitude], (err, result) => {
    if (err) return res.status(500).json(err);

    res.json({
      message: "School added successfully",
      schoolId: result.insertId,
    });
  });
};

/* LIST SCHOOLS SORTED BY DISTANCE */

export const listSchools = (req, res) => {
  const { latitude, longitude } = req.query;

  if (!latitude || !longitude) {
    return res
      .status(400)
      .json({ message: "Latitude and longitude required" });
  }

  const query = "SELECT * FROM schools";

  db.query(query, (err, results) => {
    if (err) return res.status(500).json(err);

    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);

    const schools = results.map((school) => {
      const distance = Math.sqrt(
        Math.pow(userLat - school.latitude, 2) +
          Math.pow(userLon - school.longitude, 2)
      );

      return { ...school, distance };
    });

    schools.sort((a, b) => a.distance - b.distance);

    res.json(schools);
  });
};
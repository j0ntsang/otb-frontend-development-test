import { NextApiRequest, NextApiResponse } from "next";

import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city } = req.query;
  const apiKey = "cd8e598e87c24262b3831328210203";

  if (!city) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json`,
      {
        params: {
          key: apiKey,
          q: city,
          days: 5,
        },
      }
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching weather data" });
  }
}

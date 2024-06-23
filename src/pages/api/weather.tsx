import { NextApiRequest, NextApiResponse } from "next";
import { WEATHER_API_ENDPOINT, WEATHER_API_KEY } from "../../constants";

import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  try {
    const response = await axios.get(WEATHER_API_ENDPOINT, {
      params: {
        key: WEATHER_API_KEY,
        q: city,
        days: 4,
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching weather data" });
  }
}

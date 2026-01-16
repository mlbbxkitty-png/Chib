import Replicate from "replicate";

export const config = {
  api: { bodyParser: { sizeLimit: "10mb" } }
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN
    });

    const output = await replicate.run(
      "cjwbw/chibi-diffusion",
      {
        input: {
          image: req.body.image,
          prompt: "cute anime chibi style, big head, big eyes, pastel colors",
          strength: 0.65
        }
      }
    );

    res.status(200).json({ image: output[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

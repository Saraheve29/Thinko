export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const { from = "GBP", to = "USD", amount = "1" } = req.query;

  try {
    const r = await fetch(
      `https://api.frankfurter.app/latest?from=${from}&to=${to}&amount=${amount}`
    );
    if (!r.ok) throw new Error("Rate fetch failed");
    const data = await r.json();
    const rate = data.rates?.[to];
    if (rate == null) return res.status(404).json({ error: `No rate for ${from}→${to}` });
    return res.status(200).json({
      from, to, amount: parseFloat(amount),
      result: rate,
      rate: rate / parseFloat(amount),
      date: data.date,
    });
  } catch (e) {
    // Fallback: try fawazahmed0
    try {
      const r2 = await fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from.toLowerCase()}.json`
      );
      const d2 = await r2.json();
      const rate2 = d2[from.toLowerCase()]?.[to.toLowerCase()];
      if (rate2) {
        return res.status(200).json({
          from, to, amount: parseFloat(amount),
          result: rate2 * parseFloat(amount),
          rate: rate2,
          date: d2.date || "latest",
        });
      }
    } catch {}
    return res.status(500).json({ error: "Currency data unavailable" });
  }
}

export default async function handler(req, res) {
  const previousPage = req.headers.referer;

  // SE TIVER LIGADO O PREVIEW MODE: DESLIGA
  if (req.preview) {
    res.clearPreviewData();
    res.writeHead(307, { Location: previousPage });
    return res.end();
  }

  const password = "SENHASEGURA";
  if (req.query.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  // SE TIVER DESLIGADO O PREVIEW MODE: LIGA
  res.setPreviewData({});
  res.writeHead(307, { Location: previousPage });
  res.end();
}

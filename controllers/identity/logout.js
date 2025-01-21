module.exports = async (req, res) => {
  res.cookie(process.env.JWT_TOKEN_NAME, '', {
    domain: process.env.COOKIE_DOMAIN,
    httpOnly: true,
    maxAge: 0,
    secure: true,
    signed: true,
    sameSite: 'Lax',
  });

  return res.json({ message: 'Logout successful' });
};

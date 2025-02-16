module.exports = (err, req, res, next) => {
    console.error(err,"<<<<");
    res.status(500).json({ code: err.http_code,error: err?.message || 'Internal Server Error' });
  };
  
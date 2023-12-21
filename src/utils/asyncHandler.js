const asyncHandler = (callback) => async (req, res, next) => {
  try {
    return await callback(req, res, next);
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message || "req failed",
    });
  }
};

export { asyncHandler };

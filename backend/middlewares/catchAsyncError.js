export const catchAsyncError = (event) => {
  return (req, res, next) => {
    Promise.resolve(event(req, res, next)).catch(next);
  };
};

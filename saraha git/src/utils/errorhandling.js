export const asyncHandler = (API) => {
  return (req, res, next) => {
    API(req, res, next).catch((err) => {
      console.log(err)
      return next(new Error('Fail', { cause: 500 }))
    })
  }
}

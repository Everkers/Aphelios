const http = require("http").createServer()
const io = require("socket.io")(http)

const port = 3000
io.on("connection", (socket) => {
  console.log("connected")
  socket.on("message", (evt) => {
    socket.broadcast.emit("message", evt)
  })
})
io.on("disconnect", (evt) => {
  console.log("disconnected")
})
http.listen(port, () => console.log(`server listening on port: ${port}`))

const setupSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("Client mới kết nối:", socket.id);

        socket.on("disconnect", () => {
            console.log("Client ngắt kết nối:", socket.id);
        });
    });
};

module.exports = setupSocket;

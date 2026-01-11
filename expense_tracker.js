const http=require('http')
const {userRequest}=require("./userRequest")


const server=http.createServer(userRequest);

server.listen(3000,()=>{
  console.log("server running on 3000");
})
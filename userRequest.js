const fs=require("fs")


const userRequest=(req,res)=>{
if (req.url==="/"){
  res.setHeader("Content-Type","text/html");
  res.write(`<html><head><title>Expense tracker</title></head>
    <body><h2><center>EXPENSE TRACKER</center></h2>
    <ul>
    <li><a href="/add">Add</a></li>
    <li><a href="/delete">Delete</a></li>
    <li><a href="/view">View</a></li>
    </ul>
    </body></html>
    `);
    return res.end();
}else if (req.url==="/add"){
  
  res.setHeader("Content-Type","text/html");
  res.write(`<html>
    <body>
    <h4>Add</h4>
    <form action="/add-data" method="POST">
    Amount:<input type="number" name="amount"/>
    Category:<input type="text" name="category"/>
    Date:<input type="date" name="date"/>
    <button type="submit">Submit</button>
    </form>
    </body></html>
    `);
  return res.end();
}else if (req.url==="/add-data" && req.method==="POST"){
  const body=[];
  req.on("data",chunk=>{
    body.push(chunk);
  });
  req.on('end',()=>{
    const parsedBody=Buffer.concat(body).toString();
    const params=new URLSearchParams(parsedBody);
    const bodyObject=Object.fromEntries(params);
    const fileData=fs.readFileSync("expense.json","utf-8");
    const expenses=JSON.parse(fileData);
    bodyObject.id=Date.now();
    expenses.push(bodyObject);
    fs.writeFileSync("expense.json",JSON.stringify(expenses,null,2));
    res.statusCode=302
    res.setHeader("Location","/view")
     res.end();
  })
  
    
}else if (req.url==="/delete"){
  res.setHeader("Content-Type","text/html");
  res.write(`<html>
    <body>
    <h4>Delete</h4>
    <form action="/delete-id" method="POST">
    Enter id to be deleted:<input type="number" name="id" required/>
    <button type="Submit">Enter</button>
    </form>
    </body></html>
    `);
  return res.end();
  }else if(req.url==="/delete-id" && req.method=="POST"){
    const body=[];
    req.on("data",chunk=>{
      body.push(chunk);
    })
    req.on("end",()=>{
      const parsedBody=Buffer.concat(body).toString();
      const params=new URLSearchParams(parsedBody);
      const bodyObject=Object.fromEntries(params);
      // console.log(bodyObject);
      const idDelete=Number(bodyObject.id);
      const fileData=fs.readFileSync("expense.json","utf-8");
      const expenses=JSON.parse(fileData);
      const updatedExpenses=expenses.filter((exp)=>{
        return exp.id!==idDelete;
      })
      fs.writeFileSync("expense.json",JSON.stringify(updatedExpenses,null,2));
      res.statusCode=302;
      res.setHeader("Location","/view");
      res.end();
    })
    
}else if (req.url==="/view"){
  const data=fs.readFileSync("expense.json","utf-8");
  const expenses=JSON.parse(data);
  let expenseList="";
    for (const exp of expenses){
      expenseList+=`
      <h4>${exp.id}</h4><br>
      <h4>${exp.amount}</h4><br>
      <h4>${exp.category}</h4><br>
    <h4>${exp.date}</h4><br>
    `
    }
    res.setHeader("Content-Type","text/html");
    res.write(`<html>
    <body>
    ${expenseList}
    </body></html>
    `);
    
  
  
  return res.end();
}

}

exports.userRequest=userRequest;
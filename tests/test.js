fetch("http://localhost:3000/clicks")
  .then(res => res.json())
  .then(data => console.log(data));
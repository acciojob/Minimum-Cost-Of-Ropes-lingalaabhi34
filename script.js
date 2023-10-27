function calculateMinCost() {
  //your code here
  let text = document.getElementById("rope-lengths").value;
	if(!text){
		return ;
	}
  let textArr = text.split(",");
  let input = [];
  for(let i of textArr){
    input.push(parseInt(i));
  }
	input.sort((a,b)=>a-b);
	let ans = [];
	
	
	while(input.length!=1){
		let x = input.shift();
		let y =input.shift();
		
		ans.push(x+y);
		input.push(x+y);
		
		input.sort((a,b)=>a-b);
    
	}

	let total = 0;
	for(let i of ans){
		total += i;
	}
	

	document.getElementById("result").textContent = total ;
  
}  
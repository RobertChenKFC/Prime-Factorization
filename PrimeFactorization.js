let inputBox;
let errorDiv;
let resultDiv;

function setup() {
	inputBox = select("#input");
	errorDiv = select("#error");
	resultDiv = select("#result");
	
	MathJax.Hub.queue.Push(() => {
		resultDiv = MathJax.Hub.getAllJax("result")[0];
	});
	
	inputBox.input(() => {	
		try {
			let val = parseInt(inputBox.value());
			if(val < 0) throw "Negative values are not allowed";

			const factorization = new Array(val + 1).fill(0);
			if(val === 0 || val === 1) factorization[val] = 1;
			else {
				factorization[2] = 0;
				while(val % 2 === 0) {
					val /= 2;
					factorization[2]++;
				}
				const sqrtVal = sqrt(val) + 1;
				for(let i = 3; i < sqrtVal; i++) {
					while(val % i === 0) {
						val /= i;
						factorization[i]++;
					}
				}
				if(val !== 1) factorization[val] = 1;
			}

			let l = inputBox.value() + "=";				
			let first = true;
			for(let i = 0; i < factorization.length; i++) {
				if(factorization[i] !== 0) {
					if(!first) l += " \\times ";
					l += i.toString();
					if(factorization[i] !== 1) l += "^{" + factorization[i].toString() + "}"; 
					first = false;
				}
			}
			MathJax.Hub.queue.Push(["Text", resultDiv, l]);

			errorDiv.html("Nothing");
		}
		catch(e) {
			errorDiv.html(e);
		}
	});
}


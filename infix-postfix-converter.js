function isOperator(expression){
    switch(expression){
        case "+":
        case "-":
        case "*":
        case "/":
        case "^":
        case "(":
        case ")":
            return true;
        default:
            return false;

    }
}

function precedence(operator){
    switch(operator){
        case "(" :
        case ")":
            return 1;
        case "+":
        case "-":
            return 2;
        case "/":
        case "*":
            return 3;
        case "^":
            return 4;
        default:
            return 0;
    }

}

function compare(op1,op2){
    if(precedence(op1)>precedence(op2)){
        return 1;
    }else if(precedence(op1)<precedence(op2)){
        return -1;
    }else{
        return 0;
    }
}

function convert(infix){
    let operatorStack=new Array();
    let postfix="";
     for(let pos=0;pos<infix.length;pos++){
        let element=infix[pos]        
        if(!isOperator(element)){        
            postfix+=element;        
        }else if(element=="("){        
             operatorStack.push(element);            
        }else if(element==")"){            
            let stackElem=operatorStack.pop();
            while(stackElem!="("){               
                postfix+=stackElem;            
                stackElem=operatorStack.pop();
            }
        }else if(precedence(element)>precedence(operatorStack[operatorStack.length-1])){            
            operatorStack.push(element);            
        }else{              
            let stackElem=operatorStack[operatorStack.length-1];        
            while(precedence(element)<=precedence(stackElem) && operatorStack.length>0){
                stackElem=operatorStack.pop();
                postfix+=stackElem ; 
        }
        operatorStack.push(element);
    }

    }
    while(operatorStack.length>0){
        postfix+=operatorStack.pop();
    }
    return postfix;
}


var infix="A+(B-c)";
console.log(convert("A+B*C+D"));
console.log(convert("(A+B)*(C+D)"));
console.log(convert("A*B+C*D"));
console.log(convert("A+B+C+D"));
console.log(convert("A*B-(C+D)+E"));
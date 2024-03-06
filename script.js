//register

function register() {

    //1. fetch the values from the html 
    uname = reg_name.value;
    mail = reg_mail.value;
    pswd = reg_pswd.value;

    console.log(uname,mail,pswd);

    //2. create userDetails object
    userDetails = {
        uname,
        mail,
        pswd,
        balance:0
    }

    //3.check if acno is already present in localStorage
    if(uname =='' || mail =='' || pswd =='') {
        alert("Please fill missing fields");
    } else {
        if(uname in localStorage) {
            alert("User already registered");
        }
        //To set details in localStorage
        else {   
            localStorage.setItem(uname,JSON.stringify(userDetails));
            alert("Registration successful");
            //redirect to login page 
            window.location = './index.html';
        }
    }
 
}

//login

//on clicking 'Enter' after providing values to second input field it should trigger the button 

function triggerButton(event) {
    const button = document.getElementById('login');
    if(event.keyCode === 13 ) {  // 'Enter' key code is 13 
        button.click();
    }
        
}

function login() {
    //1. fetch details 
    uname = login_uname.value;
    //uname = login_name.value;
    pswd = login_pswd.value;

    //2. login
    if(uname in localStorage) {
        userDetails = JSON.parse(localStorage.getItem(uname));
        localStorage.setItem('username', userDetails.uname);
        if(pswd == userDetails.pswd) {
            console.log(userDetails.uname);
            alert("Login Successful");
            window.location = './home.html';
        } else  {
            alert("Incorrect Password");
        }
    }  else  {
        alert("Please enter valid details")
    }
}

// updating user part in welcome messsage
const username = localStorage.getItem('username');
var user1 = username;
const user = document.getElementById('user');
//console.log(user,username);
user.innerHTML = `<i class="fa fa-solid fa-user fa-sm fa-bounce"></i> Welcome ${user1}`;


//Adding income

//after loading details should be there 
userDetails = JSON.parse(localStorage.getItem(username));
if('incomeArray' in userDetails) {
    incomeArr = userDetails.incomeArray ;
    
    incomeArr.map(income => {
        // Step 1: Create a new ul element
        var ulElement = document.createElement('ul');                 
        // Step 2 (optional): Set attributes or add content to the ul element
        ulElement.setAttribute('class', 'myList'); 
        // Set a class attribute for the ul elem     
        ulElement.innerHTML = `<li class="fw-bold">${income.incomeTyp}</li>
        <li class="fw-bold ps-2">+${income.amount}</li>
        <li class="fw-bold ps-3">${income.balance}</li>
        <li class="fw-bold dateTime">${income.dateAndTime}</li>`                    
        // Step 3: Append the ul element to the div element
        var divElement = document.getElementById('income_details'); // Get the div element
        divElement.appendChild(ulElement); // Append the ul element to the div element
    });
    var result = document.getElementById('tot_bal_value');
    result.textContent = userDetails.balance;
}





function addIncome() {

    //1. fetch the values from the html 
    const incomeTyp = incomeType.value; // incomeType
    amount = Number(incomeAmount.value); //amount

    //current date and time 
    var currentDate = new Date();
    var currentDateTime = currentDate.toISOString();
    var newDateAndTime = currentDate.toLocaleString(); 
    var dateAndTime = newDateAndTime.replace(/,/g, ' '); // date and time 
    console.log(dateAndTime);

    console.log(incomeTyp,amount);

    //2. Check 
    if(username in localStorage) {
        console.log(username);
        userDetails = JSON.parse(localStorage.getItem(username));
        if(incomeType.value == '' || amount == '') {
            alert("Please enter valid details");
        } else {
            if(amount <= 0) {
                alert("Income must be greater than zero");
            } else {
                if(isNaN(amount)) {
                    alert("Amount should be a number")
                } else {
                console.log(userDetails);
                userDetails.balance += amount;
                balance = userDetails.balance; // balance stored,  
                console.log("balance is:-",balance);
                //3. create incomeDetails object */ 
            
                incomeDetails = {
                    incomeTyp,
                    amount,
                    balance,
                    dateAndTime
                };

                if('incomeArray' in userDetails) {
                    console.log("incomeArray already available");
                } else {
                    userDetails.incomeArray = [];
                }
                userDetails.incomeArray.push(incomeDetails);
                console.log(userDetails);

                localStorage.setItem(username,JSON.stringify(userDetails));

                //4. Displaying income details

                incomeArr = userDetails.incomeArray ;

                /*incomeArr.map(income => {
                    // Step 1: Create a new ul element
                    var ulElement = document.createElement('ul');
                
                    // Step 2 (optional): Set attributes or add content to the ul element
                    ulElement.setAttribute('class', 'myList'); // Set a class attribute for the ul element
    
                    ulElement.innerHTML = `<li class="fw-bold">${income.incomeTyp}</li>
                    <li class="fw-bold ps-2">+${income.amount}</li>
                    <li class="fw-bold ps-3">${income.balance}</li>
                    <li class="fw-bold dateTime">${income.dateAndTime}</li>`
                    
                    // Step 3: Append the ul element to the div element
                    var divElement = document.getElementById('income_details'); // Get the div element
                    divElement.appendChild(ulElement); // Append the ul element to the div element
                });*/

                // Step 1: Create a new ul element
                var ulElement = document.createElement('ul');
                
                // Step 2 (optional): Set attributes or add content to the ul element
                ulElement.setAttribute('class', 'myList'); // Set a class attribute for the ul element

                ulElement.innerHTML = `<li class="fw-bold">${incomeTyp}</li>
                <li class="fw-bold ps-2">+${amount}</li>
                <li class="fw-bold ps-3">${balance}</li>
                <li class="fw-bold dateTime">${dateAndTime}</li>`
                
                // Step 3: Append the ul element to the div element
                var divElement = document.getElementById('income_details'); // Get the div element
                divElement.appendChild(ulElement); // Append the ul element to the div element

                
                //5. Total Balance 

                var userDetails = JSON.parse(localStorage.getItem(username));
                var result = document.getElementById('tot_bal_value');
                result.textContent = userDetails.balance;

                alert("Amount added successfully!!");
                //hiding or clearing pie-chart 

                const pieContainer = document.getElementById('pieContainer');
                pieContainer.innerHTML = ``;

            }
            }
        }
        
    } else  {
        alert("Incorrect Username");
    }
}

//Add expense 

//after loading details should be there 
userDetails = JSON.parse(localStorage.getItem(username));
if('expenseArray' in userDetails) {
    expenseArr = userDetails.expenseArray ;
    console.log(expenseArr);
    
    expenseArr.map(expense => {
        // Step 1: Create a new ul element
        var ulElement = document.createElement('ul');                 
        // Step 2 (optional): Set attributes or add content to the ul element
        ulElement.setAttribute('class', 'myList1'); 
        // Set a class attribute for the ul elem     
        ulElement.innerHTML = `<li class="fw-bold">${expense.expenseTyp}</li>
        <li class="fw-bold ps-2">-${expense.amount}</li>
        <li class="fw-bold ps-3">${expense.balance}</li>
        <li class="fw-bold dateTime">${expense.dateAndTime}</li>`                    
        // Step 3: Append the ul element to the div element
        var divElement = document.getElementById('expense_details'); // Get the div element
        divElement.appendChild(ulElement); // Append the ul element to the div element
    });


    //5. total expense

    var userDetails = JSON.parse(localStorage.getItem(username));
    expenseArr = userDetails.expenseArray;
    totExp = expenseArr.reduce((acc,elm)=>acc + elm.amount ,0);
    
    
    var result = document.getElementById('tot_exp_value');
    result.textContent = totExp;
}


function addExpense() {

    //1. fetch the values from the html 
    expenseTyp = expenseType.value; // expenseType
    amount = Number(expenseAmount.value); //amount
    
    //current date and time 
    var currentDate = new Date();
    var currentDateTime = currentDate.toISOString();
    var newDateAndTime = currentDate.toLocaleString(); 
    var dateAndTime = newDateAndTime.replace(/,/g, ' '); // date and time 
    console.log(dateAndTime);
    
    console.log(expenseTyp,amount);
    
    //2. Check 
    if(username in localStorage) {
        userDetails = JSON.parse(localStorage.getItem(username));
        if(expenseType.value == '' || amount == '') {
            alert("Please enter valid details");
        } else {
            if(amount <= 0) {
                alert("Expense must be greater than zero and should be a number");
            } else {
                if(isNaN(amount)) {
                    alert("Income must be greater than zero");
                } else {

                if(userDetails.balance < amount) {
                    alert("Insufficient Balance");
                } else {
                    console.log(userDetails);
                    userDetails.balance -= amount;
                    balance = userDetails.balance; // balance stored
        
                    //3. create expenseDetails object */ 
                
                    expenseDetails = {
                        expenseTyp,
                        amount,
                        balance,
                        dateAndTime
                    };
        
                    if('expenseArray' in userDetails) {
                        console.log("expenseArray already available");
        
                    } else {
                        userDetails.expenseArray = [];
                        
                    }
                    userDetails.expenseArray.push(expenseDetails);
                    console.log(userDetails);
        
                    localStorage.setItem(username,JSON.stringify(userDetails));
    
                    //4. Displaying expense details
    
                    // Step 1: Create a new ul element
                    var ulElement = document.createElement('ul');
                    
                    // Step 2 (optional): Set attributes or add content to the ul element
                    ulElement.setAttribute('class', 'myList1'); // Set a class attribute for the ul element
    
                    ulElement.innerHTML = `<li class="fw-bold">${expenseTyp}</li>
                    <li class="fw-bold ps-2">-${amount}</li>
                    <li class="fw-bold ps-3">${balance}</li>
                    <li class="fw-bold dateTime">${dateAndTime}</li>`
                    
                    // Step 3: Append the ul element to the div element
                    var divElement = document.getElementById('expense_details'); // Get the div element
                    divElement.appendChild(ulElement); // Append the ul element to the div element

                    
                    //5. total expense

                    var userDetails = JSON.parse(localStorage.getItem(username));
                    expenseArr = userDetails.expenseArray;
                    totExp = expenseArr.reduce((acc,elm)=> acc + elm.amount,0);
                    
                    
                    var result = document.getElementById('tot_exp_value');
                    result.textContent = totExp;
                    alert("Expense added successfully!!");

                    localStorage.setItem(username,JSON.stringify(userDetails));

                    //5. Total Balance 

                    var userDetails = JSON.parse(localStorage.getItem(username));

                    var result1 = document.getElementById('tot_bal_value');
                    result1.textContent = userDetails.balance;

                    localStorage.setItem(username,JSON.stringify(userDetails));

                    //hiding or clearing pie-chart 

                    const pieContainer = document.getElementById('pieContainer');
                    pieContainer.innerHTML = ``;
                }

                }
                
    
            }
        }
        
    } else  {
        alert("Incorrect Username");
    }
}

// clear all
function clearAll() {
    if(confirm("Are you sure you want to clear data ?")) {
        var result = document.getElementById('tot_bal_value');
        result.textContent = 0;
        //tot_bal_value.value = 0 ;

        var result1 = document.getElementById('tot_exp_value');
        result1.textContent = 0;
        //tot_exp_value.value = 0 ;

        //localStorage clearing 
        //localStorage.clear();

        //removing all income details 

        // Get all elements with the specific class name
        var incomeDetails = document.querySelectorAll('.myList');

        // Loop through each element and remove it from the DOM
        incomeDetails.forEach(function(income) {
            income.parentNode.removeChild(income);
        });

        //removing all expense details 

        // Get all elements with the specific class name
        var expenseDetails = document.querySelectorAll('.myList1');

        // Loop through each element and remove it from the DOM
        expenseDetails.forEach(function(expense) {
            expense.parentNode.removeChild(expense);
        });

        //const user = document.getElementById('user');
        //console.log(user,username);
        //user.innerHTML = `Welcome ${user1}`;

        //changing  details in input fields to empty string
        incomeType.value = '';
        incomeAmount.value = '';

        expenseType.value = '';
        expenseAmount.value = '';

        //initialisign again arrays & balance in local storage as empty

        const userDetails = JSON.parse(localStorage.getItem(username));
        userDetails.incomeArray = [];
        userDetails.expenseArray = [];
        userDetails.balance = 0;

        localStorage.setItem(username,JSON.stringify(userDetails)); //setting local storage with updated data

        //hiding or clearing pie-chart 

        const pieContainer = document.getElementById('pieContainer');
        pieContainer.innerHTML = ``;

        alert("All data cleared successfully");
   } else {
    alert("Nothing has been cleared");
   }
}





  //show pie chart 

  function showPieChart() {
    const userDetails = JSON.parse(localStorage.getItem(username));
    const expArr = userDetails.expenseArray;
    const incArr = userDetails.incomeArray;
    totInc = incArr.reduce((acc,inc)=> acc + inc.amount,0);
    bal = userDetails.balance;


    if(expArr.length != 0 || totInc == bal ) {

        const pieContainer = document.getElementById('pieContainer');
        pieContainer.innerHTML = `<div style="width:400px;height:400px;">
           <canvas id="pie-chart"></canvas>
        </div>`
    
        
        remBal = userDetails.balance;
        //label =['Balance'];
        //bgColor = ['violet'];
        //dat = [remBal];
        label=[];
        bgColor=[];
        dat = [];
    
        //updating 
        expArr.map(expense => {
         label.push(expense.expenseTyp);
         dat.push(expense.amount);
         bgColor.push(getRandomColor());
        });

        label.push('Balance');
        dat.push(remBal)
        bgColor.push('violet');
     
        //pie chart 
     
        new Chart(document.getElementById('pie-chart'), {
            type: 'pie',
            data: {
                labels: label,
                datasets: [{
                backgroundColor: bgColor,
                data: dat
                }], 
            },
            options: {
                //title: {
                //display: true,
                //text: 'Pie Chart for admin panel'
                //},
                responsive: true
            }
        });
     
        //random colour 
        function getRandomColor() {
             // Generate random values for red, green, and blue components
             const red = Math.floor(Math.random() * 256); // Random value between 0 and 255
             const green = Math.floor(Math.random() * 256);
             const blue = Math.floor(Math.random() * 256);
             
             // Convert RGB values to hexadecimal format
             const color = "#" + red.toString(16).padStart(2, '0') + // Convert decimal to hexadecimal and pad with zeros if necessary
                           green.toString(16).padStart(2, '0') +
                           blue.toString(16).padStart(2, '0');
             
             return color;
        }
    } else {
        alert("Nothing to show in pie-chart");
    }


  }




//logout

function logout() {
    localStorage.clear(); // clearing localStorage
    location = "./index.html";
}
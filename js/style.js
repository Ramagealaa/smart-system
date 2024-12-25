
const users = {};


const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const welcomePage = document.getElementById("welcomePage");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const signUpLink = document.getElementById("signUpLink");
const loginLink = document.getElementById("loginLink");
const logoutBtn = document.getElementById("logoutBtn");

const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const signupUsername = document.getElementById("signupUsername");
const signupEmail = document.getElementById("signupEmail");
const signupPassword = document.getElementById("signupPassword");

const welcomeUsername = document.getElementById("welcomeUsername");


function showAlert(message, type = "error", stayVisible = false) {
  const existingAlert = document.querySelector(".alert-message");
  if (existingAlert) {
    existingAlert.remove();
  }

  const alertDiv = document.createElement("div");
  alertDiv.textContent = message;
  alertDiv.classList.add("alert-message");

  if (type === "success") {
    alertDiv.style.color = "#fff";  
    alertDiv.style.backgroundColor = "#4aa4b5";  
  } else {
    alertDiv.style.color = "#fff";  
    alertDiv.style.backgroundColor = "#f92237";  
  }

  alertDiv.style.padding = "10px";  
  alertDiv.style.marginBottom = "3px";  
  alertDiv.style.textAlign = "center";  

  if (signupForm.style.display === "block") {
    signupForm.insertBefore(alertDiv, signupBtn);  
  } else {
    loginForm.insertBefore(alertDiv, loginBtn);  
  }

  if (!stayVisible) {
    setTimeout(() => {
      alertDiv.style.display = "none";
    }, 3000);
  }
}


signUpLink.addEventListener("click", () => {
  signupForm.style.display = "block";
  loginForm.style.display = "none";
  localStorage.setItem("formState", "signup");  
});


loginLink.addEventListener("click", () => {
  signupForm.style.display = "none";
  loginForm.style.display = "block";
  localStorage.setItem("formState", "login");  
});


signupBtn.addEventListener("click", () => {
  const username = signupUsername.value.trim();
  const email = signupEmail.value.trim();
  const password = signupPassword.value;

  
  const alertMessage = document.querySelector(".alert-message");
  if (alertMessage) {
    alertMessage.style.display = "none";
  }

  if (!username || !email || !password) {
    showAlert("All fields are required");  
    return;
  }

  if (users[email]) {
    showAlert("Email already in use");  
    return;
  }

  users[email] = { username, password };

 
  showAlert("Account created successfully!", "success", true);


  setTimeout(() => {
    localStorage.setItem("formState", "login");  
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  }, 3000);  
});


loginBtn.addEventListener("click", () => {
  const email = loginEmail.value.trim();
  const password = loginPassword.value;

 
  const alertMessage = document.querySelector(".alert-message");
  if (alertMessage) {
    alertMessage.style.display = "none";
  }

  if (!email || !password) {
    showAlert("All inputs are required");  
    return;
  }

  if (!users[email] || users[email].password !== password) {
    showAlert("Incorrect email or password");  
    return;
  }

 
  const username = users[email].username;
  welcomeUsername.textContent = username;
  loginForm.style.display = "none";
  welcomePage.style.display = "block";


  clearFormInputs(loginForm);
});


logoutBtn.addEventListener("click", () => {

  localStorage.setItem("formState", "login");  
  welcomePage.style.display = "none";
  loginForm.style.display = "block";
});


function clearFormInputs(form) {
  const inputs = form.querySelectorAll("input");
  inputs.forEach(input => {
    input.value = "";  
  });
}


window.addEventListener("load", () => {
  
  const formState = localStorage.getItem("formState");

  if (formState === "signup") {
    
    signupForm.style.display = "block";
    loginForm.style.display = "none";
  } else {
  
    loginForm.style.display = "block";
    signupForm.style.display = "none";
  }

  
  const loggedInUser = Object.keys(users).find(email => users[email].loggedIn);
  if (loggedInUser) {
    welcomeUsername.textContent = users[loggedInUser].username;
    loginForm.style.display = "none";
    welcomePage.style.display = "block";
  }
});

logoutBtn.addEventListener("click", () => {
  welcomePage.style.display = "none";
  loginForm.style.display = "block";
});


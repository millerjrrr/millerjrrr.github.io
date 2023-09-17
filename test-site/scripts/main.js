const myImage = document.querySelector("img");

myImage.onclick = () => {
  const mySrc = myImage.getAttribute("src");
  if (mySrc === "images/jacob-and-maiza.jpg") {
    myImage.setAttribute("src", "images/j-m-star.jpg");
  } else {
    myImage.setAttribute("src", "images/jacob-and-maiza.jpg");
  }
};

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
  const myName = prompt("Please enter your name.");
  if (!myName) {
    setUserName();
  } else {
    localStorage.setItem("name", myName);
    myHeading.textContent = `Mozilla is cool, ${myName}`;
  }
}

if (!localStorage.getItem("name")) {
  setUserName();
} else {
  const storedName = localStorage.getItem("name");
  myHeading.textContent = `Maiza is still cool, ${storedName}`;
}


myButton.onclick = () => {
  setUserName();
};
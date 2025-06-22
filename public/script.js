console.log("script.js loaded!");

function logSubmit(event) {
    console.log("form submitted!");
    event.preventDefault();
    const formData = new FormData(event.target);
    var url = formData.get("long_url");
    fetch('/api/shorten', {    
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({long_url: url}),
    })
    .then(response => response.json())
    .then(data => {
    console.log('server responded:', data);
    event.target.reset();
    const shortUrl = `http://localhost:3000/${data.short_code}`;
    console.log(shortUrl);
});
 

}

const form = document.getElementById("form");
form.addEventListener("submit", logSubmit);
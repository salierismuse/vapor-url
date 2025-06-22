
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
    const shortUrl = `https://vapor-url.vercel.app/${data.short_code}`;
    document.getElementById('short-url').textContent = shortUrl;
    document.getElementById('result').style.display = 'block';
    console.log(shortUrl);
});
 

}

const form = document.getElementById("form");
form.addEventListener("submit", logSubmit);